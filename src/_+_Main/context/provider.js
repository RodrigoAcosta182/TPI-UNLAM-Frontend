import { createContext, useReducer } from "react";
import AbmInitialState from "./initialStates/abm";
import abm from "./reducers/abm";

export const GlobalContextMain= createContext();


export const GlobalProviderMain = ({children}) => {

    const [abmState, abmDispatch] = useReducer(abm, AbmInitialState);

    
    return (
        <GlobalContextMain.Provider 
            value={
                {
                    abmState,
                    abmDispatch
                }
            }>
            {children}
        </GlobalContextMain.Provider>
    )
}