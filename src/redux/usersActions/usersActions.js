/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import axios from 'axios';
import { GET_ALL_USERS,GET_USER_BY_ID } from './usersActionTypes';

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
      const {data} = await axios.patch(
        `http://localhost:3001/auth/updateUser/${id}`,
        action
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}
