import Button from "../../genericos/Button/Button";
import Input from "../../genericos/Input/Input";
import "./LoginBox.css";
import ImagenFormulario from "../../../assets/images/empresa/ImagenFormulario.png";
import { useContext, useEffect, useState } from "react";
import { wsPostLogin } from "../../../context/action/auth/login";
import { GlobalContext } from "../../../context/Provider";
import {
  resetListError,
  setListError,
} from "../../../context/action/listError/listError";
import isErrorEmail from "../../../global/utils/isErrorEmail";
import isEmptyError from "../../../global/utils/isEmptyError";
import LogoEmpresa from "../../../assets/images/empresa/Logo.png";
import { useHistory } from "react-router-dom";

const LoginBox = () => {
  const { authDispatch, authState, listErrorState, listErrorDispatch } =
    useContext(GlobalContext);

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loginDto, setLoginDto] = useState({
    email: null,
    contrasena: null,
  });

  useEffect(() => {
    if (
      listErrorState.listError.email === true ||
      listErrorState.listError.contrasena === true ||
      loginDto.email === null ||
      loginDto.contrasena === null
    ) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [listErrorState.listError.email, loginDto]);

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

  const history = useHistory();

  const registrarse = () => {
    resetListError()(listErrorDispatch);
    history.push("/registrarse");
  };

  useEffect(() => {
    if (authState.auth.data) {
      history.push("/home");
    }
  }, [authState.auth.data]);

  useEffect(() => {
    resetListError()(listErrorDispatch);
  }, []);

  return (
    <div className="loginbox-container">
      <div className="loginbox-formulario">
        <div className="loginbox-formulario-header">
          <img className="loginbox-logo" src={LogoEmpresa} alt="logo"></img>
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
              className={"fondoBlue-login"}
              letterColor={"var(--color-white)"}
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
              className={"fondoBlue-login"}
              letterColor={"var(--color-white)"}
            />
          </div>
          <Button
            descripcion={"Ingresar"}
            onClick={btnDisabled ? () => {} : loguear}
            className={`loginbox-ingresarBtn bw18m ${
              !btnDisabled ? "bgc-primary" : "bgc-grey45 dsbCursor"
            }`}
          />
          <span className="loginbox-registrate c-white">
            No tenes cuenta?{" "}
            <span className="c-primary loginbox-regBtn" onClick={registrarse}>
              Registrate
            </span>
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
