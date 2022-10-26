import { useContext, useEffect } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Subject } from "rxjs";
import { showModal } from "../../../context/action/modal/modal";
import LlamadaEntranteModal from "./LlamadaEntranteModal";
import { GlobalContext } from "../../../context/Provider";
const LlamadaEntrante = ({ callback }) => {
  const { modalDispatch, authState } = useContext(GlobalContext);
  const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:44392/message")
    .configureLogging(LogLevel.Information)
    .build();

  const startHubConnection = async () => {
    try {
      const subject = new Subject();
      subject.subscribe((message) => {
        // showModal(<LlamadaEntranteModal mensaje={message} />)(modalDispatch);
        callback();
      });

      await connection.start();
      console.log("SignalR Connected.");
      connection.on("sendMessage", (message) => {
        if (message.ReceptorId === authState.auth.data.usuario.id) {
          console.log(message);
          console.log(authState.auth.data);

          subject.next(message);
        }
      });
    } catch (err) {
      console.log(err);
      //   setTimeout(startHubConnection, 5000);
    }
    return false;
  };
  connection.onclose(async () => {
    await startHubConnection();
  });

  useEffect(() => {
    startHubConnection();
  }, []);
};

export default LlamadaEntrante;
