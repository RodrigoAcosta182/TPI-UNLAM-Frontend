import { Link } from "react-router-dom";
import Button from "../../genericos/Button/Button";
import Input from "../../genericos/Input/Input";
import "./LoginBox.css";
import ImagenFormulario from "../../../assets/images/empresa/ImagenFormulario.png";
const LoginBox = () => {
  return (
    <div className="loginbox-container">
      <div className="loginbox-formulario">
        <div className="loginbox-formulario-header">
          <span className="c-white">BIENVENIDO A “TarEA”</span>
          <span className="c-white bw52b ">Iniciar Sesión</span>
        </div>
        <div className="loginbox-formulario-body">
          <Input headerStr={"Usuario"} />
          <Input headerStr={"Contraseña"} />
          <Button descripcion={"Ingresar"} />
          <span>
            No tenes cuenta? <Link to={"/registrarse"}> Registrate</Link>{" "}
          </span>
        </div>
      </div>
      
        <img className="loginbox-imagen" src={ImagenFormulario} alt=""></img>
      
    </div>
  );
};

export default LoginBox;
