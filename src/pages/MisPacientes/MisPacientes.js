import * as React from "react";
import "./MisPacientes.css";
import SalirIcon from "../../assets/images/SalirIcon";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";

const MisPacientes = () => {
  const history = useHistory();

  useEffect(() => {}, []);

  const irAMasInfo = () => {
    history.push("/resultados");
  };

  const volverAlHome = () => {
    history.push("/homeProf");
  };

  return (
    <>
      <HeaderbarHome></HeaderbarHome>
      <div className="misPacientes-volverAccion" onClick={volverAlHome}>
        <div className="misPacientes-btnCont">
          <SalirIcon />
          <p className="misPacientes-volverBtn c-white bw16b">VOLVER</p>
        </div>
      </div>
      <>
        <div className="misPacientes-container">
          <p className="misPacientes-titulo c-white bw52b">Mis Pacientes:</p>
          <div className="bordeTabla">
            <table className="containerTabla">
              <tbody>
                <tr className="bw24t c-white">
                  <th className="columnaInicio">Nombre</th>
                  <th className="columna">Tutor a Cargo</th>
                  <th className="columna">Teléfono</th>
                  <th className="columna">Acciones</th>
                </tr>

                <tr className="tablaFilasContainer bw24t">
                  <td className="tablaFilas c-white">John Doe</td>
                  <td className="tablaFilas c-white">John Doe 2</td>
                  <td className="tablaFilas c-white">1145213546</td>
                  <td className="tablaFilas c-white"><button onClick={irAMasInfo}>Mas Info</button></td>
                </tr>

                <tr className="tablaFilasContainer bw24t">
                  <td className="tablaFilas c-white">John Doe</td>
                  <td className="tablaFilas c-white">John Doe 2</td>
                  <td className="tablaFilas c-white">1145217846</td>
                  <td className="tablaFilas c-white"><button onClick={irAMasInfo}>Mas Info</button></td>
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

export default MisPacientes;
