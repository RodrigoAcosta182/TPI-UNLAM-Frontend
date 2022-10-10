import { motion } from "framer-motion";
import "./ModalAvatar.css";
import dog from "../../../assets/images/avatar/Dog.png";
import fox from "../../../assets/images/avatar/Fox.png";
import { useContext, useEffect, useState } from "react";
import { hideModalAvatar } from "../../../context/action/modal/modalAvatar";
import { GlobalContext } from "../../../context/Provider";

const ModalAvatar = () => {
  const { modalAvatarDispatch } = useContext(GlobalContext);
  const arrayImagen = [dog, fox];
  const [imagenAvatar, setImagenAvatar] = useState();
  const txtModalAvatar = "¡Muy bien, sos un genio!";

  useEffect(() => {
    setImagenAvatar(
      arrayImagen[Math.floor(Math.random() * arrayImagen.length)]
    );

    setTimeout(() => {
      hideModalAvatar()(modalAvatarDispatch);
    }, 3000);
  }, []);

  return (
    <>
      <div className="modalAvatar-fondo">
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
            <span className="bw32b">{txtModalAvatar}</span>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ModalAvatar;
