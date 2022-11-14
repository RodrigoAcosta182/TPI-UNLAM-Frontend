import {
  SET_JUEGO_SELECCIONADO,
  RESET_JUEGO_SELECCIONADO,
} from "../ActionTypes";
import juegoSeleccionadoInitialState from "../initialStates/juegoSeleccionadoInitialState";

const juegoSeleccionado = (state, { payload, type }) => {
  switch (type) {
    case SET_JUEGO_SELECCIONADO:
      return {
        ...state,
        juegoSelected: {
          ...state.pacienteSelected,
          data: payload,
        },
      };
    case RESET_JUEGO_SELECCIONADO:
      return juegoSeleccionadoInitialState;

    default:
      return state;
  }
};

export default juegoSeleccionado;
