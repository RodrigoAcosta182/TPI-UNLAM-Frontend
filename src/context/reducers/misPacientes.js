import {
  MISPACIENTES_ERROR,
  MISPACIENTES_LOADING,
  MISPACIENTES_SUCCESS,
  MISPACIENTES_RESET,
} from "../ActionTypes";
import misPacientesInitialState from "../initialStates/misPacientesInitialState";

const misPacientes = (state, { payload, type }) => {
  switch (type) {
    case MISPACIENTES_LOADING:
      return {
        ...state,
        misPacientes: {
          ...state.misPacientes,
          error: false,
          loading: true,
        },
      };
    case MISPACIENTES_SUCCESS:
      return {
        ...state,
        misPacientes: {
          ...state.misPacientes,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case MISPACIENTES_ERROR:
      return {
        ...state,
        misPacientes: {
          ...state.misPacientes,
          error: payload,
          loading: false,
          data: null,
        },
      };

    case MISPACIENTES_RESET:
      return misPacientesInitialState;

    default:
      return state;
  }
};

export default misPacientes;
