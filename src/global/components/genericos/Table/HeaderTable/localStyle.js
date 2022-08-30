import styled from "styled-components"; 


export const ContainerHeader = styled.div`
    width: 100% - 1px;
    height: 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-table-latex10);
    color: var(--color-table-white);
    
    #checkboxTable-1 {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
`;

// Tenemos el input en esta zona
export const RightZone = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const Input = styled.input`
    width: 250px;
    height: 35px;
    margin-right: 20px;
    color: var(--color-table-black);
    padding-left: 10px;
    
`;




export const LeftZone = styled.div`
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    
    ul {
        display: flex;
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 10px;
        width: 100%;
        list-style: none;
        li {
            padding: 10px;
            text-align: center;
        }
        li:hover {
            background-color: #2b79b5;
            cursor: pointer;
        }
    }
`;
