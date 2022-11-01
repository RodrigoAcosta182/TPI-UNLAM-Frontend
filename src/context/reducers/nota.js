import {
  NOTA_ERROR,
  NOTA_LOADING,
  NOTA_SUCCESS,
  NOTA_RESET,
  GET_NOTA_LOADING,
  GET_NOTA_ERROR,
  GET_NOTA_SUCCESS,
  GET_NOTA_RESET,
} from "../ActionTypes";

import notaInitialState from "../initialStates/notaInitialState";

const nota = (state, { payload, type }) => {
  switch (type) {
    case NOTA_LOADING:
      return {
        ...state,
        nota: {
          ...state.nota,
          error: false,
          loading: true,
        },
      };
    case NOTA_SUCCESS:
      return {
        ...state,
        nota: {
          ...state.nota,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case NOTA_ERROR:
      return {
        ...state,
        nota: {
          ...state.nota,
          error: payload,
          loading: false,
        },
      };
    case GET_NOTA_LOADING:
      return {
        ...state,
        nota: {
          ...state.nota,
          error: false,
          loading: true,
        },
      };
    case GET_NOTA_SUCCESS:
      return {
        ...state,
        nota: {
          ...state.nota,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case GET_NOTA_ERROR:
      return {
        ...state,
        nota: {
          ...state.nota,
          error: payload,
          loading: false,
        },
      };
    case NOTA_RESET || GET_NOTA_RESET:
      return notaInitialState;

    default:
      return state;
  }
};

export default nota;
