import styled from "styled-components"; 

export const FooterContainer = styled.div`
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
    border-top: none;
    background-color: var(--color-table-latex10);
    color: #fff;
`;


export const RightZoneFooter = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;
    padding-right: 20px;
    button {
        background:none;
        font-weight: bold;
        color: var(--color-table-white);
    }
`;

export const  LeftZoneFooter = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 15px;
    gap: 15px;
    select {
        padding:3px;
        background-color: var(--color-table-latex10);
        color: var(--color-table-white);
    }
`;