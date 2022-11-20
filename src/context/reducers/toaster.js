import { TOASTER_HIDE, TOASTER_SHOW } from "../ActionTypes";
import toasterInitialState from "../initialStates/toasterInitialState";

const toaster = (state, { payload, type }) => {
  switch (type) {
    case TOASTER_HIDE:
      return toasterInitialState;
    case TOASTER_SHOW:
      return {
        toaster: {
          show: true,
          data: payload,
        },
      };
    default:
      return state;
  }
};

export default toaster;
