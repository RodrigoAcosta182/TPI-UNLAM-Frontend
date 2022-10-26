import axiosInstance from "../../../helpers/axiosInstance";
import {
  GET_LLAMADA_ACTUAL_ERROR,
  GET_LLAMADA_ACTUAL_LOADING,
  GET_LLAMADA_ACTUAL_SUCCESS,
  LLAMADA_ERROR,
  LLAMADA_LOADING,
  LLAMADA_RESET,
  LLAMADA_SALIENTE_ERROR,
  LLAMADA_SALIENTE_LOADING,
  LLAMADA_SALIENTE_SUCCESS,
  LLAMADA_SUCCESS,
} from "../../ActionTypes";

export const wsPostGuardarLlamada = (llamadaDto) => (dispatch) => {
  dispatch({
    type: LLAMADA_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post(`/guardarLlamada`, llamadaDto)
      .then((res) => {
        dispatch({
          type: LLAMADA_SUCCESS,
          payload: res.status,
        });
      })
      .catch((err) => {
        let error = {
          detail: err.response
            ? err.response.data
            : "Error al contactar el server.",
        };

        dispatch({
          type: LLAMADA_ERROR,
          payload: error,
        });
      });
  });
};

export const wsPostLlamadaSaliente = ({idLlamada, idPaciente}) => (dispatch) => {
  dispatch({
    type: LLAMADA_SALIENTE_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post(`/llamadaSaliente`, {
        ReceptorId: idPaciente,
        LlamadaId: idLlamada,
      })
      .then((res) => {
        dispatch({
          type: LLAMADA_SALIENTE_SUCCESS,
          payload: res.status,
        });
      })
      .catch((err) => {
        let error = {
          detail: err.response
            ? err.response.data
            : "Error al contactar el server.",
        };

        dispatch({
          type: LLAMADA_SALIENTE_ERROR,
          payload: error,
        });
      });
  });
};


export const wsGetLlamadaActual = () => (dispatch) => {
  dispatch({
    type: GET_LLAMADA_ACTUAL_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/obtenerLlamadaActual`)
      .then((res) => {
        dispatch({
          type: GET_LLAMADA_ACTUAL_SUCCESS,
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
          type: GET_LLAMADA_ACTUAL_ERROR,
          payload: error,
        });
      });
  });
};

export const resetLlamada = () => (dispatch) => {
  dispatch({ type: LLAMADA_RESET });
};
