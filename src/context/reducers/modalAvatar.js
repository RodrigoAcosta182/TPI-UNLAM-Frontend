import { MODAL_AVATAR_HIDE, MODAL_AVATAR_SHOW } from "../ActionTypes";
import modalAvatarInitialState from "../initialStates/modalAvatarInitialState";
const modalAvatar = (state, { payload, type }) => {
  switch (type) {
    case MODAL_AVATAR_HIDE:
      return modalAvatarInitialState;
    case MODAL_AVATAR_SHOW:
      return {
        modalAvatar: {
          show: true,
          data: payload,
        },
      };
    default:
      return state;
  }
};

export default modalAvatar;
