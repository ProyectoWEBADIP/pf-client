/* eslint-disable no-case-declarations */
import axios from 'axios';
import { GET_ALL_USERS } from './usersActionTypes';

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
