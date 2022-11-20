import React, { useContext, useState } from "react";
import "./HeaderbarHome.css";
import defaultPerfil from "../../../assets/images/defaultUserImage.png";

import camelize from "../../../global/utils/camelize";

import MiniAvatar from "../../../assets/images/MiniAvatar";
import FlechaDropdown from "../../../assets/images/FlechaDropdown";
import SalirIconDrop from "../../../assets/images/SalirIconDrop";
import LogoEmpresa from "../../../assets/images/empresa/LogoHeaderGrandin.png";
import LogoEmpresaProf from "../../../assets/images/empresa/LogoGrandinLandingPage.png";
import { getStrDate } from "../../../global/utils/diasData";
import { GlobalContext } from "../../../context/Provider";
import HeaderTimer from "../HeaderTimer/HeaderTimer";
import { logoutAuth } from "../../../context/action/auth/login";
import BurgerBtn from "../../../assets/images/BurgerBtn";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const HeaderbarHome = ({ onShowBurguerHandle }) => {
  const { authState, authDispatch } = useContext(GlobalContext);
  const history = useHistory();
  const [showDropPerfil, setShowDropPerfil] = useState(false);
  // const imgAvatar = authState.auth.data.paciente.imagenPerfil;

  const nameCamelized = () => {
    let name =
      authState.auth.data.usuario.nombre +
      " " +
      authState.auth.data.usuario.apellido;
    return camelize(name);
  };

  const onHandleClickAvatar = () => {
    if (!showDropPerfil) {
      setShowDropPerfil(true);
    } else {
      setShowDropPerfil(false);
    }
  };

  const onHandleVerResultados = () => {
    history.push("/resultados");
  };

  const onHandleVerPerfil = () => {
    history.push("/perfil");
  };

  const volverAlHome = () => {
    history.push("/home");
  };

  const onHandleSalir = () => {
    history.push("/");
    logoutAuth()(authDispatch);
    sessionStorage.removeItem("token");
  };

  return (
    <React.Fragment>
      <div
        className={`ptur-HeaderbarDiv-background ${
          !showDropPerfil ? "disable" : ""
        }`}
        onClick={onHandleClickAvatar}
      ></div>
      <div
        className={
          authState.auth.data.usuario.tipoUsuarioId === 2
            ? "ptur-HeaderbarDivProf c-black"
            : "ptur-HeaderbarDiv c-white"
        }
      >
        <div className="logoHeader">
          <img
            className="ptur-logoHeader"
            onClick={volverAlHome}
            src={
              authState.auth.data.usuario.tipoUsuarioId === 2
                ? LogoEmpresaProf
                : LogoEmpresa
            }
            alt="logo"
          ></img>
        </div>

        <div className="ptur-RightMenu">
          {/* <div className="ptur-headerBarHome-txtDiaHora">
            <p id="ptur-DiaResponsive" className="bw18l">
              {getStrDate(new Date())}
              <span className="ptur-timer">
                <HeaderTimer />
              </span>
            </p>
          </div> */}
          <div className="ptur-perfilMenu">
            <p className="bw18b">{nameCamelized()}</p>
            <div
              onClick={onHandleClickAvatar}
              className="ptur-flechaAvatar-box"
            >
              <BurgerBtn
                color={
                  showDropPerfil
                    ? "var(--color-primary)"
                    : authState.auth.data.usuario.tipoUsuarioId === 2
                    ? "var(--color-black)"
                    : "var(--color-white)"
                }
              />

              {showDropPerfil ? (
                <div style={{ position: "relative" }}>
                  {/* <div className="ptur-flechaAvatar img-rotatedX180">
                    <FlechaDropdown color={"var(--color-primary)"} />
                  </div> */}
                  <div
                    className={
                      authState.auth.data.usuario.tipoUsuarioId === 1
                        ? "ptur-dropDownAvatarPaciente-box dropdownSidebar"
                        : "ptur-dropDownAvatar-box dropdownSidebar"
                    }
                  >
                    <div className="ptur-dropDownAvatar">
                      <ul className="ptur-dropDownAvatar-list pointer bw18l">
                        <li
                          onClick={onHandleVerPerfil}
                          className="ptur-dropDownAvatar-listItem bw18l"
                        >
                          <MiniAvatar className={"ptur-dropDownAvatar-icons"} />
                          <span>Mi perfil</span>
                        </li>
                        {authState.auth.data.usuario.tipoUsuarioId === 1 && (
                          <li
                            onClick={onHandleVerResultados}
                            className="ptur-dropDownAvatar-listItem bw18l"
                          >
                            <MiniAvatar
                              className={"ptur-dropDownAvatar-icons"}
                            />
                            <span>Mis resultados</span>
                          </li>
                        )}

                        <li
                          onClick={onHandleSalir}
                          className="ptur-dropDownAvatar-listItem bw18l"
                        >
                          <SalirIconDrop
                            className={"ptur-dropDownAvatar-icons"}
                          ></SalirIconDrop>
                          <span>Salir</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            onClick={onShowBurguerHandle}
            className="ptur-burguerPerfil pointer"
          ></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeaderbarHome;
