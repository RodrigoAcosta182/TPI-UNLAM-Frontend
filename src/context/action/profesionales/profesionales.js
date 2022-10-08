import axiosInstance from "../../../helpers/axiosInstance";
import {
  PROFESIONALES_ERROR,
  PROFESIONALES_LOADING,
  PROFESIONALES_RESET,
  PROFESIONALES_SUCCESS,
} from "../../ActionTypes";

export const wsGetProfesionales = () => (dispatch) => {
  dispatch({
    type: PROFESIONALES_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/GetAllProfesionales`)
      .then((res) => {
        dispatch({
          type: PROFESIONALES_SUCCESS,
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
          type: PROFESIONALES_ERROR,
          payload: error,
        });
      });
  });
};

export const profesionalesReset = () => (dispatch) => {
  dispatch({ type: PROFESIONALES_RESET });
};
