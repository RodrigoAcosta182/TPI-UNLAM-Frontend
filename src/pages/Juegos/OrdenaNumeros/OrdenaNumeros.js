import * as React from "react";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";
import "./OrdenaNumeros.css";
import SalirIcon from "../../../assets/images/SalirIcon";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import {
  resetOrdenNumeros,
  resetVerificarNumero,
  wsGetNumerosDesordenados,
  wsPostVerificarNumeros,
} from "../../../context/action/Juegos/ordenarNumeros";
import { GlobalContext } from "../../../context/Provider";
import { verificaOrdenArray } from "../../../global/utils/verificaOrdenArray";
import { showModalAvatar } from "../../../context/action/modal/modalAvatar";
import {
  resetFinalizaJuego,
  wsPostFinalizaJuego,
} from "../../../context/action/Juegos/finalizaJuego";
import Loading from "../../../components/genericos/Loading/Loading";
import ModalAvatar from "../../../components/genericos/ModalAvatar/ModalAvatar";

const OrdenaNumeros = () => {
  const history = useHistory();
  const horaInicio = new Date();
  const {
    ordenNumerosDispatch,
    ordenNumerosState,
    modalAvatarDispatch,
    finalizaJuegoDispatch,
    modalAvatarState,
    finalizaJuegoState,
  } = useContext(GlobalContext);
  const [items, setItems] = useState(null);
  const [contadorAciertos, setContadorAciertos] = useState(0);
  const [resultadoJuegoDto, setResultadoJuegoDto] = useState({
    Aciertos: 0,
    Desaciertos: 0,
    JuegoId: 2,
    Finalizado: true,
    FechaInicio: horaInicio,
    FechaFinalizacion: null,
  });

  useEffect(() => {
    wsGetNumerosDesordenados()(ordenNumerosDispatch);
  }, []);

  useEffect(() => {
    if (ordenNumerosState.numeros.data) {
      let initialItems = [
        ordenNumerosState.numeros.data[0],
        ordenNumerosState.numeros.data[1],
        ordenNumerosState.numeros.data[2],
        ordenNumerosState.numeros.data[3],
      ];
      setItems(initialItems);
    }
  }, [ordenNumerosState.numeros.data]);

  const enviarNumerosOrdenados = () => {
    if (verificaOrdenArray(items)) {
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
    wsGetNumerosDesordenados()(ordenNumerosDispatch);
  };

  const finalizarJuego = () => {
    setResultadoJuegoDto({
      ...resultadoJuegoDto,
      FechaFinalizacion: new Date(),
    });
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

  useEffect(() => {
    if (contadorAciertos === 5) {
      finalizarJuego();
    }
  }, [contadorAciertos]);

  return (
    <>
      {modalAvatarState.modalAvatar.show && <ModalAvatar />}
      <Loading
        state={finalizaJuegoState.finalizaJuego.loading}
        mensaje={"Enviando resultados..."}
      />
      <div className="ordenarNumeros-volverAccion" onClick={volverAlHome}>
        <div className="ordenarNumeros-btnCont">
          <SalirIcon />
          <p className="ordenarNumeros-volverBtn c-white">VOLVER</p>
        </div>
      </div>
      {items !== null && (
        <>
          <div className="ordenarNumeros-container">
            <p className="ordenarNumeros-titulo c-white bw32b">
              Ordená los números de menor a mayor
            </p>
            <Reorder.Group
              axis="y"
              onReorder={setItems}
              values={items}
              className="listaNumeros c-white"
            >
              {items.map((item, index) => (
                <Item key={item} item={item} />
              ))}
            </Reorder.Group>
            <div className="ordenarNumeros-btn-container">
              <button
                className="ordenarNumeros-btn bw24t"
                onClick={enviarNumerosOrdenados}
              >
                Listo
              </button>
              <button
                className="ordenarNumeros-btn bw24t"
                onClick={finalizarJuego}
              >
                Finalizar
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrdenaNumeros;
