import { useContext } from "react";
import { hideModal } from "../../../context/action/modal/modal";
import { GlobalContext } from "../../../context/Provider";
import "./ModalArchivar.css";
const ModalArchivar = ({ archivar, opcion }) => {
  const { modalDispatch } = useContext(GlobalContext);
  const cerrarModal = () => {
    hideModal()(modalDispatch);
  };
  return (
    <>
      <p className="habilitar-header bgc-latex30 c-white bw24t">Atención</p>
      <div className="habilitar-container">
        <p className="bw18l">
          ¿Desea {opcion} la nota?
        </p>
        <div className="habilitar-btnContanier">
          <div
            className="btn bgc-latex30 pointer c-white bw18b"
            onClick={archivar}
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

export default ModalArchivar;
