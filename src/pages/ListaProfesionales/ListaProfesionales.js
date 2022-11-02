import * as React from "react";
import "./ListaProfesionales.css";
import SalirIcon from "../../assets/images/SalirIcon";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import { GlobalContext } from "../../context/Provider";
import {
  resetHabilitacion,
  wsGetAllProfesionales,
  wsHabilitarProfesional,
} from "../../context/action/profesionales/profesionales";

const ListaProfesionales = () => {
  const { profesionalesDispatch, profesionalesState } =
    React.useContext(GlobalContext);
  const history = useHistory();
  const [habilitarProfesionalDto, setHabilitarProfesionalDto] = React.useState({
    id: null,
    estado: null,
  });

  useEffect(() => {
    wsGetAllProfesionales()(profesionalesDispatch);
  }, []);

  useEffect(() => {
    if (profesionalesState.profesionales.habilitado === "") {
      wsGetAllProfesionales()(profesionalesDispatch);
      resetHabilitacion()(profesionalesDispatch);
    }
  }, [profesionalesState.profesionales.habilitado]);

  const volverAlHome = () => {
    history.push("/home");
  };

  const modificarEstado = (e) => {
    setHabilitarProfesionalDto({
      ...habilitarProfesionalDto,
      id: e.id,
      estado: e.activo,
    });
  };

  useEffect(() => {
    if (
      (habilitarProfesionalDto.id !== null) &
      (habilitarProfesionalDto.estado !== null)
    ) {
      wsHabilitarProfesional(habilitarProfesionalDto)(profesionalesDispatch);
    }
  }, [habilitarProfesionalDto]);

  return (
    <>
      <HeaderbarHome></HeaderbarHome>
      <div className="listaProf-volverAccion">
        <div className="listaProf-btnCont" onClick={volverAlHome}>
          <SalirIcon />
          <p className="listaProf-volverBtn c-white bw16b">VOLVER</p>
        </div>
      </div>
      <>
        <div className="listaProf-container">
          <p className="listaProf-titulo c-white bw32b">
            Lista de Profesionales
          </p>
          <div className="bordeTabla">
            <table className="containerTabla">
              <tbody>
                <tr className="bw18t c-white">
                  <th className="columnaInicio">Nombre Completo</th>
                  <th className="columna">DNI</th>
                  <th className="columna">Matrícula</th>
                  <th className="columna">Fecha Nacimiento</th>
                  <th className="columnaFinal">Activo</th>
                  <th className="columnaFinal">Acciones</th>
                </tr>

                {Array.isArray(profesionalesState.profesionales.data) &&
                  profesionalesState.profesionales.data.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr className="tablaFilasContainer bw18t">
                          <td className="tablaFilas c-white">
                            {item.nombre} {item.apellido}{" "}
                          </td>
                          <td className="tablaFilas c-white">{item.dni}</td>
                          <td className="tablaFilas c-white">
                            {item.matricula}
                          </td>
                          <td className="tablaFilas c-white">
                            {new Date(
                              item.fechaNacimiento
                            ).toLocaleDateString()}
                          </td>
                          {item.activo ? (
                            <td className="tablaFilas c-white">Si</td>
                          ) : (
                            <td className="tablaFilas c-white">No</td>
                          )}
                          {item.activo ? (
                            <td className="tablaFilas c-white">
                              <button
                                onClick={() => modificarEstado(item)}
                                className="accionDesactivarBtn bw18m c-white bgc-primary"
                              >
                                Desactivar
                              </button>{" "}
                            </td>
                          ) : (
                            <td className="tablaFilas c-white">
                              <button
                                onClick={() => modificarEstado(item)}
                                className="accionActivarBtn bw18m c-white bgc-primary"
                              >
                                Habilitar
                              </button>{" "}
                            </td>
                          )}
                        </tr>
                      </React.Fragment>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </>
  );
};

export default ListaProfesionales;
