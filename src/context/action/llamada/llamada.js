import axiosInstance from "../../../helpers/axiosInstance";
import { LLAMADA_ERROR, LLAMADA_LOADING, LLAMADA_RESET, LLAMADA_SUCCESS } from "../../ActionTypes";



export const wsPostLlamadaSaliente = (idLlamada) => (dispatch) => {
  dispatch({
    type: LLAMADA_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post(`/llamada`, { idLlamada })
      .then((res) => {
        sessionStorage.token = res.data.token;
        dispatch({
          type: LLAMADA_SUCCESS,
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
          type: LLAMADA_ERROR,
          payload: error,
        });
      });
  });
};

export const resetLlamada = () => (dispatch) => {
  dispatch({ type: LLAMADA_RESET});
};
