import {
  SET_PACIENTE_SELECCIONADO,
  RESET_PACIENTE_SELECCIONADO,
} from "../../ActionTypes";

export const setPacienteContexto = (paciente) => (dispatch) => {
  dispatch({
    type: SET_PACIENTE_SELECCIONADO,
    payload: paciente
  });
};

export const resetPacienteContexto = () => (dispatch) => {
  dispatch({ type: RESET_PACIENTE_SELECCIONADO });
};
