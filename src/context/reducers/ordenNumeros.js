import {
  ORDENNUMEROS_ERROR,
  ORDENNUMEROS_LOADING,
  ORDENNUMEROS_SUCCESS,
  ORDENNUMEROS_RESET,
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
    case ORDENNUMEROS_RESET:
      return ordenNumerosInitialState;

    default:
      return state;
  }
};

export default listaJuegos;
