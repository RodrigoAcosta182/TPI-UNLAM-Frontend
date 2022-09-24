import axiosInstance from "../../../helpers/axiosInstance";
import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SETUSUARIO,
  LOGIN_SUCCESS,
  LOGOUT_USER,
} from "../../ActionTypes";

export const setUsuarioAuth = (usuario) => (dispatch) => {
  if (usuario !== null) {
    sessionStorage.token = usuario.token;
  }
  dispatch({
    type: LOGIN_SETUSUARIO,
    payload: usuario,
  });
};

export const wsPostLogin = (loginDto) => (dispatch) => {
  dispatch({
    type: LOGIN_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post(`/auth`, { email: loginDto.email, contrasena: loginDto.contrasena })
      .then((res) => {
        console.log(res);
        sessionStorage.token = res.data.token.token;
        dispatch({
          type: LOGIN_SUCCESS,
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
          type: LOGIN_ERROR,
          payload: error,
        });
      });
  });
};

export const logoutAuth = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
};
