import * as React from "react";
import "./Perfil.css";
import SalirIcon from "../../assets/images/SalirIcon";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import Input from "../../components/genericos/Input/Input";
import { GlobalContext } from "../../context/Provider";
import CheckIcon from "../../assets/images/CheckIcon";
import DatePicker from "../../components/genericos/DatePicker/DatePicker";
import EditarIcon from "../../assets/images/EditarIcon";

const Perfil = () => {
  const { authDispatch, authState, listErrorState, listErrorDispatch } =
    React.useContext(GlobalContext);

  const history = useHistory();
  const hoy = new Date();

  useEffect(() => {}, []);

  const volverAlHome = () => {
    history.push("/home");
  };

  const onChangeLogin = (e) => {
    console.log(e);
  };

  const onChangeFecha = (e) => {
    console.log(e);
  };

  const confirmar = (e) => {
    console.log(e);
  };

  return (
    <>
      <HeaderbarHome></HeaderbarHome>
      <div className="perfil-volverAccion" onClick={volverAlHome}>
        <div className="perfil-btnCont">
          <SalirIcon />
          <p className="perfil-volverBtn c-white bw16b">VOLVER</p>
        </div>
      </div>
      <>
        <p className="perfil-titulo c-white bw32b">Mis Datos</p>
        <div className="perfil-container">
          {/* <button className="perfil-editarBtn bw18b c-grandin30">
            <EditarIcon /> Editar
          </button> */}
          <div className="perfilBoxContainer">
            <div className="perfilBox1">
              <Input
                onChange={onChangeLogin}
                headerStr={"Nombre"}
                name="nombre"
                value={authState.auth.data.usuario.nombre}
                checkError={listErrorState.listError.contrasena}
                isRequired={true}
                errorStr="El nombre es requerido"
                className={"fondoBlue-login"}
                letterColor={"var(--color-white)"}
              />
              <Input
                onChange={onChangeLogin}
                headerStr={"DNI"}
                name="dni"
                value={authState.auth.data.usuario.dni}
                checkError={listErrorState.listError.contrasena}
                isRequired={true}
                errorStr="El DNI es requerido"
                className={"fondoBlue-login"}
                letterColor={"var(--color-white)"}
              />
              <DatePicker
                headerStr="Fecha de nacimiento"
                fechaInicial={authState.auth.data.usuario.fechaNacimiento}
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
                onChange={onChangeLogin}
                headerStr={"Email"}
                name="email"
                value={authState.auth.data.usuario.mail}
                checkError={listErrorState.listError.contrasena}
                isRequired={true}
                errorStr="El email es requerido"
                className={"fondoBlue-login"}
                letterColor={"var(--color-white)"}
              />
            </div>

            <div className="perfilBox2">
              <Input
                onChange={onChangeLogin}
                headerStr={"Apellido"}
                name="apellido"
                value={authState.auth.data.usuario.apellido}
                checkError={listErrorState.listError.contrasena}
                isRequired={true}
                errorStr="El apellido es requerido"
                className={"fondoBlue-login"}
                letterColor={"var(--color-white)"}
              />
              {authState.auth.data.usuario.tipoUsuarioId === 2 && (
                <Input
                  onChange={onChangeLogin}
                  headerStr={"Matrícula"}
                  name="matricula"
                  value={authState.auth.data.usuario.matricula}
                  checkError={listErrorState.listError.contrasena}
                  isRequired={true}
                  errorStr="La matrícula es requerida"
                  className={"fondoBlue-login"}
                  letterColor={"var(--color-white)"}
                />
              )}
              <Input
                onChange={onChangeLogin}
                headerStr={"Contraseña"}
                name="contrasenia"
                inputType="password"
                checkError={listErrorState.listError.contrasena}
                isRequired={true}
                errorStr="La fecha es requerida"
                className={"fondoBlue-login"}
                letterColor={"var(--color-white)"}
              />
              <Input
                  onChange={onChangeLogin}
                  headerStr={"Nombre tutor"}
                  name="nombreTutor"
                  value={authState.auth.data.usuario.nombreTutor}
                  checkError={listErrorState.listError.contrasena}
                  isRequired={true}
                  errorStr="El nombre del tutor es requerida"
                  className={"fondoBlue-login"}
                  letterColor={"var(--color-white)"}
                />
              <Input
                  onChange={onChangeLogin}
                  headerStr={"Teléfono"}
                  name="telefono"
                  value={authState.auth.data.usuario.telefono}
                  checkError={listErrorState.listError.contrasena}
                  isRequired={true}
                  errorStr="El teléfono es requerido"
                  className={"fondoBlue-login"}
                  letterColor={"var(--color-white)"}
                />


              <button className="perfil-confirmarBtn bw18b c-white">
                <CheckIcon /> Confirmar
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Perfil;
