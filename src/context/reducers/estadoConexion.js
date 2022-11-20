import {
  ESTADO_CONEXION_ERROR,
  ESTADO_CONEXION_LOADING,
  ESTADO_CONEXION_SUCCESS,
  ESTADO_CONEXION_RESET,
  SET_USUARIO_CONECTADO,
  RESET_USUARIO_CONECTADO,
} from "../ActionTypes";
import estadoConexionInitialState from "../initialStates/estadoConexionInitialState";

const estadoConexion = (state, { payload, type }) => {
  switch (type) {
    case ESTADO_CONEXION_LOADING:
      return {
        ...state,
        estadoConexion: {
          ...state.estadoConexion,
          error: false,
          loading: true,
        },
      };
    case ESTADO_CONEXION_SUCCESS:
      return {
        ...state,
        estadoConexion: {
          ...state.estadoConexion,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case ESTADO_CONEXION_ERROR:
      return {
        ...state,
        estadoConexion: {
          ...state.estadoConexion,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case SET_USUARIO_CONECTADO:
      return {
        ...state,
        usuarioConectado: payload,
      };
    case RESET_USUARIO_CONECTADO:
      return {
        ...state,
        usuarioConectado: null,
      };
    case ESTADO_CONEXION_RESET:
      return estadoConexionInitialState;

    default:
      return state;
  }
};

export default estadoConexion;
