import {
    MISPACIENTES_ERROR,
    MISPACIENTES_LOADING,
    MISPACIENTES_SUCCESS,
    MISPACIENTES_RESET,
    HABILITAR_PACIENTE_SUCCESS,
    HABILITAR_PACIENTE_RESET,
} from "../../ActionTypes";
import axiosInstance from "../../../helpers/axiosInstance";

export const wsGetListaDePacientes = () => (dispatch) => {
  dispatch({
    type: MISPACIENTES_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/MisPacientes`)
      .then((res) => {
        dispatch({
          type: MISPACIENTES_SUCCESS,
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
          type: MISPACIENTES_ERROR,
          payload: error,
        });
      });
  });
};

export const wsHabilitarPaciente = (dtoHabilitar) => (dispatch) => {
  dispatch({
    type: MISPACIENTES_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .post(`/HabilitaPacientePorProfesional`, dtoHabilitar)
      .then((res) => {
        dispatch({
          type: HABILITAR_PACIENTE_SUCCESS,
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
          type: MISPACIENTES_RESET,
          payload: error,
        });
      });
  });
};

export const resetHabilitacionPaciente = () => (dispatch) => {
  dispatch({ type: HABILITAR_PACIENTE_RESET });
};

export const resetListaPacientes = () => (dispatch) => {
  dispatch({ type: MISPACIENTES_RESET });
};
