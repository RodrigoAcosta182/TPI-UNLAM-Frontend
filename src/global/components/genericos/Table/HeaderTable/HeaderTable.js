import { useContext, useState } from "react";
import { newOrderLista } from "../../../../utils/orderData";

import { GlobalContextMain } from "../../../../../_+_Main/context/provider";
import { ContainerHeader, Input, LeftZone, RightZone } from "./localStyle";
import { SelectedItem, wsDelete, wsGetAbm, wsPostAbm, wsPutAbm } from "../../../../../_+_Main/context/action/Abm/abm";
import AddIcon from "../../../../assets/generico/AddIcon";
import EditIcon from "../../../../assets/generico/EditIcon";
import TrashIcon from "../../../../assets/generico/TrashIcon";

const HeaderTable = ({configTable}) => {
    const {
        abmState,
        abmDispatch
    } = useContext(GlobalContextMain);
    
    // Eliminar un item
    const idSelected = abmState.abm.selectedItem || false;
    const deleteItem = () => {
         wsDelete(configTable.urls[3],idSelected, abmState.abm.data.data)(abmDispatch)
    }

    // Buscador
    const searchItem = (e) => {
        const value = e.target.value;
        let dataFiltered =  newOrderLista(abmState.abm.data.data, configTable.grid.searchField, value);
        wsGetAbm(abmState.abm.data.dataFiltered, false,abmState.abm.data.data, dataFiltered )(abmDispatch);
    }

    // Checkbox All 
    const handleClick = () => {
        if(idSelected !== "ALL"){
            SelectedItem("ALL")(abmDispatch);
        }else {
            SelectedItem(false)(abmDispatch);
        }
    }

    // Crear y editar nuevo item 
    const [form,setForm] = useState({}); 

    const [type, setType] = useState(false)

    const handleClickForm = (type, id) => {
        if(type === "PUT"){
            const newForm = abmState.abm.data.dataFiltered.filter(e => Number(e.id) === Number(id));
            if(newForm.length !== 0){
                setForm(newForm[0]);
                setType(type)
            } 
            else{
                setForm({})
                setType(false)
            }

        }else  setType(type);
    }

    const submitFormCreate = (form) => { 
        wsPostAbm(configTable.urls[1], form, abmState.abm.data.data)(abmDispatch)
        setType(false)
    }

    const submitFomPut = (form) => {
        wsPutAbm(configTable.urls[2], form, abmState.abm.data.data)(abmDispatch)
        setType(false)
    }

    return (

        <>
        {
           type  ? <configTable.Abm
                        type={type} 
                        setType={setType} 
                        submitFormCreate={submitFormCreate} 
                        submitFomPut={submitFomPut}
                        form={form} 
                        />: ""
        }
            <ContainerHeader>
                <LeftZone>
                    <ul>
                            <li onClick={handleClick}><input onChange={()=>{}} checked={idSelected === "ALL"? true: false}  type="checkbox" id="checkboxTable-1"/></li>
                            <li onClick={()=> handleClickForm("POST")}><AddIcon /></li>
                            <li onClick={()=> handleClickForm("PUT", idSelected)}><EditIcon /></li>
                            <li onClick={deleteItem}><TrashIcon /></li>
                    </ul>
                </LeftZone>
                <RightZone>
                        <Input placeholder={"Este es el placeholder"} onChange={searchItem}/>
                </RightZone>
            </ContainerHeader>
        </>
    )
};


export default HeaderTable; 