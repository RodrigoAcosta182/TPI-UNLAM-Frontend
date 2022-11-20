import { TOASTERGENERICO_HIDE, TOASTERGENERICO_SHOW } from "../../ActionTypes";

export const showToaster = (params, posicion) => (dispatch) => {
  dispatch({
    type: TOASTERGENERICO_SHOW,
    payload: {
      params: params,
      posicion: posicion,
    },
  });
};

export const hideToaster = () => (dispatch) => {
  dispatch({
    type: TOASTERGENERICO_HIDE,
  });
};
