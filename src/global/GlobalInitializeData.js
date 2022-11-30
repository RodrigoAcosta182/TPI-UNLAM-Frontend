import { useEffect } from "react";
import { useContext } from "react";
import Toaster from "../components/genericos/Toaster/Toaster";
import LlamadaPaciente from "../components/genericos/VideoLlamada/LlamadaPaciente";
import { wsPostEstadoConexion } from "../context/action/estadoConexion/estadoConexion";
import { wsGetListaDePacientes } from "../context/action/misPacientes/misPacientes";
import {
  profesionalPorPacienteReset,
  wsGetProfesionalPorPaciente,
} from "../context/action/profesionales/profesionalPorPaciente";
import { wsGetAllTextos } from "../context/action/textos/textos";
import { showToaster } from "../context/action/toaster/toaster";
import { GlobalContext } from "../context/Provider";
import { findAndUpdate } from "./utils/obtenerIndexArray";

const GlobalInitializeData = ({ children }) => {
  const {
    authState,
    estadoConexionState,
    estadoConexionDispatch,
    profesionalPorPacienteState,
    profesionalPorPacienteDispatch,
    toasterState,
    toasterDispatch,
    textosDispatch,
    misPacientesState,
    misPacientesDispatch,
  } = useContext(GlobalContext);
  const estadoConexionDto = {
    online: null,
    emailProfesional: null,
    paciente: null,
  };

  useEffect(() => {
    wsGetAllTextos()(textosDispatch);
  }, []);

  useEffect(() => {
    if (
      authState.auth.data &&
      authState.auth.data.usuario.tipoUsuarioId !== 2 &&
      authState.auth.data.usuario.tipoUsuarioId !== 3
    ) {
      wsGetProfesionalPorPaciente()(profesionalPorPacienteDispatch);
    }
    if (authState.auth.data) {
      wsGetListaDePacientes()(misPacientesDispatch);
    }
  }, [authState.auth.data]);

  useEffect(() => {
    if (profesionalPorPacienteState.profesionalPorPaciente.data !== null) {
      estadoConexionDto.emailProfesional =
        profesionalPorPacienteState.profesionalPorPaciente.data.mail;
      estadoConexionDto.paciente = authState.auth.data;
      estadoConexionDto.online = true;
      wsPostEstadoConexion(estadoConexionDto)(estadoConexionDispatch);
    }
  }, [profesionalPorPacienteState.profesionalPorPaciente.data]);

  useEffect(() => {
    if (estadoConexionState.usuarioConectado !== null) {
      showToaster(estadoConexionState.usuarioConectado)(toasterDispatch);
    }
  }, [estadoConexionState.usuarioConectado]);

  //estado online
  useEffect(() => {
    if (
      estadoConexionState.usuarioConectado &&
      misPacientesState.misPacientes.data
    ) {
      findAndUpdate(
        misPacientesState.misPacientes.data,
        "online",
        estadoConexionState.usuarioConectado.usuario.mail,
        true
      );
      // findAndUpdate(
      //   data,
      //   "online",
      //   estadoConexionState.usuarioConectado.usuario.mail,
      //   true
      // );
    }
  }, [estadoConexionState.usuarioConectado]);

  return (
    <div>
      {toasterState.toaster.show && <Toaster />}
      {children}
      {authState.auth.data &&
        authState.auth.data.usuario.tipoUsuarioId !== 2 && <LlamadaPaciente />}
    </div>
  );
};

export default GlobalInitializeData;
