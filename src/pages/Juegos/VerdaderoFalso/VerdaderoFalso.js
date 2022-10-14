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

const VerdaderoFalso = () => {
  const { finalizaJuegoDispatch } = useContext(GlobalContext);

  const history = useHistory();
  const [resultadoJuegoDto, setResultadoJuegoDto] = useState({
    Aciertos: null,
    Desaciertos: null,
    JuegoId: 1,
    Finalizado: true,
  });

  const finalizarJuego = () => {
    wsPostFinalizaJuego(resultadoJuegoDto)(finalizaJuegoDispatch);
    //poner logica de loading y push
    history.push("/");
  };

  useEffect(() => {
    //revisar para darle el finalizar
    if (resultadoJuegoDto.Desaciertos >= 4) {
      wsPostFinalizaJuego(resultadoJuegoDto)(finalizaJuegoDispatch);
    }
  }, [resultadoJuegoDto.Desaciertos]);

  const volverAlHome = () => {
    history.push("/home");
  };

  const verdadero = () => {
    alert("CORRECTO")
  };

  const falso = () => {
    alert("Intenta de nuevo")
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
        <div className="verdaderofalso-pregunta bw32b">
          <p className="c-white">¿Esto es una manzana?</p>
        </div>

        <div className="verdaderofalso-imgContainer">
          <img
            className="verdaderofalso-imagen"
            alt="objeto"
            src="https://images.vexels.com/media/users/3/182371/isolated/preview/2f8c7e9f42c7781c3846b435475f92af-plano-de-fruta-de-manzana.png"
          ></img>
        </div>

        <div className="verdaderofalso-boxBtn">
          <>
            <button
              className={"verdaderofalso-falseBtn bw24t c-white"}
              onClick={() => falso()}
            >
              <CruzIcon /> Falso
            </button>
            <button
              className={"verdaderofalso-trueBtn bw24t c-white"}
              onClick={() => verdadero()}
            >
              <CheckIcon /> Verdadero
            </button>
          </>
        </div>
      </div>
    </>
  );
};
export default VerdaderoFalso;
