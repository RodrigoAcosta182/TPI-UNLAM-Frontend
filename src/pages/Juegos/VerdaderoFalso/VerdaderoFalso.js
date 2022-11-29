import React from "react";
import { useState } from "react";
import { motion, AnimateSharedLayout, m } from "framer-motion";
import "./VerdaderoFalso.css";
import { useContext } from "react";
import { GlobalContext } from "../../../context/Provider";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import SalirIcon from "../../../assets/images/SalirIcon";
import {
  resetFinalizaJuego,
  wsPostFinalizaJuego,
} from "../../../context/action/Juegos/finalizaJuego";
import Anana from "../../../assets/images/frutas/Anana.png";
import Frutilla from "../../../assets/images/frutas/Frutilla.png";
import Manzana from "../../../assets/images/frutas/Manzana.png";
import Naranja from "../../../assets/images/frutas/Naranja.png";
import Uva from "../../../assets/images/frutas/Uva.png";
import { showModalAvatar } from "../../../context/action/modal/modalAvatar";
import ModalAvatar from "../../../components/genericos/ModalAvatar/ModalAvatar";
import InactiveIcon from "../../../assets/images/InactiveIcon.png";
import ActiveIcon from "../../../assets/images/ActiveIcon.png";
import FoxIzq from "../../../assets/images/avatar/FoxIzquierda.png";
import FoxDer from "../../../assets/images/avatar/FoxDerecha.png";
import FinalizarIcon from "../../../assets/images/FinalizarIcon.png";
import FinalizarIconDsb from "../../../assets/images/FinalizarIconDsb.png";
import ModalMensaje from "../../../components/genericos/ModalMensaje/ModalMensaje";
import AyudaIcon from "../../../assets/images/AyudaIcon";
import Modal from "../../../components/genericos/Modal/Modal";
import { hideModal, showModal } from "../../../context/action/modal/modal";
import ReactTooltip from "react-tooltip";

