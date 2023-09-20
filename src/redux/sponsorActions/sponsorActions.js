import {
  POST_SPONSOR,
  GET_ALL_SPONSOR,
  UPDATE_SPONSOR,
  GET_SPONSOR_BY_ID,
} from "./sponsorActionsTypes";
import axios from "axios";

export function postSponsor(body){
    return async(dispatch)=>{
        try {
            
            const {data}= await axios.post(`/sponsors`,body)

            dispatch({type:POST_SPONSOR, payload:data})
            
        } catch (error) {
            alert(error.message);
        }
    }
}
export function getAllSponsor(){
    return async(dispatch)=>{
        try {            
            const {data}= await axios(`/sponsors`)            
            dispatch({type:GET_ALL_SPONSOR ,payload:data})
            console.log(data);
        } catch (error) {
            throw new Error({error:error.message})
        }
    }
  }

export function updateSponsor(id,body){
    return async(dispatch)=>{
        try {
            const {data}= await axios.patch(`/sponsors/${id}`,body)

            dispatch({type:UPDATE_SPONSOR,payload:data[0]})
            
        } catch (error) {
            alert(error.message);
        }
    }
}
export function getSponsorById(id){
    return async(dispatch)=>{
        try {
            const {data}= await axios(`/sponsors/${id}`)
            
            dispatch({type:GET_SPONSOR_BY_ID,payload:data[0]})

            
        } catch (error) {
            alert(error.message);
        }
    }
}

export function submitImgCloudy(file){
    return async(dispatch)=>{
        try {        
            const formData = new FormData()
            formData.append("file",file)
            formData.append("upload_preset", "sponsor")
            formData.append("cloud_name","drpdobxfu")
            
            const {data}= await axios.post("https://api.cloudinary.com/v1_1/drpdobxfu/image/upload",formData);

            data.message= "Imagen subida con exito"
             
            alert("Subida con  exito!")  
            return data        
            
          } catch (error) {
            return {message:"Error al subir la imagen"}
        }
    }
}