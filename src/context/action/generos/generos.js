import {
    GENEROS_ERROR,
    GENEROS_LOADING,
    GENEROS_SUCCESS,
    GENEROS_RESET,
} from "../../ActionTypes";
import axiosInstance from "../../../helpers/axiosInstance";

export const wsGetGeneros = () => (dispatch) => {
  dispatch({
    type: GENEROS_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/getAllGeneros`)
      .then((res) => {
        dispatch({
          type: GENEROS_SUCCESS,
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
          type: GENEROS_ERROR,
          payload: error,
        });
      });
  });
};

export const resetGeneros = () => (dispatch) => {
  dispatch({ type: GENEROS_RESET });
};
