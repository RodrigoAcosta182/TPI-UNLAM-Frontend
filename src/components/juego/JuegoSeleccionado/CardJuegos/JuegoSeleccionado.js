import "./JuegoSeleccionado.css";
import ImagenJuego from "../../../../assets/images/defaultUserImage.png";

const JuegoSeleccionado = ({ juego, irAlJuego, cerrar }) => {
  return (
    <div className="JuegoSeleccionado-container">
      <div className="JuegoSeleccionado-ficha">
        <img
          className="JuegoSeleccionado-imagen"
          src={ImagenJuego}
          alt="logo"
        ></img>
        <p className="JuegoSeleccionado-titulo">{juego}</p>
        <div>
          <button className="btn bgc-danger c-white" onClick={cerrar}>Cerrar</button>
          <button className="btn bgc-broccoli c-white" onClick={irAlJuego}>Jugar</button>
        </div>
      </div>
    </div>
  );
};

export default JuegoSeleccionado;
