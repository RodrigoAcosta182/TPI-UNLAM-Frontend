import { useRef, useState } from "react";
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

import "./VideoLlamada.css";

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
// Initialize WebRTC

const pc = new RTCPeerConnection(servers);
function LlamadaPaciente() {
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
        <Videos mode={currentPage} callId={joinCode} setPage={setCurrentPage} />
      )}
    </div>
  );
}

function Menu({ joinCode, setJoinCode, setPage }) {
  return (
    <div className="home">
      <div className="answer box">
        <input
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          placeholder="Join with code"
        />
        <button onClick={() => setPage("join")}>Answer</button>
      </div>
    </div>
  );
}

function Videos({ callId, setPage }) {
  const [webcamActive, setWebcamActive] = useState(false);
  const [idroom, setIdroom] = useState(callId);
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
  return (
    <div className="videos">
      {/* miniatura */}
      <video ref={localRef} autoPlay playsInline className="local" muted />
      {/* grande */}
      <video ref={remoteRef} autoPlay playsInline className="remote" />

      <div className="buttonsContainer">
        <button
          onClick={() => terminarLlamada(pc, idroom, firestore)}
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
                navigator.clipboard.writeText(idroom);
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

export default LlamadaPaciente;
