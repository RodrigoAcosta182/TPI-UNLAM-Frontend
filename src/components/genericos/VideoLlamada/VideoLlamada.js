import { JitsiMeeting } from "@jitsi/react-sdk";

const VideoLlamada = () => {
  return (
    <JitsiMeeting
      roomName={"Llamada Grandin"}

      getIFrameRef={(iframeRef) => {
        iframeRef.style.height = "800px";
        iframeRef.style.width = "800px";

      }}
    />
  );
};

export default VideoLlamada;
