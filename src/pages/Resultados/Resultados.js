import * as React from "react";
import "./Resultados.css";
import SalirIcon from "../../assets/images/SalirIcon";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import {
  resetListaProgresos,
  wsGetResultadosByIdPacienteAndIdJuego,
  wsGetResultadosXPaciente,
} from "../../context/action/resultados/resultados";
import { GlobalContext } from "../../context/Provider";
import { resetPacienteContexto } from "../../context/action/pacienteSeleccionado/pacienteSeleccionado";
import useTable from "../../global/utils/useTable";
import TableFooter from "../../components/genericos/TableFooter/TableFooter";
import Chart from "react-google-charts";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import { resetJuegoContexto } from "../../context/action/juegoSeleccionado/juegoSeleccionado";

const Resultados = () => {
  const history = useHistory();
  const {
    authState,
    resultadosState,
    resultadosDispatch,
    pacienteSeleccionadoState,
    juegoSeleccionadoDispatch,
    juegoSeleccionadoState,
  } = React.useContext(GlobalContext);

  useEffect(() => {
    if (
      pacienteSeleccionadoState.pacienteSelected.data === null &&
      authState.auth.data.usuario.tipoUsuarioId === 2
    ) {
      history.push("/misPacientes");
      resetJuegoContexto()(juegoSeleccionadoDispatch);
    }
  }, [pacienteSeleccionadoState.pacienteSelected.data, authState.auth.data]);

  useEffect(() => {
    if (authState.auth.data.usuario.tipoUsuarioId === 1) {
      wsGetResultadosXPaciente()(resultadosDispatch);
    } else if (pacienteSeleccionadoState.pacienteSelected.data !== null) {
      wsGetResultadosByIdPacienteAndIdJuego(
        pacienteSeleccionadoState.pacienteSelected.data.id,
        juegoSeleccionadoState.juegoSelected.data.id
      )(resultadosDispatch);
    }
  }, [pacienteSeleccionadoState.pacienteSelected.data, authState.auth.data]);

  const volverAlHome = () => {
    if (authState.auth.data.usuario.tipoUsuarioId === 1) {
      history.push("/home");
    } else {
      history.push("/resultadosCards");
    }
    resetListaProgresos()(resultadosDispatch);
    resetJuegoContexto()(juegoSeleccionadoDispatch);
  };

  const [dataChart, setDataChart] = React.useState([
    ["Fecha", "Aciertos", "Desaciertos"],
  ]);

  useEffect(() => {
    const data2 = [...dataChart];
    if (resultadosState.resultados.data) {
      Array.isArray(resultadosState.resultados.data) &&
        resultadosState.resultados.data.map((item) => {
          data2.push([
            new Date(item.fechaInicio).toLocaleDateString().slice(0, -5),
            item.aciertos,
            item.desaciertos,
          ]);
        });
      setDataChart(data2);
    }
  }, [resultadosState.resultados.data]);

  const options = {
    curveType: "function",
    legend: { position: "bottom" },
  };

  return (
    <>
      <HeaderbarHome></HeaderbarHome>
      <div className="resultados-volverAccion">
        <div className="resultados-btnCont" onClick={volverAlHome}>
          <SalirIcon />
          <p className="resultados-volverBtn c-white bw16b">VOLVER</p>
        </div>
      </div>
      <>
        {resultadosState.resultados.data &&
        resultadosState.resultados.data.length > 0 ? (
          <>
            <div className="resultados-container">
              <p className="resultados-titulo c-white bw32b">
                Resultados de:{" "}
                {authState.auth.data.usuario.tipoUsuarioId === 2
                  ? `${pacienteSeleccionadoState.pacienteSelected.data.pacienteNombre} ${pacienteSeleccionadoState.pacienteSelected.data.pacienteApellido}`
                  : `${authState.auth.data.usuario.nombre} ${authState.auth.data.usuario.apellido}`}
              </p>
              {resultadosState.resultados.data && (
                <p className="resultados-juego c-white bw32b">
                  {resultadosState.resultados.data[0].juegoDescripcion}{" "}
                </p>
              )}

              <div className="resultados-chart">
                <Chart
                  className="chart"
                  chartType="LineChart"
                  width="100%"
                  height="400px"
                  style={{ display: "flex", justifyContent: "center" }}
                  data={dataChart}
                  options={options}
                />
                ;
              </div>

              <div className="bordeTablaRes">
                <table className="containerTabla" id="test-table-xls-button">
                  <tbody>
                    <tr className="bw18t c-white">
                      <th className="columnaInicio">Juego</th>
                      <th className="columna">Fecha de inicio</th>
                      <th className="columna">Aciertos</th>
                      <th className="columna">Desaciertos</th>
                      <th className="columna">Tiempo de resolución</th>
                      <th className="columnaFinalRes">¿Completó?</th>
                    </tr>
                    {Array.isArray(resultadosState.resultados.data) &&
                      resultadosState.resultados.data.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <tr className="tablaFilasContainer bw18t">
                              <td className="tablaFilas c-white">
                                {item.juegoDescripcion}{" "}
                              </td>
                              <td className="tablaFilas c-white">
                                {new Date(
                                  item.fechaInicio
                                ).toLocaleDateString()}{" "}
                              </td>
                              <td className="tablaFilas c-white">
                                {item.aciertos}
                              </td>
                              <td className="tablaFilas c-white">
                                {item.desaciertos}
                              </td>

                              <td className="tablaFilas c-white">
                                {item.duracion}
                              </td>

                              <td className="tablaFilas c-white">
                                {item.finalizado ? "Si" : "No"}
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {pacienteSeleccionadoState.pacienteSelected.data && (
                <ReactHtmlTableToExcel
                  id="test-table-xls-button"
                  className="DescargarTabla-btn c-white bw16b bgc-grandin30"
                  table="test-table-xls-button"
                  filename={`Resultados - ${pacienteSeleccionadoState.pacienteSelected.data.pacienteNombre} ${pacienteSeleccionadoState.pacienteSelected.data.pacienteApellido}`}
                  sheet="resultados"
                  buttonText="Descargar Resultados"
                />
              )}
              {authState.auth.data.usuario.tipoUsuarioId === 1 && (
                <ReactHtmlTableToExcel
                  id="test-table-xls-button"
                  className="DescargarTabla-btn c-white bw16b bgc-grandin30"
                  table="test-table-xls-button"
                  filename={`Resultados - ${authState.auth.data.usuario.nombre} ${authState.auth.data.usuario.apellido}`}
                  sheet="resultados"
                  buttonText="Descargar Resultados"
                />
              )}
            </div>{" "}
          </>
        ) : (
          <p className="resultados-titulo c-white bw32b">
            No existen resultados para el juego seleccionado
          </p>
        )}
      </>
    </>
  );
};

export default Resultados;
