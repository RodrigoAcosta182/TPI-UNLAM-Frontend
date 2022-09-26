import { MODAL_AVATAR_SHOW, MODAL_AVATAR_HIDE } from "../../ActionTypes";

export const showModalAvatar = (component,title, dissmiss, headerState, listBotones,posicion,bloquearDissmiss ) => (dispatch) => {
  dispatch({
    type: MODAL_AVATAR_SHOW,
    payload: {
      component: component,
      title: title,
      dissmiss: dissmiss,
      headerState: headerState,
      listBotones:listBotones,
      posicion:posicion,
      bloquearDissmiss: bloquearDissmiss,
    },
  });
};

export const hideModalAvatar = () => (dispatch) => {
  dispatch({
    type: MODAL_AVATAR_HIDE,
  });
};
