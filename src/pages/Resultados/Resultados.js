import * as React from "react";
import "./Resultados.css";
import SalirIcon from "../../assets/images/SalirIcon";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import {
  resetListaProgresos,
  wsGetResultadosByIdPacienteAndIdJuego,
  wsGetResultadosGlobales,
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

  const [ultimoJuego, setUltimoJuego] = React.useState(null);

  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState(null);

  const [flgData, setFlgData] = React.useState(true);

  useEffect(() => {
    let arrx = [];
    if (resultadosState.resultados.data && flgData) {
      Array.isArray(resultadosState.resultados.data) &&
        resultadosState.resultados.data.map((item) => {
          return arrx.push(item);
        });
      setData(arrx);
      // setFlgData(false);
    }
  }, [resultadosState.resultados.data, flgData]);

  const { slice, range } = useTable(data ? data : "", page, 4);

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
        pacienteSeleccionadoState.pacienteSelected.data.pacienteId,
        juegoSeleccionadoState.juegoSelected.data.id
      )(resultadosDispatch);
      wsGetResultadosGlobales(
        pacienteSeleccionadoState.pacienteSelected.data.pacienteId,
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

  const options = {
    curveType: "function",
    legend: { position: "bottom" },
  };

  const optionsPieChart = {
    pieHole: 0.4,
    is3D: false,
  };

  const [dataChart, setDataChart] = React.useState([
    ["Fecha", "Aciertos", "Desaciertos"],
  ]);

  const [dataGlobalChartAciertos, setDataGlobalChartAciertos] = React.useState([
    ["Fecha", "Aciertos Globales", "Aciertos Paciente"],
  ]);

  const [dataGlobalChartDesaciertos, setDataGlobalChartDesaciertos] =
    React.useState([["Fecha", "Desaciertos Globales", "Desaciertos Paciente"]]);

  const [dataBarChart, setBarDataChart] = React.useState([
    ["", "Aciertos", "Desaciertos"],
  ]);

  const [dataPieChart, setPieDataChart] = React.useState([
    ["Opcion", "Cantidad"],
  ]);

  //DATOS PARA EL GRAFICO GENERAL DE ACIERTOS Y DESACIERTOS
  useEffect(() => {
    const data2 = [...dataChart];
    if (resultadosState.resultados.data) {
      setUltimoJuego(
        resultadosState.resultados.data[
          resultadosState.resultados.data.length - 1
        ]
      );
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

  //DATOS PARA EL GRAFICO PACIENTE VS GLOBAL
  useEffect(() => {
    const dataGlobal = [...dataGlobalChartAciertos];
    const dataGlobalDes = [...dataGlobalChartDesaciertos];
    if (
      resultadosState.resultadosGlobales.data &&
      resultadosState.resultados.data
    ) {
      // Este map compara aciertos globales y de pacientes
      Array.isArray(resultadosState.resultadosGlobales.data) &&
        resultadosState.resultadosGlobales.data.map((item) => {
          Array.isArray(resultadosState.resultados.data) &&
            resultadosState.resultados.data.map((itemGlobal) => {
              dataGlobal.push([
                new Date(itemGlobal.fechaInicio)
                  .toLocaleDateString()
                  .slice(0, -5) &&
                  new Date(item.fechaInicio).toLocaleDateString().slice(0, -5),
                item.aciertos,
                itemGlobal.aciertos,
              ]);
            });
        });
      // Este map compara desaciertos globales y de pacientes
      Array.isArray(resultadosState.resultadosGlobales.data) &&
        resultadosState.resultadosGlobales.data.map((item) => {
          Array.isArray(resultadosState.resultados.data) &&
            resultadosState.resultados.data.map((itemGlobal) => {
              dataGlobalDes.push([
                new Date(itemGlobal.fechaInicio)
                  .toLocaleDateString()
                  .slice(0, -5) &&
                  new Date(item.fechaInicio).toLocaleDateString().slice(0, -5),
                item.desaciertos,
                itemGlobal.desaciertos,
              ]);
            });
        });
      setDataGlobalChartAciertos(dataGlobal);
      setDataGlobalChartDesaciertos(dataGlobalDes);
    }
  }, [
    resultadosState.resultadosGlobales.data,
    resultadosState.resultados.data,
  ]);

  //DATOS PARA EL GRAFICO DE TORTA
  useEffect(() => {
    const dataPie = [...dataPieChart];
    let contTrue = 0;
    let contFalse = 0;
    if (resultadosState.resultados.data) {
      Array.isArray(resultadosState.resultados.data) &&
        resultadosState.resultados.data.map((item) => {
          if (item.finalizado) {
            contTrue = contTrue + 1;
          } else {
            contFalse = contFalse + 1;
          }
        });
      dataPie.push(["Si", contTrue]);
      dataPie.push(["No", contFalse]);
      setPieDataChart(dataPie);
    }
  }, [resultadosState.resultados.data]);

  //DATOS PARA EL GRAFICO DE BARRAS
  useEffect(() => {
    const dataBar = [...dataBarChart];
    if (ultimoJuego) {
      dataBar.push([
        new Date(ultimoJuego.fechaFinalizacion).toLocaleDateString(),
        ultimoJuego.aciertos,
        ultimoJuego.desaciertos,
      ]);
      setBarDataChart(dataBar);
    }
  }, [ultimoJuego]);

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
            {authState.auth.data.usuario.tipoUsuarioId === 1 ? (
              <div className="resultados-container">
                <div className="resultados-nombre-juego">
                  <p className="resultados-titulo c-white bw32t">
                    Resultados de {authState.auth.data.usuario.nombre}{" "}
                    {authState.auth.data.usuario.apellido}
                  </p>
                </div>
                <div className="bordeTablaRes">
                  <table className="containerTabla" id="test-table-xls-button">
                    <tbody>
                      <tr className="bw18t c-white">
                        <th className="columnaInicio">Juego</th>
                        <th className="columna">Fecha</th>
                        <th className="columna">Aciertos</th>
                        <th className="columna">Desaciertos</th>
                        <th className="columna">Tiempo de resolución</th>
                        <th className="columnaFinalRes">¿Completó?</th>
                      </tr>
                      {Array.isArray(slice) &&
                        slice.map((item, index) => {
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
                <TableFooter
                  range={range}
                  slice={slice}
                  setPage={setPage}
                  page={page}
                />
              </div>
            ) : (
              <div className="resultados-container">
                <div className="resultados-nombre-juego">
                  <p className="resultados-titulo c-white bw32t">
                    Resultados de{" "}
                    {authState.auth.data.usuario.tipoUsuarioId === 2
                      ? `${pacienteSeleccionadoState.pacienteSelected.data.pacienteNombre} ${pacienteSeleccionadoState.pacienteSelected.data.pacienteApellido}`
                      : `${authState.auth.data.usuario.nombre} ${authState.auth.data.usuario.apellido}`}
                  </p>
                  {resultadosState.resultados.data && (
                    <p className="resultados-titulo c-white bw32t">
                      {resultadosState.resultados.data[0].juegoDescripcion}{" "}
                    </p>
                  )}
                </div>
                <div className="resultados-dashboardCont">
                  <div className="resultados-dashboard-pacienteJuego"></div>
                  <p className="resultados-ultimaVez c-latex30 bw32t">
                    Resultados del último juego:
                  </p>
                  <div className="resultados-dashboardBox1">
                    <div className="resultados-dashboard-ultimaFecha">
                      <p className="c-grandin30 bw18l">Fecha:</p>
                      <p className="resultados-tiempo-fecha c-grandin30 bw32b">
                        {resultadosState.resultados.data &&
                          ultimoJuego !== null &&
                          new Date(
                            ultimoJuego.fechaFinalizacion
                          ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="resultados-dashboard-aciertosDesaciertos">
                      <p className="c-grandin30 bw18l">
                        Aciertos y Desaciertos:
                      </p>
                      <Chart
                        className="dashboard-bar-datos"
                        chartType="Bar"
                        width="350px"
                        // height="250px"
                        data={dataBarChart}
                        options={options}
                      />
                    </div>

                    <div className="resultados-dashboard-ultimaFecha">
                      <p className="c-grandin30 bw18l">Tiempo:</p>
                      <p className="resultados-tiempo-fecha c-grandin30 bw32b">
                        {resultadosState.resultados.data &&
                          ultimoJuego !== null &&
                          ultimoJuego.duracion}
                      </p>
                    </div>

                    <div className="resultados-dashboard-aciertosDesaciertos">
                      <p className="c-grandin30 bw18l">
                        Porcentaje de Completitud:
                      </p>
                      <Chart
                        className="dashboard-bar-datos"
                        chartType="PieChart"
                        width="350px"
                        // height="250px"
                        data={dataPieChart}
                        options={optionsPieChart}
                      />
                    </div>
                  </div>

                  <div className="tablaDownloadContainer">
                    <table
                      className="containerTabla"
                      id="test-table-xls-button2"
                    >
                      <tbody>
                        <tr className="bw18t c-white">
                          <th className="columnaInicio">Juego</th>
                          <th className="columna">Fecha</th>
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

                  <div className="resultados-AciertosDesaciertos-BtnTabla">
                    <p className="resultados-ultimaVez c-latex30 bw32t">
                      Aciertos y desaciertos histórico:
                    </p>
                    {pacienteSeleccionadoState.pacienteSelected.data && (
                      <ReactHtmlTableToExcel
                        id="test-table-xls-button2"
                        className="DescargarTabla-btn c-white bw16b bgc-grandin30"
                        table="test-table-xls-button2"
                        filename={`Resultados - ${pacienteSeleccionadoState.pacienteSelected.data.pacienteNombre} ${pacienteSeleccionadoState.pacienteSelected.data.pacienteApellido}`}
                        sheet="resultados"
                        buttonText="Descargar Tabla"
                      />
                    )}
                    {authState.auth.data.usuario.tipoUsuarioId === 1 && (
                      <ReactHtmlTableToExcel
                        id="test-table-xls-button2"
                        className="DescargarTabla-btn c-white bw16b bgc-grandin30"
                        table="test-table-xls-button2"
                        filename={`Resultados - ${authState.auth.data.usuario.nombre} ${authState.auth.data.usuario.apellido}`}
                        sheet="resultados"
                        buttonText="Descargar Tabla"
                      />
                    )}
                  </div>
                  <div className="resultados-chart">
                    <Chart
                      className="chart"
                      chartType="Bar"
                      width="100%"
                      height="400px"
                      style={{ display: "flex", justifyContent: "center" }}
                      data={dataChart}
                      options={options}
                    />
                  </div>
                  <div className="resultados-AciertosDesaciertos-BtnTabla">
                    <p
                      className="resultados-ultimaVez c-latex30 bw32t"
                      style={{ textAlign: "center" }}
                    >
                      Paciente vs. Global:
                    </p>
                  </div>
                  <p className="resultados-ultimaVez c-latex30 bw32t">
                    Aciertos:
                  </p>
                  <div className="resultados-chart">
                    <Chart
                      className="chart"
                      chartType="LineChart"
                      width="100%"
                      height="400px"
                      style={{ display: "flex", justifyContent: "center" }}
                      data={dataGlobalChartAciertos}
                      options={options}
                    />
                  </div>
                  <p className="resultados-ultimaVez c-latex30 bw32t">
                    Desaciertos:
                  </p>
                  <div className="resultados-chart">
                    <Chart
                      className="chart"
                      chartType="LineChart"
                      width="100%"
                      height="400px"
                      style={{ display: "flex", justifyContent: "center" }}
                      data={dataGlobalChartDesaciertos}
                      options={options}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="resultados-nombre-juego">
            <p className="resultados-titulo c-white bw32b">
              No existen resultados para el juego seleccionado
            </p>
          </div>
        )}
      </>
    </>
  );
};

export default Resultados;
