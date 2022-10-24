import { useContext } from "react";
import { hideModal } from "../../../context/action/modal/modal";
import { GlobalContext } from "../../../context/Provider";
import "./AceptaLlamada.css";
const AceptaLlamada = ({
  pacienteSeleccionado,
  setupSources,
  llamadaPaciente,
}) => {
  const { modalDispatch } = useContext(GlobalContext);
  return (
    <div className="aceptarLlamada-modal-container">
      {pacienteSeleccionado && (
        <span className="bw24t">
          Usted está por llamar al paciente:{" "}
          <span className="bw24b">{pacienteSeleccionado.pacienteNombre}</span>
          <span className="bw24b">
            {" " + pacienteSeleccionado.pacienteApellido}
          </span>
        </span>
      )}
      <span>Encender cámara y microfono para empezar la llamada</span>
      <div className="aceptarLlamada-modal-botones">
        <button
          onClick={() => hideModal()(modalDispatch)}
          className="btnAccionesPacientes  c-white bgc-danger bw18m"
        >
          Cancelar
        </button>
        <button
          className="btnAccionesPacientes  c-white bgc-broccoli bw18m"
          onClick={setupSources}
        >
          {llamadaPaciente ? "Atender" : "Llamar"}
        </button>
      </div>
    </div>
  );
};

export default AceptaLlamada;
