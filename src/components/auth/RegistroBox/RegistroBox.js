import Button from "../../genericos/Button/Button";
import Input from "../../genericos/Input/Input";
import "./RegistroBox.css";
import ImagenFormulario from "../../../assets/images/empresa/ImagenFormulario.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "../../genericos/DatePicker/DatePicker";

const RegistroBox = () => {
  const navigate = useNavigate()
  const hoy = new Date();
  const [registroDto, setRegistroDto] = useState();

  const onChangeRegistro = (e) => {
    setRegistroDto({ ...registroDto, [e.target.name]: e.target.value });
  };

  const loguear = () => {
    console.log(registroDto);
  };
  const volverAlLogin = () => {
    navigate("/");
  };

  return (
    <div className="registrobox-container">
      <div className="registrobox-formulario">
        <div className="registrobox-formulario-header">
          <span className="c-white">BIENVENIDO A “TarEA”</span>
          <span className="c-white bw52b ">Registrarse</span>
        </div>
        <div className="registrobox-formulario-body">
          <Input
            onChange={onChangeRegistro}
            headerStr={"Nombre"}
            name="nombre"
          />
          <Input
            onChange={onChangeRegistro}
            headerStr={"Apellido"}
            name="apellido"
          />
          <DatePicker 
            headerStr="Fecha de nacimiento"
            fechaInicial={"1903 01 01"}
            fechaFinal={`${hoy.getFullYear()} ${hoy.getMonth() + 1} ${hoy.getDate()}`}
            onChange={() => {}}
            // selectedFecha={"20 30 2020"}
            checkError={"Esta equivocado"}
            errorStr="La fecha de nacimiento es requerida"
            isRequired={false}
          />
          <Input
            onChange={onChangeRegistro}
            headerStr={"Usuario"}
            name="usuario"
          />
          <Input
            onChange={onChangeRegistro}
            headerStr={"Contraseña"}
            name="password"
          />
          <div className="registrobox-botones-container">
            <Button onClick={volverAlLogin} descripcion={"Volver"} className="bgc-white c-black" />

            <Button descripcion={"Registrarse"} onClick={loguear} />
          </div>
        </div>
      </div>
      <div className="registrobox-imagen-container">
        <img className="registrobox-imagen" src={ImagenFormulario} alt=""></img>
      </div>
    </div>
  );
};

export default RegistroBox;
