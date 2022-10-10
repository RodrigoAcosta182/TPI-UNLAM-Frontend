import { motion } from "framer-motion";
import "./ModalAvatar.css";
import dog from "../../../assets/images/avatar/Dog.png";
import fox from "../../../assets/images/avatar/Fox.png";
import { useContext, useEffect, useState } from "react";
import { hideModalAvatar } from "../../../context/action/modal/modalAvatar";
import { GlobalContext } from "../../../context/Provider";

const ModalAvatar = (funcion) => {
  const { modalAvatarDispatch, modalAvatarState, authState } =
    useContext(GlobalContext);
  const arrayImagen = [dog, fox];
  const [imagenAvatar, setImagenAvatar] = useState();
  const [txtAvatar, setTxtAvatar] = useState();

  const txtModalAvatar = `¡Muy bien ${authState.auth.data.usuario.nombre}, sos un genio!`;
  const txtModalAvatar2 = `¡Excelente ${authState.auth.data.usuario.nombre}, gracias por jugar conmigo!`;
  const arrayTxt = [txtModalAvatar, txtModalAvatar2];

  useEffect(() => {
    setImagenAvatar(
      arrayImagen[Math.floor(Math.random() * arrayImagen.length)]
    );
    setTxtAvatar(arrayTxt[Math.floor(Math.random() * arrayTxt.length)]);

    setTimeout(() => {
      hideModalAvatar()(modalAvatarDispatch);
    }, 5000);

    return () => {
      //esta accion se ejecuta cuando el modal desaparece de la pantalla
      if (modalAvatarState.modalAvatar.data.accion) {
        const accionPorParametro = modalAvatarState.modalAvatar.data.accion;
        accionPorParametro();
      }
    };
  }, []);

  const dismiss = () => {
    hideModalAvatar()(modalAvatarDispatch)
  }

  return (
    <>
      <div className="modalAvatar-fondo" onClick={dismiss}>
        <motion.div
          className="modalavatar-container"
          initial={{ opacity: 0, scale: 0.0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div className="modalavatar-imagen-container">
            <img className="modalavatar-imagen" src={imagenAvatar} alt="" />
          </div>
          <div className="modalavatar-texto">
            <span className="bw32b">{txtAvatar}</span>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ModalAvatar;
