import React from "react";
import { useNavigate } from "react-router-dom";
import LoginBox from "../../components/auth/LoginBox/LoginBox";
import "./Registro.css";

const Registro = () => {
  let navigate = useNavigate();
  const funcion = () => {
    navigate("/home");
  };
  return (
    <div className="registro-container">
    </div>
  );
};

export default Registro;
