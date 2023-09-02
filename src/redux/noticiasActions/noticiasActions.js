import { GET_ALL_NOTICIAS } from "./noticiasActionTypes"
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



