import {
  SET_JUEGO_SELECCIONADO,
  RESET_JUEGO_SELECCIONADO,
} from "../../ActionTypes";

export const setJuegoContexto = (paciente) => (dispatch) => {
  dispatch({
    type: SET_JUEGO_SELECCIONADO,
    payload: paciente
  });
};

export const resetJuegoContexto = () => (dispatch) => {
  dispatch({ type: RESET_JUEGO_SELECCIONADO });
};
