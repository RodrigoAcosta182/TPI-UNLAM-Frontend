import {
  RESULTADOS_ERROR,
  RESULTADOS_LOADING,
  RESULTADOS_SUCCESS,
  RESULTADOS_RESET,
  RESULTADOS_GLOBAL_ERROR,
  RESULTADOS_GLOBAL_LOADING,
  RESULTADOS_GLOBAL_SUCCESS,
  RESULTADOS_GLOBAL_RESET,
} from "../ActionTypes";
import resultadosInitialState from "../initialStates/resultadosInitialState";

const resultados = (state, { payload, type }) => {
  switch (type) {
    case RESULTADOS_LOADING:
      return {
        ...state,
        resultados: {
          ...state.resultados,
          error: false,
          loading: true,
        },
      };
    case RESULTADOS_SUCCESS:
      return {
        ...state,
        resultados: {
          ...state.resultados,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case RESULTADOS_ERROR:
      return {
        ...state,
        resultados: {
          ...state.resultados,
          error: payload,
          loading: false,
        },
      };
    case RESULTADOS_GLOBAL_LOADING:
      return {
        ...state,
        resultadosGlobales: {
          ...state.resultadosGlobales,
          error: false,
          loading: true,
        },
      };
    case RESULTADOS_GLOBAL_SUCCESS:
      return {
        ...state,
        resultadosGlobales: {
          ...state.resultadosGlobales,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case RESULTADOS_GLOBAL_ERROR:
      return {
        ...state,
        resultadosGlobales: {
          ...state.resultadosGlobales,
          error: payload,
          loading: false,
        },
      };

    case RESULTADOS_RESET || RESULTADOS_GLOBAL_RESET:
      return resultadosInitialState;

    default:
      return state;
  }
};

export default resultados;
