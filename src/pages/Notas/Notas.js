import { useContext, useEffect, useRef, useState } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import Input from "../../components/genericos/Input/Input";
import Loading from "../../components/genericos/Loading/Loading";
import Modal from "../../components/genericos/Modal/Modal";
import { hideModal, showModal } from "../../context/action/modal/modal";
import { GlobalContext } from "../../context/Provider";
import "./Notas.css";
import { useHistory } from "react-router-dom";
import SalirIcon from "../../assets/images/SalirIcon";
import Dropdown from "../../components/genericos/Dropdown/Dropdown";
import { wsGetListaDePacientes } from "../../context/action/misPacientes/misPacientes";
import { resetNota, wsPostNota } from "../../context/action/nota/nota";
import NotaEnviadaModal from "../../components/genericos/NotaEnviadaModal/NotaEnviadaModal";

const Notas = () => {
  const history = useHistory();
  const refTextArea = useRef();
  const {
    authState,
    misPacientesState,
    modalState,
    modalDispatch,
    misPacientesDispatch,
    notaDispatch,
    notaState,
  } = useContext(GlobalContext);
  const [notaPaciente, setNotaPaciente] = useState({
    Fecha: new Date(),
    Mensaje: null,
    ProfesionalId: authState.auth.data.usuario.id,
    PacienteId: null,
    Archivado: false,
  });

  useEffect(() => {
    wsGetListaDePacientes()(misPacientesDispatch);
    resetNota()(notaDispatch);
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
    history.push("/home");
  };

  useEffect(() => {
    if (notaState.nota.data === 200) {
      showModal(
        <NotaEnviadaModal cerrarModal={cerrarModal} />,
        "",
        cerrarModal,
        true,
        {},
        "centro",
        true
      )(modalDispatch);
      resetNota()(notaDispatch);
    }
  }, [notaState.nota.data]);

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
      <div className="notas-crear-volverAccion">
        <div className="notas-crear-btnCont" onClick={volverAlHome}>
          <SalirIcon />
          <p className="notas-crear-volverBtn c-white">VOLVER</p>
        </div>
      </div>
      <div className="notas-Crearcontainer">
        <div className="notas-box">
          <div className="notas-crear-input-email-container">
            <Dropdown
              valor={""}
              name="Nota"
              onChange={seleccionarPaciente}
              datos={misPacientesState.misPacientes.data}
              campoCodigo="id"
              descripcion="pacienteNombreCompleto"
              errorStr="El paciente es requerido"
              placeholder={"Seleccionar Paciente"}
              customCss={"widthNota"}
              headerStr="Seleccionar Paciente"
              // customCssInput={"fondoBlue c-white"}
            />
          </div>
          <div className="notas-textarea-container">
            <p className="bw16b c-white">Nota</p>
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
            className={`modalNotas-btn btn ${
              notaPaciente.Mensaje === null ||
              notaPaciente.Mensaje === "" ||
              notaPaciente.PacienteId === null
                ? "bgc-grey65"
                : "bgc-broccoli pointer"
            } c-white bw18b`}
            onClick={
              notaPaciente.Mensaje === null ||
              notaPaciente.Mensaje === "" ||
              notaPaciente.PacienteId === null
                ? () => {}
                : enviarNota
            }
          >
            Guardar nota
          </div>
        </div>
      </div>
    </>
  );
};

export default Notas;
