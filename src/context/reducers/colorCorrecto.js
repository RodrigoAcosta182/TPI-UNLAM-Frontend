import {
  COLORES_ERROR,
  COLORES_LOADING,
  COLORES_SUCCESS,
  COLORES_RESET,
} from "../ActionTypes";
import colorCorrectoInitialState from "../initialStates/colorCorrectoInitialState";

const listaJuegos = (state, { payload, type }) => {
  switch (type) {
    case COLORES_LOADING:
      return {
        ...state,
        colores: {
          ...state.colores,
          error: false,
          loading: true,
        },
      };
    case COLORES_SUCCESS:
      return {
        ...state,
        colores: {
          ...state.colores,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case COLORES_ERROR:
      return {
        ...state,
        colores: {
          ...state.colores,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case COLORES_RESET:
      return colorCorrectoInitialState;

    default:
      return state;
  }
};

export default listaJuegos;
