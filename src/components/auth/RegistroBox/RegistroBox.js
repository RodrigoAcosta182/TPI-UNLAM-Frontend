import Button from "../../genericos/Button/Button";
import Input from "../../genericos/Input/Input";
import "./RegistroBox.css";
import ImagenFormulario from "../../../assets/images/empresa/ImagenFormulario.png";
import { useContext, useEffect, useState } from "react";

import DatePicker from "../../genericos/DatePicker/DatePicker";
import {
  resetMatricula,
  resetRegistro,
  setRegistro,
  wsPostRegistro,
} from "../../../context/action/auth/registro";
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
import { useHistory } from "react-router-dom";
import Dropdown from "../../genericos/Dropdown/Dropdown";
import {
  profesionalesReset,
  wsGetProfesionalesActivos,
} from "../../../context/action/profesionales/profesionales";

const RegistroBox = ({ dsb }) => {
  const history = useHistory();
  const hoy = new Date();

  const {
    registroState,
    registroDispatch,
    listErrorState,
    listErrorDispatch,
    profesionalesState,
    profesionalesDispatch,
  } = useContext(GlobalContext);

  const [soyMedico, setSoyMedico] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const [valida, setValida] = useState(false);

  const [registroDto, setRegistroDto] = useState({
    matricula: null,
    tipoUsuarioId: 1,
    fechaNacimiento: null,
    nombre: "",
    apellido: "",
    dni: "",
    mail: "",
    contrasena: "",
    usuarioProfesionalId: null,
  });

  //Puse este useEffect porque al ir atras en el navegador y luego voler quedaba el boton activado
  useEffect(() => {
    resetRegistro()(registroDispatch);
    resetListError()(listErrorDispatch);
    wsGetProfesionalesActivos()(profesionalesDispatch);
  }, []);

  useEffect(() => {
    if (
      registroState.registro.registroCampos.nombre === "" ||
      registroState.registro.registroCampos.apellido === "" ||
      registroState.registro.registroCampos.dni === "" ||
      registroState.registro.registroCampos.mail === "" ||
      listErrorState.listError.email === true ||
      registroState.registro.registroCampos.contrasena === ""
    ) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
    if (soyMedico === true && registroDto.matricula === "") {
      setBtnDisabled(true);
    }
  }, [
    registroState.registro.registroCampos,
    listErrorState.listError.email,
    valida,
    soyMedico,
    registroDto,
  ]);

  // useEffect(() => {
  //   console.log(soyMedico);
  //   console.log(registroDto.matricula);

  //   if (soyMedico) {
  //     if (registroState.registro.registroCampos.matricula === "") {
  //       setBtnDisabled(true);
  //     } else {
  //       setBtnDisabled(false);
  //     }
  //   }
  // }, [registroState.registro.registroCampos, soyMedico]);

  const onChangeRegistro = (e) => {
    //PROBANDO DESHABILITAR BOTON HASTA QUE TODOS LOS CAMPOS ESTEN LLENOS

    //switch control de errores en login
    switch (e.target.name) {
      case "mail":
        let targetMail = Object.assign(
          {},
          registroState.registro.registroCampos
        );
        targetMail.mail = e.target.value;
        setRegistro(targetMail)(registroDispatch);
        listErrorState.listError.email = isErrorEmail(e.target.value);
        setListError(listErrorState.listError)(listErrorDispatch);
        break;
      case "nombre":
        let targetNombre = Object.assign(
          {},
          registroState.registro.registroCampos
        );
        targetNombre.nombre = e.target.value;
        setRegistro(targetNombre)(registroDispatch);
        listErrorState.listError.nombre = isNombreApellidoError(e.target.value);
        setListError(listErrorState.listError)(listErrorDispatch);
        break;
      case "apellido":
        let targetApellido = Object.assign(
          {},
          registroState.registro.registroCampos
        );
        targetApellido.apellido = e.target.value;
        setRegistro(targetApellido)(registroDispatch);
        listErrorState.listError.apellido = isNombreApellidoError(
          e.target.value
        );
        setListError(listErrorState.listError)(listErrorDispatch);
        break;
      case "dni":
        let targetDni = Object.assign(
          {},
          registroState.registro.registroCampos
        );
        targetDni.dni = e.target.value;
        setRegistro(targetDni)(registroDispatch);
        listErrorState.listError.dni = isEmptyError(e.target.value);
        setListError(listErrorState.listError)(listErrorDispatch);
        break;
      case "matricula":
        let targetMatricula = Object.assign(
          {},
          registroState.registro.registroCampos
        );
        targetMatricula.matricula = e.target.value;
        setRegistro(targetMatricula)(registroDispatch);
        listErrorState.listError.matricula = isEmptyError(e.target.value);
        setListError(listErrorState.listError)(listErrorDispatch);
        break;
      default:
        let targetPass = Object.assign(
          {},
          registroState.registro.registroCampos
        );
        targetPass.contrasena = e.target.value;
        setRegistro(targetPass)(registroDispatch);
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
      resetListError()(listErrorDispatch);
      setRegistroDto({
        ...registroDto,
        matricula: "",
      });
    }
  };

  const onChangeFecha = (e) => {
    setRegistroDto({ ...registroDto, fechaNacimiento: e });
  };

  const registrarse = () => {
    wsPostRegistro(registroDto)(registroDispatch);
    if (registroDto !== undefined && registroDto !== null) {
      if (btnDisabled === false) {
      }
    }
  };

  useEffect(() => {
    if (registroState.registro.data || registroState.registro.data === "") {
      history.push("/");
      profesionalesReset()(profesionalesDispatch);
    }
  }, [registroState.registro.data]);

  const funcVoid = () => {};

  const volverAlLogin = () => {
    resetListError()(listErrorDispatch);
    resetRegistro()(registroDispatch);
    history.push("/");
  };

  const seleccionarProfesional = (profesional) => {
    //revisar que el campo sea requerido
    if (profesional) {
      setRegistroDto({ ...registroDto, usuarioProfesionalId: profesional.id });
    }
  };

  return (
    <div className="registrobox-container">
      <div className="registrobox-formulario">
        <div className="registrobox-formulario-header">
          <img className="registrobox-logo" src={LogoEmpresa} alt="logo"></img>
          <span className="registrobox-title c-white bw32b ">Registrarse</span>
        </div>
        <div className="registrobox-formulario-soyProfesional">
          <Input
            inputType="check"
            onChange={onChangeMedico}
            name="profesional"
            checkboxStr={"Soy Profesional"}
          />
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
              {soyMedico ? (
                <Input
                  onChange={onChangeRegistro}
                  headerStr={"Matrícula"}
                  name="matricula"
                  isRequired={true}
                  checkError={listErrorState.listError.matricula}
                  errorStr="La matricula es requerida"
                  className={"fondoBlue"}
                  letterColor={"var(--color-white)"}
                />
              ) : (
                <Dropdown
                  valor={""}
                  name="usuarioProfesionalId"
                  onChange={seleccionarProfesional}
                  headerStr={"Buscá tu profesional"}
                  datos={profesionalesState.profesionales.data}
                  campoCodigo="id"
                  descripcion="mail"
                  // errorStr="El parentesco es requerido"
                  customCssInput={"fondoBlue c-white"}
                />
              )}
            </div>
          </div>

          <div className="registrobox-formulario-nombreApellido">
            <div className="registrobox-formulario-input">
              <DatePicker
                headerStr="Fecha de nacimiento"
                fechaInicial={"2000 01 01"}
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
            </div>
            <div className="registrobox-formulario-input">
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
            </div>
          </div>
            <div className="registrobox-formulario-input">
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
            </div>

          <div className="registrobox-botones-container">
            <Button
              onClick={volverAlLogin}
              descripcion={"Volver"}
              className="loginbox-registrarseBtn bgc-white c-black bw18m"
            />
            <Button
              descripcion={"Registrarse"}
              onClick={btnDisabled ? funcVoid : registrarse}
              className={`loginbox-registrarseBtn bw18m ${
                !btnDisabled ? "bgc-primary" : "bgc-grey45 dsbCursor"
              }`}
            />
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
