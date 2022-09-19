import { createContext, useReducer } from "react";

//InitialStates ordenar alfabeticamente
import authInitialState from "./initialStates/authInitialState";
import listErrorInitialState from "./initialStates/listErrorInitialState";
import registroInitialState from "./initialStates/registroInitialState";
import listaJuegosInitialState from "./initialStates/listaJuegosInitialState";

//Reducers ordenar alfabeticamente
import auth from "./reducers/auth";
import listError from "./reducers/listError";
import registro from "./reducers/registro";
import listaJuegos from "./reducers/listaJuegos";

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

  return (
    //Declarar en Contexto Global, ordenar alfabeticamente
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
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

export default GlobalProvider