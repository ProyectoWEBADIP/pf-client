import { POST_CATEGORIAS } from "./categoriasActionTypes";
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