import { createContext, useEffect, useReducer } from "react";

//InitialStates ordenar alfabeticamente
import authInitialState from "./initialStates/authInitialState";
import colorCorrectoInitialState from "./initialStates/colorCorrectoInitialState";
import estadoConexionInitialState from "./initialStates/estadoConexionInitialState";
import finalizaJuegoInitialState from "./initialStates/finalizaJuegoInitialState";
import generosInitialState from "./initialStates/generosInitialState";
import juegoSeleccionadoInitialState from "./initialStates/juegoSeleccionadoInitialState";
import listErrorInitialState from "./initialStates/listErrorInitialState";
import listaJuegosInitialState from "./initialStates/listaJuegosInitialState";
import llamadaInitialState from "./initialStates/llamadaInitialState";
import misPacientesInitialState from "./initialStates/misPacientesInitialState";
import modalAvatarInitialState from "./initialStates/modalAvatarInitialState";
import modalInitialState from "./initialStates/modalInitialState";
import notaInitialState from "./initialStates/notaInitialState";
import ordenNumerosInitialState from "./initialStates/ordenNumerosInitialState";
import pacienteSeleccionadoInitialState from "./initialStates/pacienteSeleccionadoInitialState";
import profesionalesInitialState from "./initialStates/profesionalesInitialState";
import profesionalPorPacienteInitialState from "./initialStates/profesionalPorPacienteInitialState";
import registroInitialState from "./initialStates/registroInitialState";
import resultadosInitialState from "./initialStates/resultadosInitialState";
import sugerenciaInitialState from "./initialStates/sugerenciaInitialState";
import toasterInitialState from "./initialStates/toasterInitialState";
import toasterGenericoInitialState from "./initialStates/toasterGenericoInitialState";
import textosInitialState from "./initialStates/textosInitialState";

//Reducers ordenar alfabeticamente
import auth from "./reducers/auth";
import colorCorrecto from "./reducers/colorCorrecto";
import estadoConexion from "./reducers/estadoConexion";
import finalizaJuego from "./reducers/finalizaJuego";
import generos from "./reducers/generos";
import juegoSeleccionado from "./reducers/juegoSeleccionado";
import listError from "./reducers/listError";
import listaJuegos from "./reducers/listaJuegos";
import llamada from "./reducers/llamada";
import misPacientes from "./reducers/misPacientes";
import modalAvatar from "./reducers/modalAvatar";
import modal from "./reducers/modal";
import nota from "./reducers/nota";
import ordenNumeros from "./reducers/ordenNumeros";
import pacienteSeleccionado from "./reducers/pacienteSeleccionado";
import profesionales from "./reducers/profesionales";
import profesionalPorPaciente from "./reducers/profesionalPorPaciente";
import registro from "./reducers/registro";
import resultados from "./reducers/resultados";
import sugerencia from "./reducers/sugerencia";
import toaster from "./reducers/toaster";
import toasterGenerico from "./reducers/toasterGenerico";
import textos from "./reducers/textos";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  //State y Dispatch, ordenar alfabeticamente
  const [authState, authDispatch] = useReducer(auth, [], () => {
    const localData = sessionStorage.auth;
    return localData ? JSON.parse(localData) : authInitialState;
  });

  useEffect(() => {
    sessionStorage.auth = JSON.stringify(authState);
  }, [authState]);

  const [colorCorrectoState, colorCorrectoDispatch] = useReducer(
    colorCorrecto,
    colorCorrectoInitialState
  );

  const [estadoConexionState, estadoConexionDispatch] = useReducer(
    estadoConexion,
    estadoConexionInitialState
  );

  const [finalizaJuegoState, finalizaJuegoDispatch] = useReducer(
    finalizaJuego,
    finalizaJuegoInitialState
  );
  const [generosState, generosDispatch] = useReducer(
    generos,
    generosInitialState
  );
  const [juegoSeleccionadoState, juegoSeleccionadoDispatch] = useReducer(
    juegoSeleccionado,
    juegoSeleccionadoInitialState
  );
  const [listaJuegosState, listaJuegosDispatch] = useReducer(
    listaJuegos,
    listaJuegosInitialState
  );
  const [listErrorState, listErrorDispatch] = useReducer(
    listError,
    listErrorInitialState
  );
  const [llamadaState, llamadaDispatch] = useReducer(
    llamada,
    llamadaInitialState
  );
  const [misPacientesState, misPacientesDispatch] = useReducer(
    misPacientes,
    misPacientesInitialState
  );
  const [modalAvatarState, modalAvatarDispatch] = useReducer(
    modalAvatar,
    modalAvatarInitialState
  );
  const [modalState, modalDispatch] = useReducer(modal, modalInitialState);

  const [notaState, notaDispatch] = useReducer(nota, notaInitialState);

  const [ordenNumerosState, ordenNumerosDispatch] = useReducer(
    ordenNumeros,
    ordenNumerosInitialState
  );

  const [pacienteSeleccionadoState, pacienteSeleccionadoDispatch] = useReducer(
    pacienteSeleccionado,
    pacienteSeleccionadoInitialState
  );
  const [profesionalesState, profesionalesDispatch] = useReducer(
    profesionales,
    profesionalesInitialState
  );
  const [profesionalPorPacienteState, profesionalPorPacienteDispatch] =
    useReducer(profesionalPorPaciente, profesionalPorPacienteInitialState);
  const [registroState, registroDispatch] = useReducer(
    registro,
    registroInitialState
  );
  const [resultadosState, resultadosDispatch] = useReducer(
    resultados,
    resultadosInitialState
  );
  const [sugerenciaState, sugerenciaDispatch] = useReducer(
    sugerencia,
    sugerenciaInitialState
  );
  const [toasterState, toasterDispatch] = useReducer(
    toaster,
    toasterInitialState
  );
  const [toasterGenericoState, toasterGenericoDispatch] = useReducer(
    toasterGenerico,
    toasterGenericoInitialState
  );
  const [textosState, textosDispatch] = useReducer(textos, textosInitialState);
  return (
    //Declarar en Contexto Global, ordenar alfabeticamente
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
        colorCorrectoState,
        colorCorrectoDispatch,
        estadoConexionState,
        estadoConexionDispatch,
        finalizaJuegoState,
        finalizaJuegoDispatch,
        generosState,
        generosDispatch,
        juegoSeleccionadoState,
        juegoSeleccionadoDispatch,
        listErrorState,
        listErrorDispatch,
        listaJuegosState,
        listaJuegosDispatch,
        llamadaState,
        llamadaDispatch,
        modalAvatarState,
        modalAvatarDispatch,
        misPacientesState,
        misPacientesDispatch,
        modalState,
        modalDispatch,
        notaState,
        notaDispatch,
        ordenNumerosState,
        ordenNumerosDispatch,
        profesionalesState,
        profesionalesDispatch,
        profesionalPorPacienteState,
        profesionalPorPacienteDispatch,
        registroState,
        registroDispatch,
        resultadosState,
        resultadosDispatch,
        pacienteSeleccionadoState,
        pacienteSeleccionadoDispatch,
        sugerenciaState,
        sugerenciaDispatch,
        toasterState,
        toasterDispatch,
        toasterGenericoState,
        toasterGenericoDispatch,
        textosState,
        textosDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
