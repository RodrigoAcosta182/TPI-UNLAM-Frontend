import { MODAL_AVATAR_SHOW, MODAL_AVATAR_HIDE } from "../../ActionTypes";

export const showModalAvatar =
  (accion, dismiss, bloquearDismiss) => (dispatch) => {
    dispatch({
      type: MODAL_AVATAR_SHOW,
      payload: {
        accion: accion,
        dismiss: dismiss,
        bloquearDismiss: bloquearDismiss,
      },
    });
  };

export const hideModalAvatar = () => (dispatch) => {
  dispatch({
    type: MODAL_AVATAR_HIDE,
  });
};
