import {
  RESULTADOS_ERROR,
  RESULTADOS_LOADING,
  RESULTADOS_SUCCESS,
  RESULTADOS_RESET,
  EXPORTAR_ERROR,
  EXPORTAR_LOADING,
  EXPORTAR_SUCCESS,
  EXPORTAR_RESET,
} from "../../ActionTypes";
import axiosInstance from "../../../helpers/axiosInstance";

export const wsGetResultadosByIdPaciente = (idPaciente) => (dispatch) => {
  dispatch({
    type: RESULTADOS_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/ListaProgresoXProfesionalXPaciente/${idPaciente}`)
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

export const wsGetResultadosXPaciente = () => (dispatch) => {
  dispatch({
    type: RESULTADOS_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/ListaProgresosXPaciente`)
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

export const wsExportarPDF = (html) => (dispatch) => {
  dispatch({
    type: EXPORTAR_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post(`/GenerarPDF`, { Html: html })
      .then((res) => {
        dispatch({
          type: EXPORTAR_SUCCESS,
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
          type: EXPORTAR_ERROR,
          payload: error,
        });
      });
  });
};

export const resetListaProgresos = () => (dispatch) => {
  dispatch({ type: RESULTADOS_RESET });
};
