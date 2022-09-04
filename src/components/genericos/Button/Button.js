import "./Button.css"
import {motion} from "framer-motion"


const Button = ({ onClick, className, descripcion }) => {
  return (
    <motion.button onClick={onClick} className={`container-button ${className}`}>
      {descripcion}
    </motion.button>
  );
};

export default Button;
