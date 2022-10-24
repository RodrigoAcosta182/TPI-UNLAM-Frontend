import "./CardJuegos.css";
import ColorCorrecto from "../../../assets/images/juegos/ColorCorrecto.png";
import OrdenarNumeros from "../../../assets/images/juegos/OrdenarNumeros.png";
import VerdaderoFalso from "../../../assets/images/juegos/VerdaderoFalso.png";
import ReconocerComida from "../../../assets/images/juegos/ReconocerComida.png";
import ImagenDefault from "../../../assets/images/defaultUserImage.png"

import { useEffect, useState } from "react";

const CardJuegos = ({ juego, irAlJuego, imagen }) => {
  const [imagenActual, setImagenActual] = useState();

  useEffect(() => {
    switch (imagen) {
      case 1:
        setImagenActual(ColorCorrecto);
        break;
      case 2:
        setImagenActual(OrdenarNumeros);
        break;
      case 4:
        setImagenActual(VerdaderoFalso);
        break;
      case 5:
        setImagenActual(ReconocerComida);
        break;
      default:
        return setImagenActual(ImagenDefault);
    }
  }, []);

  return (
    <div className="cardJuegos-container" onClick={irAlJuego}>
      <div className="cardJuegos-ficha">
        <img className="cardJuegos-imagen" src={imagenActual} alt="logo"></img>
        <p className="cardJuegos-titulo bw18b">{juego}</p>
      </div>
    </div>
  );
};

export default CardJuegos;
