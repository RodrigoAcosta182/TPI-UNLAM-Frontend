import {
  PROFESIONALES_ERROR,
  PROFESIONALES_LOADING,
  PROFESIONALES_RESET,
  PROFESIONALES_SUCCESS,
  HABILITAR_PROFESIONAL_LOADING,
  HABILITAR_PROFESIONAL_ERROR,
  HABILITAR_PROFESIONAL_SUCCESS,
} from "../ActionTypes";
import profesionalesInitialState from "../initialStates/profesionalesInitialState";

const profesionales = (state, { payload, type }) => {
  switch (type) {
    case PROFESIONALES_LOADING:
      return {
        ...state,
        profesionales: {
          ...state.profesionales,
          error: false,
          loading: true,
        },
      };
    case PROFESIONALES_SUCCESS:
      return {
        ...state,
        profesionales: {
          ...state.profesionales,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case PROFESIONALES_ERROR:
      return {
        ...state,
        profesionales: {
          ...state.profesionales,
          error: payload,
          loading: false,
        },
      };
    case HABILITAR_PROFESIONAL_LOADING:
      return {
        ...state,
        profesionales: {
          ...state.profesionales,
          error: false,
          loading: true,
        },
      };
    case HABILITAR_PROFESIONAL_SUCCESS:
      return {
        ...state,
        profesionales: {
          ...state.profesionales,
          loading: false,
          error: false,
          habilitado: payload,
        },
      };
    case HABILITAR_PROFESIONAL_ERROR:
      return {
        ...state,
        profesionales: {
          ...state.profesionales,
          error: payload,
          loading: false,
        },
      };
    case PROFESIONALES_RESET:
      return profesionalesInitialState;

    default:
      return state;
  }
};

export default profesionales;
