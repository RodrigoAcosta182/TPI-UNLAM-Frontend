import React, { useContext, useEffect, useState } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import { wsGetListaDeJuegos } from "../../context/action/listaJuegos/listaJuegos";
import { GlobalContext } from "../../context/Provider";

import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./Home.css";
import ModalAvatar from "../../components/genericos/ModalAvatar/ModalAvatar";

import { hideModal, showModal } from "../../context/action/modal/modal";
import Modal from "../../components/genericos/Modal/Modal";
import JuegoSeleccionado from "../../components/juego/JuegoSeleccionado/CardJuegos/JuegoSeleccionado";
import CardJuegos from "../../components/juego/CardJuegos/CardJuegos";
import VideoLlamada from "../../components/genericos/VideoLlamada/VideoLlamada";

const Home = () => {
  const {
    listaJuegosDispatch,
    listaJuegosState,
    modalAvatarState,
    modalDispatch,
    modalState,
  } = useContext(GlobalContext);

  const { authState } = useContext(GlobalContext);

  const history = useHistory();

  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);

  useEffect(() => {
    wsGetListaDeJuegos()(listaJuegosDispatch);
  }, []);

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
      {modalAvatarState.modalAvatar.show && <ModalAvatar />}
      {modalState.modal.show && <Modal />}
      <HeaderbarHome></HeaderbarHome>
      <div className="home-container">
        <div className="home-logoBienvenida">
          <p className="c-white bw52t">
            Hola{" "}
            <span className="bw52b">{authState.auth.data.usuario.nombre}</span>,
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
                    />
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </div>
      <VideoLlamada/>
    </React.Fragment>
  );
};

export default Home;
