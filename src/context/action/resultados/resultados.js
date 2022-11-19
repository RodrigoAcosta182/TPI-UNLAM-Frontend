import {
  RESULTADOS_ERROR,
  RESULTADOS_LOADING,
  RESULTADOS_SUCCESS,
  RESULTADOS_RESET,
  RESULTADOS_GLOBAL_ERROR,
  RESULTADOS_GLOBAL_LOADING,
  RESULTADOS_GLOBAL_SUCCESS,
  RESULTADOS_GLOBAL_RESET,
} from "../../ActionTypes";
import axiosInstance from "../../../helpers/axiosInstance";

export const wsGetResultadosByIdPacienteAndIdJuego = (idPaciente, juegoid) => (dispatch) => {
  dispatch({
    type: RESULTADOS_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/ProgresoXPacienteXJuegoXProfesional/${idPaciente}/${juegoid}`)
      .then((res) => {
        dispatch({
          type: RESULTADOS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        let error = {
          detail: err.response
            ? err.response.data
            : "Error al contactar el server.",
        };

        dispatch({
          type: RESULTADOS_ERROR,
          payload: error,
        });
      });
  });
};

export const wsGetResultadosGlobales = (idPaciente, juegoid) => (dispatch) => {
  dispatch({
    type: RESULTADOS_GLOBAL_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/ProgresoXJuego/${idPaciente}/${juegoid}`)
      .then((res) => {
        dispatch({
          type: RESULTADOS_GLOBAL_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        let error = {
          detail: err.response
            ? err.response.data
            : "Error al contactar el server.",
        };

        dispatch({
          type: RESULTADOS_GLOBAL_ERROR,
          payload: error,
        });
      });
  });
};

// export const wsGetResultadosByIdPaciente = (idPaciente) => (dispatch) => {
//   dispatch({
//     type: RESULTADOS_LOADING,
//   });

//   axiosInstance().then((respuesta) => {
//     respuesta
//       .get(`/ListaProgresoXProfesionalXPaciente/${idPaciente}`)
//       .then((res) => {
//         dispatch({
//           type: RESULTADOS_SUCCESS,
//           payload: res.data,
//         });
//       })
//       .catch((err) => {
//         let error = {
//           detail: err.response
//             ? err.response.data
//             : "Error al contactar el server.",
//         };

//         dispatch({
//           type: RESULTADOS_ERROR,
//           payload: error,
//         });
//       });
//   });
// };

export const wsGetResultadosXPaciente = (idJuego) => (dispatch) => {
  dispatch({
    type: RESULTADOS_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/ProgresosXPacienteXJuego/${idJuego}`)
      .then((res) => {
        dispatch({
          type: RESULTADOS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        let error = {
          detail: err.response
            ? err.response.data
            : "Error al contactar el server.",
        };

        dispatch({
          type: RESULTADOS_ERROR,
          payload: error,
        });
      });
  });
};

export const resetListaProgresos = () => (dispatch) => {
  dispatch({ type: RESULTADOS_RESET });
};

export const resetResultadosGlobales = () => (dispatch) => {
  dispatch({ type: RESULTADOS_GLOBAL_RESET });
};