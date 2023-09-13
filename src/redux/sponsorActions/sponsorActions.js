import { POST_SPONSOR ,GET_ALL_SPONSOR,UPDATE_SPONSOR, GET_SPONSOR_BY_ID} from "./sponsorActionsTypes";
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
export function updateSponsor(id,body){
    return async(dispatch)=>{
        try {
            const {data}= await axios.patch(`http://localhost:3001/sponsors/${id}`,body)
            
            dispatch({type:UPDATE_SPONSOR,payload:data[0]})
            
        } catch (error) {
            console.log(error.message);
        }
    }
}
export function getSponsorById(id){
    return async(dispatch)=>{
        try {
            const {data}= await axios(`http://localhost:3001/sponsors/${id}`)
            dispatch({type:GET_SPONSOR_BY_ID,payload:data[0]})
            console.log(data);
            
        } catch (error) {
            console.log(error.message);
        }
    }
}