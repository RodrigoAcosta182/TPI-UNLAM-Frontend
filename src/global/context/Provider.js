
import { createContext, useReducer } from "react";
import { authInitialState } from "./initialStates/authInitialState";
import auth from "./reducers/auth";
import textos from "./reducers/textos";
import textosInitialState from "./initialStates/textosInitialState";
import mode from "./reducers/mode";
import { modeInitialState } from "./initialStates/modeInitialState";
import toaster from "./reducers/toaster";
import toasterInitialState from "./initialStates/toasterInitialState";
import modal from "./reducers/modal";
import modalInitialState from "./initialStates/modalInitialState";

export const GlobalContext= createContext();




export const GlobalProvider = ({children}) => {
    // Prueba de autenticación fake 
    const [authState, authDispatch] = useReducer(auth, authInitialState)
    const [textosState, textosDispatch] = useReducer(textos, textosInitialState)
    const [modeState, modeDispatch] = useReducer(mode, modeInitialState)
    const [toasterState, toasterDispatch] = useReducer(toaster, toasterInitialState);
    const [modalState, modalDispatch] = useReducer(modal, modalInitialState);


    return (
        <GlobalContext.Provider 
            value={{
                authState,
                authDispatch,
                textosState,
                textosDispatch,
                modeState, 
                modeDispatch, 
                toasterState, 
                toasterDispatch,
                modalState,
                modalDispatch
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}