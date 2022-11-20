import React, { useContext, useEffect, useRef, useState } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import Loading from "../../components/genericos/Loading/Loading";
import Modal from "../../components/genericos/Modal/Modal";
import { GlobalContext } from "../../context/Provider";
import "./NotasPaciente.css";
import { useHistory } from "react-router-dom";
import SalirIcon from "../../assets/images/SalirIcon";
import AgregarIcon from "../../assets/images/AgregarIcon";
import checkParOImpar from "../../global/utils/checkParOImpar";
import checkNroPrimo from "../../global/utils/checkNroPrimo";
import {
  resetNota,
  wsGetNotaXProfesional,
} from "../../context/action/nota/nota";
import { resetPacienteContexto } from "../../context/action/pacienteSeleccionado/pacienteSeleccionado";
import { hideModal, showModal } from "../../context/action/modal/modal";
import ModalAgregarNota from "./ModalAgregarNota/ModalAgregarNota";

const NotasPaciente = () => {
  const history = useHistory();
  const {
    modalState,
    notaState,
    notaDispatch,
    pacienteSeleccionadoState,
    modalDispatch,
    pacienteSeleccionadoDispatch,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (pacienteSeleccionadoState.pacienteSelected.data) {
      wsGetNotaXProfesional(
        pacienteSeleccionadoState.pacienteSelected.data.pacienteId
      )(notaDispatch);
    }
  }, [pacienteSeleccionadoState.pacienteSelected.data]);

  useEffect(() => {
    if (notaState.nota.data === 200) {
      hideModal()(modalDispatch);
      resetNota()(notaDispatch);
      alert("Nota Enviada");
      wsGetNotaXProfesional(
        pacienteSeleccionadoState.pacienteSelected.data.pacienteId
      )(notaDispatch);
    }
  }, [notaState.nota.data]);

  const volverAlHome = () => {
    history.push("/misPacientes");
    resetNota()(notaDispatch);
    resetPacienteContexto()(pacienteSeleccionadoDispatch);
  };

  const crearNota = () => {
    showModal(
      <ModalAgregarNota cerrar={() => cerrarModal()} />,
      "",
      cerrarModal,
      true,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  const cerrarModal = () => {
    hideModal()(modalDispatch);
  };

  return (
    <>
      {modalState.modal.show && <Modal />}
      <Loading state={notaState.nota.loading} mensaje={"Cargando notas..."} />
      <HeaderbarHome />
      <div className="notas-volverAccion">
        <div className="notas-btnCont" onClick={volverAlHome}>
          <SalirIcon />
          <p className="notas-volverBtn c-white">VOLVER</p>
        </div>
        <div className="notas-AgregarbtnCont" onClick={crearNota}>
          <AgregarIcon />
          <p className="notas-agregarBtn c-white">CREAR NOTA</p>
        </div>
      </div>
      <div className="notas-container">
        <p className="c-white bw32b">
          Paciente:{" "}
          {pacienteSeleccionadoState.pacienteSelected.data.pacienteNombre}{" "}
          {pacienteSeleccionadoState.pacienteSelected.data.pacienteApellido}{" "}
        </p>
        <div className="notas-input-email-container">
          {Array.isArray(notaState.nota.data) &&
            notaState.nota.data.map((item, index) => {
              let check = checkParOImpar(index);
              // let checkPrimo = checkNroPrimo(index);
              return (
                <React.Fragment key={index}>
                  <div className={check ? "notas-card" : "notas-card2"}>
                    <div className="notas-fechaMensaje">
                      <p className="bw24b">
                        {new Date(item.fecha).toLocaleDateString()}
                      </p>
                      <p className="bw24t notas-mensaje">{item.mensaje}</p>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default NotasPaciente;
