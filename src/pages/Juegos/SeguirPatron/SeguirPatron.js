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

import { showModalAvatar } from "../../../context/action/modal/modalAvatar";
import ModalAvatar from "../../../components/genericos/ModalAvatar/ModalAvatar";

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
  const [imagenOculto, setImagenOculto] = useState({
    id: 0,
    descripcion: "VagonSinColor",
    img: VagonSinColor,
  });

  const [flgAct, setFlgAct] = useState(true);

  const [btnDisabled, setBtnDisabled] = useState(true);

  const [resultadoJuegoDto, setResultadoJuegoDto] = useState({
    Aciertos: 0,
    Desaciertos: 0,
    JuegoId: 4,
    Finalizado: true,
    FechaInicio: horaInicio,
    FechaFinalizacion: null,
  });

  useEffect(() => {
    if (arrayTrenRandom) {
      if(arrayTrenRandom.length === 0){
        setBtnDisabled(false);
      }
    }
  }, [arrayTrenRandom]);

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
      //Si la imagen vuelve a ser la misma vuelvo a hacer un random
      // if (imagenPreguntaAnterior) {
      //   let preguntaNueva = arrayTren.filter(
      //     (item) => item !== imagenPreguntaAnterior
      //   );
      //   setArrayTrenRandom(
      //     preguntaNueva[Math.floor(Math.random() * preguntaNueva.length)]
      //   );
      // } else {
      // setArrayTrenRandom(
      // );
      // }
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
    });
    setJuegoFinalizado(true);
  };

  useEffect(() => {
    if (juegoFinalizado) {
      showModalAvatar(enviarResultados)(modalAvatarDispatch);
      setJuegoFinalizado(false);
    }
  }, [juegoFinalizado]);

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

  const [contador, setContador] = useState(0);
  const [contadorRandom, setContadorRandom] = useState(0);

  const ponerVagon = (item) => {
    const newArray = [...arrayTrenOculto];
    newArray[contador] = item;

    let nuevoRandom = arrayTrenRandom.filter((e) => e.id !== item.id);

    setArrayTrenOculto(newArray);
    setArrayTrenRandom(nuevoRandom);
    setContador(contador + 1);
  };

  // const sacarVagon = (item) => {
  //   const newArray = [...arrayTrenRandom];
  //   if (newArray.length <= 4) {
  //     newArray.push(item);
  //   }


  //   let nuevoOculto = arrayTrenOculto.filter((e) => e.id === item.id);

  //   setArrayTrenRandom(newArray);
  //   setArrayTrenOculto(nuevoOculto);
  //   setContador(contadorRandom + 1);
  // };

  useEffect(() => {
    if (contadorAciertos === 5) {
      finalizarJuego();
    }
  }, [contadorAciertos]);

  return (
    <>
      {modalAvatarState.modalAvatar.show && <ModalAvatar />}
      <div className="seguirPatron-volverAccion" onClick={volverAlHome}>
        <div className="seguirPatron-btnCont">
          <SalirIcon />
          <p className="seguirPatron-volverBtn c-white">VOLVER</p>
        </div>
      </div>
      <div className="seguirPatron-container">
        {/* <div className="seguirPatron-pregunta bw32b">
              <p className="c-white">¿Es un/a {textoPregunta.descripcion}?</p>
            </div> */}
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
            alt="fruta"
          />
          {Array.isArray(arrayTrenOculto) &&
            arrayTrenOculto.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <img
                    // onClick={() => sacarVagon(item)}
                    className={"seguirPatron-imagen"}
                    src={item.img}
                    alt="vagon"
                  />
                </React.Fragment>
              );
            })}
        </div>

        <div className="seguirPatron-imgContainerDesordenado">
          {Array.isArray(arrayTrenRandom) &&
            arrayTrenRandom.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <img
                    onClick={() => ponerVagon(item)}
                    className={"seguirPatron-imagen"}
                    src={item.img}
                    alt="vagon"
                  />
                </React.Fragment>
              );
            })}
        </div>

        <button
          className={"seguirPatron-finalizarBtn bw24t"}
          onClick={() => finalizarJuego()}
          disabled={btnDisabled}
        >
          Finalizar
        </button>
      </div>
    </>
  );
};
export default SeguirPatron;
