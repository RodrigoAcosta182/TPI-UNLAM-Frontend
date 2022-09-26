import { MODAL_HIDE, MODAL_SHOW } from "../ActionTypes";

import modalInitialState from "../initialStates/modalInitialState";

const modal = (state, { payload, type }) => {
  switch (type) {
    case MODAL_HIDE:
      return modalInitialState;
    case MODAL_SHOW:
      return {
        modal: {
          show: true,
          data: payload,
        },
      };
    default:
      return state;
  }
};

export default modal;
