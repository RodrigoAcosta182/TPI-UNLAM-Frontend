import {
  GET_PROFESIONAL_POR_PACIENTE_ERROR,
  GET_PROFESIONAL_POR_PACIENTE_LOADING,
  GET_PROFESIONAL_POR_PACIENTE_SUCCESS,
  GET_PROFESIONAL_POR_PACIENTE_RESET,
} from "../ActionTypes";
import profesionalPorPacienteInitialState from "../initialStates/profesionalPorPacienteInitialState";

const profesionalPorPaciente = (state, { payload, type }) => {
  switch (type) {
    case GET_PROFESIONAL_POR_PACIENTE_LOADING:
      return {
        ...state,
        profesionalPorPaciente: {
          ...state.profesionalPorPaciente,
          error: false,
          loading: true,
        },
      };
    case GET_PROFESIONAL_POR_PACIENTE_SUCCESS:
      return {
        ...state,
        profesionalPorPaciente: {
          ...state.profesionalPorPaciente,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case GET_PROFESIONAL_POR_PACIENTE_ERROR:
      return {
        ...state,
        profesionalPorPaciente: {
          ...state.profesionalPorPaciente,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case GET_PROFESIONAL_POR_PACIENTE_RESET:
      return profesionalPorPacienteInitialState;

    default:
      return state;
  }
};

export default profesionalPorPaciente;
