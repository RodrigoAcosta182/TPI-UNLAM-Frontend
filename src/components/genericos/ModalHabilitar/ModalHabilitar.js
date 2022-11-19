import { useContext } from "react";
import { hideModal } from "../../../context/action/modal/modal";
import { GlobalContext } from "../../../context/Provider";
import "./ModalHabilitar.css";
const ModalHabilitar = ({ item, opcion, habilitarPaciente }) => {
  const { modalDispatch } = useContext(GlobalContext);
  const cerrarModal = () => {
    hideModal()(modalDispatch);
  };
  return (
    <>
      <p className="habilitar-header bgc-latex30 c-white bw24t">Atención</p>
      <div className="habilitar-container">
        <p className="bw18l">
          ¿Desea {opcion} al paciente {item.pacienteNombre}{" "}
          {item.pacienteApellido}?
        </p>
        <div className="habilitar-btnContanier">
          <div
            className="btn bgc-latex30 pointer c-white bw18b"
            onClick={habilitarPaciente}
          >
            Aceptar
          </div>
          <div
            className="btn habilitar-btnCerrar bgc-white pointer c-latex30 bw18b"
            onClick={cerrarModal}
          >
            Cerrar
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalHabilitar;
