import axiosInstance from "../../../helpers/axiosInstance";
import {
  FINALIZA_JUEGO_ERROR,
  FINALIZA_JUEGO_LOADING,
  FINALIZA_JUEGO_RESET,
  FINALIZA_JUEGO_SUCCESS,
} from "../../ActionTypes";

export const wsPostFinalizaJuego = (ResultadoDto) => (dispatch) => {
  dispatch({
    type: FINALIZA_JUEGO_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post(`/finalizarjuego`, ResultadoDto)
      .then((res) => {
        dispatch({
          type: FINALIZA_JUEGO_SUCCESS,
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
          type: FINALIZA_JUEGO_ERROR,
          payload: error,
        });
      });
  });
};

export const resetFinalizaJuego = () => (dispatch) => {
  dispatch({ type: FINALIZA_JUEGO_RESET });
};
