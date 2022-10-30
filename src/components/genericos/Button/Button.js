import "./Button.css"
import {motion} from "framer-motion"


const Button = ({ onClick, className, descripcion, onKeyDown }) => {
  return (
    <motion.button onKeyDown={onKeyDown} onClick={onClick} className={`container-button ${className}`}>
      {descripcion}
    </motion.button>
  );
};

export default Button;
