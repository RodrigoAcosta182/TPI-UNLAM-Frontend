import * as React from "react";
import "./Resultados.css";
import SalirIcon from "../../assets/images/SalirIcon";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import {
  resetListaProgresos,
  wsGetResultadosByIdPaciente,
  wsGetResultadosXPaciente,
} from "../../context/action/resultados/resultados";
import { GlobalContext } from "../../context/Provider";
import { resetPacienteContexto } from "../../context/action/pacienteSeleccionado/pacienteSeleccionado";

const Resultados = () => {
  const history = useHistory();
  const {
    authState,
    resultadosState,
    resultadosDispatch,
    pacienteSeleccionadoState,
    pacienteSeleccionadoDispatch,
  } = React.useContext(GlobalContext);

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

  return (
    <>
      <HeaderbarHome></HeaderbarHome>
      <div className="resultados-volverAccion" onClick={volverAlHome}>
        <div className="resultados-btnCont">
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
          <div className="bordeTabla">
            <table className="containerTabla">
              <tbody>
                <tr className="bw18t c-white">
                  <th className="columnaInicio">Juego</th>
                  <th className="columna">Aciertos</th>
                  <th className="columna">Desaciertos</th>
                  <th className="columna">Tiempo de resolución</th>
                  <th className="columnaFinal">¿Completó?</th>
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
                            {item.aciertos}
                          </td>
                          <td className="tablaFilas c-white">
                            {item.desaciertos}
                          </td>

                          <td className="tablaFilas c-white">
                            {item.fechaInicio}
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
        </div>
      </>
    </>
  );
};

export default Resultados;
