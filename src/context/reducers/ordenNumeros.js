import {
  ORDENNUMEROS_ERROR,
  ORDENNUMEROS_LOADING,
  ORDENNUMEROS_SUCCESS,
  ORDENNUMEROS_RESET,
  VERIFICARNUMEROS_ERROR,
  VERIFICARNUMEROS_LOADING,
  VERIFICARNUMEROS_SUCCESS,
  VERIFICARNUMEROS_RESET,
} from "../ActionTypes";
import ordenNumerosInitialState from "../initialStates/ordenNumerosInitialState";

const listaJuegos = (state, { payload, type }) => {
  switch (type) {
    case ORDENNUMEROS_LOADING:
      return {
        ...state,
        numeros: {
          ...state.numeros,
          error: false,
          loading: true,
        },
      };

    case ORDENNUMEROS_SUCCESS:
      return {
        ...state,
        numeros: {
          ...state.numeros,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case ORDENNUMEROS_ERROR:
      return {
        ...state,
        numeros: {
          ...state.numeros,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case VERIFICARNUMEROS_LOADING:
      return {
        ...state,
        numeros: {
          ...state.numeros,
          error: false,
          loading: true,
        },
      };
    case VERIFICARNUMEROS_SUCCESS:
      return {
        ...state,
        numeros: {
          ...state.numeros,
          loading: false,
          error: false,
          estaOrdenado: payload,
        },
      };
    case VERIFICARNUMEROS_ERROR:
      return {
        ...state,
        numeros: {
          ...state.numeros,
          error: payload,
          loading: false,
          estaOrdenado: null,
        },
      };
    case ORDENNUMEROS_RESET:
      return {
        ...state,
        numeros: {
          ...state.numeros,
          error: null,
          loading: false,
          data: null,
        },
      };
    case VERIFICARNUMEROS_RESET:
      return {
        ...state,
        numeros: {
          ...state.numeros,
          error: null,
          loading: false,
          estaOrdenado: null,
        },
      };

    default:
      return ordenNumerosInitialState;
  }
};

export default listaJuegos;
