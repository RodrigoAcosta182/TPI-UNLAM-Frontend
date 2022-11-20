import React, { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./HomeProfesionales.css";
import CardJuegos from "../../../components/juego/CardJuegos/CardJuegos";
import { GlobalContext } from "../../../context/Provider";

import ConexionSignalR from "../../../components/genericos/ConexionSignalR/ConexionSignalR";

const HomeProfesionales = () => {
  const { authState } = useContext(GlobalContext);

  const history = useHistory();

  const navegar = (path) => {
    if (path === "misPac") {
      history.push("/misPacientes");
    } else {
      history.push("/notas");
    }
  };

  const hacerAlgo =() =>{
    
  }

  return (
    <React.Fragment>
      <ConexionSignalR callback={hacerAlgo}/>
      <div className="homeProf-container">
        <div className="homeProf-logoBienvenida">
          <p className="c-white bw32b">
            Bienvenido{" "}
            <span className="bw32b">{authState.auth.data.usuario.nombre}</span>
          </p>
        </div>
          <React.Fragment>
            <div className="homeProf-cardJuegos">
              <CardJuegos
                juego="Mis Pacientes"
                activo={true}
                irAlJuego={() => navegar("misPac")}
                imagen={"MisPacientes"}
              />
              <CardJuegos
                juego="Notas"
                activo={true}
                irAlJuego={() => navegar("notas")}
                imagen={"Notas"}
              />
            </div>
          </React.Fragment>
      </div>
    </React.Fragment>
  );
};

export default HomeProfesionales;
