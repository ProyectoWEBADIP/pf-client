/* eslint-disable no-unused-vars */
import axios from './axios-config'

export const GET_ALL_MATCH = "GET_ALL_MATCH"
export const UPDATE_MATCH = "UPDATE_MATCH"

export const getAllMatch = () =>{
    return async (dispatch) => {
        try {
            const { data } = await axios(`/partidos`)
            dispatch({type: GET_ALL_MATCH, payload: data})
        } catch (error) {
            console.error(error.message)
            
        }
    }
}
export const updateMatch = (id, body) => {
    return async (dispatch) => {
    try {
        const { data } = await axios.patch(`/partidos/${id}`, body)
        if(!data.length) alert(data.response)
    } catch (error) {
        console.error(error.message)
    }
}
}