import {
  LLAMADA_ERROR,
  LLAMADA_LOADING,
  LLAMADA_SUCCESS,
  LLAMADA_SALIENTE_ERROR,
  LLAMADA_SALIENTE_LOADING,
  LLAMADA_SALIENTE_SUCCESS,
  LLAMADA_RESET,
  GET_LLAMADA_ACTUAL_LOADING,
  GET_LLAMADA_ACTUAL_SUCCESS,
  GET_LLAMADA_ACTUAL_ERROR,
  SET_LLAMADA_ACTUAL_SUCCESS,
} from "../ActionTypes";
import llamadaInitialState from "../initialStates/llamadaInitialState";

const llamada = (state, { payload, type }) => {
  switch (type) {
    case LLAMADA_LOADING:
      return {
        ...state,
        llamada: {
          ...state.llamada,
          error: false,
          loading: true,
        },
      };
    case LLAMADA_SUCCESS:
      return {
        ...state,
        llamada: {
          ...state.llamada,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case LLAMADA_ERROR:
      return {
        ...state,
        llamada: {
          ...state.llamada,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case LLAMADA_SALIENTE_LOADING:
      return {
        ...state,
        llamadaSaliente: {
          ...state.llamadaSaliente,
          error: false,
          loading: true,
        },
      };
    case LLAMADA_SALIENTE_SUCCESS:
      return {
        ...state,
        llamadaSaliente: {
          ...state.llamadaSaliente,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case LLAMADA_SALIENTE_ERROR:
      return {
        ...state,
        llamadaSaliente: {
          ...state.llamadaSaliente,
          error: payload,
          loading: false,
          data: null,
        },
      };

    case GET_LLAMADA_ACTUAL_LOADING:
      return {
        ...state,
        llamadaActual: {
          ...state.llamadaActual,
          error: false,
          loading: true,
        },
      };
    case GET_LLAMADA_ACTUAL_SUCCESS:
      return {
        ...state,
        llamadaActual: {
          ...state.llamadaActual,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case GET_LLAMADA_ACTUAL_ERROR:
      return {
        ...state,
        llamadaActual: {
          ...state.llamadaActual,
          error: payload,
          loading: false,
          data: null,
        },
      };

    case SET_LLAMADA_ACTUAL_SUCCESS:
      return {
        ...state,
        llamadaActual: {
          ...state.llamadaActual,
          loading: false,
          error: false,
          data: { ...state.data, codigoLlamada: payload },
        },
      };
    case LLAMADA_RESET:
      return llamadaInitialState;

    default:
      return state;
  }
};

export default llamada;
