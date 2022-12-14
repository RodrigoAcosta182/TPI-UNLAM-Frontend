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
import { wsGetGeneros } from "../../../context/action/generos/generos";
import { hideModal, showModal } from "../../../context/action/modal/modal";
import ModalRegistro from "./ModalRegistro/ModalRegistro";

const RegistroBox = ({ dsb }) => {
  const history = useHistory();
  const hoy = new Date();
  const [flgRegistro, setFlgRegistro] = useState(false);

  const {
    modalDispatch,
    registroState,
    registroDispatch,
    listErrorState,
    listErrorDispatch,
    profesionalesState,
    profesionalesDispatch,
    generosDispatch,
    generosState,
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
    NombreTutor: "H",
    dni: "",
    mail: "",
    GeneroId: null,
    direccion: "",
    telefono: "8",
    contrasena: "",
    usuarioProfesionalId: 0,
  });

  //Puse este useEffect porque al ir atras en el navegador y luego voler quedaba el boton activado
  useEffect(() => {
    // resetRegistro()(registroDispatch);
    // resetListError()(listErrorDispatch);
    wsGetProfesionalesActivos()(profesionalesDispatch);
    wsGetGeneros()(generosDispatch);
  }, []);

  useEffect(() => {
    if (
      registroState.registro.registroCampos.nombre === "" ||
      registroState.registro.registroCampos.apellido === "" ||
      registroState.registro.registroCampos.nombreTutor === "" ||
      registroState.registro.registroCampos.direccion === "" ||
      registroState.registro.registroCampos.telefono === "" ||
      registroState.registro.registroCampos.dni === "" ||
      registroState.registro.registroCampos.mail === "" ||
      listErrorState.listError.email === true ||
      registroState.registro.registroCampos.contrasena === "" ||
      registroState.registro.registroCampos.contrasenaRep === "" ||
      (registroState.registro.registroCampos.contrasena !==
        registroState.registro.registroCampos.contrasenaRep)
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
      case "NombreTutor":
        let targetTutor = Object.assign(
          {},
          registroState.registro.registroCampos
        );
        targetTutor.nombreTutor = e.target.value;
        setRegistro(targetTutor)(registroDispatch);
        listErrorState.listError.nombreTutor = isNombreApellidoError(
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
      case "direccion":
        let targetDireccion = Object.assign(
          {},
          registroState.registro.registroCampos
        );
        targetDireccion.direccion = e.target.value;
        setRegistro(targetDireccion)(registroDispatch);
        listErrorState.listError.direccion = isEmptyError(e.target.value);
        setListError(listErrorState.listError)(listErrorDispatch);
        break;
      case "telefono":
        let targetTelefono = Object.assign(
          {},
          registroState.registro.registroCampos
        );
        targetTelefono.telefono = e.target.value;
        setRegistro(targetTelefono)(registroDispatch);
        listErrorState.listError.telefono = isEmptyError(e.target.value);
        setListError(listErrorState.listError)(listErrorDispatch);
        break;
      case "contrasenaRep":
        let contrasenaRep = Object.assign(
          {},
          registroState.registro.registroCampos
        );
        contrasenaRep.contrasenaRep = e.target.value;
        setRegistro(contrasenaRep)(registroDispatch);
        listErrorState.listError.contrasenaRep = isEmptyError(e.target.value);
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
    // console.log(registroDto);
    if (registroDto !== undefined && registroDto !== null) {
      if (btnDisabled === false) {
      }
    }
  };

  useEffect(() => {
    if (registroState.registro.data !== null) {
      if (
        registroState.registro.data !== null &&
        registroState.registro.error === false
      ) {
        history.push("/");
        profesionalesReset()(profesionalesDispatch);
      }
    }
  }, [registroState.registro.data, registroState.registro.error]);

  useEffect(() => {
    if (registroState.registro.error !== false) {
      showModal(
        <ModalRegistro
          error={registroState.registro.error.detail}
          cerrar={() => cerrarModal()}
        />,
        "",
        cerrarModal,
        true,
        {},
        "centro",
        true
      )(modalDispatch);
    }
  }, [registroState.registro.data, registroState.registro.error]);

  const cerrarModal = () => {
    hideModal()(modalDispatch);
  };

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

  const seleccionarGenero = (genero) => {
    //revisar que el campo sea requerido
    if (genero) {
      setRegistroDto({ ...registroDto, GeneroId: genero.id });
    }
  };

  return (
    <div
      className={
        !soyMedico ? "registrobox-container" : "registroboxProf-container"
      }
    >
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
              <Dropdown
                valor={""}
                name="GeneroId"
                onChange={seleccionarGenero}
                headerStr={"G??nero"}
                datos={generosState.generos.data}
                campoCodigo="id"
                descripcion="descripcion"
                errorStr="El g??nero es requerido"
                customCssInput={"fondoBlue c-white"}
              />
            </div>
          </div>

          <div className="registrobox-formulario-nombreApellido">
            <div className="registrobox-formulario-input">
              <Input
                onChange={onChangeRegistro}
                headerStr={"Direcci??n"}
                name="direccion"
                isRequired={true}
                checkError={listErrorState.listError.direccion}
                errorStr="La direccion es requerida"
                className={"fondoBlue"}
                letterColor={"var(--color-white)"}
              />
            </div>
            <div className="registrobox-formulario-input">
              {soyMedico ? (
                <Input
                  onChange={onChangeRegistro}
                  headerStr={"Matr??cula"}
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
                  headerStr={"Busc?? tu profesional"}
                  datos={profesionalesState.profesionales.data}
                  campoCodigo="id"
                  descripcion="mail"
                  errorStr="Debe seleccionar un profesional"
                  customCssInput={"fondoBlue c-white"}
                />
              )}
            </div>
          </div>

          <div className="registrobox-formulario-nombreApellido">
            <div className="registrobox-formulario-input">
              <DatePicker
                headerStr="Fecha de nacimiento"
                fechaInicial={"1990 01 01"}
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

          {soyMedico ? (
            ""
          ) : (
            <div className="registrobox-formulario-nombreApellido">
              <div className="registrobox-formulario-input">
                <Input
                  onChange={onChangeRegistro}
                  headerStr={"Nombre tutor"}
                  name="NombreTutor"
                  isRequired={true}
                  checkError={listErrorState.listError.nombreTutor}
                  errorStr="El nombre del tutor es requerido"
                  className={"fondoBlue"}
                  letterColor={"var(--color-white)"}
                />
              </div>
              <div className="registrobox-formulario-input">
                <Input
                  onChange={onChangeRegistro}
                  headerStr={"Tel??fono"}
                  name="telefono"
                  isRequired={true}
                  checkError={listErrorState.listError.telefono}
                  errorStr="El t??lefono es requerido"
                  className={"fondoBlue"}
                  letterColor={"var(--color-white)"}
                />
              </div>
            </div>
          )}

          <div className="registrobox-formulario-nombreApellido">
            <div className="registrobox-formulario-input">
              <Input
                onChange={onChangeRegistro}
                headerStr={"Contrase??a"}
                name="contrasena"
                inputType="password"
                isRequired={true}
                checkError={listErrorState.listError.contrasena}
                errorStr="La contrase??a es requerida"
                className={"fondoBlue"}
                letterColor={"var(--color-white)"}
              />
            </div>
            <div className="registrobox-formulario-input">
              <Input
                onChange={onChangeRegistro}
                headerStr={"Repetir contrase??a"}
                name="contrasenaRep"
                inputType="password"
                isRequired={true}
                checkError={registroState.registro.registroCampos.contrasena !== registroState.registro.registroCampos.contrasenaRep}
                errorStr="Las contrase??as no coinciden"
                className={"fondoBlue"}
                letterColor={"var(--color-white)"}
              />
            </div>
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
