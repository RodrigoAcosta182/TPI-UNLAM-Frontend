import * as React from "react";
import "./MisPacientes.css";
import SalirIcon from "../../assets/images/SalirIcon";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import { GlobalContext } from "../../context/Provider";

const MisPacientes = () => {
  const { misPacientesState } = React.useContext(GlobalContext);

  const history = useHistory();

  useEffect(() => {}, []);

  const irAMasInfo = () => {
    history.push("/resultados");
  };

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
                          <td className="tablaFilas c-white">{item.id}  </td>
                          <td className="tablaFilas c-white">{item.usuarioProfesionalId}</td>
                          <td className="tablaFilas c-white">{item.usuarioPacienteId}</td>
                          {item.activo ? (
                            <td className="tablaFilas c-white">Si</td>
                          ) : (
                            <td className="tablaFilas c-white">No</td>
                          )}
                          <td className="tablaFilas c-white">
                            <button onClick={irAMasInfo}>Mas Info</button>
                            <button onClick={irAMasInfo}>Mas Info</button>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}

                {/* <tr className="tablaFilasContainer bw24t">
                  <td className="tablaFilas c-white">John Doe</td>
                  <td className="tablaFilas c-white">John Doe 2</td>
                  <td className="tablaFilas c-white">1145217846</td>
                  <td className="tablaFilas c-white">
                    <button onClick={irAMasInfo}>Mas Info</button>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </>
  );
};

export default MisPacientes;
