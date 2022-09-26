import { AnimatePresence, motion } from "framer-motion";
import "./ModalAvatar.css";

const ModalAvatar = () => {
  const variantes = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className="modalavatar-container"
        variants={variantes}
        initial="hidden"
        animate="visible"
      >
        <div className="modalavatar-imagen">
          <img alt=""></img>
        </div>
        <div className="modalavatar-texto">
          <span>Texto del modal</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalAvatar;
