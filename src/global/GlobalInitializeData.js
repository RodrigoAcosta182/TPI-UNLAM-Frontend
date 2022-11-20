import { useEffect } from "react";
import { useContext } from "react";
import Toaster from "../components/genericos/Toaster/Toaster";
import LlamadaPaciente from "../components/genericos/VideoLlamada/LlamadaPaciente";
import { wsPostEstadoConexion } from "../context/action/estadoConexion/estadoConexion";
import { profesionalPorPacienteReset, wsGetProfesionalPorPaciente } from "../context/action/profesionales/profesionalPorPaciente";
import { wsGetAllTextos } from "../context/action/textos/textos";
import { showToaster } from "../context/action/toaster/toaster";
import { GlobalContext } from "../context/Provider";

const GlobalInitializeData = ({ children }) => {
  const {
    authState,
    estadoConexionState,
    estadoConexionDispatch,
    profesionalPorPacienteState,
    profesionalPorPacienteDispatch,
    toasterState,
    toasterDispatch,
    textosDispatch
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
      authState.auth.data.usuario.tipoUsuarioId !== 2
    ) {
      wsGetProfesionalPorPaciente()(profesionalPorPacienteDispatch);
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
