import { createContext, useReducer } from "react";

//InitialStates ordenar alfabeticamente
import authInitialState from "./initialStates/authInitialState";
import listErrorInitialState from "./initialStates/listErrorInitialState";
import registroInitialState from "./initialStates/registroInitialState";

//Reducers ordenar alfabeticamente
import auth from "./reducers/auth";
import listError from "./reducers/listError";
import registro from "./reducers/registro";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  //State y Dispatch, ordenar alfabeticamente
  const [authState, authDispatch] = useReducer(auth, [], () => {
    const localData = sessionStorage.auth;
    return localData ? JSON.parse(localData) : authInitialState;
  });

  const [listErrorState, listErrorDispatch] = useReducer(listError,listErrorInitialState);
  const [registroState, registroDispatch] = useReducer(registro,registroInitialState);


  return (
    //Declarar en Contexto Global, ordenar alfabeticamente
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
        listErrorState,
        listErrorDispatch,
        registroState,
        registroDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
