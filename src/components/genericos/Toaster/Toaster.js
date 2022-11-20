import { useContext } from "react";
import { useEffect } from "react";
import { resetUsuarioConectado } from "../../../context/action/estadoConexion/estadoConexion";
import { hideToaster } from "../../../context/action/toaster/toaster";
import { GlobalContext } from "../../../context/Provider";
import "./Toaster.css";
const Toaster = () => {
  const { toasterDispatch, estadoConexionState, estadoConexionDispatch } =
    useContext(GlobalContext);
  useEffect(() => {
    setTimeout(() => {
      hideToaster()(toasterDispatch);
      resetUsuarioConectado()(estadoConexionDispatch);
    }, 5000);
  }, []);

  const { nombre, apellido } = estadoConexionState.usuarioConectado.usuario;

  return (
    <div className="toaster-container">
      <div className="toaster-circuloVerde"></div>
      <span>
        <span className="bw16b">{nombre + " " + apellido} </span>se ha conectado
      </span>
    </div>
  );
};

export default Toaster;
