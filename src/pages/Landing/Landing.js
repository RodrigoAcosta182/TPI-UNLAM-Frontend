import HeaderbarLanding from "../../components/landing/HeaderbarHome/HeaderbarLanding";
import laptopGrandin from "../../assets/images/landing/laptopGrandin.png";
import GraficoInforme from "../../assets/images/landing/GraficoInforme.png";
import neneJugando from "../../assets/images/landing/neneJugando.png";
import "./Landing.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import CardVersion from "../../components/landing/CardVersion/CardVersion";

const Landing = () => {
  const history = useHistory();
  const irAGrandin = () => {
    history.push("/");
  };

  return (
    <>
      <HeaderbarLanding />
      <div className="landing-container">
        {/* <div className="landing-row-blue"></div>
      <div className="landing-row-white"></div> */}

        <div className="landing-row-blue">
          <div className="landing-textoGrandin-container c-white">
            <h1>“Porque no hay una sola manera de jugar”</h1>
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
        <div className="landing-row-white">
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
                  Generacion de informes por cada juego.
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
            <span className="bw18m">¿Qué mejor manera de aprender si no es jugando?</span>
          </div>
          <div className="landing-imagen-laptop-container">
            <img
              className="landing-imagen-laptop"
              src={neneJugando}
              alt="laptopGrandin"
            />
          </div>
        </div>
        <div className="landing-row-white">
          <div className="landing-textoGrandin-container c-black">
            <h1>Versiones para paciente o profesional</h1>
            <span className="bw18m">
              <span className="bw18b">grandin® </span>
              cuenta con su versión para profesional, la cual tiene acceso a
              detalles de los pacientes.
            </span>
            <div>
              <ul>
                <li className="landing-lista-informePorPaciente bw18m">
                  Generacion de informes por cada juego.
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
            <CardVersion/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
