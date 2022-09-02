import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  let navigate = useNavigate();
  const funcion = () => {
    navigate("/home");
  };
  return (
    <React.Fragment>
      <div className="login-container">
        <button onClick={funcion}>Ir a home</button>
      </div>
    </React.Fragment>
  );
};

export default Login;
