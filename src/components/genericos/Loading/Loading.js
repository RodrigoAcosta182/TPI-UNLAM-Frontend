import LogoBlanco from "../../../assets/images/empresa/LogoBlanco2.png";
import { motion } from "framer-motion";
import "./Loading.css";

const Loading = ({ state, mensaje }) => {
  const variantes = {
    hidden: { rotate: -360 },
    visible: {
      rotate: 0,
      transition: { duration: 3, yoyo: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <>
      {state && (
        <div className="loading-container">
          <div className="loading-logo">
            <motion.img
              src={LogoBlanco}
              alt=""
              variants={variantes}
              initial="hidden"
              animate="visible"
            />
          </div>
          <span className="c-white">{mensaje}</span>
        </div>
      )}
    </>
  );
};

export default Loading;
