/* eslint-disable no-unused-vars */
import { GET_ALL_NOTICIAS,GET_NOTICIA_DETAIL, FILTER_NOTICIAS } from "./noticiasActionTypes"
import axios from "axios"

export function getAllNoticias() {
    return async (dispatch) => {
        try {
            const { data } = await axios(`http://localhost:3001/notices`)
            dispatch({type: GET_ALL_NOTICIAS, payload: data})
        } catch (error) {
            return alert(error.message)
        }
    }
}

export function getNoticiaDetail(id) {
    return async (dispatch) => {
        try {
            const { data } = await axios(`http://localhost:3001/notices/${id}`)
            dispatch({type: GET_NOTICIA_DETAIL, payload: data})
        } catch (error) {
            return alert(error.message)
        }
    }
}
export function filteredNoticias(startDate, endDate) {
    return async (dispatch) => {
        try {
            const { data } = await axios(`http://localhost:3001/notices/byDateRange?startDate=${startDate}&endDate=${endDate}`)
            dispatch({type: FILTER_NOTICIAS, payload: data.data})
        } catch (error) {
            return alert(error.message)
        }
    }
}


