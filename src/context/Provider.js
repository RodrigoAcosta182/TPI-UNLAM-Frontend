import { createContext, useEffect, useReducer } from "react";

//InitialStates ordenar alfabeticamente
import authInitialState from "./initialStates/authInitialState";
import colorCorrectoInitialState from "./initialStates/colorCorrectoInitialState";
import finalizaJuegoInitialState from "./initialStates/finalizaJuegoInitialState";
import generosInitialState from "./initialStates/generosInitialState";
import listErrorInitialState from "./initialStates/listErrorInitialState";
import listaJuegosInitialState from "./initialStates/listaJuegosInitialState";
import misPacientesInitialState from "./initialStates/misPacientesInitialState";
import modalAvatarInitialState from "./initialStates/modalAvatarInitialState";
import modalInitialState from "./initialStates/modalInitialState";
import ordenNumerosInitialState from "./initialStates/ordenNumerosInitialState";
import profesionalesInitialState from "./initialStates/profesionalesInitialState";
import registroInitialState from "./initialStates/registroInitialState";
import resultadosInitialState from "./initialStates/resultadosInitialState";
import pacienteSeleccionadoInitialState from "./initialStates/pacienteSeleccionadoInitialState";

//Reducers ordenar alfabeticamente
import auth from "./reducers/auth";
import colorCorrecto from "./reducers/colorCorrecto";
import finalizaJuego from "./reducers/finalizaJuego";
import generos from "./reducers/generos";
import listError from "./reducers/listError";
import listaJuegos from "./reducers/listaJuegos";
import misPacientes from "./reducers/misPacientes";
import modalAvatar from "./reducers/modalAvatar";
import modal from "./reducers/modal";
import ordenNumeros from "./reducers/ordenNumeros";
import profesionales from "./reducers/profesionales";
import registro from "./reducers/registro";
import resultados from "./reducers/resultados";
import pacienteSeleccionado from "./reducers/pacienteSeleccionado";

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

  const [finalizaJuegoState, finalizaJuegoDispatch] = useReducer(
    finalizaJuego,
    finalizaJuegoInitialState
  );
  const [generosState, generosDispatch] = useReducer(
    generos,
    generosInitialState
  );
  const [listaJuegosState, listaJuegosDispatch] = useReducer(
    listaJuegos,
    listaJuegosInitialState
  );
  const [listErrorState, listErrorDispatch] = useReducer(
    listError,
    listErrorInitialState
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

  const [ordenNumerosState, ordenNumerosDispatch] = useReducer(
    ordenNumeros,
    ordenNumerosInitialState
  );

  const [profesionalesState, profesionalesDispatch] = useReducer(
    profesionales,
    profesionalesInitialState
  );
  const [registroState, registroDispatch] = useReducer(
    registro,
    registroInitialState
  );
  const [resultadosState, resultadosDispatch] = useReducer(
    resultados,
    resultadosInitialState
  );
  const [pacienteSeleccionadoState, pacienteSeleccionadoDispatch] = useReducer(
    pacienteSeleccionado,
    pacienteSeleccionadoInitialState
  );
  return (
    //Declarar en Contexto Global, ordenar alfabeticamente
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
        colorCorrectoState,
        colorCorrectoDispatch,
        finalizaJuegoState,
        finalizaJuegoDispatch,
        generosState,
        generosDispatch,
        listErrorState,
        listErrorDispatch,
        listaJuegosState,
        listaJuegosDispatch,
        modalAvatarState,
        modalAvatarDispatch,
        misPacientesState,
        misPacientesDispatch,
        modalState,
        modalDispatch,
        ordenNumerosState,
        ordenNumerosDispatch,
        profesionalesState,
        profesionalesDispatch,
        registroState,
        registroDispatch,
        resultadosState,
        resultadosDispatch,
        pacienteSeleccionadoState,
        pacienteSeleccionadoDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
