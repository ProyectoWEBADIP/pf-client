/* eslint-disable no-unused-vars */
import {
  GET_ALL_NOTICIAS,
  GET_NOTICIA_DETAIL,
  FILTER_NOTICIAS,
  CLEAN_NOTICIA_DETAIL,
  GET_NOTICIAS_BY_TITLE,
  CLEAN_FILTERS_NOTICIAS,
  NOT_FOUND_NOTICIAS,
} from './noticiasActionTypes';
import axios from 'axios';

export function getAllNoticias() {
  return async (dispatch) => {
    try {
      const { data } = await axios(`http://localhost:3001/notices`);
      dispatch({ type: GET_ALL_NOTICIAS, payload: data });
    } catch (error) {
      return alert(error.message);
    }
  };
}

export function getNoticiaDetail(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios(`http://localhost:3001/notices/${id}`);
      dispatch({ type: GET_NOTICIA_DETAIL, payload: data });
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
      return dispatch({ type: GET_NOTICIAS_BY_TITLE, payload: data });
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
