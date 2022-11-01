import React, { useContext, useEffect, useRef, useState } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import Loading from "../../components/genericos/Loading/Loading";
import Modal from "../../components/genericos/Modal/Modal";
import { GlobalContext } from "../../context/Provider";
import "./NotasPaciente.css";
import { useHistory } from "react-router-dom";
import SalirIcon from "../../assets/images/SalirIcon";
import checkParOImpar from "../../global/utils/checkParOImpar";
import checkNroPrimo from "../../global/utils/checkNroPrimo";
import { wsGetNotaXProfesional } from "../../context/action/nota/nota";

const NotasPaciente = () => {
  const history = useHistory();
  const { modalState, notaState, notaDispatch, pacienteSeleccionadoState } =
    useContext(GlobalContext);

  useEffect(() => {
    if (pacienteSeleccionadoState.pacienteSelected.data) {
      wsGetNotaXProfesional(
        pacienteSeleccionadoState.pacienteSelected.data.pacienteId
      )(notaDispatch);
    }
  }, [pacienteSeleccionadoState.pacienteSelected.data]);

  const volverAlHome = () => {
    history.push("/misPacientes");
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
      </div>
      <div className="notas-container">
        <p className="c-white bw32b">Paciente: Jose</p>
        <div className="notas-input-email-container">
          {Array.isArray(notaState.nota.data) &&
            notaState.nota.data.map((item, index) => {
              let check = checkParOImpar(index);
              let checkPrimo = checkNroPrimo(index);
              return (
                <React.Fragment key={index}>
                  <div
                    className={
                      check
                        ? "notas-card"
                        : checkPrimo
                        ? "notas-card2"
                        : "notas-card3"
                    }
                  >
                    <p>
                      {item.Mensaje} {index}{" "}
                    </p>
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
