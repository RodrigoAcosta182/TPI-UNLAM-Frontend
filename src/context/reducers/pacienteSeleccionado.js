import {
  SET_PACIENTE_SELECCIONADO,
  RESET_PACIENTE_SELECCIONADO
} from "../ActionTypes";
import pacienteSeleccionadoInitialState from "../initialStates/pacienteSeleccionadoInitialState";

const listaJuegos = (state, { payload, type }) => {
  switch (type) {
    case SET_PACIENTE_SELECCIONADO:
      return {
        ...state,
        pacienteSelected: {
          ...state.pacienteSelected,
          data: payload,
        },
      };
    case RESET_PACIENTE_SELECCIONADO:
      return pacienteSeleccionadoInitialState;

    default:
      return state;
  }
};

export default listaJuegos;
