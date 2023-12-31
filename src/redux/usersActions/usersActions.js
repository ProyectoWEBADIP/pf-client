/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import axios from 'axios';

import { GET_ALL_USERS,GET_USER_BY_ID } from './usersActionTypes';
import {  GET_USER_BY_EMAIL, UPDATE_PASSWORD } from './usersActionTypes';

export function getAllUsers() {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/users`);
      
      dispatch({ type: GET_ALL_USERS, payload: data });
    } catch (error) {
      return alert(error.message);
    }
  };
}
export function getUserLoggedById(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/users/${id}`);
      dispatch({ type: GET_USER_BY_ID, payload: data });

    } catch (error) {
      return alert(error.message);
    }
  };
}
export function getUserById(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/users/${id}`);
      return data;
      // dispatch({ type: GET_USER_BY_ID, payload: data });
    } catch (error) {
      return alert(error.message);
    }
  };
}
export function updateUserFromAdmin(id, action) {
  return async () => {
    try {
      const { data } = await axios.patch(
        `/auth/updateUser/${id}`,
        action
      );
      return data;
    } catch (error) {
      alert(error);
    }
  };
}

export function getUserByEmail(email) {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/users/email?email=${email}`)
      dispatch({
        type: GET_USER_BY_EMAIL,
        payload: data,
      });
      return data
    } catch (error) {
      console.error(error.message);
    }
  };
}
export function updateUserProfile(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios.patch(`/users/${id}`, body)
return data
      
    } catch (error) {
      alert(error.message);
    }
  };
}
export function updateUser(id, body) {
  return async (dispatch) => {
    try {
      const { data } = await axios.patch(`/users/${id}`, body)
      dispatch({
        type: UPDATE_PASSWORD,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
}
