import { TOASTERGENERICO_HIDE, TOASTERGENERICO_SHOW } from "../ActionTypes";
import toasterGenericoInitialState from "../initialStates/toasterGenericoInitialState";

const toasterGenerico = (state, { payload, type }) => {
  switch (type) {
    case TOASTERGENERICO_HIDE:
      return toasterGenericoInitialState;
    case TOASTERGENERICO_SHOW:
      return {
        toasterGenerico: {
          show: true,
          data: payload,
        },
      };
    default:
      return state;
  }
};

export default toasterGenerico;
