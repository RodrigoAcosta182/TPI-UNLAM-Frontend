import { TOASTER_HIDE, TOASTER_SHOW } from "../../ActionTypes";

export const showToaster = (usuario) => (dispatch) => {
  dispatch({
    type: TOASTER_SHOW,
    payload: {
      usuario: usuario,
    },
  });
};

export const hideToaster = () => (dispatch) => {
  dispatch({
    type: TOASTER_HIDE,
  });
};
