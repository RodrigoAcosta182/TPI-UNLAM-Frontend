import axiosInstance from "../../../helpers/axiosInstance";
import {
  PROFESIONALES_ERROR,
  PROFESIONALES_LOADING,
  PROFESIONALES_RESET,
  PROFESIONALES_SUCCESS,
  HABILITAR_PROFESIONAL_LOADING,
  HABILITAR_PROFESIONAL_ERROR,
  HABILITAR_PROFESIONAL_SUCCESS,
  HABILITAR_PROFESIONAL_RESET,
 
} from "../../ActionTypes";

export const wsGetProfesionalesActivos = () => (dispatch) => {
  dispatch({
    type: PROFESIONALES_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/ObtenerTodosLosProfesionalesActivos`)
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


export const wsGetAllProfesionales = () => (dispatch) => {
  dispatch({
    type: PROFESIONALES_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/ObtenerTodosLosProfesionales`)
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

export const wsHabilitarProfesional = (dtoHabilitar) => (dispatch) => {
  dispatch({
    type: HABILITAR_PROFESIONAL_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .post(`/HabilitarProfesional`, dtoHabilitar)
      .then((res) => {
        dispatch({
          type: HABILITAR_PROFESIONAL_SUCCESS,
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
          type: HABILITAR_PROFESIONAL_ERROR,
          payload: error,
        });
      });
  });
};

export const resetHabilitacion = () => (dispatch) => {
  dispatch({ type: HABILITAR_PROFESIONAL_RESET });
};



export const profesionalesReset = () => (dispatch) => {
  dispatch({ type: PROFESIONALES_RESET });
};
