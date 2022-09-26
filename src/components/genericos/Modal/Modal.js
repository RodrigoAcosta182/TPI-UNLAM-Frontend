import "./Modal.css";
import React, { useState, useEffect, useContext } from "react";

import { hideModal } from "../../../context/action/modal/modal";
import { GlobalContext } from "../../../context/Provider";

const Modal = () => {
  const { modalState, modalDispatch } = useContext(GlobalContext);
  const [flgComponent, setFlgComponet] = useState(false);
  const [listBotones, setListBotones] = useState([]);
  const [posicion, setPosicion] = useState(["centro"]);
  const [bloquearDissmiss, setBloquearDissmiss] = useState();

  const dissmiss = () => {
    // if (modalState.modal.data.bloquearDissmiss) {
    // }
    hideModal()(modalDispatch);
  };

  const preventDissmiss = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (flgComponent) {
      setFlgComponet(false);
      setBloquearDissmiss(modalState.modal.data.bloquearDissmiss);
    }
  }, [flgComponent]);

  useEffect(() => {
    if (
      modalState.modal.data.posicion !== undefined &&
      modalState.modal.data.posicion !== null &&
      modalState.modal.data.posicion !== ""
    ) {
      setPosicion(modalState.modal.data.posicion);
    }
    setFlgComponet(true);
    if (Array.isArray(modalState.modal.data.listBotones)) {
      setListBotones(modalState.modal.data.listBotones);
    } else {
      setListBotones([]);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="fondo-modal-generico" onClick={dissmiss}></div>
      <div className="modalContentNew">
        {modalState.modal.data.component !== null &&
          modalState.modal.data.params !== null &&
          modalState.modal.data.component}
      </div>
    </React.Fragment>
  );
};
export default Modal;
