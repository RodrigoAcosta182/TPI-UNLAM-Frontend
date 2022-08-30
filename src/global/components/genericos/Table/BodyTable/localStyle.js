import styled from "styled-components";

export const ContainerBody = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    table {
        width: 100%;
        height: 100%;
    } 
    thead {
        height: 40px;
        background-color: var(--color-table-latex10);
        color: var(--color-table-white);
    }
    td {
        text-align: center;
        border-bottom: 1px solid var(--color-table-black);
        .container-texto {
            width: 100%;
        }
    } 
    

    .check {
        width: 82px;
    }
    
    #checkboxTable-1 {
        cursor: pointer;
    }
    .ptur-rows-table {
       &:hover{
        background-color: rgba(229, 246, 255, 0.65);
        cursor: pointer;
       }
    }
    .ptur-custom-abm-08-06 {
        width: max-content;
        margin-top: 100px;
        margin-left: 20px;
        &::before {
            content: "";
            display: none;
        }
    }
    .wrapper {
        display: flex;
        justify-content: center;
    }
`; 
