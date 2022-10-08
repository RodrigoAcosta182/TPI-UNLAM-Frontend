import React, { useContext, useEffect, useState } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import { GlobalContext } from "../../context/Provider";

import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./HomeProfesionales.css";
import ModalAvatar from "../../components/genericos/ModalAvatar/ModalAvatar";

import { hideModal, showModal } from "../../context/action/modal/modal";
import Modal from "../../components/genericos/Modal/Modal";
import CardJuegos from "../../components/juego/CardJuegos/CardJuegos";

const HomeProfesionales = () => {
  const {
    authState,
    modalAvatarState,
    modalDispatch,
    modalState,
  } = useContext(GlobalContext);

  const history = useHistory();

  useEffect(() => {
  }, []);

  const cerrarModal = () => {
    hideModal()(modalDispatch);
  };

  const showModalJuego = () => {
    history.push("/misPacientes");
  };

  return (
    <React.Fragment>
      {modalAvatarState.modalAvatar.show && <ModalAvatar />}
      {modalState.modal.show && <Modal />}
      <HeaderbarHome></HeaderbarHome>
      <div className="homeProf-container">
        <div className="homeProf-logoBienvenida">
          <p className="c-white bw52t">
            Bienvenido{" "}
            <span className="bw52b">{authState.auth.data.usuario.nombre}</span>
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
