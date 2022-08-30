import React, { useEffect, useState } from "react";
import FlechaDropdown from "../../../assets/generico/FlechaDropdown";
import camelize from "../../../utils/camelize";
import { regexNumero } from "../../../utils/expresionesRegulares";
import { orderLista } from "../../../utils/orderData";
import InputError from "../InputV1/InputError";
import InputHeader from "../InputV1/InputHeader";

import "./DropdownStyle.css";

const Dropdown = ({
  headerStr,
  datos,
  onChange,
  campoCodigo,
  descripcion,
  valor,
  desactivado,
  name,
  errorStr,
  placeholder,
  mobileWidth,
  checkError,
  heightModificable,
  deshabilitaFormulario,
  notSearch,
  widthLista,
  customCss,
  campoAgenda,
  autoFocus,
  origen,
  customSearch,
  heightLista,
  dsb,
  desactivarOnBlur,
}) => {
  const [mostrar, setMostrar] = useState(false);
  const [valorInput, setValorInput] = useState("");
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [selector, setSelector] = useState({ cursor: 0 });
  const [isBlur, setIsBlur] = useState(false);
  const [isUsed, setIsUsed] = useState(false);
  const [valorBuscador, setvalorBuscador] = useState("");

  useEffect(() => {
    setListaFiltrada(datos);
  }, [datos]);

  useEffect(() => {
    if (Array.isArray(datos) && datos.length > 0) {
      let busqueda = datos.filter((item) => item[campoCodigo] === valor);
      if (Array.isArray(busqueda) && busqueda.length > 0) {
        setValorInput(busqueda[0][campoCodigo]);
      } else {
        setValorInput("");
        //valor buscador seteado a vacio para los casos de Busqueda/estudio/circuito
        setvalorBuscador("");
      }
    }
  }, [datos, valor, campoCodigo, descripcion]);

  const onClickDropdown = () => {
    if (!desactivado) {
      setValorInput("");
      setListaFiltrada(datos);
      setMostrar(!mostrar);
      onChange("");
      setvalorBuscador("");
    }
  };

  const filtrar = (e) => {
    setvalorBuscador(e.target.value);

    if (e.target.value.length) {
      setIsUsed(true);
      setMostrar(true);

      const filtradoLista = orderLista(datos, e.target.value, origen);

      // fix temporal.
      if (origen === "PLAN") {
        setListaFiltrada(
          filtradoLista.length === datos.length ? datos : filtradoLista
        );
      } else {
        setListaFiltrada(
          filtradoLista.length === datos.length ? [] : filtradoLista
        );
      }
    } else {
      setIsUsed(false);
      setListaFiltrada([]);
    }
  };

  const elementOnClick = (item) => {
    if (item !== undefined) {
      if (item[campoCodigo] < 0) {
        setMostrar(false);
        onChange(item);
        setValorInput(item[campoAgenda]);
      } else {
        setValorInput(item[campoCodigo]);
        setMostrar(false);
        onChange(item);
      }
    } else {
      onChange("");
      // setvalorBuscador("");
    }
  };

  const ocultarClickFondo = () => {
    setMostrar(false);
    onChange("");
  };

  const onKeyNavigation = (e) => {
    if (valorBuscador !== "") {
      if (e.keyCode === 38 && selector.cursor > 0) {
        //flecha arriba
        let target = document.getElementById("listaItem" + selector.cursor);
        target.parentNode.parentNode.scrollTop = target.offsetTop - 24;
        setSelector((prevState) => ({
          cursor: prevState.cursor - 1,
        }));
      } else if (
        e.keyCode === 40 &&
        selector.cursor < datos.length - 1 &&
        selector.cursor < listaFiltrada.length - 1
      ) {
        //flecha abajo
        let target = document.getElementById("listaItem" + selector.cursor);
        target.parentNode.parentNode.scrollTop = target.offsetTop - 24;
        setSelector((prevState) => ({
          cursor: prevState.cursor + 1,
        }));
      } else if (e.keyCode === 13) {
        //ENTER
        elementOnClick(listaFiltrada[selector.cursor]);
      }
    }
  };

  const checkBlur = () => {
    if (desactivarOnBlur === undefined) {
      setIsBlur(true);
    }
  };

  const checkMostrarError = () => {
    let flag = false;
    if (isUsed && (valorInput === "" || valorInput === undefined)) flag = true;
    if (isBlur && !isUsed && (valorInput === "" || valorInput === undefined)) {
      flag = true;
    }
    if (checkError) {
      flag = true;
    }
    return flag;
  };

  const getDescripcion = () => {
    if (Array.isArray(datos) && datos.length > 0) {
      if (!regexNumero.test(valorInput)) {
        let item = datos.filter((item) => item[campoAgenda] === valorInput)[0];
        //meti el choclo que se ve a continuacion para las obras sociales desde...
        if (item === undefined) {
          let item = datos.filter(
            (item) => item[campoCodigo] === valorInput
          )[0];
          if (item !== undefined) {
            return camelize(item[descripcion]);
          } else return "";
        }
        // hasta aca.
        if (item !== undefined) return camelize(item[descripcion]);
        else return "";
      } else {
        let item = datos.filter((item) => item[campoCodigo] === valorInput)[0];
        if (item !== undefined) return camelize(item[descripcion]);
        else return "";
      }
    } else {
      return "";
    }
  };

  return (
    <div className={"ptur-dropdown-container " + customCss}>
      {/* {mostrar && (
        <div
          className="ptur-dropdownCheck-fondo"
          onClick={ocultarClickFondo}
        ></div>
      )} */}
      {mostrar && (
        <div className="fondoDropdown" onClick={ocultarClickFondo}></div>
      )}
      <InputHeader headerStr={headerStr} />
      {(valorInput || valorInput === 0) && (
        <>
          <div
            className={
              mostrar
                ? "ptur-dropdown-flecha-show pointer"
                : "ptur-dropdown-flecha-hide pointer"
            }
            onClick={onClickDropdown}
          >
            {origen === "CONSULTA_MEDICA" || origen === "ESTUDIOS" ? (
              ""
            ) : (
              <FlechaDropdown color={"var(--color-dropdown-latex30)"} />
            )}
          </div>
          <div
            className={`bgc-grey95 ptur-dropdown-inputSimulado noSeleccionable pointer`}
            onClick={onClickDropdown}
            style={{ height: heightModificable }}
          >
            <span
              className={!desactivado ? "rb16m c-latex30" : " rb16m c-grey45"}
            >
              {datos ? getDescripcion() : placeholder}
            </span>
          </div>
        </>
      )}
      {valorInput.length === 0 && (
        <React.Fragment>
          <div
            className={
              mostrar
                ? "ptur-dropdown-flecha-show pointer"
                : "ptur-dropdown-flecha-hide pointer"
            }
            onClick={onClickDropdown}
          >
            {origen === "CONSULTA_MEDICA" || origen === "ESTUDIOS" ? (
              ""
            ) : (
              <FlechaDropdown
                color={
                  checkMostrarError()
                    ? "var(--color-danger)"
                    : deshabilitaFormulario
                    ? "var(--color-grey45)"
                    : "var(--color-latex30)"
                }
              />
            )}
          </div>
          {/* el problema esta aca adentro, revisar check error  
            // Eliminamos la clase noSeleccionable debido a que no escribe en Safari, Chrome desde iOS
          */}
          {!notSearch ? (
            <input
              className={
                !checkMostrarError()
                  ? `bgc-grey95 ptur-dropdown-inputSimulado rb16m pointer`
                  : `bgc-grey95 ptur-dropdown-inputSimulado rb16m pointer` +
                    ` ptur-input-borderError`
              }
              onClick={
                origen === "CONSULTA_MEDICA" || origen === "ESTUDIOS"
                  ? dsb
                  : onClickDropdown
              }
              placeholder={placeholder}
              name="buscador"
              onChange={filtrar}
              autoComplete="off"
              value={valorBuscador}
              disabled={desactivado}
              onKeyDown={onKeyNavigation}
              onBlur={checkBlur}
              autoFocus={autoFocus}
            ></input>
          ) : (
            <div
              className={
                !checkMostrarError()
                  ? `bgc-grey95 ptur-dropdown-onlyList rb16m noSeleccionable pointer`
                  : `bgc-grey95 ptur-dropdown-onlyList rb16m noSeleccionable pointer` +
                    ` ptur-input-borderError`
              }
              onClick={onClickDropdown}
              name="buscador"
              onBlur={checkBlur}
              value={valorBuscador}
              placeholder={placeholder}
            >
              {placeholder}
            </div>
          )}
        </React.Fragment>
      )}
      {mostrar && (
        <div
          className={`ptur-dropdown-cointainer-lista ${
            mobileWidth ? "ptur-dropdown-mobileWidth" : ""
          } noSeleccionable`}
          style={{ width: widthLista, height: heightLista }}
        >
          <ul className={customSearch} name={name}>
            {listaFiltrada &&
              listaFiltrada.map((item, index) => (
                <li
                  className={
                    selector.cursor === index
                      ? "ptur-dropdown-lista-hover rb16m"
                      : "ptur-dropdown-lista pointer rb16m"
                  }
                  value={item[campoCodigo]}
                  key={index}
                  onClick={() => elementOnClick(item)}
                  id={"listaItem" + index}
                >
                  <p className="ptur-dropdown-itemsOverflow" key={index}>
                    {camelize(item[descripcion])}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      )}
      <InputError errorStr={checkMostrarError() ? errorStr : ""}></InputError>
    </div>
  );
};

export default Dropdown;
