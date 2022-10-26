import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./HomeAdmin.css";
import CardJuegos from "../../../components/juego/CardJuegos/CardJuegos";
import { wsGetListaDePacientes } from "../../../context/action/misPacientes/misPacientes";
import { GlobalContext } from "../../../context/Provider";

const HomeAdmin = () => {
  const {
    authState,
  } = useContext(GlobalContext);

  const history = useHistory();

  const verListaProfesionales = () => {
    history.push("/listaProfesionales");
  };

  return (
    <React.Fragment>
      <div className="homeAdmin-container">
        <div className="homeAdmin-logoBienvenida">
          <p className="c-white bw32t">
            Bienvenido{" "}
            <span className="bw32b">{authState.auth.data.usuario.nombre}</span>
          </p>
        </div>
        <div className="homeAdmin-listaJuegos">
          <React.Fragment>
            <div className="homeAdmin-cardJuegos">
              <CardJuegos
                juego="Listado profesionales"
                activo={true}
                irAlJuego={() => verListaProfesionales()}
                imagen={"Profesionales"}
              />
            </div>
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeAdmin;
