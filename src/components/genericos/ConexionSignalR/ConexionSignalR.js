import { useContext, useEffect } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Subject } from "rxjs";
import { GlobalContext } from "../../../context/Provider";
import { setLlamadaActual } from "../../../context/action/llamada/llamada";
import { setUsuarioConectado } from "../../../context/action/estadoConexion/estadoConexion";
const ConexionSignalR = ({ callback }) => {
  const { authState, llamadaDispatch, estadoConexionDispatch } =
    useContext(GlobalContext);
  const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:44327/message")
    .configureLogging(LogLevel.Information)
    .build();

  const startHubConnection = async () => {
    try {
      const subject = new Subject();
      subject.subscribe((message) => {
        callback();
      });
      
      await connection.start();
      
      console.log("SignalR Conectado");
      //enviar datos llamada
      connection.on("sendMessage", (message) => {
        // console.log(message);
        setLlamadaActual(message.llamadaId)(llamadaDispatch);
        subject.next(message);
      });

      connection.on("estadoConexion", (usuario) => {
        setUsuarioConectado(usuario.paciente)(estadoConexionDispatch);
        subject.next(usuario);
      });

      connection
        .invoke("AgregarAGrupo", authState.auth.data.usuario.mail)
        .then(function (resp) {
          // console.log(resp);
        })
        .catch((err) => console.error(err.toString()));
    } catch (err) {
      console.log(err);
      setTimeout(startHubConnection, 5000);
    }
    return false;
  };
  connection.onclose(async () => {
    console.log("cerre conexion")
    await startHubConnection();
  });

  useEffect(() => {
    startHubConnection();
  }, []);
};

export default ConexionSignalR;
