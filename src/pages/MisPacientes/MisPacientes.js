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
import LlamadaProfesional from "../../components/genericos/VideoLlamada/LlamadaProfesional";
import Modal from "../../components/genericos/Modal/Modal";
import calculaEdad from "../../global/utils/edad";

const MisPacientes = () => {
  const {
    misPacientesState,
    misPacientesDispatch,
    pacienteSeleccionadoDispatch,
    modalState,
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
      id: e.pacienteId,
      estado: e.estado,
    });
  };

  useEffect(() => {
    if (
      (habilitarPacienteDto.pacienteId !== null) &
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
      {modalState.modal.show && <Modal />}
      <HeaderbarHome></HeaderbarHome>
      <div className="misPacientes-volverAccion" onClick={volverAlHome}>
        <div className="misPacientes-btnCont">
          <SalirIcon />
          <p className="misPacientes-volverBtn c-white bw16b">VOLVER</p>
        </div>
      </div>
      <>
        <div className="misPacientes-container">
          <p className="misPacientes-titulo c-white bw32b">Mis Pacientes:</p>
          <div className="bordeTabla">
            <table className="containerTabla">
              <tbody>
                <tr className="bw18t c-white">
                  <th className="columnaInicio">Nombre</th>
                  <th className="columna">Edad</th>
                  <th className="columna">Fecha Nacimiento</th>
                  <th className="columna">Dirección</th>
                  <th className="columna">Tutor a cargo</th>
                  <th className="columna">Teléfono</th>
                  <th className="columna">Mail</th>
                  <th className="columna">Activo</th>
                  <th className="columna">Acciones</th>
                </tr>

                {Array.isArray(misPacientesState.misPacientes.data) &&
                  misPacientesState.misPacientes.data.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr className="tablaFilasContainer bw18t">
                          <td className="tablaFilas c-white">
                            {item.pacienteNombre} {item.pacienteApellido}{" "}
                          </td>
                          <td className="tablaFilas c-white">
                            {calculaEdad(item.fechaNacimiento)}
                          </td>
                          <td className="tablaFilas c-white">
                            {new Date(item.fechaNacimiento).toLocaleDateString()}
                          </td>
                          <td className="tablaFilas c-white">
                            {item.direccion}
                          </td>
                          <td className="tablaFilas c-white">
                            {item.nombreTutor}
                          </td>
                          <td className="tablaFilas c-white">
                            {item.telefono}
                          </td>
                          <td className="tablaFilas c-white">
                            {item.mail}
                          </td>
                          {item.estado ? (
                            <td className="tablaFilas c-white">Si</td>
                          ) : (
                            <td className="tablaFilas c-white">No</td>
                          )}

                          <td className="tablaFilas c-white">
                            <div className="btnPacientesBox">
                              {item.estado ? (
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
                              <LlamadaProfesional paciente={item} />
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
