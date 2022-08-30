import { ContainerDemo, ContainerTable } from "./localStyle";
import styled from "styled-components"; 
import Table from "../../../global/components/genericos/Table/Table";
import { configTable } from "./configTable";



const Demo = () => { 
    return (
        <ContainerDemo>
            <h1>Este es el demo de una tabla ABM</h1>
            <ContainerTable>
                <Table configTable={configTable}/> 
            </ContainerTable>
        </ContainerDemo>
    )
}; 
export default Demo;
