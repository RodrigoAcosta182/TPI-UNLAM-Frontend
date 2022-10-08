import * as React from "react";
import "./Resultados.css";
import SalirIcon from "../../assets/images/SalirIcon";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";

const Resultados = () => {
  const history = useHistory();

  useEffect(() => {}, []);

  const volverAlHome = () => {
    history.push("/misPacientes");
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
          <p className="resultados-titulo c-white bw52b">
            Resultados de: John Doe
          </p>
          <div className="sarasa">
            <table className="containerTabla">
              <tbody>
                <tr className="bw24t c-white">
                  <th className="columnaInicio">Juego</th>
                  <th className="columna">Aciertos</th>
                  <th className="columna">Desaciertos</th>
                  <th className="columna">Tiempo de Resolucion</th>
                  <th className="columnaFinal">¿Completo?</th>
                </tr>

                <tr className="tablaFilasContainer bw24t">
                  <td className="tablaFilas c-white">Color Correcto</td>
                  <td className="tablaFilas c-white">10</td>
                  <td className="tablaFilas c-white">5</td>
                  <td className="tablaFilas c-white">00:05:20</td>
                  <td className="tablaFilas c-white">Si</td>
                </tr>

                <tr className="tablaFilasContainer bw24t">
                  <td className="tablaFilas c-white">Ordenar Números</td>
                  <td className="tablaFilas c-white">5</td>
                  <td className="tablaFilas c-white">1</td>
                  <td className="tablaFilas c-white">00:10:10</td>
                  <td className="tablaFilas c-white">Si</td>
                </tr>

                {/* <React.Fragment key={index}>
              <TablaGrupo>
                <td
                  className={item.sobre_turno ? "c-primary" : "c-latex30"}
                >
                  {item.hora_turno}hs
                </td>
                <td
                  className={item.sobre_turno ? "c-primary" : "c-latex30"}
                >
                  <div className="pacienteCont">{item.paciente_desc} </div>
                </td>
                <td>
                  {item.cancelado && (
                    <p className="c-danger rb16m">Cancelado</p>
                  )}
                  {item.presente && !item.evolucionado && !item.atendido && (
                    <p className="c-broccoli rb16m">Presente</p>
                  )}
                  {item.atendido && !item.evolucionado && (
                    <p className="c-latex30 rb16m">Atendido</p>
                  )}
                  {item.evolucionado && (
                    <p className="c-black rb16m">Evolucionado</p>
                  )}
                </td>

                <td>
                  {item.nota !== "" && (
                    <>
                      <div className="iconNota">
                        <button
                          className="iconButton"
                          onClick={() => showModalNota(item)}
                          data-tip
                          data-for={"tooltipNota" + index}
                        >
                          <RecetaIcon />
                        </button>
                        <ReactTooltip
                          id={"tooltipNota" + index}
                          place="top"
                          type="info"
                          effect="solid"
                        >
                          {item.nota}
                        </ReactTooltip>
                      </div>
                    </>
                  )}
                </td>
                <td>
                  <span
                    className="infoIcon"
                    onClick={() => showModalInformacionPaciente(item)}
                  >
                    <InfoIcon
                      color={
                        item.sobre_turno
                          ? "var(--color-primary)"
                          : "var(--color-latex30)"
                      }
                    />
                  </span>
                </td>
              </TablaGrupo>
            </React.Fragment> */}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </>
  );
};

export default Resultados;
