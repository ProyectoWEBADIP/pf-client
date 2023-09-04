/* eslint-disable no-unused-vars */
import { GET_ALL_NOTICIAS,GET_NOTICIA_DETAIL, FILTER_NOTICIAS , POST_NOTICIA,CLEAN_NOTICIA_DETAIL, GET_NOTICIAS_BY_CATEGORY} from "./noticiasActionTypes"
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

export function postNoticia(body){
    return async(dispatch)=>{
        try {
            const {data} = await axios.post(`http://localhost:3001/notices`,body)

            dispatch({type: POST_NOTICIA, payload:data})           
        } catch (error) {
            return alert(error.message)
        }
    }
}


export function getNoticiaDetail(id) {
    return async (dispatch) => {
        try {
            const { data } = await axios(`http://localhost:3001/notices/${id}`)
            dispatch({type: GET_NOTICIA_DETAIL, payload: data[0]})
        } catch (error) {
            return alert(error.message)
        }
    }
}
export function cleanNoticiaDetail() {
    return async (dispatch) => {
        try {
            dispatch({type: CLEAN_NOTICIA_DETAIL})
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

export const getNoticiasByCategory = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios(`http://localhost:3001/notices/byCategory/${id}`)
            console.log("dataaaa===Z", data);
            dispatch({type: GET_NOTICIAS_BY_CATEGORY, payload: data})
        } catch (error) {
            console.log(error.message);
        }
    }
}


