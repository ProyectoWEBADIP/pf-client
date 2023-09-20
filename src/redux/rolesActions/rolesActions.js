/* eslint-disable no-unused-vars */
import axios from "axios";
import {
  GET_ALL_ROLES,
  GET_ALL_ROLES_BY_ID,
  POST_ROL,
  PATCH_ROL,
  DELETE_ROL,
} from "./rolesActionsTypes";

//trae todos los roles
export function getAllRoles() {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/roles`);
      dispatch({ type: GET_ALL_ROLES, payload: data });
    } catch (error) {
      return alert(error.message);
    }
  };
}

export function getAllRolesById(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/roles/${id}`);
      dispatch({ type: GET_ALL_ROLES_BY_ID, payload: data });
    } catch (error) {
      return alert(error.message);
    }
  };
}

export function postRol(body) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/roles", body);
      dispatch({ type: POST_ROL, payload: data });
    } catch (error) {
      return alert(error.message);
    }
  };
}
