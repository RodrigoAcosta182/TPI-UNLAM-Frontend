import axiosInstance from "../../../helpers/axiosInstance";
import {
  GET_PROFESIONAL_POR_PACIENTE_ERROR,
  GET_PROFESIONAL_POR_PACIENTE_LOADING,
  GET_PROFESIONAL_POR_PACIENTE_RESET,
  GET_PROFESIONAL_POR_PACIENTE_SUCCESS,
} from "../../ActionTypes";

export const wsGetProfesionalPorPaciente = () => (dispatch) => {
  dispatch({
    type: GET_PROFESIONAL_POR_PACIENTE_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/ProfesionalXPaciente`)
      .then((res) => {
        dispatch({
          type: GET_PROFESIONAL_POR_PACIENTE_SUCCESS,
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
          type: GET_PROFESIONAL_POR_PACIENTE_ERROR,
          payload: error,
        });
      });
  });
};

export const profesionalPorPacienteReset = () => (dispatch) => {
    dispatch({ type: GET_PROFESIONAL_POR_PACIENTE_RESET });
  };
