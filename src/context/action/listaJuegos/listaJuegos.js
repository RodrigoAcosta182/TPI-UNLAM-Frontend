import {
    LISTAJUEGOS_ERROR,
    LISTAJUEGOS_LOADING,
    LISTAJUEGOS_SUCCESS,
    LISTAJUEGOS_RESET,
} from "../../ActionTypes";
import axiosInstance from "../../../helpers/axiosInstance";

export const wsGetListaDeJuegos = () => (dispatch) => {
  dispatch({
    type: LISTAJUEGOS_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/auth`)
      .then((res) => {
        dispatch({
          type: LISTAJUEGOS_SUCCESS,
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
          type: LISTAJUEGOS_ERROR,
          payload: error,
        });
      });
  });
};

export const resetListaJuegos = () => (dispatch) => {
  dispatch({ type: LISTAJUEGOS_RESET });
};
