import Button from "../../genericos/Button/Button";
import Input from "../../genericos/Input/Input";
import "./RegistroBox.css";
import ImagenFormulario from "../../../assets/images/empresa/ImagenFormulario.png";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "../../genericos/DatePicker/DatePicker";
import { wsPostRegistro } from "../../../context/action/auth/registro";
import { GlobalContext } from "../../../context/Provider";
import isErrorEmail from "../../../global/utils/isErrorEmail";
import {
  resetListError,
  setListError,
} from "../../../context/action/listError/listError";
import isEmptyError, {
  isNombreApellidoError,
} from "../../../global/utils/isEmptyError";
import LogoEmpresa from "../../../assets/images/empresa/Logo.png";

const RegistroBox = ({ dsb }) => {
  const navigate = useNavigate();
  const hoy = new Date();

  const { registroDispatch, listErrorState, listErrorDispatch } =
    useContext(GlobalContext);

  const [soyMedico, setSoyMedico] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const [registroDto, setRegistroDto] = useState({
    matricula: null,
    tipoUsuarioId: 1,
    fechaNacimiento: null,
    nombre: "",
    apellido: "",
    dni: "",
    mail: "",
    contrasena: "",
  });

  const onChangeRegistro = (e) => {
    //PROBANDO DESHABILITAR BOTON HASTA QUE TODOS LOS CAMPOS ESTEN LLENOS
    // if (e.target.value !== "" || e.target.value !== null) {
    //   setBtnDisabled(false);
    //   console.log("deshabilitado");
    // } else {
    //   setBtnDisabled(true);
    //   console.log("habilitado");
    // }

    //switch control de errores en login
    switch (e.target.name) {
      case "mail":
        listErrorState.listError.email = isErrorEmail(e.target.value);
        setListError(listErrorState.listError)(listErrorDispatch);
        break;
      case "nombre":
        listErrorState.listError.nombre = isNombreApellidoError(e.target.value);
        setListError(listErrorState.listError)(listErrorDispatch);
        break;
      case "apellido":
        listErrorState.listError.apellido = isNombreApellidoError(
          e.target.value
        );
        setListError(listErrorState.listError)(listErrorDispatch);
        break;
      case "dni":
        listErrorState.listError.dni = isEmptyError(e.target.value);
        setListError(listErrorState.listError)(listErrorDispatch);
        break;
      case "matricula":
        listErrorState.listError.matricula = isEmptyError(e.target.value);
        setListError(listErrorState.listError)(listErrorDispatch);
        break;
      default:
        listErrorState.listError.contrasena = isEmptyError(e.target.value);
        setListError(listErrorState.listError)(listErrorDispatch);
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
    setRegistroDto({ ...registroDto, fechaNacimiento: e });
  };

  const registrarse = () => {
    console.log(registroDto);
    wsPostRegistro(registroDto)(registroDispatch);
    if (registroDto !== undefined && registroDto !== null) {
      if (btnDisabled === false) {
      }
    }
  };
  const volverAlLogin = () => {
    resetListError()(listErrorDispatch);
    navigate("/");
  };

  return (
    <div className="registrobox-container">
      <div className="registrobox-formulario">
        <div className="registrobox-formulario-header">
          <img className="registrobox-logo" src={LogoEmpresa} alt="logo"></img>
          <span className="c-white bw52b ">Registrarse</span>
          <div className="registrobox-formulario-soyProfesional">
            <Input
              inputType="check"
              onChange={onChangeMedico}
              name="profesional"
              checkboxStr={"Soy Profesional"}
            />
          </div>
        </div>
        <div className="registrobox-formulario-body">
          <div className="registrobox-formulario-nombreApellido">
            <div className="registrobox-formulario-input">
              <Input
                onChange={onChangeRegistro}
                headerStr={"Nombre"}
                name="nombre"
                isRequired={true}
                checkError={listErrorState.listError.nombre}
                errorStr="El nombre es requerido"
                className={"fondoBlue"}
                letterColor={"var(--color-white)"}
              />
            </div>
            <div className="registrobox-formulario-input">
              <Input
                onChange={onChangeRegistro}
                headerStr={"Apellido"}
                name="apellido"
                isRequired={true}
                checkError={listErrorState.listError.apellido}
                errorStr="El apellido es requerido"
                className={"fondoBlue"}
                letterColor={"var(--color-white)"}
              />
            </div>
          </div>
          <div className="registrobox-formulario-nombreApellido">
            <div className="registrobox-formulario-input">
              <Input
                onChange={onChangeRegistro}
                headerStr={"DNI"}
                name="dni"
                isRequired={true}
                checkError={listErrorState.listError.dni}
                errorStr="El dni es requerido"
                className={"fondoBlue"}
                letterColor={"var(--color-white)"}
              />
            </div>
            <div className="registrobox-formulario-input">
              {soyMedico && (
                <Input
                  onChange={onChangeRegistro}
                  headerStr={"Matricula"}
                  name="matricula"
                  isRequired={true}
                  checkError={listErrorState.listError.matricula}
                  errorStr="La matricula es requerida"
                  className={"fondoBlue"}
                  letterColor={"var(--color-white)"}
                />
              )}
            </div>
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
            customCss={"fondoBlue"}
          />
          <Input
            onChange={onChangeRegistro}
            headerStr={"Email"}
            name="mail"
            isRequired={true}
            checkError={listErrorState.listError.email}
            errorStr="El email es requerido"
            className={"fondoBlue"}
            letterColor={"var(--color-white)"}
          />
          <Input
            onChange={onChangeRegistro}
            headerStr={"Contraseña"}
            name="contrasena"
            inputType="password"
            isRequired={true}
            checkError={listErrorState.listError.contrasena}
            errorStr="La contraseña es requerida"
            className={"fondoBlue"}
            letterColor={"var(--color-white)"}
          />
          <div className="registrobox-botones-container">
            <Button
              onClick={volverAlLogin}
              descripcion={"Volver"}
              className="loginbox-registrarseBtn bgc-white c-black bw18m"
            />
            <Button
              descripcion={"Registrarse"}
              onClick={registrarse}
              className={`loginbox-registrarseBtn bw18m ${
                !btnDisabled && "bgc-broccoli"
              }`}
            />
            {/* <Button
              descripcion={"Registrarse"}
              onClick={btnDisabled ? dsb : registrarse}
              className={`loginbox-registrarseBtn bw18m ${
                !btnDisabled && "bgc-broccoli"
              }`}
            /> */}
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
