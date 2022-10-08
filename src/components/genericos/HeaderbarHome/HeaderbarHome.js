import React, { useContext, useState } from "react";
import "./HeaderbarHome.css";
import defaultPerfil from "../../../assets/images/defaultUserImage.png";

import camelize from "../../../global/utils/camelize";

import MiniAvatar from "../../../assets/images/MiniAvatar";
import FlechaDropdown from "../../../assets/images/FlechaDropdown";
import SalirIconDrop from "../../../assets/images/SalirIconDrop";
import LogoEmpresa from "../../../assets/images/empresa/Logo.png";
import { getStrDate } from "../../../global/utils/diasData";
import { GlobalContext } from "../../../context/Provider";
import HeaderTimer from "../HeaderTimer/HeaderTimer";
import { logoutAuth } from "../../../context/action/auth/login";
import BurgerBtn from "../../../assets/images/BurgerBtn";

const HeaderbarHome = ({ onShowBurguerHandle }) => {
  const { authState, authDispatch } = useContext(GlobalContext);

  const [showDropPerfil, setShowDropPerfil] = useState(false);
  // const imgAvatar = authState.auth.data.paciente.imagenPerfil;

  const nameCamelized = () => {
   let name = authState.auth.data.usuario.nombre + " " +authState.auth.data.usuario.apellido;
    return camelize(name);
  };

  const onHandleClickAvatar = () => {
    if (!showDropPerfil) {
      setShowDropPerfil(true);
    } else {
      setShowDropPerfil(false);
    }
  };

  const onClickSearchPcr = () => {
    console.log("/laboratorio");
  };

  const onHandleVerPerfil = () => {
    console.log("/perfil");
  };

  const onHandleSalir = () => {
    logoutAuth()(authDispatch);
  };

  return (
    <React.Fragment>
      <div
        className={`ptur-HeaderbarDiv-background ${
          !showDropPerfil ? "disable" : ""
        }`}
        onClick={onHandleClickAvatar}
      ></div>
      <div className={"ptur-HeaderbarDiv c-white"}>
        <div className="logoHeader">
          <img className="ptur-logoHeader" src={LogoEmpresa} alt="logo"></img>
        </div>

        <div className="ptur-RightMenu">
          <div className="ptur-headerBarHome-txtDiaHora">
            <p id="ptur-DiaResponsive" className="bw18l">
              {getStrDate(new Date())}
              <span className="ptur-timer">
                <HeaderTimer />
              </span>
            </p>
          </div>
          <div className="ptur-perfilMenu">
            <p className="bw18b">{nameCamelized()}</p>
            <div
              onClick={onHandleClickAvatar}
              className="ptur-flechaAvatar-box"
            >
              <BurgerBtn
                color={
                  showDropPerfil ? "var(--color-primary)" : "var(--color-white)"
                }
              />

              {showDropPerfil ? (
                <div style={{ position: "relative" }}>
                  {/* <div className="ptur-flechaAvatar img-rotatedX180">
                    <FlechaDropdown color={"var(--color-primary)"} />
                  </div> */}
                  <div className="ptur-dropDownAvatar-box dropdownSidebar">
                    <div className="ptur-dropDownAvatar">
                      <ul className="ptur-dropDownAvatar-list pointer bw18l">
                        <li
                          onClick={onHandleVerPerfil}
                          className="ptur-dropDownAvatar-listItem bw18l"
                        >
                          <MiniAvatar className={"ptur-dropDownAvatar-icons"} />
                          <span>Ver mi perfil</span>
                        </li>
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
