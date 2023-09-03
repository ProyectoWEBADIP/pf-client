import { IS_LOADING } from "../redux/login-registerActions/actionTypes";

export function setIsLoading() {
  return async function (dispatch) {
    try {
dispatch({
  type: IS_LOADING})
    } catch (error) {
      console.log(error)
    }
  };
}