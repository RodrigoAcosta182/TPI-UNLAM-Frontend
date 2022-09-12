import axiosInstance from "../../../helpers/axiosInstance";
import {
  REGISTRO_ERROR,
  REGISTRO_LOADING,
  REGISTRO_SUCCESS,
} from "../../ActionTypes";

export const wsPostRegistro = (dtoRegistro) => (dispatch) => {
  dispatch({
    type: REGISTRO_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post("/agregarUsuario", {
        Matricula: dtoRegistro.matricula,
        Nombre: dtoRegistro.nombre,
        Apellido: dtoRegistro.apellido,
        Dni: dtoRegistro.dni,
        Mail: dtoRegistro.mail,
        Usuario: dtoRegistro.usuario,
        Contrasena: dtoRegistro.contrasena,
        FechaNacimiento: dtoRegistro.fechaNacimiento
      })
      .then((res) => {
        dispatch({
          type: REGISTRO_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        let error = {
          detail: err.response
            ? err.response.data
            : "Error al contactar el server.",
        };

        dispatch({
          type: REGISTRO_ERROR,
          payload: error,
        });
      });
  });
};
