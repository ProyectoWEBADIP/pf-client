/* eslint-disable no-unused-vars */
import axios from 'axios';
import {
  LOGIN_REGISTER_ERRORS,
  LOCAL_LOGIN,
  LOGOUT,
  HISTORY,
  LOGGIN_IN,
  REGISTER_USER,
  REGISTER_USER_LOCAL,
  CREATE_PROFILE_LOCAL,
  CREATE_LOCAL_PROFILE_ERRORS,
  GET_USER_BY_ID
} from './actionTypes';
//?LOGIN ACTIONS
export function localLogin(userCredentials) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/auth/login`,
        userCredentials
      );
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
      dispatch({ type: REGISTER_USER_LOCAL, payload: data });
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
//!SUBIR IMAGEN A CLOUDINARY

//?CREAR PERFIL ACTIONS
export function getUserById(id){
  return async (dispatch) => {
    try {
      const { data } = await axios(
        `http://localhost:3001/users/${id}`
      );
      dispatch({ type: GET_USER_BY_ID, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_LOCAL_PROFILE_ERRORS, payload: error });
    }
  };
}
export function createLocalProfile(id,userData) {
  return async (dispatch) => {
    try {

      const { data } = await axios.post(
        `http://localhost:3001/users/${id}/profile`,
        userData
      );
      dispatch({ type: CREATE_PROFILE_LOCAL, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_LOCAL_PROFILE_ERRORS, payload: error });
    }
  };
}