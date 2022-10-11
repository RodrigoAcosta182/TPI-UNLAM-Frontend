import React, { useContext, useEffect } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import { wsGetListaDeJuegos } from "../../context/action/listaJuegos/listaJuegos";
import { GlobalContext } from "../../context/Provider";
import ModalAvatar from "../../components/genericos/ModalAvatar/ModalAvatar";
import Modal from "../../components/genericos/Modal/Modal";
import { resetColores } from "../../context/action/Juegos/colorCorrecto";
import { resetOrdenNumeros } from "../../context/action/Juegos/ordenarNumeros";
import HomePaciente from "./Usuario/HomePaciente";
import HomeProfesionales from "./Profesional/HomeProfesionales";
import HomeAdmin from "./Admin/HomeAdmin";
import { showModalAvatar } from "../../context/action/modal/modalAvatar";

const Home = () => {
  const {
    authState,
    listaJuegosDispatch,
    modalAvatarState,
    modalState,
    colorCorrectoDispatch,
    ordenNumerosDispatch,
  } = useContext(GlobalContext);

  useEffect(() => {
    wsGetListaDeJuegos()(listaJuegosDispatch);
    //Reseteo en el home los juegos
    resetColores()(colorCorrectoDispatch);
    resetOrdenNumeros()(ordenNumerosDispatch);
  }, []);

  return (
    <React.Fragment>
      {modalAvatarState.modalAvatar.show && <ModalAvatar />}
      {modalState.modal.show && <Modal />}
      <HeaderbarHome></HeaderbarHome>
      {authState.auth.data.usuario.tipoUsuarioId === 1 && <HomePaciente />}
      {authState.auth.data.usuario.tipoUsuarioId === 2 && <HomeProfesionales />}
      {authState.auth.data.usuario.tipoUsuarioId === 3 && <HomeAdmin />}
    </React.Fragment>
  );
};

export default Home;
