import { Link, useNavigate } from "react-router-dom";
import Button from "../../genericos/Button/Button";
import Input from "../../genericos/Input/Input";
import "./LoginBox.css";
import ImagenFormulario from "../../../assets/images/empresa/ImagenFormulario.png";
import { useContext, useEffect, useState } from "react";
import { wsPostLogin } from "../../../context/action/auth/login";
import { GlobalContext } from "../../../context/Provider";
const LoginBox = () => {
  const { authDispatch, authState } = useContext(GlobalContext);
  const navigate = useNavigate()
  const [loginDto, setLoginDto] = useState();
  const onChangeLogin = (e) => {
    setLoginDto({ ...loginDto, [e.target.name]: e.target.value });
  };

  const loguear = () => {
    console.log(loginDto);
    if (loginDto !== undefined && loginDto !== null) {
      wsPostLogin(loginDto)(authDispatch);
    }
  };

  

  useEffect(()=>{
    if(authState.auth.data){
      navigate("/home")
    }
  },[authState.auth.data])

  return (
    <div className="loginbox-container">
      <div className="loginbox-formulario">
        <div className="loginbox-formulario-header">
          <span className="c-white">BIENVENIDO A “TarEA”</span>
          <span className="c-white bw52b ">Iniciar Sesión</span>
        </div>
        <div className="loginbox-formulario-body">
          <Input
            onChange={onChangeLogin}
            headerStr={"Usuario"}
            name="usuario"
          />
          <Input
            onChange={onChangeLogin}
            headerStr={"Contraseña"}
            name="password"
          />
          <Button descripcion={"Ingresar"} onClick={loguear} />
          <span>
            No tenes cuenta? <Link to={"/registrarse"}> Registrate</Link>{" "}
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
