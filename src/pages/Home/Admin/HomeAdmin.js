import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./HomeAdmin.css";
import CardJuegos from "../../../components/juego/CardJuegos/CardJuegos";
import { wsGetListaDePacientes } from "../../../context/action/misPacientes/misPacientes";
import { GlobalContext } from "../../../context/Provider";

const HomeAdmin = () => {
  const {
    authState,
    misPacientesDispatch,
  } = useContext(GlobalContext);

  const history = useHistory();

  useEffect(() => {
    wsGetListaDePacientes()(misPacientesDispatch);
  }, []);

  const showModalJuego = () => {
    history.push("/misPacientes");
  };

  return (
    <React.Fragment>
      <div className="homeAdmin-container">
        <div className="homeAdmin-logoBienvenida">
          <p className="c-white bw52t">
            Bienvenido{" "}
            <span className="bw52b">{authState.auth.data.usuario.nombre}</span>
          </p>
        </div>
        <div className="homeAdmin-listaJuegos">
          <React.Fragment>
            <div className="homeAdmin-cardJuegos">
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

export default HomeAdmin;
