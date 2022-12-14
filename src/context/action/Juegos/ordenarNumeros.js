import {
  ORDENNUMEROS_ERROR,
  ORDENNUMEROS_LOADING,
  ORDENNUMEROS_SUCCESS,
  ORDENNUMEROS_RESET,
  VERIFICARNUMEROS_ERROR,
  VERIFICARNUMEROS_LOADING,
  VERIFICARNUMEROS_SUCCESS,
  VERIFICARNUMEROS_RESET,
} from "../../ActionTypes";
import axiosInstance from "../../../helpers/axiosInstance";

export const wsGetNumerosDesordenados = () => (dispatch) => {
  dispatch({
    type: ORDENNUMEROS_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/getNumerosDesordenados`)
      .then((res) => {
        dispatch({
          type: ORDENNUMEROS_SUCCESS,
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
          type: ORDENNUMEROS_ERROR,
          payload: error,
        });
      });
  });
};

export const wsPostVerificarNumeros = (listaNumeros) => (dispatch) => {
  dispatch({
    type: VERIFICARNUMEROS_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post(`/VerificarNumerosOrdenados`, listaNumeros)
      .then((res) => {
        dispatch({
          type: VERIFICARNUMEROS_SUCCESS,
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
          type: VERIFICARNUMEROS_ERROR,
          payload: error,
        });
      });
  });
};

export const resetOrdenNumeros = () => (dispatch) => {
  dispatch({ type: ORDENNUMEROS_RESET });
};

export const resetVerificarNumero = () => (dispatch) => {
  dispatch({ type: VERIFICARNUMEROS_RESET });
};
