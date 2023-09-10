import { POST_SPONSOR ,GET_ALL_SPONSOR} from "./sponsorActionsTypes";
import axios from "axios";

export function postSponsor(body){
    return async(dispatch)=>{
        try {
            
            const {data}= await axios.post(`http://localhost:3001/sponsors`,body)

            dispatch({type:POST_SPONSOR, payload:data})
            
        } catch (error) {
            return console.log(error);
        }
    }
}
export function getAllSponsor(){
    return async(dispatch)=>{
        try {
            const {data}= await axios(`http://localhost:3001/sponsors`)
          
            dispatch({type:GET_ALL_SPONSOR ,payload:data})
        } catch (error) {
            throw new Error({error:error.message})
        }
    }
}