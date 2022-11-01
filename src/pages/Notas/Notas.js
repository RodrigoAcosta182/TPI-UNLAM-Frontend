import { useContext, useEffect, useRef, useState } from "react";
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
import "./Notas.css";
import { useHistory } from "react-router-dom";
import SalirIcon from "../../assets/images/SalirIcon";
import Dropdown from "../../components/genericos/Dropdown/Dropdown";
import { wsGetListaDePacientes } from "../../context/action/misPacientes/misPacientes";

const Notas = () => {
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
    history.push("/home");
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
        <div className="notas-input-email-container">
          <Dropdown
            valor={""}
            name="Nota"
            // onChange={seleccionarGenero}
            datos={misPacientesState.misPacientes.data}
            campoCodigo="id"
            descripcion="pacienteNombre"
            errorStr="El paciente es requerido"
            placeholder={"Seleccionar Paciente"}
            customCss={"widthNota"}
            // customCssInput={"fondoBlue c-white"}
          />
        </div>
        <div className="notas-textarea-container">
          <p className="bw24b c-white">Nota</p>
          <Input
            refElement={refTextArea}
            value={notaPaciente.descripcion}
            className={"notas-textarea"}
            inputType="textarea"
            name={"descripcion"}
            onChange={onChangeSugerencia}
          />
        </div>
        <div
          className="notas-btn btn bgc-broccoli pointer c-white bw18b"
          onClick={enviarSugerencia}
        >
          Guardar nota
        </div>
      </div>
    </>
  );
};

export default Notas;
