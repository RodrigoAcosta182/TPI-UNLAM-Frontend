import React from "react";
import "./HeaderbarLanding.css";
import LogoEmpresa from "../../../assets/images/empresa/LogoGrandinLandingPage.png";

const HeaderbarLanding = ({
  handleClickInfo,
  handleClickProfesionales,
  handleClickVersiones,
  handleClickContacto,
}) => {
  return (
    <React.Fragment>
      <div className={"landing-grandin-HeaderbarDiv c-white"}>
        <div className="logoHeader">
          <img
            className="landing-grandin-logoHeader"
            src={LogoEmpresa}
            alt="logo"
          ></img>
        </div>
        <div className="landing-grandin-opciones-container">
          <span
            className="landing-header-option c-black bw18b"
            onClick={handleClickInfo}
          >
            Información general
          </span>
          {/* <span
            className="landing-header-option c-black bw18b"
            onClick={handleClickProfesionales}
          >
            Profesionales
          </span> */}
          <span
            className="landing-header-option c-black bw18b"
            onClick={handleClickVersiones}
          >
            Versiones
          </span>
          <span
            className="landing-header-option c-black bw18b"
            onClick={handleClickContacto}
          >
            Contacto
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeaderbarLanding;
