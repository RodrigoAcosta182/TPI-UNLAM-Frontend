import { createContext, useReducer } from "react";

//InitialStates ordenar alfabeticamente
import authInitialState from "./initialStates/authInitialState";
import registroInitialState from "./initialStates/registroInitialState";

//Reducers ordenar alfabeticamente
import auth from "./reducers/auth";
import registro from "./reducers/registro";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(auth, [], () => {
    const localData = sessionStorage.auth;
    return localData ? JSON.parse(localData) : authInitialState;
  });

  const [registroState, registroDispatch] = useReducer(
    registro,
    registroInitialState
  );

  return (
    <GlobalContext.Provider
      value={{ authState, authDispatch, registroState, registroDispatch }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
