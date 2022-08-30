import { useContext } from "react";
import { SelectedItem } from "../../../../../_+_Main/context/action/Abm/abm";
import { GlobalContextMain } from "../../../../../_+_Main/context/provider";
import { sizeText } from "../../../../utils/textosAcortador";
import { ContainerBody } from "./localStyle";

const BodyTable = ({configTable}) => {
    const {
        abmState,
        abmDispatch
    } = useContext(GlobalContextMain);

    const rows = abmState.abm.data.dataFiltered || []; 
    const columns = configTable.grid.columnConfig;
    const idSelected = abmState.abm.selectedItem;

    // Delete 
    const handleClick = (id) => {
        if(idSelected !== id){
            SelectedItem(id)(abmDispatch);
        }else {
            SelectedItem(false)(abmDispatch);
        }
    };

    return (
        <ContainerBody>
            {
                abmState.abm.loading ? <span className="loading-table">Cargando ...</span>:
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {
                                columns.map((column, key) => <th key={key}>{column}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.map((row, key) => {
                                return (
                                    <tr key={key} className={"ptur-rows-table"} onClick={()=> handleClick(row.id)}>
                                        <td className="check">
                                            <input
                                             checked={idSelected === row.id || idSelected === "ALL"? true: false} 
                                             type="checkbox"  
                                             id="checkboxTable-1" 
                                             onChange={()=>{}}
                                             
                                             />
                                        </td>
                                        {
                                            columns.map((column, key) => (
                                                <td key={key}>
                                                    <span className="container-texto">
                                                        {
                                                            typeof row[column] === "string" ?
                                                            sizeText(row[column],configTable.textSize) : row[column] 
                                                        }
                                                    </span>
                                                </td>
                                            ))
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            }
        </ContainerBody>
    )
}

export default BodyTable; 