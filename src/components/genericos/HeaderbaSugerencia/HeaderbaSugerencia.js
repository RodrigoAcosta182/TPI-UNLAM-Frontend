import React from "react";
import "./HeaderbaSugerencia.css";
import LogoEmpresa from "../../../assets/images/empresa/LogoGrandinLandingPage.png";

const HeaderbaSugerencia = () => {
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
      </div>
    </React.Fragment>
  );
};

export default HeaderbaSugerencia;
