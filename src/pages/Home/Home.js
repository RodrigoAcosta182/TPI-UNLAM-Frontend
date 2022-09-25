import React, { useContext, useEffect } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import { wsGetListaDeJuegos } from "../../context/action/listaJuegos/listaJuegos";
import { GlobalContext } from "../../context/Provider";
import LogoEmpresa from "../../assets/images/empresa/Logo.png";
import "./Home.css";
import CardJuegos from "../../components/CardJuegos/CardJuegos";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Home = () => {
  const { listaJuegosDispatch, listaJuegosState } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    wsGetListaDeJuegos()(listaJuegosDispatch);
  }, []);

  const irAlJuego = (e) => {
    //LO DEJO COMENTADO PORQUE TODAVIA NO TIENEN UNA RUTA GUARDADA EN LA BASE
    history.push("/" + e.ruta);
  };

  return (
    <React.Fragment>
      <HeaderbarHome></HeaderbarHome>
      <div className="home-container">
        <div className="home-logoBienvenida">
          <p className="c-white bw52t">
            Hola <span className="bw52b">Terry</span>, elegí un juego:
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
