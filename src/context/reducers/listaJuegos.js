import {
  LISTAJUEGOS_ERROR,
  LISTAJUEGOS_LOADING,
  LISTAJUEGOS_SUCCESS,
  LISTAJUEGOS_RESET,
} from "../ActionTypes";
import listaJuegosInitialState from "../initialStates/listaJuegosInitialState";

const listaJuegos = (state, { payload, type }) => {
  switch (type) {
    case LISTAJUEGOS_LOADING:
      return {
        ...state,
        listaJuegos: {
          ...state.listaJuegos,
          error: false,
          loading: true,
        },
      };
    case LISTAJUEGOS_SUCCESS:
      return {
        ...state,
        listaJuegos: {
          ...state.listaJuegos,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case LISTAJUEGOS_ERROR:
      return {
        ...state,
        listaJuegos: {
          ...state.listaJuegos,
          error: payload,
          loading: false,
        },
      };
    case LISTAJUEGOS_RESET:
      return listaJuegosInitialState;

    default:
      return state;
  }
};

export default listaJuegos;
