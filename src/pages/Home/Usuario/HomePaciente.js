import React, { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./HomePaciente.css";
import JuegoSeleccionado from "../../../components/juego/JuegoSeleccionado/CardJuegos/JuegoSeleccionado";
import CardJuegos from "../../../components/juego/CardJuegos/CardJuegos";
import { hideModal, showModal } from "../../../context/action/modal/modal";
import { GlobalContext } from "../../../context/Provider";
import LlamadaPaciente from "../../../components/genericos/VideoLlamada/LlamadaPaciente";
import LlamadaEntrante from "../../../components/genericos/LlamadaEntrante/LlamadaEntrante";

const HomePaciente = () => {
  const {
    authState,
    listaJuegosState,
    modalDispatch,
  } = useContext(GlobalContext);

  const history = useHistory();

  const irAlJuego = (e) => {
    history.push(e.ruta);
    cerrarModal();
  };

  const cerrarModal = () => {
    hideModal()(modalDispatch);
  };

  const showModalJuego = (item) => {
    // setJuegoSeleccionado(item);
    showModal(
      <JuegoSeleccionado
        juego={item.descripcion}
        activo={item.activo}
        irAlJuego={() => irAlJuego(item)}
        cerrar={() => cerrarModal()}
        imagen={item.id}
      />,
      "",
      cerrarModal,
      true,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  return (
    <React.Fragment>
      
      <div className="home-container">
        <div className="home-logoBienvenida">
          <p className="c-white bw32t">
            Hola{" "}
            <span className="bw32b">{authState.auth.data.usuario.nombre}</span>,
            elegí un juego:
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
                      irAlJuego={() => showModalJuego(item)} 
                      imagen={item.id}
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

export default HomePaciente;
