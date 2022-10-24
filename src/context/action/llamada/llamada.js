import axiosInstance from "../../../helpers/axiosInstance";
import {
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

export const wsPostLlamadaSaliente = (idLlamada) => (dispatch) => {
  dispatch({
    type: LLAMADA_SALIENTE_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post(`/llamadaSaliente` ,idLlamada)
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


export const resetLlamada = () => (dispatch) => {
  dispatch({ type: LLAMADA_RESET });
};
