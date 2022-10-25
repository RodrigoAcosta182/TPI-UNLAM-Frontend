import React from "react";
import { useState } from "react";
import { motion, AnimateSharedLayout, m } from "framer-motion";
import "./VerdaderoFalso.css";
import { useContext } from "react";
import { GlobalContext } from "../../../context/Provider";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import SalirIcon from "../../../assets/images/SalirIcon";
import { wsPostFinalizaJuego } from "../../../context/action/Juegos/finalizaJuego";
import CheckIcon from "../../../assets/images/CheckIcon";
import CruzIcon from "../../../assets/images/CruzIcon";
import Anana from "../../../assets/images/frutas/Anana.png";
import Frutilla from "../../../assets/images/frutas/Frutilla.png";
import Manzana from "../../../assets/images/frutas/Manzana.png";
import Naranja from "../../../assets/images/frutas/Naranja.png";
import Uva from "../../../assets/images/frutas/Uva.png";
import { showModalAvatar } from "../../../context/action/modal/modalAvatar";

const VerdaderoFalso = () => {
  const { finalizaJuegoDispatch, modalAvatarDispatch } = useContext(GlobalContext);

  const history = useHistory();

  const horaInicio = new Date();

  const [arrayFrutas, setArrayFrutas] = useState(null);
  const [textoPregunta, setTextoPregunta] = useState(null);
  const [imagenPregunta, setImagenPregunta] = useState(null);

  const [resultadoJuegoDto, setResultadoJuegoDto] = useState({
    Aciertos: 0,
    Desaciertos: 0,
    JuegoId: 4,
    Finalizado: true,
    FechaInicio: horaInicio,
    FechaFinalizacion: null,
  });

  useEffect(() => {
    setArrayFrutas([
      { id: 1, descripcion: "Naranja", img: Naranja },
      { id: 1, descripcion: "Uva", img: Uva },
      { id: 1, descripcion: "Anana", img: Anana },
      { id: 1, descripcion: "Frutilla", img: Frutilla },
      { id: 1, descripcion: "Manzana", img: Manzana },
    ]);
  }, []);

  useEffect(() => {
    if (arrayFrutas) {
      setImagenPregunta(
        arrayFrutas[Math.floor(Math.random() * arrayFrutas.length)]
      );
      setTextoPregunta(
        arrayFrutas[Math.floor(Math.random() * arrayFrutas.length)]
      );
    }
  }, [arrayFrutas]);

  const finalizarJuego = () => {
    let horarioFinalizacion = new Date();
    setResultadoJuegoDto({
      ...resultadoJuegoDto,
      FechaFinalizacion: horarioFinalizacion,
    });
  };

  useEffect(() => {
    if (resultadoJuegoDto.FechaFinalizacion !== null) {
      showModalAvatar(enviarResultados)(modalAvatarDispatch);
    }
  }, [resultadoJuegoDto.FechaFinalizacion]);

  const enviarResultados = () => {
    wsPostFinalizaJuego(resultadoJuegoDto)(finalizaJuegoDispatch);
  };

  const volverAlHome = () => {
    history.push("/home");
  };

  const responder = (resp) => {
    if (resp === "si") {
      if (textoPregunta === imagenPregunta) {
        setResultadoJuegoDto({
          ...resultadoJuegoDto,
          Aciertos: resultadoJuegoDto.Aciertos + 1,
        });
      } else {
        setResultadoJuegoDto({
          ...resultadoJuegoDto,
          Desaciertos: resultadoJuegoDto.Desaciertos + 1,
        });
      }
      setImagenPregunta(
        arrayFrutas[Math.floor(Math.random() * arrayFrutas.length)]
      );
      setTextoPregunta(
        arrayFrutas[Math.floor(Math.random() * arrayFrutas.length)]
      );
    }
    if (resp === "no") {
      if (textoPregunta === imagenPregunta) {
        setResultadoJuegoDto({
          ...resultadoJuegoDto,
          Desaciertos: resultadoJuegoDto.Desaciertos + 1,
        });
      } else {
        setResultadoJuegoDto({
          ...resultadoJuegoDto,
          Aciertos: resultadoJuegoDto.Aciertos + 1,
        });
      }
    }
    setImagenPregunta(
      arrayFrutas[Math.floor(Math.random() * arrayFrutas.length)]
    );
    setTextoPregunta(
      arrayFrutas[Math.floor(Math.random() * arrayFrutas.length)]
    );
  };

  return (
    <>
      <div className="verdaderofalso-volverAccion" onClick={volverAlHome}>
        <div className="verdaderofalso-btnCont">
          <SalirIcon />
          <p className="verdaderofalso-volverBtn c-white">VOLVER</p>
        </div>
      </div>
      <div className="verdaderofalso-container">
        {imagenPregunta && textoPregunta && (
          <>
            <div className="verdaderofalso-pregunta bw32b">
              <p className="c-white">¿Es un/a {textoPregunta.descripcion}?</p>
            </div>

            <div className="verdaderofalso-imgContainer">
              <img
                className={"verdaderofalso-imagen"}
                src={imagenPregunta.img}
                alt="fruta"
              />
            </div>

            <div className="verdaderofalso-boxBtn">
              <button
                className={"verdaderofalso-falseBtn bw24t c-white"}
                onClick={() => responder("no")}
              >
                <CruzIcon /> Falso
              </button>
              <button
                className={"verdaderofalso-trueBtn bw24t c-white"}
                onClick={() => responder("si")}
              >
                <CheckIcon /> Verdadero
              </button>
            </div>
          </>
        )}
        <button
          className={"verdaderofalso-finalizarBtn bw24t"}
          onClick={() => finalizarJuego()}
        >
          Finalizar
        </button>
      </div>
    </>
  );
};
export default VerdaderoFalso;
