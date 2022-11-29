import {
  NOTA_ERROR,
  NOTA_LOADING,
  NOTA_SUCCESS,
  NOTA_RESET,
  GET_NOTA_ERROR,
  GET_NOTA_LOADING,
  GET_NOTA_SUCCESS,
  GET_NOTA_RESET,
} from "../../ActionTypes";
import axiosInstance from "../../../helpers/axiosInstance";

export const wsGetNotaXProfesional = (idPaciente) => (dispatch) => {
  dispatch({
    type: GET_NOTA_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/GetAllNotasXPacienteXProfesional/${idPaciente}`)
      .then((res) => {
        dispatch({
          type: GET_NOTA_SUCCESS,
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
          type: GET_NOTA_ERROR,
          payload: error,
        });
      });
  });
};

export const wsPostNota = (notaDto) => (dispatch) => {
  dispatch({
    type: NOTA_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post(`/GuardarNota`, notaDto)
      .then((res) => {
        dispatch({
          type: NOTA_SUCCESS,
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
          type: NOTA_ERROR,
          payload: error,
        });
      });
  });
};

export const wsArchivarNota = (idNota) => (dispatch) => {
  dispatch({
    type: NOTA_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post(`/ArchivarNota/${idNota}`)
      .then((res) => {
        dispatch({
          type: NOTA_SUCCESS,
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
          type: NOTA_ERROR,
          payload: error,
        });
      });
  });
};

export const wsEliminarNota = (idNota) => (dispatch) => {
  dispatch({
    type: NOTA_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post(`/EliminarNota/${idNota}`)
      .then((res) => {
        dispatch({
          type: NOTA_SUCCESS,
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
          type: NOTA_ERROR,
          payload: error,
        });
      });
  });
};

export const resetNota = () => (dispatch) => {
  dispatch({ type: NOTA_RESET });
};

export const resetGetNota = () => (dispatch) => {
  dispatch({ type: GET_NOTA_RESET });
};