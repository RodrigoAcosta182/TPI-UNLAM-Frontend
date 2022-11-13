import React from "react";
import { useState } from "react";
import { motion, AnimateSharedLayout, m } from "framer-motion";
import "./ColorCorrecto.css";
import { useContext } from "react";
import { GlobalContext } from "../../../context/Provider";
import { useEffect } from "react";
import { wsGetColores } from "../../../context/action/Juegos/colorCorrecto";
import { useHistory } from "react-router-dom";
import SalirIcon from "../../../assets/images/SalirIcon";
import {
  resetFinalizaJuego,
  wsPostFinalizaJuego,
} from "../../../context/action/Juegos/finalizaJuego";
import { showModalAvatar } from "../../../context/action/modal/modalAvatar";
import ModalAvatar from "../../../components/genericos/ModalAvatar/ModalAvatar";
import Loading from "../../../components/genericos/Loading/Loading";
import ListoIcon from "../../../assets/images/ListoIcon.png";
import ListoIconDsb from "../../../assets/images/ListoIconDsb.png";
import FinalizarIcon from "../../../assets/images/FinalizarIcon.png";
import FinalizarIconDsb from "../../../assets/images/FinalizarIconDsb.png";
import FoxIzq from "../../../assets/images/avatar/FoxIzquierda.png";
import FoxDer from "../../../assets/images/avatar/FoxDerecha.png";

