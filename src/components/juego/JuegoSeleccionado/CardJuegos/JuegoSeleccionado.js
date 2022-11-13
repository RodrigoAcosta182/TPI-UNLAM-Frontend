import "./JuegoSeleccionado.css";
import ColorCorrecto from "../../../../assets/images/juegos/ColorCorrecto.png";
import OrdenarNumeros from "../../../../assets/images/juegos/OrdenarNumeros.png";
import VerdaderoFalso from "../../../../assets/images/juegos/VerdaderoFalso.png";
import ReconocerComida from "../../../../assets/images/juegos/ReconocerComida.png";
import SeguirPatron from "../../../../assets/images/juegos/SeguirPatron.png";
import ImagenDefault from "../../../../assets/images/defaultUserImage.png";
import { useEffect, useState } from "react";

const JuegoSeleccionado = ({ juego, irAlJuego, cerrar, imagen }) => {
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
      case 6:
        setImagenActual(SeguirPatron);
        break;
      default:
        return setImagenActual(ImagenDefault);
    }
  }, []);

  return (
    <div className="JuegoSeleccionado-container">
      <div className="JuegoSeleccionado-ficha">
        <img
          className="JuegoSeleccionado-imagen"
          src={imagenActual}
          alt="logo"
        ></img>
        <p className="JuegoSeleccionado-titulo bw24b">{juego}</p>
        <div>
          <button className="btn bgc-danger bw16b c-white" onClick={cerrar}>
            Cerrar
          </button>
          <button className="btn bgc-broccoli bw16b c-white" onClick={irAlJuego}>
            Jugar
          </button>
        </div>
      </div>
    </div>
  );
};

export default JuegoSeleccionado;
