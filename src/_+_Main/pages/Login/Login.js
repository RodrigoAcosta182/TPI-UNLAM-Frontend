import {
  BtnPrimary,
  ContainerLogin,
  ContainerLogo,
  ContainerBase,
  ContainerSignIn,
  DivideLineSection,
  InputsContainer,
  BtnContainer,
  ShowPassword,
} from "./localStyle";
import { useContext, useEffect, useState } from "react";
import { login, logoutAuth } from "../../../global/context/action/auth/auth";
import { GlobalContext } from "../../../global/context/Provider";
import { regexUserLogin } from "../../../global/utils/expresionesRegulares";
import { useHistory } from "react-router";
import { showToaster } from "../../../global/context/action/toaster/toaster";
import { IonSpinner } from "@ionic/react";
import LogoEmpresa from "../../../global/assets/generico/IsoLogo.png";
import InputV1 from "../../../global/components/genericos/InputV1/InputV1";
import MantenimientoCard from "../../../global/components/genericos/MantenimientoCard/MantenimientoCard";
import HidePassIcon from "../../../global/assets/generico/HidePassIcon";
import ShowPassIcon from "../../../global/assets/generico/ShowPassIcon";
import Modal from "../../../global/components/genericos/Modal/Modal";
import LoginIcon from "../../../global/assets/generico/LoginIcon";
import {
  hideModal,
  showModal,
} from "../../../global/context/action/modal/modal";
import Mensaje from "../../../global/components/genericos/Mensaje/Mensaje";

