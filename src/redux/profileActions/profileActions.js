/* eslint-disable no-unused-vars */
import axios from "axios";
import { SHOW_UPDATE_PROFILE } from "./actionTypes";

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

export function submitImgToCloudinary(file) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Usuarios");
      formData.append("cloud_name", "drpdobxfu");

      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/drpdobxfu/image/upload",
        formData
      );
      data.message = "Imágen subida con éxito";

      return data;
    } catch (error) {
      return { message: "Error al subir la imágen" };
    }
  };
}

export function updateUserProfile(id, userFields) {
  return async (dispatch) => {
    try {
      const {data} = await axios.patch(
        `/users/updateProfile/${id}`,
        userFields
      );
      return data;
    } catch (error) {
      return alert(error.message);
    }
  };
}
