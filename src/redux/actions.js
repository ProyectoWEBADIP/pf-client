export const GET_ALL_NOTICIAS = "GET_ALL_NOTICIAS"
import axios from "axios"

export function getAllNoticias() {
    return async (dispatch) => {
        try {
            const { data } = await axios(`https://jsonplaceholder.typicode.com/posts`)
            dispatch({type: GET_ALL_NOTICIAS, payload: data})
        } catch (error) {
            return alert(error.message)
        }
    }
}



