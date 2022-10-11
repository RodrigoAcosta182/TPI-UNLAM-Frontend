import {
  FINALIZA_JUEGO_ERROR,
  FINALIZA_JUEGO_LOADING,
  FINALIZA_JUEGO_RESET,
  FINALIZA_JUEGO_SUCCESS,
} from "../ActionTypes";
import finalizaJuegoInitialState from "../initialStates/finalizaJuegoInitialState";

const finalizaJuego = (state, { payload, type }) => {
  switch (type) {
    case FINALIZA_JUEGO_LOADING:
      return {
        ...state,
        finalizaJuego: {
          ...state.finalizaJuego,
          error: false,
          loading: true,
        },
      };
    case FINALIZA_JUEGO_SUCCESS:
      return {
        ...state,
        finalizaJuego: {
          ...state.finalizaJuego,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case FINALIZA_JUEGO_ERROR:
      return {
        ...state,
        finalizaJuego: {
          ...state.finalizaJuego,
          error: payload,
          loading: false,
        },
      };

    case FINALIZA_JUEGO_RESET:
      return finalizaJuegoInitialState;

    default:
      return state;
  }
};

export default finalizaJuego;
