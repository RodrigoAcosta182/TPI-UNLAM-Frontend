import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../../helpers/axiosInstance";
import { GlobalContextMain } from "../../../../../_+_Main/context/provider";
import { FooterContainer, LeftZoneFooter, RightZoneFooter } from "./localStyle";
import { pagination } from "../../../../utils/gridParser";
import { wsGetAbm } from "../../../../../_+_Main/context/action/Abm/abm";

const FooterTable = ({configTable}) => { 
    const {
        abmDispatch,
        abmState
    } = useContext(GlobalContextMain);

    // Estado de las filas 
    const [filas, setFilas] = useState(5); 
    
    // Estado del páginado
    const [pagActual, setPagActual] = useState(1); 
    
    // Estado del total de páginas 
    const [totalPage, setTotalPage] = useState(1);

    // Estado del array sin paginar
    const [data, setData] = useState(abmState.abm.data.searchData ? abmState.abm.data.searchData: abmState.abm.data.data);
   
    
    // se ejecuta para que funcione el search
    useEffect(() => {
       if(abmState.abm.data.searchData){
        setData(abmState.abm.data.searchData);
        const newDATA = pagination(abmState.abm.data.searchData, pagActual, filas)
        setTotalPage(newDATA.totalPage);
        setPagActual(newDATA.pagActual);
        wsGetAbm(newDATA.listRows, false,abmState.abm.data.data, abmState.abm.data.searchData)(abmDispatch);
       }
    }, [abmState.abm.data.searchData])

    // Me trae los datos por primera vez
    useEffect(()=> {
       if(!abmState.abm.data){
            wsGetAbm(false, false)(abmDispatch);
            axiosInstance().then( respuesta => {
                respuesta
                .get(configTable.urls[0])
                .then(resp => {
                    setData(resp.data);
                    const newDATA = pagination(resp.data, pagActual, filas)
                    setTotalPage(newDATA.totalPage);
                    setPagActual(newDATA.pagActual);
                    wsGetAbm(newDATA.listRows, false, resp.data)(abmDispatch);
                })
                .catch((resp) => wsGetAbm(false, resp)(abmDispatch))
            })
       }
    },[])

    // cambiando de pagina 
    const nextPage = () => {
        const newDATA = pagination(data, pagActual + 1, filas); 
        setPagActual(newDATA.pagActual);
        wsGetAbm(newDATA.listRows , false, data, abmState.abm.data.searchData)(abmDispatch);   
    };
    const backPage = () => {
        const newDATA = pagination(data, pagActual - 1, filas); 
        setPagActual(newDATA.pagActual);
        wsGetAbm(newDATA.listRows , false, data, abmState.abm.data.searchData)(abmDispatch);   
    };

    // cambiando desde el inicio hasta el final
    const endPage = () => {
        const newDATA = pagination(data, totalPage, filas); 
        setPagActual(newDATA.pagActual);
        wsGetAbm(newDATA.listRows, false, data, abmState.abm.data.searchData)(abmDispatch);  
    }

    const initPage = () => {
        const newDATA = pagination(data, 1, filas); 
        setPagActual(newDATA.pagActual);
        wsGetAbm(newDATA.listRows, false, data, abmState.abm.data.searchData)(abmDispatch);  
    }

    // cambiando las filas 
    const rowsChange = (e) => {
        const value = e.target.value;
        const newDATA = pagination(data, pagActual, value); 
        setFilas(value);
        setTotalPage(newDATA.totalPage);
        wsGetAbm(newDATA.listRows, false, data, abmState.abm.data.searchData)(abmDispatch);  
    }


    return (
        <FooterContainer>
           <LeftZoneFooter>
             <span>Total Filas:</span>
             <select value={filas} onChange={rowsChange}> 
                <option value={2}>2</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
             </select>
           </LeftZoneFooter>
           <RightZoneFooter>
               <span>Total Page: {totalPage}</span>
               <button onClick={initPage}>{"<<"}</button>
               <button onClick={backPage}>{"<"}</button>
               <span>{pagActual}</span>
               <button onClick={nextPage}>{">"}</button>
               <button onClick={endPage}>{">>"}</button>
           </RightZoneFooter>
        </FooterContainer>
    )
}

export default FooterTable;

