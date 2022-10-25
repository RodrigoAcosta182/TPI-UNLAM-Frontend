import React, { useState } from "react";
import "./HeaderbarLanding.css";
import LogoEmpresa from "../../../assets/images/empresa/LogoGrandinLandingPage.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const HeaderbarLanding = () => {
  const history = useHistory();
  const [showDropPerfil, setShowDropPerfil] = useState(false);

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

  const onHandleSalir = () => {
    history.push("/");
  };

  return (
    <React.Fragment>
      <div className={"landing-grandin-HeaderbarDiv c-white"}>
        <div className="logoHeader">
          <img className="landing-grandin-logoHeader" src={LogoEmpresa} alt="logo"></img>
        </div>
        <div className="landing-grandin-opciones-container" >
          <span className="c-black bw18b">Información general</span>
          <span className="c-black bw18b">Profesionales</span>
          <span className="c-black bw18b">Versiones</span>
          <span className="c-black bw18b">Contacto</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeaderbarLanding;
