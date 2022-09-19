import React, { useContext, useEffect } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import { wsGetListaDeJuegos } from "../../context/action/listaJuegos/listaJuegos";
import { GlobalContext } from "../../context/Provider";
import LogoEmpresa from "../../assets/images/empresa/Logo.png";
import "./Home.css";
import CardJuegos from "../../components/CardJuegos/CardJuegos";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // const { listaJuegosState, listaJuegosDispatch } = useContext(GlobalContext);
  const ContextoGlobal = useContext(GlobalContext);
  const { listaJuegosDispatch, listaJuegosState } = ContextoGlobal;

  const navigate = useNavigate();

  useEffect(() => {
    wsGetListaDeJuegos()(listaJuegosDispatch);
  }, []);

  const irAlJuego = (e) => {
    //LO DEJO COMENTADO PORQUE TODAVIA NO TIENEN UNA RUTA GUARDADA EN LA BASE
    // navigate("/"+e.ruta)
    navigate("/colorcorrecto");
  }

  return (
    <React.Fragment>
      <HeaderbarHome></HeaderbarHome>
      <div className="home-container">
        <div className="home-logoBienvenida">
          <img className="home-logo" src={LogoEmpresa} alt="logo"></img>
          <p className="c-white bw52t">
            Hola <span className="bw52b">Terry</span>, Seleccioná un juego
          </p>
        </div>
        <div className="home-listaJuegos">
          {Array.isArray(listaJuegosState.listaJuegos.data) &&
            listaJuegosState.listaJuegos.data.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="home-cardJuegos">
                    <CardJuegos
                      juego={item.descripcion}
                      activo={item.activo}
                      irAlJuego={() => irAlJuego(item)}
                    />
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
