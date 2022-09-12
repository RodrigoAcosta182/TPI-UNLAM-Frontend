import Button from "../../genericos/Button/Button";
import Input from "../../genericos/Input/Input";
import "./RegistroBox.css";
import ImagenFormulario from "../../../assets/images/empresa/ImagenFormulario.png";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "../../genericos/DatePicker/DatePicker";
import { wsPostRegistro } from "../../../context/action/auth/registro";
import { GlobalContext } from "../../../context/Provider";
import fechaFormat from "../../../global/utils/fechaTurnoFormat";

const RegistroBox = ({ dsb }) => {
  const navigate = useNavigate();
  const hoy = new Date();

  const { registroDispatch } = useContext(GlobalContext);

  const [fechaNac, setFechaNac] = useState(null);
  const [soyMedico, setSoyMedico] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const [registroDto, setRegistroDto] = useState({
    matricula: null,
    tipoUsuarioId: 1,
    fechaNacimiento: fechaNac,
    nombre: "",
    apellido: "",
    dni: "",
    mail: "",
    usuario: "",
    contrasena: "",
  });

  const onChangeRegistro = (e) => {
    //PROBANDO DESHABILITAR BOTON HASTA QUE TODOS LOS CAMPOS ESTEN LLENOS
    if (e.target.value !== "" || e.target.value !== null) {
      setBtnDisabled(false);
      console.log("deshabilitado");
    } else {
      setBtnDisabled(true);
      console.log("habilitado");
    }
    setRegistroDto({ ...registroDto, [e.target.name]: e.target.value });
  };

  const onChangeMedico = (e) => {
    if (e.target.checked) {
      setSoyMedico(true);
    } else {
      setSoyMedico(false);
    }
  };

  const onChangeFecha = (e) => {
    setFechaNac(e);
  };

  const registrarse = () => {
    wsPostRegistro(registroDto)(registroDispatch);
    if (registroDto !== undefined && registroDto !== null) {
      if (btnDisabled === false) {
      }
    }
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
          <Input
            inputType="check"
            onChange={onChangeMedico}
            headerStr={"Nombre"}
            name="profesional"
            checkboxStr={"Soy Profesional"}
          />
        </div>
        <div className="registrobox-formulario-body">
          <div className="registrobox-formulario-nombreApellido">
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
          </div>
          <div className="registrobox-formulario-nombreApellido">
            <Input onChange={onChangeRegistro} headerStr={"DNI"} name="dni" />
            {soyMedico && (
              <Input
                onChange={onChangeRegistro}
                headerStr={"Matricula"}
                name="matricula"
              />
            )}
          </div>

          <DatePicker
            headerStr="Fecha de nacimiento"
            fechaInicial={"1903 01 01"}
            fechaFinal={`${hoy.getFullYear()} ${
              hoy.getMonth() + 1
            } ${hoy.getDate()}`}
            onChange={onChangeFecha}
            selectedFecha={""}
            checkError={"Esta equivocado"}
            errorStr="La fecha de nacimiento es requerida"
            isRequired={false}
          />
          <Input onChange={onChangeRegistro} headerStr={"Mail"} name="mail" />
          <Input
            onChange={onChangeRegistro}
            headerStr={"Usuario"}
            name="usuario"
          />
          <Input
            onChange={onChangeRegistro}
            headerStr={"Contraseña"}
            name="contrasena"
          />
          <div className="registrobox-botones-container">
            <Button
              onClick={volverAlLogin}
              descripcion={"Volver"}
              className="loginbox-registrarseBtn bgc-white c-black bw18m"
            />
            <Button
              descripcion={"Registrarse"}
              onClick={btnDisabled ? dsb : registrarse}
              className={`loginbox-registrarseBtn bw18m ${
                !btnDisabled && "bgc-broccoli"
              }`}
            />
          </div>
        </div>
      </div>
      {/* <div className="registrobox-gradient-container"></div> */}
      <div className="registrobox-imagen-container">
        <img className="registrobox-imagen" src={ImagenFormulario} alt=""></img>
      </div>
    </div>
  );
};

export default RegistroBox;
