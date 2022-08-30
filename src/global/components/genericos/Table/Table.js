import { useContext, useEffect } from "react";
import { showToaster } from "../../../context/action/toaster/toaster";
import HeaderTable from "./HeaderTable/HeaderTable";
import BodyTable from "./BodyTable/BodyTable";
import FooterTable from "./FooterTable/FooterTable";
import { GlobalContextMain } from "../../../../_+_Main/context/provider";
import { GlobalContext } from "../../../context/Provider";
import Toaster from "../Toaster/Toaster";

const Table = ({configTable}) => {
    const {
        abmState
    } = useContext(GlobalContextMain);

    const {
        toasterState,
        toasterDispatch
    } = useContext(GlobalContext);
    
    // Levantando los errores 
    useEffect(() => {
        if(abmState.abm.error){
            showToaster(
                {
                  texto: abmState.abm.error,
                  tipo: "danger",
                },
                "centroArriba"
              )(toasterDispatch);
        }
    }, [abmState.abm.error])

    // Levantando éxitos
   
    return (
        <>
            {toasterState.toaster.show && <Toaster />}
            <HeaderTable configTable={configTable} />
            <BodyTable configTable={configTable} />
            <FooterTable configTable={configTable} />
        </>
    )
}

export default Table; 