export default function ColorCorrecto() {
  const {
    colorCorrectoState,
    colorCorrectoDispatch,
    finalizaJuegoDispatch,
    finalizaJuegoState,
    modalAvatarDispatch,
    modalAvatarState,
  } = useContext(GlobalContext);

  const history = useHistory();

  const horaInicio = new Date();

  const [final, setFinal] = useState(false);
  const [segundoNivel, setSegundoNivel] = useState(false);
  const [colorAnterior, setColorAnterior] = useState();
  const [colors, setColors] = useState([]);
  const [coloresRandom, setColoresRandom] = useState([]);
  const [colorPregunta, setColorPregunta] = useState(null);
  const [resultadoJuegoDto, setResultadoJuegoDto] = useState({
    Aciertos: 0,
    Desaciertos: 0,
    JuegoId: 1,
    Finalizado: true,
    FechaInicio: horaInicio,
    FechaFinalizacion: null,
  });
  const [contadorAciertos, setContadorAciertos] = useState(0);

  useEffect(() => {
    wsGetColores()(colorCorrectoDispatch);
  }, []);

  useEffect(() => {
    if (colorCorrectoState.colores.data) {
      // Si los aciertos son menos de 4 muestro solamente 4 colores
      // sino muestro todos
      if (resultadoJuegoDto.Aciertos < 4) {
        setColors([
          colorCorrectoState.colores.data[0].hexadecimal,
          colorCorrectoState.colores.data[1].hexadecimal,
          colorCorrectoState.colores.data[2].hexadecimal,
          colorCorrectoState.colores.data[3].hexadecimal,
        ]);
      } else {
        setSegundoNivel(true);
        setColors([
          colorCorrectoState.colores.data[0].hexadecimal,
          colorCorrectoState.colores.data[1].hexadecimal,
          colorCorrectoState.colores.data[2].hexadecimal,
          colorCorrectoState.colores.data[3].hexadecimal,
          colorCorrectoState.colores.data[4].hexadecimal,
          colorCorrectoState.colores.data[5].hexadecimal,
          colorCorrectoState.colores.data[6].hexadecimal,
          colorCorrectoState.colores.data[7].hexadecimal,
        ]);
      }

      // Aca pregunto si los aciertos son menor a cuatro filtro entre los primeros 4
      // sino muestro todos los colores
      let cuatroColores = [];
      if (resultadoJuegoDto.Aciertos < 4) {
        cuatroColores = colorCorrectoState.colores.data.slice(0, 4);
      } else {
        cuatroColores = colorCorrectoState.colores.data;
      }

      // En este if pregunto si ya se utilizo un color en especifico para no repetirlo
      // en la siguiente pregunta
      if (colorAnterior) {
        let colorNuevo = cuatroColores.filter(
          (item) => item.id !== colorAnterior.id
        );
        setColorPregunta(
          colorNuevo[Math.floor(Math.random() * colorNuevo.length)]
        );
      } else {
        setColorPregunta(
          cuatroColores[Math.floor(Math.random() * cuatroColores.length)]
        );
      }
    }
  }, [colorCorrectoState.colores.data, colorAnterior]);

  useEffect(() => {
    if (colors && colorPregunta) {
      setColoresRandom(colors.sort(() => Math.random() - 0.5));
    }
  }, [colors, colorPregunta]);

  const [selected, setSelected] = useState(colors[0]);

  const enviarColorCorrecto = () => {
    if (selected !== null && selected !== undefined) {
      // if (resultadoJuegoDto.Aciertos < 4) {
      setColorAnterior(colorPregunta);
      if (selected === colorPregunta.hexadecimal) {
        setResultadoJuegoDto({
          ...resultadoJuegoDto,
          Aciertos: resultadoJuegoDto.Aciertos + 1,
        });
        setContadorAciertos(contadorAciertos + 1);
      } else {
        setResultadoJuegoDto({
          ...resultadoJuegoDto,
          Desaciertos: resultadoJuegoDto.Desaciertos + 1,
        });
        setContadorAciertos(0);
      }
      wsGetColores()(colorCorrectoDispatch);
      setSelected(undefined);
      // }
    } else {
      console.log("Debe seleccionar un color");
    }
  };

  useEffect(() => {
    if (contadorAciertos === 5) {
      finalizarJuego();
    }
  }, [contadorAciertos]);

  const finalizarJuego = () => {
    let horarioFinalizacion = new Date();
    setResultadoJuegoDto({
      ...resultadoJuegoDto,
      FechaFinalizacion: horarioFinalizacion,
      Finalizado: false,
    });

    //poner logica de loading y push
  };

  useEffect(() => {
    if (resultadoJuegoDto.FechaFinalizacion !== null) {
      showModalAvatar(enviarResultados)(modalAvatarDispatch);
    }
  }, [resultadoJuegoDto.FechaFinalizacion]);

  // Este useEffect se utilizo porque sino no llega a ver los cambios de la fecha
  // de finalizacion al mandar el dto
  const enviarResultados = () => {
    wsPostFinalizaJuego(resultadoJuegoDto)(finalizaJuegoDispatch);
  };

  useEffect(() => {
    if (finalizaJuegoState.finalizaJuego.data !== null) {
      volverAlHome();
      resetFinalizaJuego()(finalizaJuegoDispatch);
    }
  }, [finalizaJuegoState.finalizaJuego.data]);

  const volverAlHome = () => {
    history.push("/home");
  };

  return (
    <>
      {modalAvatarState.modalAvatar.show && <ModalAvatar />}
      <Loading
        state={finalizaJuegoState.finalizaJuego.loading}
        mensaje={"Enviando resultados..."}
      />
      {/* <HeaderbarHome/> */}
      <div className="colorCorrecto-volverAccion">
        <div className="colorCorrecto-btnCont" onClick={volverAlHome}>
          <SalirIcon />
          <p className="colorCorrecto-volverBtn c-white">VOLVER</p>
        </div>
      </div>
      <div className="colorCorrecto-animal-juego">
        <img
          className="colorCorrecto-animalIzq"
          alt="fox"
          src={FoxIzq}
          width="200"
          height="250"
        ></img>
        <div className="colorCorrecto-container">
          {colorPregunta ? (
            <>
              <div className="colorCorrecto-pregunta bw32b">
                <p className="c-white">¿Qué color es</p>
                <div
                  className="colorCorrecto-prgColor"
                  style={{ background: colorPregunta.hexadecimal }}
                >
                  {" "}
                </div>
                <p className="c-white"> ?</p>
              </div>
            </>
          ) : (
            ""
          )}
          <div
            className={
              segundoNivel
                ? "colorCorrecto-boxColores2do"
                : "colorCorrecto-boxColores"
            }
          >
            <AnimateSharedLayout>
              <ul
                className={
                  segundoNivel ? "colorCorrectoNivel2-ul" : "colorCorrecto-ul"
                }
              >
                {coloresRandom.map((color) => (
                  <Item
                    key={color}
                    color={color}
                    isSelected={selected === color}
                    onClick={() => setSelected(color)}
                  />
                ))}
              </ul>
            </AnimateSharedLayout>
            {colorPregunta && (
              <div className="colorCorrecto-btnContainer">
                <button
                  className={
                    resultadoJuegoDto.Aciertos > 0 ||
                    resultadoJuegoDto.Desaciertos > 0
                      ? "iconButtonColor bw24t"
                      : "iconButtonColor bw24t"
                  }
                  onClick={
                    resultadoJuegoDto.Aciertos > 0 ||
                    resultadoJuegoDto.Desaciertos > 0
                      ? finalizarJuego
                      : () => {}
                  }
                  style={
                    resultadoJuegoDto.Aciertos > 0 ||
                    resultadoJuegoDto.Desaciertos > 0
                      ? { cursor: "pointer" }
                      : { cursor: "initial" }
                  }
                >
                  <img
                    alt="listo"
                    src={
                      resultadoJuegoDto.Aciertos > 0 ||
                      resultadoJuegoDto.Desaciertos > 0
                        ? FinalizarIcon
                        : FinalizarIconDsb
                    }
                    width={80}
                  ></img>
                  <p className="c-white">Finalizar</p>
                </button>

                <button
                  className={
                    selected === undefined
                      ? "iconButtonColor bw24t"
                      : "iconButtonColor bw24t"
                  }
                  onClick={
                    selected === undefined ? () => {} : enviarColorCorrecto
                  }
                  style={
                    selected === undefined
                      ? { cursor: "initial" }
                      : { cursor: "pointer" }
                  }
                >
                  <img
                    alt="listo"
                    src={selected === undefined ? ListoIconDsb : ListoIcon}
                    width={80}
                  ></img>
                  <p className="c-white">Siguiente</p>
                </button>
              </div>
            )}
          </div>
        </div>
        <img
          className="colorCorrecto-animalDer"
          alt="fox"
          src={FoxDer}
          width="200"
          height="250"
        ></img>
      </div>
    </>
  );
}

function Item({ color, isSelected, onClick }) {
  return (
    <li
      className="colorCorrecto-li"
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {isSelected && (
        <motion.div
          layoutId="outline"
          className="colorCorrecto-outline"
          initial={false}
          animate={{ borderColor: color }}
          transition={spring}
        />
      )}
    </li>
  );
}

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};
