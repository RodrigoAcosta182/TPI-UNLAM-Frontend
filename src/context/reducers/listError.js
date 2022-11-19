import { SET_LIST_ERROR, LIST_ERROR_RESET } from "../ActionTypes";
import listErrorInitialState from "../initialStates/listErrorInitialState";

const listError = (state, { payload, type }) => {
  switch (type) {
    case SET_LIST_ERROR:
      return {
        ...state,
        listError: payload,
      };
    case LIST_ERROR_RESET:
      return {
        ...state,
        listError: {
          dni: false,
          nombre: false,
          apellido: false,
          nombreTutor: false,
          contrasena: false,
          contrasenaRep: false,
          direccion: false,
          fecha_nacimiento: false,
          email: false,
          matricula: false,
        },
      };

    default:
      return state;
  }
};
export default listError;
