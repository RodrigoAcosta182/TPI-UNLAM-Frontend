import React from "react";
import { useState } from "react";
import { motion, AnimateSharedLayout, m } from "framer-motion";
import "./SeguirPatron.css";
import { useContext } from "react";
import { GlobalContext } from "../../../context/Provider";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import SalirIcon from "../../../assets/images/SalirIcon";
import {
  resetFinalizaJuego,
  wsPostFinalizaJuego,
} from "../../../context/action/Juegos/finalizaJuego";

import TrenDel from "../../../assets/images/tren/TrenDel.png";
import VagonAzul from "../../../assets/images/tren/Vagon1.png";
import VagonRojo from "../../../assets/images/tren/Vagon2.png";
import VagonVerde from "../../../assets/images/tren/Vagon3.png";
import VagonNegro from "../../../assets/images/tren/Vagon4.png";
import VagonAmarillo from "../../../assets/images/tren/Vagon5.png";
import VagonSinColor from "../../../assets/images/tren/VagonSinColor.png";
import ListoIcon from "../../../assets/images/ListoIcon.png";
import ListoIconDsb from "../../../assets/images/ListoIconDsb.png";
import FinalizarIcon from "../../../assets/images/FinalizarIcon.png";
import FinalizarIconDsb from "../../../assets/images/FinalizarIconDsb.png";
import LimpiarIcon from "../../../assets/images/LimpiarIcon.png";
import { showModalAvatar } from "../../../context/action/modal/modalAvatar";
import ModalAvatar from "../../../components/genericos/ModalAvatar/ModalAvatar";
import FoxIzq from "../../../assets/images/avatar/FoxIzquierda.png";
import FoxDer from "../../../assets/images/avatar/FoxDerecha.png";

