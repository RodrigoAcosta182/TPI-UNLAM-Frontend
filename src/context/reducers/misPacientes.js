import {
  MISPACIENTES_ERROR,
  MISPACIENTES_LOADING,
  MISPACIENTES_SUCCESS,
  MISPACIENTES_RESET,
  HABILITAR_PACIENTE_SUCCESS,
  HABILITAR_PACIENTE_RESET
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
        },
      };
      case HABILITAR_PACIENTE_SUCCESS:
        return {
          ...state,
          misPacientes: {
            ...state.misPacientes,
            loading: false,
            error: false,
            habilitar: payload,
          },
        };
      case HABILITAR_PACIENTE_RESET:
        return {
          ...state,
          misPacientes: {
            ...state.misPacientes,
            habilitar: null,
          },
        };
        
    case MISPACIENTES_RESET:
      return misPacientesInitialState;

    default:
      return state;
  }
};

export default misPacientes;
