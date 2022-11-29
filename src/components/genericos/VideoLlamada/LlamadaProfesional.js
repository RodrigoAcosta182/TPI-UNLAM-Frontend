import { useContext, useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { ReactComponent as HangupIcon } from "../../../assets/images/hangup.svg";
import { ReactComponent as CopyIcon } from "../../../assets/images/copy.svg";
import {
  firebaseConfig,
  servers,
  terminarLlamada,
} from "../../../helpers/firebase";
import { hideModal, showModal } from "../../../context/action/modal/modal";
import { GlobalContext } from "../../../context/Provider";
import AceptaLlamada from "../AceptaLlamada/AceptaLlamada";
import "./VideoLlamada.css";
import CardInfoPaciente from "../CardInfoPaciente/CardInfoPaciente";
import NotaPaciente from "../NotaPaciente/NotaPaciente";
import {
  wsPostGuardarLlamada,
  wsPostLlamadaSaliente,
} from "../../../context/action/llamada/llamada";
import LlamadaIcon from "../../../assets/images/LlamadaIcon.png";
import ReactTooltip from "react-tooltip";
import { resetNota, wsPostNota } from "../../../context/action/nota/nota";
import { showToaster } from "../../../context/action/toasterGenerico/toasterGenerico";
import ToasterGenerico from "../ToasterGenerico/ToasterGenerico";

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

// Initialize WebRTC

const pc = new RTCPeerConnection(servers);

function LlamadaProfesional({ paciente }) {
  const { modalDispatch } = useContext(GlobalContext);
  const [joinCode, setJoinCode] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const mostrarModalLlamar = () => {
    showModal(
      <AceptaLlamada
        pacienteSeleccionado={paciente}
        setupSources={setMostrarModal}
      />
    )(modalDispatch);
  };

  return (
    <>
      <button
        className="btnAccionesPacientes bw14b"
        onClick={mostrarModalLlamar}
        data-tip
        data-for={`botonTooltipCall`}
      >
        <img alt="call" src={LlamadaIcon} width={30}></img>
      </button>
      <ReactTooltip
        id={`botonTooltipCall`}
        place="top"
        type="light"
        effect="solid"
        border={true}
      >
        Llamar
      </ReactTooltip>
      {mostrarModal && (
        <div className="llamadaProfesional-container">
          <Videos callId={joinCode} pacienteSeleccionado={paciente} />
        </div>
      )}
    </>
  );
}

function Videos({ callId, pacienteSeleccionado }) {
  const {
    modalDispatch,
    llamadaDispatch,
    llamadaState,
    authState,
    toasterGenericoDispatch,
    notaDispatch,
    notaState,
    toasterGenericoState,
  } = useContext(GlobalContext);
  const [webcamActive, setWebcamActive] = useState(false);

  const [llamadaDto, setLlamadaDto] = useState({
    CodigoLlamada: callId,
    PacienteId: pacienteSeleccionado.pacienteId,
    Fecha: new Date(),
  });

  const localRef = useRef();
  const remoteRef = useRef();

  const setupSources = async () => {
    //obtenemos video y audio
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    localRef.current.srcObject = localStream;
    remoteRef.current.srcObject = remoteStream;

    setWebcamActive(true);

    //crear la llamada
    const callDoc = firestore.collection("calls").doc();
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    //guardamos el id de llamada
    setLlamadaDto({ ...llamadaDto, CodigoLlamada: callDoc.id });
    // setRoomId(callDoc.id);

    pc.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    //sdp object se necesita para guardar la llamada en firestone
    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };
    // seteamos el offer creado
    await callDoc.set({ offer });

    // escuchamos cambios para obtener la respuesta SDP

    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    // escuchamos cambios de ICE candidates
    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          //agregamos el candidato para la conexion de pares
          pc.addIceCandidate(candidate);
        }
      });
    });

    // cuando llamamos a esta funcion cerramos conexiones
    pc.onconnectionstatechange = (event) => {
      if (pc.connectionState === "disconnected") {
        terminarLlamada(pc, llamadaDto.CodigoLlamada, firestore);
      }
    };
  };

  useEffect(() => {
    setupSources();
    hideModal()(modalDispatch);
  }, []);

  useEffect(() => {
    if (llamadaDto.CodigoLlamada) {
      wsPostGuardarLlamada(llamadaDto)(llamadaDispatch);
    }
  }, [llamadaDto.CodigoLlamada]);

  useEffect(() => {
    if (llamadaState.llamada.data === 200) {
      wsPostLlamadaSaliente(
        llamadaDto.CodigoLlamada,
        pacienteSeleccionado.mail
      )(llamadaDispatch);
    }
  }, [llamadaState.llamada.data]);

  
  const [notaPaciente, setNotaPaciente] = useState({
    Fecha: new Date(),
    Mensaje: null,
    ProfesionalId: authState.auth.data.usuario.id,
    PacienteId: pacienteSeleccionado.pacienteId,
    Archivado: false,
  });
  
  const [texto, setTexto] = useState(notaPaciente.Mensaje);

  const onChangeNotaLlamada = (e) => {
    setTexto(e.target.value);
    setNotaPaciente({ ...notaPaciente, Mensaje: e.target.value });
  };

  const enviarNota = () => {
    wsPostNota(notaPaciente)(notaDispatch);
  };

  useEffect(() => {
    if (notaState.nota.data === 200) {
      showToaster(
        {
          texto: "La nota fue enviada correctamente",
          tipo: "success",
        },
        "centroArriba"
      )(toasterGenericoDispatch);
    }
    resetNota()(notaDispatch);
    setTexto("");
  }, [notaState.nota.data]);

  return (
    <>
      {toasterGenericoState.toasterGenerico.show && <ToasterGenerico />}
      <div className="llamadaProfesional-videosContainer">
        <div className="llamadaProfesional-boxLeft">
          <CardInfoPaciente paciente={pacienteSeleccionado} />
          {/* grande */}
          <video
            ref={remoteRef}
            autoPlay
            playsInline
            className="llamadaProfesional-videoRemote"
          />
          {webcamActive && (
            <div className="llamadaProfesional-botones-container">
              <button
                onClick={() =>
                  terminarLlamada(pc, llamadaDto.CodigoLlamada, firestore)
                }
                disabled={!webcamActive}
                className="llamadaProfesional-btn-btn btnllamadaProfesional bgc-primary c-white"
              >
                <HangupIcon />
              </button>
              <button
                className="llamadaProfesional-btn-btn btnllamadaProfesional bgc-primary c-white"
                onClick={() => {
                  navigator.clipboard.writeText(llamadaDto.CodigoLlamada);
                }}
              >
                <CopyIcon /> Copiar ID
              </button>
            </div>
          )}
        </div>
        <div className="nota-videoMiniatura-container">
          {/* miniatura */}
          <video
            ref={localRef}
            autoPlay
            playsInline
            className="llamadaProfesional-videoLocal"
            muted
          />
          <NotaPaciente
            onChangeNota={onChangeNotaLlamada}
            handleClickGuardarNota={enviarNota}
            texto={texto}
          />
        </div>
      </div>
    </>
  );
}

export default LlamadaProfesional;
