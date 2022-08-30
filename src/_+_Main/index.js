import { useEffect, useState } from "react";
import GlobalStyled from "../global/styled/GlobalStyled";
import RouterMain from "./routes/routes";

const MainContainer = ({match}) => {
    
    // let config = localStorage.getItem("config");
    // let modoEstilo = JSON.parse(config).modoEstilo;

    return (
        <>
            <GlobalStyled mode={"blue"} />
            <RouterMain match={match}/>
        </> 
    )
}

export default MainContainer; 