import { useContext, useEffect, useRef, useState } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import Input from "../../components/genericos/Input/Input";
import Loading from "../../components/genericos/Loading/Loading";
import Modal from "../../components/genericos/Modal/Modal";
import SugerenciaSaludo from "../../components/genericos/SugerenciaSaludo/SugerenciaSaludo";
import { hideModal, showModal } from "../../context/action/modal/modal";
import { GlobalContext } from "../../context/Provider";
import "./Notas.css";
import { useHistory } from "react-router-dom";
import SalirIcon from "../../assets/images/SalirIcon";
import Dropdown from "../../components/genericos/Dropdown/Dropdown";
import { wsGetListaDePacientes } from "../../context/action/misPacientes/misPacientes";
import { wsPostNota } from "../../context/action/nota/nota";

const Notas = () => {
  const history = useHistory();
  const refInput = useRef();
  const refTextArea = useRef();
  const {
    authState,
    misPacientesState,
    modalState,
    modalDispatch,
    misPacientesDispatch,
    notaDispatch,
  } = useContext(GlobalContext);
  const [notaPaciente, setNotaPaciente] = useState({
    Fecha: new Date(),
    Mensaje: null,
    ProfesionalId: authState.auth.data.usuario.id,
    PacienteId: null,
    LlamadaId: 1,
  });

  useEffect(() => {
    wsGetListaDePacientes()(misPacientesDispatch);
  }, []);

  const onChangeNota = (e) => {
    setNotaPaciente({ ...notaPaciente, [e.target.name]: e.target.value });
  };

  const seleccionarPaciente = (e) => {
    if (e !== "") {
      setNotaPaciente({ ...notaPaciente, PacienteId: e.pacienteId });
    }
  };

  const enviarNota = () => {
    wsPostNota(notaPaciente)(notaDispatch);
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
            onChange={seleccionarPaciente}
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
            value={notaPaciente.Mensaje}
            className={"notas-textarea"}
            inputType="textarea"
            name={"Mensaje"}
            onChange={onChangeNota}
          />
        </div>
        <div
          className="notas-btn btn bgc-broccoli pointer c-white bw18b"
          onClick={enviarNota}
        >
          Guardar nota
        </div>
      </div>
    </>
  );
};

export default Notas;
