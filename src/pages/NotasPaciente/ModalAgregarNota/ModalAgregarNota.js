import { useContext, useEffect, useRef, useState } from "react";
import "./ModalAgregarNota.css";
import { useHistory } from "react-router-dom";
import { wsGetListaDePacientes } from "../../../context/action/misPacientes/misPacientes";
import { resetNota, wsPostNota } from "../../../context/action/nota/nota";
import Input from "../../../components/genericos/Input/Input";
import { GlobalContext } from "../../../context/Provider";
import { hideModal } from "../../../context/action/modal/modal";
import Dropdown from "../../../components/genericos/Dropdown/Dropdown";

const ModalAgregarNota = () => {
  const history = useHistory();
  const refTextArea = useRef();
  const {
    authState,
    misPacientesState,
    modalState,
    modalDispatch,
    misPacientesDispatch,
    notaDispatch,
    pacienteSeleccionadoState,
  } = useContext(GlobalContext);
  const [notaPaciente, setNotaPaciente] = useState({
    Fecha: new Date(),
    Mensaje: null,
    ProfesionalId: authState.auth.data.usuario.id,
    PacienteId: pacienteSeleccionadoState.pacienteSelected.data.pacienteId,
    Archivado: false,
  });

  useEffect(() => {
    wsGetListaDePacientes()(misPacientesDispatch);
  }, []);

  const onChangeNota = (e) => {
    setNotaPaciente({ ...notaPaciente, [e.target.name]: e.target.value });
  };

  const enviarNota = () => {
    wsPostNota(notaPaciente)(notaDispatch);
  };

  const cerrarModal = () => {
    hideModal()(modalDispatch);
  };

  return (
    <>
      <div className="modalNotas-box">
        <div className="modalNotas-textarea-container">
          <p className="bw16b c-white">
            Nota para{" "}
            {pacienteSeleccionadoState.pacienteSelected.data.pacienteNombre}{" "}
            {pacienteSeleccionadoState.pacienteSelected.data.pacienteApellido}
          </p>
          <Input
            refElement={refTextArea}
            value={notaPaciente.Mensaje}
            className={"modalNotas-textarea"}
            inputType="textarea"
            name={"Mensaje"}
            onChange={onChangeNota}
          />
        </div>
        <div className="modalNotas-btnContainer">
          <div
            className={`modalNotas-btn btn ${
              notaPaciente.Mensaje === null || notaPaciente.Mensaje === ""
                ? "bgc-grey65"
                : "bgc-broccoli pointer"
            } c-white bw18b`}
            onClick={
              notaPaciente.Mensaje === null || notaPaciente.Mensaje === ""
                ? () => {}
                : enviarNota
            }
          >
            Guardar nota
          </div>
          <div
            className="modalNotas-btn btn bgc-white pointer c-latex10 bw18b"
            onClick={cerrarModal}
          >
            Cerrar
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAgregarNota;
