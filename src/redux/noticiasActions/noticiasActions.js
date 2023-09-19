/* eslint-disable no-unused-vars */
import {
   GET_ALL_NOTICIAS,   
   FILTER_NOTICIAS,
   POST_NOTICIA,
   CLEAN_NOTICIA_DETAIL,   
   NOTICIAS_PER_PAGE,
} from "./noticiasActionTypes";
import axios from "axios";
import {
  
  GET_NOTICIA_DETAIL,
  GET_NOTICIAS_BY_CATEGORY,
  DELETE_NOTICE,
  GET_NOTICE_BY_ID,
  UPDATE_NOTICE
} from './noticiasActionTypes';

import {
   GET_NOTICIAS_BY_TITLE,
   CLEAN_FILTERS_NOTICIAS,
   NOT_FOUND_NOTICIAS,
} from "./noticiasActionTypes";

export function getAllNoticias() {
   return async (dispatch) => {
      try {
         const { data } = await axios(`/notices`);
         dispatch({ type: GET_ALL_NOTICIAS, payload: data });
      } catch (error) {
         console.log(error);
      }
   };
}
export function paginado(noticias){
  return async (dispatch)=>{
    dispatch({type: NOTICIAS_PER_PAGE, payload: noticias})
  }
}
export function postNoticia(body) {
   return async (dispatch) => {
      try {      
         
         const { data } = await axios.post(
            `/notices`,
            body
            );
         dispatch({ type: POST_NOTICIA, payload: data });
      } catch (error) {
         console.log(error);
      }
   };
}

export function getNoticiaDetail(id) {
   return async (dispatch) => {
      try {
         const { data } = await axios(`/notices/${id}`);
         dispatch({ type: GET_NOTICIA_DETAIL, payload: data[0] });
      } catch (error) {
         return alert(error.message);
      }
   };
}
export function getNoticiaDetailAdmin(id) {
   return async (dispatch) => {
      try {
         const { data } = await axios(`/notices/${id}`);
         return data;
      } catch (error) {
         return alert(error.message);
      }
   };
}
export function getNoticiasByTitle(title) {
   return async (dispatch) => {
      try {
         if (!title) {
            return dispatch({ type: CLEAN_FILTERS_NOTICIAS });
         }
         const { data } = await axios(
            `/notices/byTitlePartial/${title}`
         );

         return dispatch({ type: GET_NOTICIAS_BY_TITLE, payload: data.data });
      } catch (error) {
         return dispatch({ type: NOT_FOUND_NOTICIAS });
      }
   };
}

export function cleanNoticiaDetail() {
   return async (dispatch) => {
      try {
         dispatch({ type: CLEAN_NOTICIA_DETAIL });
      } catch (error) {
         return alert(error.message);
      }
   };
}
export function filteredNoticias(startDate, endDate) {
   return async (dispatch) => {
      try {
         const { data } = await axios(
            `/notices/byDateRange?startDate=${startDate}&endDate=${endDate}`
         );
         dispatch({ type: FILTER_NOTICIAS, payload: data.data });
      } catch (error) {
         return alert(error.message);
      }
   };
}

export const getNoticiasByCategory = (id) => {
   return async (dispatch) => {
      try {
         const { data } = await axios(
            `/notices/byCategory/${id}`
         );
         dispatch({ type: GET_NOTICIAS_BY_CATEGORY, payload: data });
      } catch (error) {
         console.log(error.message);
      }
   };
};
export const deleteNotice = (id, body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.patch(`/notices/inact/${id}`, body)
      
      dispatch({type: DELETE_NOTICE, payload: data})
    } catch (error) {
      console.log(error.message);
    }
  }
}
export const getNoticeById = (id) =>{
  return async (dispatch) => {
    try {
      const { data } = await axios(`/notices/${id}`)
      
      
      dispatch({type: GET_NOTICE_BY_ID, payload: data[0]})
    } catch (error) {
      console.log(error.message);
    }
  }
}
export const updateNoticia = (id, body) => {
  console.log("body",body);
    return async (dispatch) => {
      try {
       const { data } = await axios.patch(`/notices/${id}`, body) 
       console.log("data update", data);
       dispatch({type: UPDATE_NOTICE, payload: data[0]})
      } catch (error) {
        console.log(error.message);
      }
    }
}

export function submitImgCloudinary(file){
   return async(dispatch)=>{
      try {
         const formData = new FormData();
         formData.append('file', file);
         formData.append('upload_preset', 'Noticias');
         formData.append('cloud_name', 'drpdobxfu');
   
         const { data } = await axios.post(
           'https://api.cloudinary.com/v1_1/drpdobxfu/image/upload',
           formData
         );   
         data.message= "Imagen subida con exito"
        return data
       } catch (error) {
         return {message:"Error al subir la imagen"}
       }
   }
}