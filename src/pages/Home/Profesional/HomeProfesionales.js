import React, { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./HomeProfesionales.css";
import CardJuegos from "../../../components/juego/CardJuegos/CardJuegos";
import { GlobalContext } from "../../../context/Provider";

const HomeProfesionales = () => {
  const { authState } = useContext(GlobalContext);

  const history = useHistory();

  const showModalJuego = () => {
    history.push("/misPacientes");
  };

  return (
    <React.Fragment>
      <div className="homeProf-container">
        <div className="homeProf-logoBienvenida">
          <p className="c-white bw32b">
            Bienvenido{" "}
            <span className="bw32b">{authState.auth.data.usuario.nombre}</span>
          </p>
        </div>
        <div className="homeProf-listaJuegos">
          <React.Fragment>
            <div className="homeProf-cardJuegos">
              <CardJuegos
                juego="Mis Pacientes"
                activo={true}
                irAlJuego={() => showModalJuego()}
              />
            </div>
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeProfesionales;
