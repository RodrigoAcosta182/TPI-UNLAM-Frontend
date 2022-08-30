import axiosInstance from "../../../helpers/axiosInstance";
import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SETUSUARIO, LOGIN_SUCCESS, LOGOUT_USER } from "../../ActionTypes";

export const setUsuarioAuth = (usuario) => (dispatch) => {
  if (usuario !== null) {
    sessionStorage.token = usuario.token;
  }
  dispatch({
    type: LOGIN_SETUSUARIO,
    payload: usuario,
  });
};

export const login =
  ({ txtUsuario, txtPassword }) =>
  (dispatch) => {
    dispatch({
      type: LOGIN_LOADING,
    });

   axiosInstance().then(respuesta => {
    respuesta 
    .post("/auth/login", {
      password: txtPassword,
      usuario: txtUsuario,
    })
    .then((res) => {
      sessionStorage.token = res.data.token;
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
        origen: "portal",
      };

      dispatch({
        type: LOGIN_ERROR,

        payload: error,
      });
    });
   })
  };

export const logoutAuth = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
};

export const wsGetAuthToken = (token) => (dispatch) => {
  dispatch({
    type: LOGIN_LOADING,
  });

 axiosInstance().then(respuesta => {
  respuesta
  .get(`/authtoken/${token}`)
  .then((res) => {
    sessionStorage.token = res.data.token;
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
      origen: "portal",
    };

    dispatch({
      type: LOGIN_ERROR,
      payload: error,
    });
  });
 } )
};


export const TokenValidation = (token, history,set) => (dispatch) => {
  // dispatch({type: TOKEN_VALIDATION}); 
  set(true);
  sessionStorage.setItem("token", token);
  axiosInstance().then(respuesta => {
    respuesta
    .get(`/reactivar`)
    .then((resp) => {
      dispatch({type: LOGIN_SUCCESS, payload: resp.data}); 
      if(resp.data.token){
        sessionStorage.setItem("token", resp.data.token);
        sessionStorage.setItem("auth", JSON.stringify(resp.data));  
        set(false);
        history.push("/inicio")
      }else {
        set(false)
      }
    })
    .catch(err => {
      set(false);
    })
  })
  
}
