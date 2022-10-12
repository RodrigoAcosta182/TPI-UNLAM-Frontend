import * as React from "react";
import "./MisPacientes.css";
import SalirIcon from "../../assets/images/SalirIcon";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import { GlobalContext } from "../../context/Provider";
import {
  resetHabilitacionPaciente,
  wsGetListaDePacientes,
  wsHabilitarPaciente,
} from "../../context/action/misPacientes/misPacientes";
import { setPacienteContexto } from "../../context/action/pacienteSeleccionado/pacienteSeleccionado";

const MisPacientes = () => {
  const {
    misPacientesState,
    misPacientesDispatch,
    pacienteSeleccionadoDispatch,
  } = React.useContext(GlobalContext);
  const [habilitarPacienteDto, setHabilitarPacienteDto] = React.useState({
    id: null,
    estado: null,
  });

  const history = useHistory();

  useEffect(() => {
    wsGetListaDePacientes()(misPacientesDispatch);
  }, []);

  useEffect(() => {
    if (misPacientesState.misPacientes.habilitar === "") {
      wsGetListaDePacientes()(misPacientesDispatch);
      resetHabilitacionPaciente()(misPacientesDispatch);
    }
  }, [misPacientesState.misPacientes.habilitar]);

  const irAMasInfo = (e) => {
    history.push("/resultados");
    setPacienteContexto(e)(pacienteSeleccionadoDispatch);
  };

  const habilitarPaciente = (e) => {
    setHabilitarPacienteDto({
      ...habilitarPacienteDto,
      id: e.usuarioPacienteId,
      estado: e.activo,
    });
  };

  useEffect(() => {
    if (
      (habilitarPacienteDto.id !== null) &
      (habilitarPacienteDto.estado !== null)
    ) {
      wsHabilitarPaciente(habilitarPacienteDto)(misPacientesDispatch);
    }
  }, [habilitarPacienteDto]);

  const volverAlHome = () => {
    history.push("/home");
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
                  <th className="columna">Activo</th>
                  <th className="columna">Acciones</th>
                </tr>

                {Array.isArray(misPacientesState.misPacientes.data) &&
                  misPacientesState.misPacientes.data.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr className="tablaFilasContainer bw24t">
                          <td className="tablaFilas c-white">
                            {item.pacienteNombre} {item.pacienteApellido}{" "}
                          </td>
                          <td className="tablaFilas c-white">
                            {item.nombreTutor}
                          </td>
                          <td className="tablaFilas c-white">
                            {item.telefono}
                          </td>
                          {item.activo ? (
                            <td className="tablaFilas c-white">Si</td>
                          ) : (
                            <td className="tablaFilas c-white">No</td>
                          )}

                          <td className="tablaFilas c-white">
                            <div className="btnPacientesBox">
                              {item.activo ? (
                                <button
                                  className="btnAccionesPacientes c-white bgc-primary bw18m"
                                  onClick={() => habilitarPaciente(item)}
                                >
                                  Deshabilitar
                                </button>
                              ) : (
                                <button
                                  className="btnAccionesPacientes c-white bgc-primary bw18m"
                                  onClick={() => habilitarPaciente(item)}
                                >
                                  Habilitar
                                </button>
                              )}

                              <button
                                className="btnAccionesPacientes c-white bgc-primary bw18m"
                                onClick={() => irAMasInfo(item)}
                              >
                                Resultados
                              </button>
                            </div>
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

export default MisPacientes;
