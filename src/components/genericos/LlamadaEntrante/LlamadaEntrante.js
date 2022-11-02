import { useContext, useEffect } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Subject } from "rxjs";
import { GlobalContext } from "../../../context/Provider";
import { setLlamadaActual } from "../../../context/action/llamada/llamada";
const LlamadaEntrante = ({ callback }) => {
  const { authState, llamadaDispatch } = useContext(GlobalContext);
  const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:44392/message")
    .configureLogging(LogLevel.Information)
    .build();

  const startHubConnection = async () => {
    try {
      const subject = new Subject();
      subject.subscribe((message) => {
        // showModal(<LlamadaEntranteModal mensaje={message} />)(modalDispatch);
        // console.log(message)
        
        callback();
      });

      await connection.start();
      console.log("SignalR Connected.");
      connection.on("sendMessage", (message) => {
        setLlamadaActual(message.llamadaId)(llamadaDispatch);
        subject.next(message);
      });

      connection
        .invoke("AgregarAGrupo", authState.auth.data.usuario.mail)
        .then(function (resp) {
          // console.log(resp);
        })
        .catch((err) => console.error(err.toString()));
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
