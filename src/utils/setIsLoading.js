import { IS_LOADING } from '../redux/login-registerActions/actionTypes';

export function setIsLoading() {
  return async function (dispatch) {
    dispatch({
      type: IS_LOADING,
    });
  };
}