const VerdaderoFalso = () => {
  const {
    finalizaJuegoState,
    finalizaJuegoDispatch,
    modalAvatarDispatch,
    modalAvatarState,
    textosState,
    modalState,
    modalDispatch,
  } = useContext(GlobalContext);

  const history = useHistory();

  const horaInicio = new Date();

  const [imagenPreguntaAnterior, setImagenPreguntaAnterior] = useState(null);
  const [textoPreguntaAnterior, setTextoPreguntaAnterior] = useState(null);

  const [arrayFrutas, setArrayFrutas] = useState(null);
  const [textoPregunta, setTextoPregunta] = useState(null);
  const [imagenPregunta, setImagenPregunta] = useState(null);
  const [contadorAciertos, setContadorAciertos] = useState(0);

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
      //Si la imagen vuelve a ser la misma vuelvo a hacer un random
      if (imagenPreguntaAnterior) {
        let preguntaNueva = arrayFrutas.filter(
          (item) => item !== imagenPreguntaAnterior
        );
        setImagenPregunta(
          preguntaNueva[Math.floor(Math.random() * preguntaNueva.length)]
        );
      } else {
        setImagenPregunta(
          arrayFrutas[Math.floor(Math.random() * arrayFrutas.length)]
        );
      }

      //Si el texto vuelve a ser la misma vuelvo a hacer un random
      if (textoPreguntaAnterior) {
        let textoNuevo = arrayFrutas.filter(
          (item) => item !== textoPreguntaAnterior
        );
        setTextoPregunta(
          textoNuevo[Math.floor(Math.random() * textoNuevo.length)]
        );
      } else {
        setTextoPregunta(
          arrayFrutas[Math.floor(Math.random() * arrayFrutas.length)]
        );
      }
    }
  }, [arrayFrutas, imagenPreguntaAnterior, textoPreguntaAnterior]);

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

  const responder = (resp) => {
    setImagenPreguntaAnterior(imagenPregunta);
    setTextoPreguntaAnterior(textoPregunta);
    setBtnDisabled(false);
    if (resp === "si") {
      if (textoPregunta === imagenPregunta) {
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
        setContadorAciertos(0);
      } else {
        setResultadoJuegoDto({
          ...resultadoJuegoDto,
          Aciertos: resultadoJuegoDto.Aciertos + 1,
        });
        setContadorAciertos(contadorAciertos + 1);
      }
    }
    setImagenPregunta(
      arrayFrutas[Math.floor(Math.random() * arrayFrutas.length)]
    );
    setTextoPregunta(
      arrayFrutas[Math.floor(Math.random() * arrayFrutas.length)]
    );
  };

  useEffect(() => {
    if (contadorAciertos === 5) {
      finalizarJuego();
    }
  }, [contadorAciertos]);

  const modalAyuda = () => {
    showModal(
      <ModalMensaje
        titulo={"Información"}
        mensaje={textosState.textos.data[4].mensaje}
      />,
      "",
      cerrarModal,
      true,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  const cerrarModal = () => {
    hideModal()(modalDispatch);
  };

  return (
    <>
      {modalState.modal.show && <Modal />}
      {modalAvatarState.modalAvatar.show && <ModalAvatar />}
      <div className="verdaderofalso-volverAccion">
        <div className="verdaderofalso-btnCont" onClick={volverAlHome}>
          <SalirIcon />
          <p className="verdaderofalso-volverBtn c-white">VOLVER</p>
        </div>
        <button
          className="verdaderofalso-ayudaBtn bw14b"
          onClick={() => modalAyuda()}
          data-tip
          data-for={`botonTooltipAyuda`}
        >
          <AyudaIcon color={"white"} />
          <ReactTooltip
            id={`botonTooltipAyuda`}
            place="top"
            type="light"
            effect="solid"
            border={true}
          >
            Mas información
          </ReactTooltip>
        </button>
      </div>

      <div className="verdaderofalso-animal-juego">
        <img
          className="verdaderofalso-animalIzq"
          alt="fox"
          src={FoxIzq}
          width="200"
          height="250"
        ></img>
        <div className="verdaderofalso-container">
          {imagenPregunta && textoPregunta && (
            <>
              <div className="verdaderofalso-pregunta bw32b">
                <p className="c-white">¿Es un/a {textoPregunta.descripcion}?</p>
              </div>
              <div className="verdaderofalso-btnContainer">
                <button
                  className="iconButton bw24t btnDesktop"
                  onClick={() => responder("no")}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    alt="listo"
                    className="widthBtn"
                    src={InactiveIcon}
                  ></img>
                  <p className="c-white">Falso</p>
                </button>

                <div className="verdaderofalso-imgContainer">
                  <img
                    className={"verdaderofalso-imagen"}
                    src={imagenPregunta.img}
                    alt="fruta"
                  />
                </div>

                <button
                  className="iconButton bw24t btnDesktop"
                  onClick={() => responder("si")}
                  style={{ cursor: "pointer" }}
                >
                  <img alt="listo" className="widthBtn" src={ActiveIcon}></img>
                  <p className="verdaderobtn c-white">Verdadero</p>
                </button>
              </div>
            </>
          )}
          <div className="verdaderofalso-mobileCont">
            <button
              className="iconButton bw24t"
              onClick={() => responder("no")}
              style={{ cursor: "pointer" }}
            >
              <img alt="listo" className="widthBtn" src={InactiveIcon}></img>
              <p className="c-white">Falso</p>
            </button>
            <button
              className="iconButton bw24t"
              onClick={() => responder("si")}
              style={{ cursor: "pointer" }}
            >
              <img alt="listo" className="widthBtn" src={ActiveIcon}></img>
              <p className="verdaderobtn c-white">Verdadero</p>
            </button>
          </div>
          <button
            className="iconButtonFin bw24t"
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
        </div>
        <img
          className="verdaderofalso-animalDer"
          alt="fox"
          src={FoxDer}
          width="200"
          height="250"
        ></img>
      </div>
    </>
  );
};
export default VerdaderoFalso;
