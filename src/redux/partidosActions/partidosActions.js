import axios from "axios"

export const GET_ALL_MATCH = "GET_ALL_MATCH"
export const UPDATE_MATCH = "UPDATE_MATCH"

export const getAllMatch = () =>{
    return async (dispatch) => {
        try {
            const { data } = await axios(`http://localhost:3001/partidos`)
            dispatch({type: GET_ALL_MATCH, payload: data})
        } catch (error) {
            console.error(error.message)
            
        }
    }
}
export const updateMatch = (id, body) => {
    return async (dispatch) => {
    try {
        const { data } = await axios.patch(`http://localhost:3001/partidos/${id}`, body)
        if(!data.length) alert(data.response)
    } catch (error) {
        console.error(error.message)
    }
}
}