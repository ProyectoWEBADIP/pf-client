import { POST_CATEGORIAS, GET_ALL_CATEGORIES } from "./categoriasActionTypes";
import axios from "axios";



export function postCategoria(body){
    return async(dispatch)=>{
        try {
            const {data}= await axios.post(`http://localhost:3001/categories`,body)
            dispatch({type:POST_CATEGORIAS, payload:data})
        } catch (error) {
            return alert(error.message)
        }
    }
}
export function getAllCategories() {
    return async(dispatch) => {
        try {
            const { data } = await axios("http://localhost:3001/categories")
            dispatch({type: GET_ALL_CATEGORIES, payload: data})
        } catch (error) {
            return console.log(error.message);
        }
    }
}