import { SHOW_UPDATE_PROFILE } from './actionTypes';

export function showProfileEdit() {
  return async (dispatch) => {
    dispatch({ type: SHOW_UPDATE_PROFILE, payload: true });
  };
}
export function unshowProfileEdit() {
  return async (dispatch) => {
    dispatch({ type: SHOW_UPDATE_PROFILE, payload: false });
  };
}
