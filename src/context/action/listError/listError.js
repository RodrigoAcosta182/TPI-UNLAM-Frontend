import { SET_LIST_ERROR, LIST_ERROR_RESET } from "../../ActionTypes";


export const setListError = (listError) => (dispatch) => {
  dispatch({
    type: SET_LIST_ERROR,
    payload: listError,    
  });
};

export const logoutAuth = () => (dispatch) => {
  dispatch({ type: LIST_ERROR_RESET });
};
