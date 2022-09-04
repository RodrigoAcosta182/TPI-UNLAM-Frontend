import React, { useContext, useState } from "react";
import "./HeaderbarHome.css";
import defaultPerfil from "../../../assets/images/defaultUserImage.png";

import camelize from "../../../global/utils/camelize";
import HeaderTimer from "./HeaderTimer/HeaderTimer";
import MiniAvatar from "../../../assets/images/MiniAvatar";
import FlechaDropdown from "../../../assets/images/FlechaDropdown";
import SalirIconDrop from "../../../assets/images/SalirIconDrop";
import LogoEmpresa from "../../../assets/images/empresa/Logo.png"
import { getStrDate } from "../../../global/utils/diasData";
import { GlobalContext } from "../../../context/Provider";

const HeaderbarHome = ({ onShowBurguerHandle }) => {
  const { authState, authDispatch } = useContext(GlobalContext);

  const [showDropPerfil, setShowDropPerfil] = useState(false);
  // const imgAvatar = authState.auth.data.paciente.imagenPerfil;

  const nameCamelized = () => {
    // let name = authState.auth.data.paciente.nombre;
    return camelize("Terry Silver");
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
  const onHandleSalir = () => {};

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
          <img
            className="ptur-logoHeader"
            src={LogoEmpresa}
            alt="logo"
          ></img>
        </div>

        <div className="ptur-RightMenu">
          <div className="ptur-headerBarHome-txtDiaHora">
            <p id="ptur-DiaResponsive" className="rb18m">
              {getStrDate(new Date())}
              <span className="ptur-timer">
                <HeaderTimer />
              </span>
            </p>
          </div>
          <div className="ptur-perfilMenu">
            <p className="rb18b">{nameCamelized()}</p>
            <div
              onClick={onHandleClickAvatar}
              className="ptur-flechaAvatar-box"
            >
              <div className="ptur-perfilMenu-perfilImg-box">
                <img
                  className={
                    showDropPerfil
                      ? `ptur-perfilMenu-perfilImg-img clickedAvatar`
                      : `ptur-perfilMenu-perfilImg-img`
                  }
                  // src={
                  //   imgAvatar
                  //     ? `data:image/jpeg;base64,${imgAvatar}`
                  //     : defaultPerfil
                  // }
                  src={defaultPerfil}
                  alt="Perfil"
                />
              </div>
              {showDropPerfil ? (
                <div style={{ position: "relative" }}>
                  <div className="ptur-flechaAvatar img-rotatedX180">
                    <FlechaDropdown color={"var(--color-primary)"} />
                  </div>
                  <div className="ptur-dropDownAvatar-box dropdownSidebar">
                    <div className="ptur-dropDownAvatar">
                      <ul className="ptur-dropDownAvatar-list pointer rb18m">
                        <li
                          onClick={onHandleVerPerfil}
                          className="ptur-dropDownAvatar-listItem"
                        >
                          <MiniAvatar className={"ptur-dropDownAvatar-icons"} />
                          <span>Ver mi perfil</span>
                        </li>
                        <li
                          onClick={onHandleSalir}
                          className="ptur-dropDownAvatar-listItem"
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
                <div className="ptur-flechaAvatar pointer">
                  <FlechaDropdown color={"var(--color-white)"} />
                </div>
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
