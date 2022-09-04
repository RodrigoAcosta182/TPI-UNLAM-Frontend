import React from "react";
import { useNavigate } from "react-router-dom";
import LoginBox from "../../components/auth/LoginBox/LoginBox";
import "./Login.css";

const Login = () => {
  let navigate = useNavigate();
  const funcion = () => {
    navigate("/home");
  };
  return (
    <div className="login-container">
      <LoginBox></LoginBox>
    </div>
  );
};

export default Login;
