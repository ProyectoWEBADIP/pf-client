/* eslint-disable no-unused-vars */
import axios from 'axios';
import {
  LOGIN_REGISTER_ERRORS,
  LOCAL_LOGIN,
  LOGOUT,
  HISTORY,
  LOGGIN_IN,
  REGISTER_USER,
} from './actionTypes';
//?LOGIN ACTIONS
export function localLogin(userCredentials) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/auth/login`,
        userCredentials
      );
      console.log(userCredentials)
      dispatch({ type: LOCAL_LOGIN, payload: data });
    } catch (error) {
      dispatch({ type: LOCAL_LOGIN, payload: error });
    }
  };
}
export function getHistory(path) {
  return async (dispatch) => {
    dispatch({ type: HISTORY, payload: path });
  };
}
export function loading() {
  return async (dispatch) => {
    dispatch({ type: LOGGIN_IN });
  };
}
export function logout() {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  };
}
//?REGISTER ACTIONS
export function registerUser(userData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/auth/register`,
        userData
      );
      dispatch({ type: REGISTER_USER, payload: data });
    } catch (error) {
      dispatch({ type: LOGIN_REGISTER_ERRORS, payload: error });
    }
  };
}
export function googleRegisterUser(userData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/auth/register/google`,
        userData
      );
      dispatch({ type: REGISTER_USER, payload: data });
    } catch (error) {
      dispatch({ type: LOGIN_REGISTER_ERRORS, payload: error });
    }
  };
}
