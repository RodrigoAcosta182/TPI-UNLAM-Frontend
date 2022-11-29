import HeaderbarLanding from "../../components/landing/HeaderbarLanding/HeaderbarLanding";
import laptopGrandin from "../../assets/images/landing/laptopGrandin.png";
import GraficoInforme from "../../assets/images/landing/GraficoInforme.png";
import neneJugando from "../../assets/images/landing/neneJugando.png";
import "./Landing.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import CardVersion from "../../components/landing/CardVersion/CardVersion";
import { useRef } from "react";

const Landing = () => {
  const history = useHistory();
  const itemsAtencionCliente = ["Contactanos", "Ayuda"];
  const itemsInfoLegal = [
    "Política de privacidad",
    "Términos de servicio",
    "Politica de Cookies",
  ];
  const itemsPaciente = ["Juegos base", "Videollamada", "Ver resultados"];
  const itemsProfesional = [
    "Ver resultados",
    "Videollamada",
    "Ver mis pacientes",
    "Agregar notas",
  ];
  const irAGrandin = () => {
    history.push("/");
  };

  const infoRef = useRef();
  const profesionalesRef = useRef();
  const versionesRef = useRef();
  const contactoRef = useRef();

  const handleClickInfo = () => {
    infoRef.current.scrollIntoView();
  };
  const handleClickContacto = () => {
    contactoRef.current.scrollIntoView();
  };
  const handleClickProfesionales = () => {
    profesionalesRef.current.scrollIntoView();
  };
  const handleClickVersiones = () => {
    versionesRef.current.scrollIntoView();
  };

  return (
    <>
      <HeaderbarLanding
        handleClickInfo={handleClickInfo}
        handleClickContacto={handleClickContacto}
        handleClickProfesionales={handleClickProfesionales}
        handleClickVersiones={handleClickVersiones}
      />
      <div className="landing-container">
        <div  className="landing-row-blue">
          <div className="landing-textoGrandin-container c-white">
            <h1>Juegos de estimulación para niños con TEA.</h1>
            <span className="bw18m">
              <span className="bw18b">grandin® </span>
              es una plataforma de juegos que ofrece ayuda tanto a profesionales
              como a los niños que padecen TEA (Trastorno del Espectro Autista).
            </span>
            <div
              onClick={irAGrandin}
              className="btn-landingPage bgc-primary c-white bw18b"
            >
              Ir a Grandin
            </div>
          </div>
          <div className="landing-imagen-laptop-container">
            <img
              className="landing-imagen-laptop"
              src={laptopGrandin}
              alt="laptopGrandin"
            />
          </div>
        </div>
        <div ref={infoRef} className="landing-row-white">
          <div className="landing-textoGrandin-container c-black">
            <h1>Informes por paciente</h1>
            <span className="bw18m">
              <span className="bw18b">grandin® </span>
              cuenta con su versión para profesional, la cual tiene acceso a
              detalles de los pacientes.
            </span>
            <div>
              <ul>
                <li className="landing-lista-informePorPaciente bw18m">
                  Generación de informes por cada juego.
                </li>
                <li className="landing-lista-informePorPaciente bw18m">
                  Seguimiento del paciente.
                </li>
                <li className="landing-lista-informePorPaciente bw18m">
                  Agregar notas por paciente
                </li>
              </ul>
            </div>
          </div>
          <div className="landing-imagen-informesPaciente-container">
            <img
              className="landing-imagen-informesPaciente"
              src={GraficoInforme}
              alt="laptopGrandin"
            />
          </div>
        </div>
        <div className="landing-row-blue">
          <div className="landing-textoGrandin-container c-white">
            <h1>Aprendé jugando</h1>
            <span className="bw18m">
              <span className="bw18b">grandin® </span>
              es una plataforma que cuenta con una gran variedad de juegos que
              sirven tanto para aprender como para ayudar.
            </span>
            <span className="bw18m">
              ¿Qué mejor manera de aprender si no es jugando?
            </span>
          </div>
          <div  className="landing-imagen-laptop-container">
            <img
              className="landing-imagen-neneJugando"
              src={neneJugando}
              alt="laptopGrandin"
              
            />
          </div>
        </div>
        <div ref={versionesRef}  className="landing-row-white landing-versiones-container">
          <div className="landing-textoGrandin-container c-black">
            <h1 >Versiones para paciente o profesional</h1>
            <span className="bw18m">
              <span className="bw18b">grandin® </span>
              cuenta con su versión para profesional, la cual tiene acceso a
              detalles de los pacientes.
            </span>
            <div>
              <ul>
                <li className="landing-lista-informePorPaciente bw18m">
                  Generación de informes por cada juego.
                </li>
                <li className="landing-lista-informePorPaciente bw18m">
                  Seguimiento del paciente.
                </li>
                <li className="landing-lista-informePorPaciente bw18m">
                  Agregar notas por paciente
                </li>
              </ul>
            </div>
          </div>
          <div className="landing-cardVersion-container">
            <CardVersion
              className={"bgcG-latex30"}
              lista={itemsPaciente}
              titulo="Paciente"
            />
            <CardVersion
              className={"bgcG-purple"}
              lista={itemsProfesional}
              titulo="Profesional"
            />
          </div>
        </div>
        <div ref={contactoRef} className="landing-footer-container bw18m">
          {/* <div className="landing-footer-boxLeft">
            <div className="landing-footer-atencionCliente">
              <div className="landing-footer-title c-white">
                Atención al cliente
              </div>
              {Array.isArray(itemsAtencionCliente) &&
                itemsAtencionCliente.map((item, index) => (
                  <div key={index}>
                    <span className="c-white">{item}</span>
                  </div>
                ))}
            </div>
            <div className="landing-footer-infoLegal">
              <div className="landing-footer-title c-white">
                Información Legal
              </div>
              {Array.isArray(itemsInfoLegal) &&
                itemsInfoLegal.map((item, index) => (
                  <div key={index}>
                    <span className="c-white">{item}</span>
                  </div>
                ))}
            </div>
          </div> */}
          <div className="landing-footer-boxRight">
            <div className="landing-footer-email">
              <span className=" c-white">Contactanos por email</span>
              <input
                placeholder="Tu email"
                className="landing-footer-input bw18m"
              ></input>
              <div className="landing-footer-btn">
                <span className="c-white">Enviar</span>
              </div>
            </div>
            <span className="c-white">2022 Garlopa Company</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
