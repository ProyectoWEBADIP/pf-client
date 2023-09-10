/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import axios from 'axios';
import { GET_ALL_USERS,GET_USER_BY_ID } from './usersActionTypes';
import {  GET_USER_BY_EMAIL, UPDATE_PASSWORD } from './usersActionTypes';

export function getAllUsers() {
  return async (dispatch) => {
    try {
      const { data } = await axios(`http://localhost:3001/users`);
      dispatch({ type: GET_ALL_USERS, payload: data });
    } catch (error) {
      return alert(error.message);
    }
  };
}
export function getUserLoggedById(id){
  return async (dispatch)=>{
    try {
      const { data } = await axios(`http://localhost:3001/users/${id}`);
      dispatch({ type: GET_USER_BY_ID, payload: data });
    } catch (error) {
      return alert(error.message);
    }
  }
}
export function getUserById(id){
  return async (dispatch)=>{
    try {
      const { data } = await axios(`http://localhost:3001/users/${id}`);
      return data;
      // dispatch({ type: GET_USER_BY_ID, payload: data });
    } catch (error) {
      return alert(error.message);
    }
  }
}
export function updateUserFromAdmin(id, action) {
  return async () => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3001/auth/updateUser/${id}`,
        action
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUserByEmail(email) {
  return async (dispatch) => {
    try {
      const { data } = await axios(`http://localhost:3001/users/email?email=${email}`)
      dispatch({
        type: GET_USER_BY_EMAIL,
        payload: data
      })
    } catch (error) {
      console.error(error.message);
    }
  }
}

export function updateUser (id, body){
  return async (dispatch) => {
    try {
      const { data } = await axios.patch(`http://localhost:3001/users/${id}`, body)
      dispatch({
        type: UPDATE_PASSWORD,
        payload: data
      })
      
    } catch (error) {
      console.error(error.message);
    }
  }
}
