import {
  SUGERENCIA_ERROR,
  SUGERENCIA_LOADING,
  SUGERENCIA_SUCCESS,
  SUGERENCIA_RESET,
} from "../../ActionTypes";
import axiosInstance from "../../../helpers/axiosInstance";

export const wsPostSugerencia = (sugerenciaDispatch) => (dispatch) => {
  dispatch({
    type: SUGERENCIA_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post(`/guardarSugerencia`, sugerenciaDispatch)
      .then((res) => {
        dispatch({
          type: SUGERENCIA_SUCCESS,
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
          type: SUGERENCIA_ERROR,
          payload: error,
        });
      });
  });
};

export const resetSugerencia = () => (dispatch) => {
  dispatch({ type: SUGERENCIA_RESET });
};
