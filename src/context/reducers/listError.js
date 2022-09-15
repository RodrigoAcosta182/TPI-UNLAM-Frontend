import { SET_LIST_ERROR, LIST_ERROR_RESET } from "../ActionTypes";
import listErrorInitialState from "../initialStates/listErrorInitialState";

const listError = (state, { payload, type }) => {
  switch (type) {
    case SET_LIST_ERROR:
      return {
        ...state,
        listError: payload,
      };
    case LIST_ERROR_RESET:
      return listErrorInitialState;

    default:
      return state;
  }
};

export default listError;
