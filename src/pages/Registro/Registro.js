import React from "react";
import { useNavigate } from "react-router-dom";
import LoginBox from "../../components/auth/LoginBox/LoginBox";
import RegistroBox from "../../components/auth/RegistroBox/RegistroBox";
import "./Registro.css";

const Registro = () => {
  let navigate = useNavigate();
  const funcion = () => {
    navigate("/home");
  };
  return (
    <div className="registro-container">
      <RegistroBox></RegistroBox>
    </div>
  );
};

export default Registro;
