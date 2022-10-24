import {
  GENEROS_ERROR,
  GENEROS_LOADING,
  GENEROS_SUCCESS,
  GENEROS_RESET,
} from "../ActionTypes";
import generosInitialState from "../initialStates/generosInitialState";

const generos = (state, { payload, type }) => {
  switch (type) {
    case GENEROS_LOADING:
      return {
        ...state,
        generos: {
          ...state.generos,
          error: false,
          loading: true,
        },
      };
    case GENEROS_SUCCESS:
      return {
        ...state,
        generos: {
          ...state.generos,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case GENEROS_ERROR:
      return {
        ...state,
        generos: {
          ...state.generos,
          error: payload,
          loading: false,
        },
      };

    case GENEROS_RESET:
      return generosInitialState;

    default:
      return state;
  }
};

export default generos;
