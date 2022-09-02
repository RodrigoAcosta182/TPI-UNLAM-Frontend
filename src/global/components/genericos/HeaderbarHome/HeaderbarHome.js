import HeaderTimer from "../HeaderTimer/HeaderTimer";
import camelize from "../../../../global/utils/camelize";
import defaultPerfil from "../../../assets/generico/defaultUserImage.png";
import { getStrDate } from "../../../../global/utils/diasData";
import { useHistory } from "react-router";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../../global/context/Provider";
import SalirIconDrop from "../../../assets/generico/SalirIconDrop";
import LogoEmpresa from "../../../assets/generico/IsoLogo.png";
import { Link } from "react-router-dom";
import FlechaDropdown from "../../../assets/generico/FlechaDropdown";
import MiniAvatar from "../../../assets/generico/MiniAvatar";
import "./HeaderbarHome.css";


const HeaderbarHome = ({ onShowBurguerHandle }) => {
  const history = useHistory();

  // Cambio de contexto
  const { authState, authDispatch } = useContext(GlobalContext);

  // useEffect prueba SEBA
  // useEffect(()=> {
  //   if(authState.auth.data !== null){
  //     authState.auth.data = JSON.parse(sessionStorage.getItem('auth'));
  //   }
  // }, [])

  const [showDropPerfil, setShowDropPerfil] = useState(false);
  const imgAvatar = "";

  const nameCamelized = () => {
    let name = "John Doe";
    return camelize(name);
  };

  const onHandleClickAvatar = () => {
    if (!showDropPerfil) {
      setShowDropPerfil(true);
    } else {
      setShowDropPerfil(false);
    }
  };

  const onHandleVerPerfil = () => {
    history.push("/perfil");
  };
  const onHandleSalir = () => {
  
  };

  return (
    <React.Fragment>
      <div
        className={`ptur-HeaderbarDiv-background ${
          !showDropPerfil ? "disable" : ""
        }`}
        onClick={onHandleClickAvatar}
      ></div>
      <div className="ptur-HeaderbarDiv c-white">
        <Link to="/inicio">
          <div className="logoHeader">
            <img
              className="ptur-logoHeader"
              src={LogoEmpresa}
              alt="logo"
              ></img>
          </div>
        </Link>
        <div className="ptur-RightMenu">
          <div className="ptur-headerBarHome-txtDiaHora">
            <p id="ptur-DiaResponsive" className="bw18m">
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
              <div className="ptur-perfilMenu-perfilImg-box">
                <img
                  className={
                    showDropPerfil
                      ? `ptur-perfilMenu-perfilImg-img clickedAvatar`
                      : `ptur-perfilMenu-perfilImg-img`
                  }
                  src={
                    imgAvatar
                      ? `data:image/jpeg;base64,${imgAvatar}`
                      : defaultPerfil
                  }
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
                      <ul className="ptur-dropDownAvatar-list pointer bw18m">
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeaderbarHome;
