import { useContext } from "react";
import HeaderbarHome from "../../../global/components/genericos/HeaderbarHome/HeaderbarHome";
import MantenimientoCard from "../../../global/components/genericos/MantenimientoCard/MantenimientoCard";
import Modal from "../../../global/components/genericos/Modal/Modal";
import {
  hideModal,
  showModal,
} from "../../../global/context/action/modal/modal";
import { GlobalContext } from "../../../global/context/Provider";
import {
  BtnPrimary,
  BtnSecondary,
  Card,
  ContainerBien,
  Description,
  SectionCard,
  Title,
} from "./localStyle";

const Bienvenido = () => {
  const { modalState, modalDispatch } = useContext(GlobalContext);

  const modal = () => {
    showModal(
      <MantenimientoCard></MantenimientoCard>,
      "Modal Generico",
      dissmiss,
      false,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  const dissmiss = () => {
    hideModal()(modalDispatch);
  };

  return (
    <>
      {modalState.modal.show && <Modal />}
      <HeaderbarHome />
      <ContainerBien>
        <Title>¡Bienvenido!</Title>
        <Description>
          En esta web aprenderá todo lo necesario para poder comenzar un nuevo
          proyecto. Es importante que siga las instrucciones al pie de la letra
          para evitar errores
        </Description>
        <div className="container-btn">
          <BtnSecondary to="/demo">Tabla ABM</BtnSecondary>
          <BtnSecondary onClick={modal}>Modal Base</BtnSecondary>
        </div>
        <SectionCard></SectionCard>
      </ContainerBien>
    </>
  );
};

export default Bienvenido;
