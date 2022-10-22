import { useContext, useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { ReactComponent as HangupIcon } from "../../../assets/images/hangup.svg";
import { ReactComponent as MoreIcon } from "../../../assets/images/more-vertical.svg";
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
        className="btnAccionesPacientes  c-white bgc-primary bw18m"
        onClick={mostrarModalLlamar}
      >
        Llamar
      </button>
      {mostrarModal && (
        <div className="llamadaProfesional-container">
          <Videos
            callId={joinCode}
            setMostrarModal={setMostrarModal}
            pacienteSeleccionado={paciente}
          />
        </div>
      )}
    </>
  );
}

function Videos({ callId }) {
  const { modalDispatch } = useContext(GlobalContext);
  const [webcamActive, setWebcamActive] = useState(false);
  const [roomId, setRoomId] = useState(callId);

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
    setRoomId(callDoc.id);

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
        terminarLlamada(pc, roomId, firestore);
      }
    };
  };

  useEffect(() => {
    setupSources();
    hideModal()(modalDispatch);
  }, []);

  return (
    <>
      <div className="llamadaProfesional-Container">
        <div className="llamadaProfesional-videosContainer">
          {/* miniatura */}
          <video
            ref={localRef}
            autoPlay
            playsInline
            className="llamadaProfesional-videoLocal"
            muted
          />
          {/* grande */}

          <div>
            <CardInfoPaciente/>
            <video
              ref={remoteRef}
              autoPlay
              playsInline
              className="llamadaProfesional-videoRemote"
            />
            {webcamActive && (
              <div className="llamadaProfesional-botones-container">
                <button
                  onClick={() => terminarLlamada(pc, roomId, firestore)}
                  disabled={!webcamActive}
                  className="btnAccionesPacientes btnllamadaProfesional bgc-primary c-white"
                >
                  <HangupIcon />
                </button>
                <button
                  className="btnAccionesPacientes btnllamadaProfesional bgc-primary c-white"
                  onClick={() => {
                    navigator.clipboard.writeText(roomId);
                  }}
                >
                  <CopyIcon /> Copiar ID
                </button>
              </div>
            )}
          </div>
        <NotaPaciente/>
        </div>
      </div>
    </>
  );
}

export default LlamadaProfesional;
