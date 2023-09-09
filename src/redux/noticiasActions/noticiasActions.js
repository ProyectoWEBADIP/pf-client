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
         const { data } = await axios(`http://localhost:3001/notices`);
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
            `http://localhost:3001/notices`,
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
         const { data } = await axios(`http://localhost:3001/notices/${id}`);
         dispatch({ type: GET_NOTICIA_DETAIL, payload: data[0] });
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
            `http://localhost:3001/notices/byTitlePartial/${title}`
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
            `http://localhost:3001/notices/byDateRange?startDate=${startDate}&endDate=${endDate}`
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
            `http://localhost:3001/notices/byCategory/${id}`
         );
         console.log("dataaaa===Z", data);
         dispatch({ type: GET_NOTICIAS_BY_CATEGORY, payload: data });
      } catch (error) {
         console.log(error.message);
      }
   };
};
export const deleteNotice = (id, body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.patch(`http://localhost:3001/notices/inact/${id}`, body)
      
      dispatch({type: DELETE_NOTICE, payload: data})
    } catch (error) {
      console.log(error.message);
    }
  }
}
export const getNoticeById = (id) =>{
  return async (dispatch) => {
    try {
      const { data } = await axios(`http://localhost:3001/notices/${id}`)
      
      
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
       const { data } = await axios.patch(`http://localhost:3001/notices/${id}`, body) 
       console.log("data update", data);
       dispatch({type: UPDATE_NOTICE, payload: data[0]})
      } catch (error) {
        console.log(error.message);
      }
    }
}