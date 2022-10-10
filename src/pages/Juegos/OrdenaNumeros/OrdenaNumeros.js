import * as React from "react";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";
import "./OrdenaNumeros.css";
import SalirIcon from "../../../assets/images/SalirIcon";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { wsGetNumerosDesordenados, wsPostVerificarNumeros } from "../../../context/action/Juegos/ordenarNumeros";
import { GlobalContext } from "../../../context/Provider";

const OrdenaNumeros = () => {
  const { ordenNumerosDispatch, ordenNumerosState } = useContext(GlobalContext);
  const [resultadoJuegoDto, setResultadoJuegoDto] = useState({
    Aciertos: null,
    Desaciertos: null,
    JuegoId: 2,
    Finalizado: true,
  });
  const history = useHistory();

  useEffect(() => {
    wsGetNumerosDesordenados()(ordenNumerosDispatch);
  }, []);

  const [items, setItems] = useState(null);

  useEffect(() => {
    if (ordenNumerosState.numeros.data) {
      let initialItems = [
        ordenNumerosState.numeros.data[0],
        ordenNumerosState.numeros.data[1],
        ordenNumerosState.numeros.data[2],
        ordenNumerosState.numeros.data[3],
      ];
      setItems(initialItems)
    }
  }, [ordenNumerosState.numeros.data]);

  const enviarNumerosOrdenados = () => {
    wsPostVerificarNumeros(items)(ordenNumerosDispatch);
  };

  const volverAlHome = () => {
    history.push("/home");
  };

  return (
    <>
      <div className="ordenarNumeros-volverAccion" onClick={volverAlHome}>
        <div className="ordenarNumeros-btnCont">
          <SalirIcon />
          <p className="ordenarNumeros-volverBtn c-white">VOLVER</p>
        </div>
      </div>
      {items !== null && (
        <>
          <div className="ordenarNumeros-container">
            <p className="ordenarNumeros-titulo c-white bw52b">
              Ordená los numeros de menor a mayor
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
            <button
              className="ordenarNumeros-btn bw24t"
              onClick={enviarNumerosOrdenados}
            >
              Listo
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default OrdenaNumeros;
