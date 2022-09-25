import {
    COLORES_ERROR,
    COLORES_LOADING,
    COLORES_SUCCESS,
    COLORES_RESET,
} from "../../ActionTypes";
import axiosInstance from "../../../helpers/axiosInstance";

export const wsGetColores = () => (dispatch) => {
  dispatch({
    type: COLORES_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/getAllColores`)
      .then((res) => {
        dispatch({
          type: COLORES_SUCCESS,
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
          type: COLORES_ERROR,
          payload: error,
        });
      });
  });
};

export const resetColores = () => (dispatch) => {
  dispatch({ type: COLORES_RESET });
};
