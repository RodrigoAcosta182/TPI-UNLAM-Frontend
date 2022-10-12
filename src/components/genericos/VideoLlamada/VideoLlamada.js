import "./VideoLlamada.css";
const VideoLlamada = () => {
  const constraints = {
    video: true,
    audio: true,
  };

  const playVideo = async () => {
    try {
      const constraints = { video: true, audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const videoElement = document.querySelector("video#stream");
      videoElement.srcObject = stream;
      const recorder = new MediaRecorder();
    } catch (error) {
      console.error("Error opening video camera.", error);
    }
  };

  const buttonPlay = () => {
    playVideo();
  };

  const playScreen = async () => {
    try {
      const constraints = {
        video: {
          cursor: "motion",
          displaySurface: "window",
        },
      };
      const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      const videoElement = document.querySelector("video#screen");
      videoElement.srcObject = stream;
    } catch (error) {
      console.error("Error opening video camera.", error);
    }
  };

  const buttonScreen = () => {
    playScreen();
  };

  // const signalingChannel = new SignalingChannel(remoteClientId);
  // signalingChannel.addEventListener('message', message => {
  //     // New message from remote client received
  //     alert("Esta aca la señal")
  // });

  // // Send an asynchronous message to the remote client
  // signalingChannel.send('Hello!');

  return (
    <>
      <div className="video-subcontainer">
        <h1>Compartir video</h1>
        <video id="stream" autoplay playsinline controls="false"></video>
        <button onClick={buttonPlay}>Mostrar camara</button>
      </div>
      <div className="video-subcontainer">
        <h1>Compartir captura de pantalla</h1>
        <video id="screen" autoplay playsinline controls="false"></video>
        <button onClick={buttonScreen}>Compartir pantalla</button>
      </div>
    </>
  );
};

export default VideoLlamada;
