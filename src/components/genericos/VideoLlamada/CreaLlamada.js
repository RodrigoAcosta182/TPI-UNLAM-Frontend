import { useRef, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { ReactComponent as HangupIcon } from "../../../assets/images/hangup.svg";
import { ReactComponent as MoreIcon } from "../../../assets/images/more-vertical.svg";
import { ReactComponent as CopyIcon } from "../../../assets/images/copy.svg";

import "./VideoLlamada.css";
import {
  firebaseConfig,
  servers,
  terminarLlamada,
} from "../../../helpers/firebase";

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

// Initialize WebRTC

const pc = new RTCPeerConnection(servers);

function CreaLlamada() {
  const [currentPage, setCurrentPage] = useState("home");
  const [joinCode, setJoinCode] = useState("");

  return (
    <div className="app">
      {currentPage === "home" ? (
        <Menu
          joinCode={joinCode}
          setJoinCode={setJoinCode}
          setPage={setCurrentPage}
        />
      ) : (
        <Videos callId={joinCode} setPage={setCurrentPage} />
      )}
    </div>
  );
}

function Menu({ joinCode, setJoinCode, setPage }) {
  return (
    <div className="home">
      <div className="create box">
        <button onClick={() => setPage("create")}>Create Call</button>
      </div>
    </div>
  );
}

function Videos({ callId, setPage }) {
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

  return (
    <div className="videos">
      {/* miniatura */}
      <video ref={localRef} autoPlay playsInline className="local" muted />
      {/* grande */}
      {/* <video ref={remoteRef} autoPlay playsInline className="remote" /> */}

      <div className="buttonsContainer">
        <button
          onClick={() => terminarLlamada(pc, roomId, firestore)}
          disabled={!webcamActive}
          className="hangup button"
        >
          <HangupIcon />
        </button>
        <div tabIndex={0} role="button" className="more button">
          <MoreIcon />
          <div className="popover">
            <button
              onClick={() => {
                navigator.clipboard.writeText(roomId);
              }}
            >
              <CopyIcon /> Copiar ID de ingreso
            </button>
          </div>
        </div>
      </div>

      {!webcamActive && (
        <div className="modalContainer">
          <div className="modal">
            <h3>Encender cámara y microfono para empezar la llamada</h3>
            <div className="container">
              <button onClick={() => setPage("home")} className="secondary">
                Cancel
              </button>
              <button onClick={setupSources}>Start</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreaLlamada;
