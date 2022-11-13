import * as React from "react";
import "./Resultados.css";
import SalirIcon from "../../assets/images/SalirIcon";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import {
  resetListaProgresos,
  wsExportarPDF,
  wsGetResultadosByIdPaciente,
  wsGetResultadosXPaciente,
} from "../../context/action/resultados/resultados";
import { GlobalContext } from "../../context/Provider";
import { resetPacienteContexto } from "../../context/action/pacienteSeleccionado/pacienteSeleccionado";
import useTable from "../../global/utils/useTable";
import TableFooter from "../../components/genericos/TableFooter/TableFooter";
import Chart from "react-google-charts";

const Resultados = () => {
  const history = useHistory();
  const {
    authState,
    resultadosState,
    resultadosDispatch,
    pacienteSeleccionadoState,
    pacienteSeleccionadoDispatch,
  } = React.useContext(GlobalContext);

  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState(null);

  useEffect(() => {
    if (resultadosState.resultados.data) {
      setData(resultadosState.resultados.data);
    }
  }, [resultadosState.resultados.data]);

  const { slice, range } = useTable(data ? data : "", page, 4);

  let nombrePaciente = `${authState.auth.data.usuario.nombre} ${authState.auth.data.usuario.apellido}`;

  useEffect(() => {
    if (pacienteSeleccionadoState.pacienteSelected.data) {
      wsGetResultadosByIdPaciente(
        pacienteSeleccionadoState.pacienteSelected.data.id
      )(resultadosDispatch);
    } else {
      wsGetResultadosXPaciente()(resultadosDispatch);
    }
  }, [pacienteSeleccionadoState.pacienteSelected.data]);

  const volverAlHome = () => {
    if (authState.auth.data.usuario.tipoUsuarioId === 1) {
      history.push("/home");
    } else {
      history.push("/misPacientes");
    }
    resetListaProgresos()(resultadosDispatch);
    resetPacienteContexto()(pacienteSeleccionadoDispatch);
  };

  const [dataChart, setDataChart] = React.useState([
    ["Year", "Aciertos", "Desaciertos"],
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

  useEffect(() => {
    console.log(dataChart);
  }, [dataChart]);

  useEffect(() => {
    console.log(resultadosState.exportar.data);
  }, [resultadosState.exportar.data]);

  const options = {
    title: "Color Correcto",
    curveType: "function",
    legend: { position: "bottom" },
  };

  var html = document.getElementsByClassName(
    "containerTabla"
  );

  // useEffect(() => {
  //   console.log(html[0].innerHTML);
  // }, [html]);

  const exportarPdf = () => {
    wsExportarPDF(html[0].innerHTML)(resultadosDispatch);
  }

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
        <div className="resultados-container">
          <p className="resultados-titulo c-white bw32b">
            Resultados de:{" "}
            {pacienteSeleccionadoState.pacienteSelected.data
              ? `${pacienteSeleccionadoState.pacienteSelected.data.pacienteNombre} ${pacienteSeleccionadoState.pacienteSelected.data.pacienteApellido}`
              : nombrePaciente}
          </p>

          <div className="resultados-chart">
            <Chart
              className="chart"
              chartType="LineChart"
              width="100%"
              height="400px"
              data={dataChart}
              options={options}
            />
            ;
          </div>

          <div className="bordeTabla">
            <table className="containerTabla">
              <tbody>
                <tr className="bw18t c-white">
                  <th className="columnaInicio">Juego</th>
                  <th className="columna">Fecha de inicio</th>
                  <th className="columna">Aciertos</th>
                  <th className="columna">Desaciertos</th>
                  <th className="columna">Tiempo de resolución</th>
                  <th className="columnaFinal">¿Completó?</th>
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
                            {new Date(item.fechaInicio).toLocaleDateString()}{" "}
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
          {/* <button onClick={exportarPdf}>Exportar</button> */}
          <TableFooter
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
          />
        </div>
      </>
    </>
  );
};

export default Resultados;
