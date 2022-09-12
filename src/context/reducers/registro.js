import {
  REGISTRO_SUCCESS,
  REGISTRO_LOADING,
  REGISTRO_ERROR,
  REGISTRO_RESET,
} from "../ActionTypes";
import registroInitialState from "../initialStates/registroInitialState";

const registro = (state, { payload, type }) => {
  switch (type) {
    case REGISTRO_LOADING:
      return {
        ...state,
        registro: {
          ...state.registro,
          error: false,
          loading: true,
        },
      };
    case REGISTRO_SUCCESS:
      return {
        ...state,
        registro: {
          ...state.registro,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case REGISTRO_ERROR:
      return {
        ...state,
        registro: {
          ...state.registro,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case REGISTRO_RESET:
      return registroInitialState;

    default:
      return state;
  }
};

export default registro;
