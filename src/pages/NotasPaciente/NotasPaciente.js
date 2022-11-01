import React, { useContext, useEffect, useRef, useState } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import HeaderbaSugerencia from "../../components/genericos/HeaderbaSugerencia/HeaderbaSugerencia";
import Input from "../../components/genericos/Input/Input";
import Loading from "../../components/genericos/Loading/Loading";
import Modal from "../../components/genericos/Modal/Modal";
import SugerenciaSaludo from "../../components/genericos/SugerenciaSaludo/SugerenciaSaludo";
import { hideModal, showModal } from "../../context/action/modal/modal";
import {
  resetSugerencia,
  wsPostSugerencia,
} from "../../context/action/sugerencia/sugerencia";
import { GlobalContext } from "../../context/Provider";
import "./NotasPaciente.css";
import { useHistory } from "react-router-dom";
import SalirIcon from "../../assets/images/SalirIcon";
import Dropdown from "../../components/genericos/Dropdown/Dropdown";
import { wsGetListaDePacientes } from "../../context/action/misPacientes/misPacientes";
import checkParOImpar from "../../global/utils/checkParOImpar";
import checkNroPrimo from "../../global/utils/checkNroPrimo";

const NotasPaciente = () => {
  const history = useHistory();
  const refInput = useRef();
  const refTextArea = useRef();
  const { misPacientesState, modalState, modalDispatch, misPacientesDispatch } =
    useContext(GlobalContext);
  const [notaPaciente, setNotaPaciente] = useState({
    mail: null,
    descripcion: null,
  });

  useEffect(() => {
    wsGetListaDePacientes()(misPacientesDispatch);
  }, []);

  const onChangeSugerencia = (e) => {
    setNotaPaciente({ ...notaPaciente, [e.target.name]: e.target.value });
  };
  const enviarSugerencia = () => {
    // wsPostSugerencia(sugerencia)(sugerenciaDispatch);
  };

  const cerrarModal = () => {
    hideModal()(modalDispatch);
  };

  // useEffect(() => {
  //   if (sugerenciaState.sugerencia.data === 200) {
  //     showModal(
  //       <SugerenciaSaludo cerrarModal={cerrarModal} />,
  //       "",
  //       cerrarModal,
  //       true,
  //       {},
  //       "centro",
  //       true
  //     )(modalDispatch);
  //     limpiarCampos()
  //     resetSugerencia()(sugerenciaDispatch);
  //   }
  // }, [sugerenciaState.sugerencia.data]);

  const limpiarCampos = () => {
    refInput.current.value = "";
    refTextArea.current.value = "";
    setNotaPaciente({
      mail: null,
      descripcion: null,
    });
  };

  const volverAlHome = () => {
    history.push("/misPacientes");
  };

  return (
    <>
      {modalState.modal.show && <Modal />}
      {/* <Loading
        state={sugerenciaState.sugerencia.loading}
        mensaje={"Enviando sugerencia"}
      /> */}
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
          {Array.isArray(misPacientesState.misPacientes.data) &&
            misPacientesState.misPacientes.data.map((item, index) => {
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
                    <p>NOTA {index} </p>
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