const SeguirPatron = () => {
  const {
    finalizaJuegoState,
    finalizaJuegoDispatch,
    modalAvatarDispatch,
    modalAvatarState,
  } = useContext(GlobalContext);

  const history = useHistory();

  const horaInicio = new Date();

  const [arrayTren, setArrayTren] = useState(null);
  const [arrayTrenOculto, setArrayTrenOculto] = useState(null);
  const [arrayTrenRandom, setArrayTrenRandom] = useState(null);
  const [juegoFinalizado, setJuegoFinalizado] = useState(false);
  const [contadorAciertos, setContadorAciertos] = useState(0);
  const [contador, setContador] = useState(0);

  const [flgAct, setFlgAct] = useState(true);
  const [flgPrimerItem, setFlgPrimerItem] = useState(false);

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [btnLimpiar, setBtnLimpiar] = useState(false);

  const [resultadoJuegoDto, setResultadoJuegoDto] = useState({
    Aciertos: 0,
    Desaciertos: 0,
    JuegoId: 6,
    Finalizado: true,
    FechaInicio: horaInicio,
    FechaFinalizacion: null,
  });

  useEffect(() => {
    if (arrayTrenRandom) {
      if (arrayTrenRandom.length === 0) {
        setBtnDisabled(false);
      }
      if (flgPrimerItem) {
        setBtnLimpiar(true);
      }
    }
  }, [arrayTrenRandom, flgPrimerItem]);

  useEffect(() => {
    setArrayTren([
      { id: 1, descripcion: "VagonAzul", img: VagonAzul },
      { id: 2, descripcion: "VagonRojo", img: VagonRojo },
      { id: 3, descripcion: "VagonVerde", img: VagonVerde },
      { id: 4, descripcion: "VagonNegro", img: VagonNegro },
      { id: 5, descripcion: "VagonAmarillo", img: VagonAmarillo },
    ]);
    setArrayTrenOculto([
      { id: 1, descripcion: "VagonSinColor", img: VagonSinColor },
      { id: 2, descripcion: "VagonSinColor", img: VagonSinColor },
      { id: 3, descripcion: "VagonSinColor", img: VagonSinColor },
      { id: 4, descripcion: "VagonSinColor", img: VagonSinColor },
      { id: 5, descripcion: "VagonSinColor", img: VagonSinColor },
    ]);
    setArrayTrenRandom([
      { id: 1, descripcion: "VagonAzul", img: VagonAzul },
      { id: 2, descripcion: "VagonRojo", img: VagonRojo },
      { id: 3, descripcion: "VagonVerde", img: VagonVerde },
      { id: 4, descripcion: "VagonNegro", img: VagonNegro },
      { id: 5, descripcion: "VagonAmarillo", img: VagonAmarillo },
    ]);
  }, []);

  useEffect(() => {
    if (arrayTren && arrayTrenRandom && flgAct) {
      arrayTren.sort(function () {
        return Math.random() - 0.5;
      });
      arrayTrenRandom.sort(function () {
        return Math.random() - 0.5;
      });
      setFlgAct(false);
    }
  }, [arrayTren, arrayTrenRandom]);

  const finalizarJuego = () => {
    let horarioFinalizacion = new Date();
    setResultadoJuegoDto({
      ...resultadoJuegoDto,
      FechaFinalizacion: horarioFinalizacion,
      Finalizado: contadorAciertos === 5 ? true : false,
    });
  };

  useEffect(() => {
    if (resultadoJuegoDto.FechaFinalizacion !== null) {
      showModalAvatar(enviarResultados)(modalAvatarDispatch);
    }
  }, [resultadoJuegoDto.FechaFinalizacion]);

  const limpiarArray = () => {
    setFlgPrimerItem(false);
    setArrayTrenOculto([
      { id: 1, descripcion: "VagonSinColor", img: VagonSinColor },
      { id: 2, descripcion: "VagonSinColor", img: VagonSinColor },
      { id: 3, descripcion: "VagonSinColor", img: VagonSinColor },
      { id: 4, descripcion: "VagonSinColor", img: VagonSinColor },
      { id: 5, descripcion: "VagonSinColor", img: VagonSinColor },
    ]);
    setArrayTrenRandom([
      { id: 1, descripcion: "VagonAzul", img: VagonAzul },
      { id: 2, descripcion: "VagonRojo", img: VagonRojo },
      { id: 3, descripcion: "VagonVerde", img: VagonVerde },
      { id: 4, descripcion: "VagonNegro", img: VagonNegro },
      { id: 5, descripcion: "VagonAmarillo", img: VagonAmarillo },
    ]);
    arrayTrenRandom.sort(function () {
      return Math.random() - 0.5;
    });
    setContador(0);
    setBtnLimpiar(false);
  };

  useEffect(() => {
    if (finalizaJuegoState.finalizaJuego.data !== null) {
      volverAlHome();
      resetFinalizaJuego()(finalizaJuegoDispatch);
    }
  }, [finalizaJuegoState.finalizaJuego.data]);

  const enviarResultados = () => {
    wsPostFinalizaJuego(resultadoJuegoDto)(finalizaJuegoDispatch);
  };

  const volverAlHome = () => {
    history.push("/home");
  };

  const ponerVagon = (item) => {
    setFlgPrimerItem(true);
    const newArray = [...arrayTrenOculto];
    newArray[contador] = item;

    let nuevoRandom = arrayTrenRandom.filter((e) => e.id !== item.id);

    setArrayTrenOculto(newArray);
    setArrayTrenRandom(nuevoRandom);
    setContador(contador + 1);
  };

  const [flgSiguiente, setFlgSiguiente] = useState(false);

  const enviarPatron = () => {
    let comparacion = null;
    for (var i = 0; i < arrayTrenOculto.length; i++) {
      for (var j = 0; j < arrayTren.length; j++) {
        if (arrayTrenOculto[i].id === arrayTren[j].id) {
          comparacion = true;
        } else {
          comparacion = false;
        }
      }
    }

    if (comparacion === true) {
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
    setArrayTrenOculto([
      { id: 1, descripcion: "VagonSinColor", img: VagonSinColor },
      { id: 2, descripcion: "VagonSinColor", img: VagonSinColor },
      { id: 3, descripcion: "VagonSinColor", img: VagonSinColor },
      { id: 4, descripcion: "VagonSinColor", img: VagonSinColor },
      { id: 5, descripcion: "VagonSinColor", img: VagonSinColor },
    ]);
    setArrayTrenRandom([
      { id: 1, descripcion: "VagonAzul", img: VagonAzul },
      { id: 2, descripcion: "VagonRojo", img: VagonRojo },
      { id: 3, descripcion: "VagonVerde", img: VagonVerde },
      { id: 4, descripcion: "VagonNegro", img: VagonNegro },
      { id: 5, descripcion: "VagonAmarillo", img: VagonAmarillo },
    ]);
    setFlgSiguiente(true);
    setBtnLimpiar(false);
    setFlgPrimerItem(false);

    setContador(0);
  };

  useEffect(() => {
    if (flgSiguiente) {
      arrayTrenRandom.sort(function () {
        return Math.random() - 0.5;
      });
      arrayTren.sort(function () {
        return Math.random() - 0.5;
      });
      setFlgSiguiente(false);
    }
  }, [flgSiguiente]);

  useEffect(() => {
    if (contadorAciertos === 5) {
      finalizarJuego();
    }
  }, [contadorAciertos]);

  return (
    <>
      {modalAvatarState.modalAvatar.show && <ModalAvatar />}
      <div className="seguirPatron-volverAccion">
        <div className="seguirPatron-btnCont" onClick={volverAlHome}>
          <SalirIcon />
          <p className="seguirPatron-volverBtn c-white">VOLVER</p>
        </div>
      </div>
      <div className="seguirPatron-animal-juego">
        <img
          className="seguirPatron-animalIzq"
          alt="fox"
          src={FoxIzq}
          width="200"
          height="250"
        ></img>
        <div className="seguirPatron-container">
          <div className="seguirPatron-pregunta-oculto">
            <div className="seguirPatron-imgContainer">
              <img
                className={"seguirPatron-imagenTren"}
                src={TrenDel}
                alt="fruta"
              />

              {Array.isArray(arrayTren) &&
                arrayTren.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <img
                        className={"seguirPatron-imagen"}
                        src={item.img}
                        alt="vagon"
                      />
                    </React.Fragment>
                  );
                })}
            </div>

            <div className="seguirPatron-imgContainer">
              <img
                className={"seguirPatron-imagenTren"}
                src={TrenDel}
                alt="tren"
              />
              {Array.isArray(arrayTrenOculto) &&
                arrayTrenOculto.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <img
                        className={"seguirPatron-imagen"}
                        src={item.img}
                        alt="vagon"
                      />
                    </React.Fragment>
                  );
                })}
            </div>
          </div>

          {arrayTrenRandom && arrayTrenRandom.length === 0 ? (
            <button
              className={"iconButtonColorPatron bw24t"}
              onClick={limpiarArray}
              style={{ cursor: "pointer" }}
            >
              <img alt="listo" src={LimpiarIcon} width={80}></img>
              <p className="c-white">Borrar</p>
            </button>
          ) : (
            <div className="seguirPatron-imgContainerDesordenado">
              {Array.isArray(arrayTrenRandom) &&
                arrayTrenRandom.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <img
                        onClick={() => ponerVagon(item)}
                        className={"seguirPatron-imagenRand"}
                        src={item.img}
                        alt="vagon"
                      />
                    </React.Fragment>
                  );
                })}
            </div>
          )}

          {arrayTrenRandom && (
            <div className="seguirPatron-btnContainer">
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
                  arrayTrenRandom.length > 0
                    ? "iconButtonColor bw24t"
                    : "iconButtonColor bw24t"
                }
                onClick={arrayTrenRandom.length > 0 ? () => {} : enviarPatron}
                style={
                  arrayTrenRandom.length > 0
                    ? { cursor: "initial" }
                    : { cursor: "pointer" }
                }
              >
                <img
                  alt="listo"
                  src={arrayTrenRandom.length > 0 ? ListoIconDsb : ListoIcon}
                  width={80}
                ></img>
                <p className="c-white">Siguiente</p>
              </button>
            </div>
          )}
        </div>
        <img
          className="seguirPatron-animalDer"
          alt="fox"
          src={FoxDer}
          width="200"
          height="250"
        ></img>
      </div>
    </>
  );
};
export default SeguirPatron;
