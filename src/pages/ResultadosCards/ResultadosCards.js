import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./ResultadosCards.css";
import CardJuegos from "../../components/juego/CardJuegos/CardJuegos";
import { GlobalContext } from "../../context/Provider";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import { wsGetListaDeJuegos } from "../../context/action/listaJuegos/listaJuegos";
import { setJuegoContexto } from "../../context/action/juegoSeleccionado/juegoSeleccionado";
import SalirIcon from "../../assets/images/SalirIcon";
import { resetPacienteContexto } from "../../context/action/pacienteSeleccionado/pacienteSeleccionado";

const ResultadosCards = () => {
  const {
    authState,
    pacienteSeleccionadoState,
    pacienteSeleccionadoDispatch,
    listaJuegosState,
    listaJuegosDispatch,
    juegoSeleccionadoDispatch,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (
      pacienteSeleccionadoState.pacienteSelected.data === null &&
      authState.auth.data.usuario.tipoUsuarioId === 2
    ) {
      history.push("/misPacientes");
    }
  }, [pacienteSeleccionadoState.pacienteSelected.data, authState.auth.data]);

  useEffect(() => {
    wsGetListaDeJuegos()(listaJuegosDispatch);
  }, []);

  const history = useHistory();

  const irAResultados = (e) => {
    history.push("/resultados");
    setJuegoContexto(e)(juegoSeleccionadoDispatch);
  };

  const volverAMisPacientes = () => {
    history.push("/misPacientes");
    resetPacienteContexto()(pacienteSeleccionadoDispatch);
  };

  return (
    <React.Fragment>
      <HeaderbarHome></HeaderbarHome>
      <div className="resultados-volverAccion">
        <div className="resultados-btnCont" onClick={volverAMisPacientes}>
          <SalirIcon />
          <p className="resultados-volverBtn c-white bw16b">VOLVER</p>
        </div>
      </div>
      <div className="resultadosCard-container">
        <div className="resultadosCard-logoBienvenida">
          {pacienteSeleccionadoState.pacienteSelected.data && (
            <p className="c-white bw32t">
              Paciente:{" "}
              <span className="bw32b">
                {pacienteSeleccionadoState.pacienteSelected.data.pacienteNombre}{" "}
                {
                  pacienteSeleccionadoState.pacienteSelected.data
                    .pacienteApellido
                }
              </span>
            </p>
          )}
        </div>
        <p className="c-white bw32t">
          Seleccioná un juego para ver los resultados
        </p>
        <div className="resultadosCard-listaJuegos">
          {Array.isArray(listaJuegosState.listaJuegos.data) &&
            listaJuegosState.listaJuegos.data.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="resultadosCard-cardJuegos">
                    <CardJuegos
                      juego={item.descripcion}
                      activo={item.activo}
                      irAlJuego={() => irAResultados(item)}
                      imagen={item.id}
                    />
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResultadosCards;
