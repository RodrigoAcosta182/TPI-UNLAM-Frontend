import axiosInstance from "../../../helpers/axiosInstance";
import {
  ESTADO_CONEXION_ERROR,
  ESTADO_CONEXION_LOADING,
  ESTADO_CONEXION_RESET,
  ESTADO_CONEXION_SUCCESS,
  RESET_USUARIO_CONECTADO,
  SET_USUARIO_CONECTADO,
} from "../../ActionTypes";

export const wsPostEstadoConexion = (conexionDto) => (dispatch) => {
  dispatch({
    type: ESTADO_CONEXION_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post(`/estadoConexion`, conexionDto)
      .then((res) => {
        dispatch({
          type: ESTADO_CONEXION_SUCCESS,
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
          type: ESTADO_CONEXION_ERROR,
          payload: error,
        });
      });
  });
};

export const setUsuarioConectado = (usuario) => (dispatch) => {
  dispatch({ type: SET_USUARIO_CONECTADO, payload: usuario });
};

export const resetUsuarioConectado = () => (dispatch) => {
  dispatch({ type: RESET_USUARIO_CONECTADO });
};
export const estadoConexionReset = () => (dispatch) => {
  dispatch({ type: ESTADO_CONEXION_RESET });
};
