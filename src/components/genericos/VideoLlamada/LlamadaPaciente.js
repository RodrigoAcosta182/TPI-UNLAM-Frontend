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

import "./LlamadaPaciente.css";
import { hideModal, showModal } from "../../../context/action/modal/modal";
import AceptaLlamada from "../AceptaLlamada/AceptaLlamada";
import { GlobalContext } from "../../../context/Provider";
import LlamadaEntrante from "../LlamadaEntrante/LlamadaEntrante";
import { resetLlamada, wsGetLlamadaActual } from "../../../context/action/llamada/llamada";

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
// Initialize WebRTC

const pc = new RTCPeerConnection(servers);
function LlamadaPaciente() {
  const { modalDispatch, llamadaDispatch, llamadaState } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState("home");
  const [joinCode, setJoinCode] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const mostrarModalLlamar = () => {
    showModal(
      <AceptaLlamada
        llamadaPaciente={true}
        setupSources={() => setMostrarModal(true)}
      />
    )(modalDispatch);
  };

  const buscarLlamada = () => {
    wsGetLlamadaActual()(llamadaDispatch);
  };

  useEffect(()=>{
    if(llamadaState.llamadaActual.data){
      if(llamadaState.llamadaActual.data.codigoLlamada){
        setJoinCode(llamadaState.llamadaActual.data.codigoLlamada)
        // console.log(llamadaState.llamadaActual.data.codigoLlamada)
        resetLlamada()(llamadaDispatch)
      }
    }

  },[llamadaState.llamadaActual.data])



  return (
    <>
      <LlamadaEntrante callback={mostrarModalLlamar} />
      {!mostrarModal ? (
        <Menu
          joinCode={joinCode}
          setJoinCode={setJoinCode}
          mostrarModal={mostrarModalLlamar}
          buscarLlamada={buscarLlamada}
        />
      ) : (
        <Videos mode={currentPage} callId={joinCode} setPage={setCurrentPage} />
      )}
    </>
  );
}

function Menu({ joinCode, setJoinCode, mostrarModal, buscarLlamada }) {
  return (
    <div className="llamadaPacienteMenu-container">
      <input
        value={joinCode}
        onChange={(e) => setJoinCode(e.target.value)}
        placeholder="ID Llamada"
      />
      <button
        className="llamadaProfesional-btn-btn bgc-primary c-white"
        onClick={() => mostrarModal()}
      >
        Contestar
      </button>
      <button
        className="llamadaProfesional-btn-btn bgc-broccoli c-white"
        onClick={() => buscarLlamada()}
      >
        Buscar llamada automático
      </button>
    </div>
  );
}

function Videos({ callId }) {
  const { modalDispatch } = useContext(GlobalContext);
  const [webcamActive, setWebcamActive] = useState(false);
  const [idroom, setIdroom] = useState(callId);
  const localRef = useRef();
  const remoteRef = useRef();

  const setupSources = async () => {
    //obtenemos video y audio
    const localStream = await navigator.mediaDevices.getDisplayMedia({
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

    //ingresamos a llamada creada
    const callDoc = firestore.collection("calls").doc(idroom);
    const answerCandidates = callDoc.collection("answerCandidates");
    const offerCandidates = callDoc.collection("offerCandidates");

    pc.onicecandidate = (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    //leemos y obtenemos la offerDescription para setearla en RemoteDescription
    const callData = (await callDoc.get()).data();
    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    //creamos una descripcion local que contiene SDP Object
    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };
    //escribimos la descripcion en la base de datos firestone
    await callDoc.update({ answer });
    //escuchamos los cambios de los offerCandidates
    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    // cuando llamamos a esta funcion cerramos conexiones
    pc.onconnectionstatechange = (event) => {
      if (pc.connectionState === "disconnected") {
        terminarLlamada(pc, idroom, firestore);
      }
    };
  };
  useEffect(() => {
    setupSources();
    hideModal()(modalDispatch);
  }, []);

  return (
    <>
      <div className="llamadaPaciente-Container">
        <div className="llamadaPaciente-videosContainer">
          {/* grande */}
          <video
            ref={remoteRef}
            autoPlay
            playsInline
            className="llamadaPaciente-videoRemote"
          />
          {/* miniatura */}
          <video
            ref={localRef}
            autoPlay
            playsInline
            className="llamadaPaciente-videoLocal"
            muted
          />
          {webcamActive && (
            <div className="llamadaPaciente-botones-container">
              <button
                onClick={() => terminarLlamada(pc, idroom, firestore)}
                disabled={!webcamActive}
                className="btnAccionesPacientes btnllamadaPaciente bgc-primary c-white"
              >
                <HangupIcon />
              </button>
              <button
                className="btnAccionesPacientes btnllamadaPaciente bgc-primary c-white"
                onClick={() => {
                  navigator.clipboard.writeText(idroom);
                }}
              >
                <CopyIcon /> Copiar ID
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LlamadaPaciente;
