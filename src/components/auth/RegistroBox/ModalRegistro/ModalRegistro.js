import "./ModalRegistro.css";
import { useEffect, useState } from "react";

const ModalRegistro = ({ cerrar }) => {
  useEffect(() => {}, []);

  return (
    <div className="JuegoSeleccionado-container">
      <div className="JuegoSeleccionado-ficha">
        <p className="JuegoSeleccionado-titulo1 c-white bw24t">Error</p>
        <p className="JuegoSeleccionado-titulo bw24b">Verificar datos para continuar</p>
        <div>
          <button className="btn bgc-danger c-white" onClick={cerrar}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRegistro;
