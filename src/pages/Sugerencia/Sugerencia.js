import { useContext, useEffect, useState } from "react";
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
import "./Sugerencia.css";
const Sugerencia = () => {
  const { sugerenciaDispatch, sugerenciaState, modalState, modalDispatch } =
    useContext(GlobalContext);
  const [sugerencia, setSugerencia] = useState({
    mail: null,
    descripcion: null,
  });

  const onChangeSugerencia = (e) => {
    setSugerencia({ ...sugerencia, [e.target.name]: e.target.value });
  };
  const enviarSugerencia = () => {
    wsPostSugerencia(sugerencia)(sugerenciaDispatch);
  };

  const cerrarModal = () => {
    hideModal()(modalDispatch);
  };

  useEffect(() => {
    if (sugerenciaState.sugerencia.data === 200) {
      showModal(
        <SugerenciaSaludo cerrarModal={cerrarModal} />,
        "",
        cerrarModal,
        true,
        {},
        "centro",
        true
      )(modalDispatch);
      setSugerencia({
        mail: null,
        descripcion: null,
      });
      resetSugerencia()(sugerenciaDispatch);
    }
  }, [sugerenciaState.sugerencia.data]);

  return (
    <>
      {modalState.modal.show && <Modal />}
      <Loading
        state={sugerenciaState.sugerencia.loading}
        mensaje={"Enviando sugerencia"}
      />
      <HeaderbaSugerencia />
      <div className="sugerencia-container">
        <div className="sugerencia-input-email-container">
          <Input
            value={sugerencia.mail}
            headerStr={"Email"}
            className={"sugerencia-input-email"}
            inputType="text"
            name={"mail"}
            onChange={onChangeSugerencia}
          />
        </div>
        <div className="sugerencia-textarea-container">
          <Input
            value={sugerencia.descripcion}
            className={"sugerencia-textarea"}
            inputType="textarea"
            name={"descripcion"}
            onChange={onChangeSugerencia}
          />
        </div>
        <div
          className="btn bgc-broccoli pointer c-white bw18b"
          onClick={enviarSugerencia}
        >
          Enviar sugerencia
        </div>
      </div>
    </>
  );
};

export default Sugerencia;
