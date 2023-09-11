import { RENDER_CORRECT_DASH } from "./actionTypes";

export function changeDash(id) {
  return async (dispatch) => {
    dispatch({ type: RENDER_CORRECT_DASH, payload: id });
  };
}