export const firebaseConfig = {
  apiKey: "AIzaSyD01WY7o71TwZh_z9jObobncNVqbeveCaw",
  authDomain: "grandin2022-c1144.firebaseapp.com",
  projectId: "grandin2022-c1144",
  storageBucket: "grandin2022-c1144.appspot.com",
  messagingSenderId: "383279642684",
  appId: "1:383279642684:web:b3d391e1d6c47fc28d6b39",
  measurementId: "G-HMT471YHNY"
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
