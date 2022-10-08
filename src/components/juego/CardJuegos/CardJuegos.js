import "./CardJuegos.css";
import ImagenJuego from "../../../assets/images/defaultUserImage.png";

const CardJuegos = ({ juego, irAlJuego }) => {
  return (
    <div className="cardJuegos-container" onClick={irAlJuego}>
      <div className="cardJuegos-ficha">
        <img className="cardJuegos-imagen" src={ImagenJuego} alt="logo"></img>
        <p className="cardJuegos-titulo bw18b">{juego}</p>
      </div>
    </div>
  );
};

export default CardJuegos;
