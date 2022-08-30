import { Link } from "react-router-dom";
import styled from "styled-components"; 

export const ContainerBien =  styled.div`
    display: flex;
    flex-direction: column;
    .container-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 100px;
        margin-top: 80px;
    }
    overflow-y: scroll;
    height: 100vh;
    `;

export const Title = styled.h1`
    font-size: 100px;
    font-weight: bold;
    width: 90%;
    text-align: center;
    line-height: 1.6;
    margin: auto;
`;

export const Description = styled.span`
    font-weight: 300;
    text-align: center;
    margin: auto;
    font-size: 28px;
    color: #666;
    line-height: 1.6;
    width: 90%;
    margin-top: 40px;

`;

export const BtnPrimary = styled(Link)`
    text-decoration: none;
    color: #fff;
    background: #0070f3;
    width: 250px;
    height: 50px;
    border-radius: 5px;
    border: none;
    font-size: 20px;
    font-weight: 300;
    box-shadow: 0px 0px 10px 0px rgba(0,112,243,1);
    transition: ease-in-out 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
       box-shadow: 0px 0px 15px 1px rgba(0,112,243,1);
    }
    cursor: pointer;
`; 

export const BtnSecondary = styled(Link)`
    background: transparent;
    width: 250px;
    height: 50px;
    border-radius: 4px;
    font-size: 20px;
    color: #666;
    border: none;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
    transition: ease-in-out 0.3s;
    &:hover {
       box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.222);
    }
    font-weight: 300;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    `; 


export const SectionCard = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin-top: 100px;
    margin-bottom: 100px;
    gap: 30px;
`; 

export const Card = styled.a`
    text-decoration: none;
    color: #000;
    width: 345px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    border: 1px solid rgba(20,20,20,0.1);
    transition: 0.3s ;
    &:hover {
         border: 1px solid rgba(20,20,20,0);
         box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.1);
    }
    cursor: pointer;

    h1 {
        margin: 0;
    }
    p {
        color: #666;
        font-size: 18px;
    }
    .link {
        color: #0070f3;
        border-bottom: 1px solid #0070f3;
        width: max-content;
    }
`; 