const Login = () => {
  const {
    authDispatch,
    authState,
    toasterDispatch,
    modalDispatch,
    modalState,
  } = useContext(GlobalContext);
  const history = useHistory();
  let config = localStorage.getItem("config");
  let versionApk = JSON.parse(config).version;
  let mantenimiento = JSON.parse(config).mantenimiento;

  const [passwordShown, setPasswordShown] = useState(false);
  const [userForm, setUserForm] = useState(true);
  const [passForm, setPassForm] = useState(true);
  const [userErrForm, setUserErrForm] = useState(false);
  const [passErrForm, setPassErrForm] = useState(false);
  const [formLogin, setFormLogin] = useState({
    txtUsuario: "",
    txtPassword: "",
  });

  const onChangeUsuario = (e) => {
    if (e.target.value === "") {
      setUserErrForm(false);
      setUserForm(true);
    } else {
      if (regexUserLogin.test(e.target.value)) {
        setFormLogin({
          ...formLogin,
          txtUsuario: e.target.value.toUpperCase(),
        });
        if (e.target.value.length >= 3 && e.target.value.length <= 10) {
          setUserForm(false);
          setUserErrForm(false);
        } else {
          setUserForm(true);
          setUserErrForm(true);
        }
      } else {
        //me aseguro que no se llene nada que no valide la exp regular.
        setUserForm(true);
        setUserErrForm(true);
      }
    }
  };

  const onChangePass = (e) => {
    if (e.target.value === "") {
      setPassErrForm(false);
      setPassForm(true);
    } else {
      if (regexUserLogin.test(e.target.value)) {
        setFormLogin({
          ...formLogin,
          txtPassword: e.target.value.toUpperCase(),
        });
        if (e.target.value.length >= 3 && e.target.value.length <= 10) {
          setPassForm(false);
          setPassErrForm(false);
        } else {
          setPassForm(true);
          setPassErrForm(true);
        }
      } else {
        //me aseguro que no se llene nada que no valide la exp regular.
        setPassForm(true);
        setPassErrForm(true);
      }
    }
  };

  const onKeyPress = (e) => {
    if (!regexUserLogin.test(e.key)) {
      e.preventDefault();
    }
    if (e.target.name === "txtPassword") {
      if (e.key === "Enter") {
        userLogin();
      }
    } else if (e.key === "Enter") {
      document.getElementsByName("txtPassword")[0].focus();
    }
  };

  const showPassword = () => {
    setPasswordShown(true);
  };
  const hidePassword = () => {
    setPasswordShown(false);
  };

  const userLogin = () => {
    if (
      regexUserLogin.test(formLogin.txtUsuario) &&
      regexUserLogin.test(formLogin.txtPassword)
    ) {
      login(formLogin)(authDispatch);
    } else {
      showToaster(
        {
          texto: "Los campos son inválidos",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  const closeModal = () => {
    hideModal()(modalDispatch);
  };

  useEffect(() => {
    if (authState.auth.data && authState.auth.data.success > 0) {
      history.push("/inicio");
    } else if (authState.auth.data && authState.auth.data.success === 0) {
      showModal(
        <Mensaje
          textoNegrita={"Verificá tu clave o usuario e intentá nuevamente"}
          texto={authState.auth.error.detail}
        ></Mensaje>,
        "Clave o usuario incorrecto",
        closeModal,
        true,
        [
          {
            text: "Volver",
            clase: "btn b-latex30 rb16m c-latex30",
            accion: closeModal,
          },
        ],
        "centro",
        false
      )(modalDispatch);
      logoutAuth()(authDispatch);
    } else if (authState.auth.error) {
      showModal(
        <Mensaje
          textoNegrita={"Verificá tu clave o usuario e intentá nuevamente"}
          texto={authState.auth.error.detail}
        ></Mensaje>,
        "Clave o usuario incorrecto",
        closeModal,
        true,
        [
          {
            text: "Volver",
            clase: "btn b-latex30 rb16m c-latex30",
            accion: closeModal,
          },
        ],
        "centro",
        false
      )(modalDispatch);
      logoutAuth()(authDispatch);
    }
  }, [authState.auth]);

  return (
    <>
      {modalState.modal.show && <Modal></Modal>}
      <ContainerBase>
        <ContainerLogin>
          <ContainerLogo>
            <div>
              <img
                className="ag-login-logotype"
                src={LogoEmpresa}
                alt="logo"
              ></img>
            </div>
          </ContainerLogo>
          {mantenimiento ? (
            <MantenimientoCard />
          ) : (
            <ContainerSignIn>
              <div className="rb24b">
                <p>Hola! Bienvenido :)</p>
                <span className="rb16m">Ingresá tus datos</span>
              </div>
              <DivideLineSection></DivideLineSection>
              <InputsContainer>
                <InputV1
                  inputType="text"
                  name="txtUsuario"
                  headerStr="Usuario"
                  placeholderText={"GSPI"}
                  errorStr="El usuario es inválido"
                  onChange={onChangeUsuario}
                  onKeyPress={onKeyPress}
                  maxLength="10"
                  className="rb16m"
                  checkError={userErrForm}
                  isRequired={true}
                  tabIndex="2"
                />
                <InputV1
                  headerStr="Contraseña"
                  inputType="text"
                  name="txtPassword"
                  placeholderText={"*****"}
                  errorStr="La contraseña es inválida."
                  checkError={passErrForm}
                  onChange={onChangePass}
                  onKeyPress={onKeyPress}
                  className={
                    passwordShown
                      ? "inputNumericShow inputNonScroll rb16m"
                      : "inputNumeric inputNonScroll rb16m"
                  }
                  maxLength="10"
                  isRequired={true}
                />
              </InputsContainer>
              <ShowPassword>
                {passwordShown === false ? (
                  <>
                    <button
                      className="ptur-loginBox-show-hideBtn"
                      onClick={() => showPassword()}
                    >
                      <HidePassIcon color="var(--color-latex30)" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="ptur-loginBox-show-hideBtn"
                      onClick={() => hidePassword()}
                    >
                      <ShowPassIcon color="var(--color-latex30)" />
                    </button>
                  </>
                )}
              </ShowPassword>
              <BtnContainer>
                <BtnPrimary
                  disabled={userForm || passForm || authState.auth.loading}
                  className={
                    userForm || passForm ? "bgc-grey65" : "pointer bgc-primary"
                  }
                  onClick={userLogin}
                >
                  <LoginIcon />
                  <span className="ag-login-spanBtnPrimary rb18m">
                    {authState.auth.loading ? "Ingresando" : "Ingresar"}
                  </span>
                  {authState.auth.loading ? (
                    <span className="ag-login-spinner">
                      <IonSpinner name="lines" />
                    </span>
                  ) : (
                    ""
                  )}
                </BtnPrimary>
                <div>{versionApk}</div>
              </BtnContainer>
            </ContainerSignIn>
          )}

        </ContainerLogin>
      </ContainerBase>
    </>
  );
};

export default Login;
