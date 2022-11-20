import { useContext } from "react";
import { hideModal } from "../../../context/action/modal/modal";
import { GlobalContext } from "../../../context/Provider";
import "./ModalMensaje.css";
const ModalHabilitar = ({ titulo, mensaje }) => {
  const { modalDispatch } = useContext(GlobalContext);
  const cerrarModal = () => {
    hideModal()(modalDispatch);
  };
  return (
    <>
      <p className="mensaje-header bgc-latex30 c-white bw24t">{titulo}</p>
      <div className="mensaje-container">
        <p dangerouslySetInnerHTML={{ __html: mensaje }} className="bw18l textoMensaje"></p>
        <div className="mensaje-btnContanier">
          <div
            className="btn mensaje-btnCerrar bgc-white pointer c-latex30 bw18b"
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
