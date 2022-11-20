import React, { useContext, useEffect, useRef, useState } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import Loading from "../../components/genericos/Loading/Loading";
import Modal from "../../components/genericos/Modal/Modal";
import { GlobalContext } from "../../context/Provider";
import "./NotasArchivadas.css";
import { useHistory } from "react-router-dom";
import SalirIcon from "../../assets/images/SalirIcon";
import AgregarIcon from "../../assets/images/AgregarIcon";
import checkParOImpar from "../../global/utils/checkParOImpar";
import checkNroPrimo from "../../global/utils/checkNroPrimo";
import {
  resetNota,
  wsArchivarNota,
  wsGetNotaXProfesional,
} from "../../context/action/nota/nota";
import ToasterGenerico from "../../components/genericos/ToasterGenerico/ToasterGenerico";
import DesarchivarIcon from "../../assets/images/DesarchivarIcon";
import ReactTooltip from "react-tooltip";
import { showToaster } from "../../context/action/toasterGenerico/toasterGenerico";

const NotasArchivadas = () => {
  const history = useHistory();
  const {
    modalState,
    notaState,
    notaDispatch,
    pacienteSeleccionadoState,
    modalDispatch,
    pacienteSeleccionadoDispatch,
    toasterGenericoState,
    toasterGenericoDispatch,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (notaState.nota.data === 200) {
      resetNota()(notaDispatch);
      showToaster(
        {
          texto: "La nota fue desarchivada correctamente",
          tipo: "success",
        },
        "centroArriba"
      )(toasterGenericoDispatch);
      wsGetNotaXProfesional(
        pacienteSeleccionadoState.pacienteSelected.data.pacienteId
      )(notaDispatch);
    }
  }, [notaState.nota.data]);

  useEffect(() => {
    if (pacienteSeleccionadoState.pacienteSelected.data) {
      wsGetNotaXProfesional(
        pacienteSeleccionadoState.pacienteSelected.data.pacienteId
      )(notaDispatch);
    }
  }, [pacienteSeleccionadoState.pacienteSelected.data]);

  const volverAlHome = () => {
    history.push("/notasPaciente");
  };

  const archivarNota = (e) => {
    wsArchivarNota(e.id)(notaDispatch);
  };

  return (
    <>
      {toasterGenericoState.toasterGenerico.show && <ToasterGenerico />}
      {modalState.modal.show && <Modal />}
      <Loading state={notaState.nota.loading} mensaje={"Cargando notas..."} />
      <HeaderbarHome />
      <div className="notas-volverAccion">
        <div className="notas-btnCont" onClick={volverAlHome}>
          <SalirIcon />
          <p className="notas-volverBtn c-white">VOLVER</p>
        </div>
        {/* <div className="notas-AgregarbtnCont" onClick={crearNota}>
          <AgregarIcon />
          <p className="notas-agregarBtn c-white">CREAR NOTA</p>
        </div> */}
      </div>
      <div className="archivarNotas-container">
        <p className="c-white bw32b">
          Notas archivadas:{" "}
          {pacienteSeleccionadoState.pacienteSelected.data.pacienteNombre}{" "}
          {pacienteSeleccionadoState.pacienteSelected.data.pacienteApellido}{" "}
        </p>
        <div className="bordeTablaRes">
          <table className="containerTabla" id="test-table-xls-button">
            <tbody>
              <tr className="bw18t c-white">
                <th className="columnaInicio">Nota Nro.</th>
                <th className="columna">Mensaje</th>
                <th className="columna">Fecha</th>
                <th className="columnaFinal">Acciones</th>
              </tr>
              {Array.isArray(notaState.nota.data) &&
                notaState.nota.data.map((item, index) => {
                  if (item.archivado === true)
                    return (
                      <React.Fragment key={index}>
                        <tr className="tablaFilasContainer bw18t">
                          <td className="tablaFilas c-white">{item.id} </td>
                          <td className="tablaFilas c-white">{item.mensaje}</td>
                          <td className="tablaFilas c-white">
                            {new Date(item.fecha).toLocaleDateString()}{" "}
                          </td>
                          <td className="tablaFilas c-white">
                            <button
                              className="archivarNotas-icon"
                              onClick={() => archivarNota(item)}
                              data-tip
                              data-for={`botonTooltipNotas ${index}`}
                            >
                              <DesarchivarIcon />
                              <ReactTooltip
                                id={`botonTooltipNotas ${index}`}
                                place="top"
                                type="light"
                                effect="solid"
                                border={true}
                              >
                                Desarchivar Nota
                              </ReactTooltip>
                            </button>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default NotasArchivadas;
