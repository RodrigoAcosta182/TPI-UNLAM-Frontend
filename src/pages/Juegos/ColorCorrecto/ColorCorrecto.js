import React from "react";
import { useState } from "react";
import { motion, AnimateSharedLayout, m } from "framer-motion";
import "./ColorCorrecto.css";
import { useContext } from "react";
import { GlobalContext } from "../../../context/Provider";
import { useEffect } from "react";
import { wsGetColores } from "../../../context/action/Juegos/colorCorrecto";
import { useHistory } from "react-router-dom";
import { FlechaDropdown } from "../../../assets/images/FlechaDropdown";
import SalirIcon from "../../../assets/images/SalirIcon";

export default function ColorCorrecto() {
  const { colorCorrectoState, colorCorrectoDispatch } =
    useContext(GlobalContext);

  const history = useHistory();

  const [colors, setColors] = useState([]);
  const [coloresRandom, setColoresRandom] = useState([]);
  const [colorPregunta, setColorPregunta] = useState(null);

  useEffect(() => {
    wsGetColores()(colorCorrectoDispatch);
  }, []);

  useEffect(() => {
    if (colorCorrectoState.colores.data) {
      setColors([
        colorCorrectoState.colores.data[0].hexadecimal,
        colorCorrectoState.colores.data[1].hexadecimal,
        colorCorrectoState.colores.data[2].hexadecimal,
        colorCorrectoState.colores.data[3].hexadecimal,
      ]);
      //En este hook se agarra al array del ws y se devuelve de manera aleatoria uno solo
      setColorPregunta(
        colorCorrectoState.colores.data[
          Math.floor(Math.random() * colorCorrectoState.colores.data.length)
        ]
      );
    }
  }, [colorCorrectoState.colores.data]);

  useEffect(() => {
    if (colors && colorPregunta) {
      setColoresRandom(colors.sort(() => Math.random() - 0.5));
    }
  }, [colors, colorPregunta]);
  const [selected, setSelected] = useState(colors[0]);

  const enviarColorCorrecto = () => {
    if (selected === colorPregunta.hexadecimal) {
      alert("Acertaste");
    } else {
      alert("Intenta de nuevo");
    }
  };

  const volverAlHome = () => {
    history.push("/home");
  };

  return (
    <>
      <div className="colorCorrecto-volverAccion" onClick={volverAlHome}>
        <div className="colorCorrecto-btnCont">
          <SalirIcon />
          <p className="colorCorrecto-volverBtn c-white">VOLVER</p>
        </div>
      </div>
      <div className="colorCorrecto-container">
        {colorPregunta ? (
          <>
            <div className="colorCorrecto-pregunta bw52b">
              <p className="c-white">¿Qué color coincide con este</p>
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
        <div className="colorCorrecto-boxColores">
          <AnimateSharedLayout>
            <ul className="colorCorrecto-ul">
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
            <button
              className={
                selected === undefined
                  ? "colorCorrecto-btn bw24t bgc-grey65"
                  : "colorCorrecto-btn bw24t"
              }
              onClick={selected === undefined ? () => {} : enviarColorCorrecto}
              style={
                selected === undefined
                  ? { cursor: "initial" }
                  : { cursor: "pointer" }
              }
            >
              Listo
            </button>
          )}
        </div>
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
