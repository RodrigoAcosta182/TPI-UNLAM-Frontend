import React from "react";
import { useState } from "react";
import "./ComidaCorrecta.css";
import { useContext } from "react";
import { GlobalContext } from "../../../context/Provider";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import SalirIcon from "../../../assets/images/SalirIcon";
import { resetFinalizaJuego, wsPostFinalizaJuego } from "../../../context/action/Juegos/finalizaJuego";
import fox from "../../../assets/images/avatar/Fox.png";
import Burbuja from "../../../assets/images/avatar/Burbuja.png";
import Comida1 from "../../../assets/images/comidas/Comida1.png";
import Comida2 from "../../../assets/images/comidas/Comida2.png";
import Comida3 from "../../../assets/images/comidas/Comida3.png";
import Comida4 from "../../../assets/images/comidas/Comida4.png";
import { showModalAvatar } from "../../../context/action/modal/modalAvatar";
import ModalAvatar from "../../../components/genericos/ModalAvatar/ModalAvatar";

const ComidaCorrecta = () => {
  const { modalAvatarState, modalAvatarDispatch, finalizaJuegoState, finalizaJuegoDispatch } =
    useContext(GlobalContext);

  const history = useHistory();

  const horaInicio = new Date();

  const [selected, setSelected] = useState(null);

  const [arrayComidas, setArrayComidas] = useState(null);

  const [comidaSelected, setComidaSelected] = useState(null);
  const [comidaBurbuja, setComidaBurbuja] = useState();
  const [comidaAnterior, setComidaAnterior] = useState();
  const [contadorAciertos, setContadorAciertos] = useState(0);

  const [resultadoJuegoDto, setResultadoJuegoDto] = useState({
    Aciertos: 0,
    Desaciertos: 0,
    JuegoId: 5,
    Finalizado: true,
    FechaInicio: horaInicio,
    FechaFinalizacion: null,
  });

  useEffect(() => {
    setArrayComidas([Comida1, Comida2, Comida3, Comida4]);
  }, []);

  useEffect(() => {
    if (arrayComidas) {
      if (comidaAnterior) {
        let comidaNuevo = arrayComidas.filter(
          (item) => item !== comidaAnterior
        );
        setComidaBurbuja(
          comidaNuevo[Math.floor(Math.random() * comidaNuevo.length)]
        );
      } else {
        setComidaBurbuja(
          arrayComidas[Math.floor(Math.random() * arrayComidas.length)]
        );
      }
    }
  }, [arrayComidas, comidaAnterior]);

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

  useEffect(() => {
    if (finalizaJuegoState.finalizaJuego.data !== null) {
      volverAlHome();
      resetFinalizaJuego()(finalizaJuegoDispatch);
    }
  }, [finalizaJuegoState.finalizaJuego.data]);

  const volverAlHome = () => {
    history.push("/home");
  };

  const selectImagen = (item, index) => {
    setSelected(index);
    setComidaSelected(item);
  };

  const elegir = () => {
    setComidaAnterior(comidaBurbuja);
    setSelected(null);
    if (comidaSelected === comidaBurbuja) {
      setResultadoJuegoDto({
        ...resultadoJuegoDto,
        Aciertos: resultadoJuegoDto.Aciertos + 1,
      });
      setContadorAciertos(contadorAciertos + 1)
    } else {
      setResultadoJuegoDto({
        ...resultadoJuegoDto,
        Desaciertos: resultadoJuegoDto.Desaciertos + 1,
      });
      setContadorAciertos(0)
    }
    let random = arrayComidas[Math.floor(Math.random() * arrayComidas.length)];
    if (random === comidaAnterior) {
      setComidaBurbuja(
        arrayComidas[Math.floor(Math.random() * arrayComidas.length)]
      );
    } else {
      setComidaBurbuja(random);
    }
    arrayComidas.sort(function () {
      return Math.random() - 0.5;
    });
  };

  useEffect(() => {
    if (contadorAciertos === 5) {
      finalizarJuego();
    }
  }, [contadorAciertos]);

  return (
    <>
      {modalAvatarState.modalAvatar.show && <ModalAvatar />}
      <div className="comidaCorrecta-volverAccion">
        <div className="comidaCorrecta-btnCont" onClick={volverAlHome}>
          <SalirIcon />
          <p className="comidaCorrecta-volverBtn c-white">VOLVER</p>
        </div>
      </div>
      <div className="comidaCorrecta-container">
        <div className="comidaCorrecta-animalBurbuja">
          <img
            className="comidaCorrecta-imagenPregunta"
            alt="objeto1"
            src={comidaBurbuja}
          ></img>

          <img
            className="comidaCorrecta-imagenBurbuja"
            alt="objeto1"
            src={Burbuja}
          ></img>

          <div className="comidaCorrecta-imgContainer">
            <img
              className="comidaCorrecta-imagen"
              alt="objeto2"
              src={fox}
            ></img>
          </div>
        </div>

        <div className="comidaCorrecta-imagenesRta">
          <>
            {Array.isArray(arrayComidas) &&
              arrayComidas.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div
                      className="comidaCorrecta-arrayContainer"
                      onClick={() => selectImagen(item, index)}
                    >
                      <img
                        className={
                          selected === index
                            ? "comidaCorrecta-arraySelected comidaCorrecta-array"
                            : "comidaCorrecta-array"
                        }
                        src={item}
                        alt={`comida` + index}
                      />
                    </div>
                  </React.Fragment>
                );
              })}
          </>
        </div>

        <div className="comidaCorrecta-btnContainer">
          <button
            className={`comidaCorrecta-btnListo bw24t ${
              selected === null && "bgc-grey65"
            }`}
            onClick={selected === null ? () => {} : () => elegir()}
          >
            Listo
          </button>
          <button
            className={"comidaCorrecta-btnFinalizar bw24t"}
            onClick={() => finalizarJuego()}
          >
            Finalizar
          </button>
        </div>
      </div>
    </>
  );
};
export default ComidaCorrecta;
