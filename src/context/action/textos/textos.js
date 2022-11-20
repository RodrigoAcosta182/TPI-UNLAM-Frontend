import {
  TEXTOS_ERROR,
  TEXTOS_LOADING,
  TEXTOS_SUCCESS,
  TEXTOS_RESET,
} from "../../ActionTypes";
import axiosInstance from "../../../helpers/axiosInstance";

export const wsGetAllTextos = () => (dispatch) => {
  dispatch({
    type: TEXTOS_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/getAllInformacion`)
      .then((res) => {
        dispatch({
          type: TEXTOS_SUCCESS,
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
          type: TEXTOS_ERROR,
          payload: error,
        });
      });
  });
};

export const resetTextos = () => (dispatch) => {
  dispatch({ type: TEXTOS_RESET });
};
