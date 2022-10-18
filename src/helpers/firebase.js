export const firebaseConfig = {
  apiKey: "AIzaSyB1sHifIhJGMovDl0x8W_rHjIvLTWneFGU",
  authDomain: "grandin-79bec.firebaseapp.com",
  projectId: "grandin-79bec",
  storageBucket: "grandin-79bec.appspot.com",
  messagingSenderId: "1044304916731",
  appId: "1:1044304916731:web:286a8e775e7ea690fb005e",
  measurementId: "G-HS9QTHBVN0",
};

export const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};


export const terminarLlamada = async (pc, roomId, firestore) => {
  //cerramos conexion
  pc.close();
  //eliminamos sub colecciones
  if (roomId) {
    let roomRef = firestore.collection("calls").doc(roomId);
    await roomRef
      .collection("answerCandidates")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
    await roomRef
      .collection("offerCandidates")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });

    await roomRef.delete();
  }
  //refrescamos pagina
  window.location.reload();
};
