import { Link, useNavigate } from "react-router-dom";
import Button from "../../genericos/Button/Button";
import Input from "../../genericos/Input/Input";
import "./LoginBox.css";
import ImagenFormulario from "../../../assets/images/empresa/ImagenFormulario.png";
import { useContext, useEffect, useState } from "react";
import { wsPostLogin } from "../../../context/action/auth/login";
import { GlobalContext } from "../../../context/Provider";
import { resetListError, setListError } from "../../../context/action/listError/listError";
import isErrorEmail from "../../../global/utils/isErrorEmail";
import isEmptyError from "../../../global/utils/isEmptyError";

const LoginBox = () => {
  const { authDispatch, authState, listErrorState, listErrorDispatch } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [loginDto, setLoginDto] = useState({
    email: null,
    contrasena: null,
  });

  const onChangeLogin = (e) => {
    //switch control de errores en login
    switch (e.target.name) {
      case "email":
        listErrorState.listError.email = isErrorEmail(e.target.value);
        setListError(listErrorState.listError)(listErrorDispatch);
        break;
      default:
        listErrorState.listError.contrasena = isEmptyError(e.target.value);
        setListError(listErrorState.listError)(listErrorDispatch);
    }
    setLoginDto({ ...loginDto, [e.target.name]: e.target.value });
  };

  const loguear = () => {
    if (loginDto !== undefined && loginDto !== null) {
      wsPostLogin(loginDto)(authDispatch);
    }
  };

  const registrarse =() =>{
    resetListError()(listErrorDispatch)
    navigate("/registrarse")
  }

  useEffect(() => {
    if (authState.auth.data) {
      navigate("/home");
    }
  }, [authState.auth.data]);

  useEffect(()=>{
    resetListError()(listErrorDispatch)
  },[])

  return (
    <div className="loginbox-container">
      <div className="loginbox-formulario">
        <div className="loginbox-formulario-header">
          <span className="c-white">BIENVENIDO A “TarEA”</span>
          <span className="c-white bw52b ">Iniciar Sesión</span>
        </div>
        <div className="loginbox-formulario-body">
          <div className="loginbox-formulario-input-container">
            <Input
              onChange={onChangeLogin}
              headerStr={"Email"}
              name="email"
              checkError={listErrorState.listError.email}
              isRequired={true}
              errorStr="El email es requerido"
            />
          </div>
          <div className="loginbox-formulario-input-container">
            <Input
              onChange={onChangeLogin}
              headerStr={"Contraseña"}
              name="contrasena"
              inputType="password"
              checkError={listErrorState.listError.contrasena}
              isRequired={true}
              errorStr="La contraseña es requerida"
            />
          </div>
          <Button
            descripcion={"Ingresar"}
            onClick={loguear}
            className={"loginbox-ingresarBtn"}
          />
          <span className="loginbox-registrate" >
            No tenes cuenta? <span onClick={registrarse}>Registrate</span>
          </span>
        </div>
      </div>
      <div className="loginbox-imagen-container">
        <img className="loginbox-imagen" src={ImagenFormulario} alt=""></img>
      </div>
    </div>
  );
};

export default LoginBox;
