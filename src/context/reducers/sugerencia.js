import {
  SUGERENCIA_ERROR,
  SUGERENCIA_LOADING,
  SUGERENCIA_RESET,
  SUGERENCIA_SUCCESS,
} from "../ActionTypes";

import sugerenciaInitialState from "../initialStates/sugerenciaInitialState";

const sugerencia = (state, { payload, type }) => {
  switch (type) {
    case SUGERENCIA_LOADING:
      return {
        ...state,
        sugerencia: {
          ...state.sugerencia,
          error: false,
          loading: true,
        },
      };
    case SUGERENCIA_SUCCESS:
      return {
        ...state,
        sugerencia: {
          ...state.sugerencia,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case SUGERENCIA_ERROR:
      return {
        ...state,
        sugerencia: {
          ...state.sugerencia,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case SUGERENCIA_RESET:
      return sugerenciaInitialState;

    default:
      return state;
  }
};

export default sugerencia;
