import { createContext, useReducer } from "react";

//InitialStates ordenar alfabeticamente
import authInitialState from "./initialStates/authInitialState";
import colorCorrectoInitialState from "./initialStates/colorCorrectoInitialState";
import listErrorInitialState from "./initialStates/listErrorInitialState";
import listaJuegosInitialState from "./initialStates/listaJuegosInitialState";
import registroInitialState from "./initialStates/registroInitialState";

//Reducers ordenar alfabeticamente
import auth from "./reducers/auth";
import colorCorrecto from "./reducers/colorCorrecto";
import listError from "./reducers/listError";
import listaJuegos from "./reducers/listaJuegos";
import registro from "./reducers/registro";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  //State y Dispatch, ordenar alfabeticamente
  const [authState, authDispatch] = useReducer(auth, [], () => {
    const localData = sessionStorage.auth;
    return localData ? JSON.parse(localData) : authInitialState;
  });

  const [listErrorState, listErrorDispatch] = useReducer(
    listError,
    listErrorInitialState
  );
  const [registroState, registroDispatch] = useReducer(
    registro,
    registroInitialState
  );
  const [listaJuegosState, listaJuegosDispatch] = useReducer(
    listaJuegos,
    listaJuegosInitialState
  );
  const [colorCorrectoState, colorCorrectoDispatch] = useReducer(
    colorCorrecto,
    colorCorrectoInitialState
  );

  return (
    //Declarar en Contexto Global, ordenar alfabeticamente
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
        colorCorrectoState,
        colorCorrectoDispatch,
        listErrorState,
        listErrorDispatch,
        listaJuegosState,
        listaJuegosDispatch,
        registroState,
        registroDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
