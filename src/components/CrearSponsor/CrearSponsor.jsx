import { useState } from "react";
import axios from "axios";
import { useDispatch} from "react-redux";
import './crearSponsor.css';
import { postSponsor,getAllSponsor } from "../../redux/sponsorActions/sponsorActions";
import validation from "./validation";
import { useEffect } from "react";



const CrearSponsor = () => {
    const [input,setInput]= useState({nombre:"",img:"",active:true});
    const [imagen,setImagen]=useState("");    
    const dispatch= useDispatch();
    const [error,setError]=useState({});
    const [cloudinary,setCloudinary]=useState(false)   
   
    
    useEffect(()=>{
        dispatch(getAllSponsor())
        
    },[dispatch]    
    )   

    const handleSubmit=(event)=>{
        event.preventDefault();        
        const form= document.getElementById("formulario")
        const body={
            title:input.nombre,
            image:input.img,
            active:input.active,
            location: 0
        }        
            console.log(body);

        if(cloudinary===true && !error.categoria){            
            dispatch(postSponsor(body))
            form.reset();

            setInput({
                nombre:"",
                img:"",
                ubicacion:"",
                active:true,              
            })

            setImagen("")

            alert("Sponsor creado con exito!")
        }else{
            alert("Revisa los pasos para crear tu sponsor!")
        }

    }

    const handleChange=(event)=>{
        
        event.preventDefault();
        setInput({
            ...input,
            [event.target.name] : event.target.value            
        })          
       
        setError(validation({...input,[event.target.name] : event.target.value}))     
    }

    
    const handleImgChange=(event)=>{
       
        const file=event.target.files[0]
        setImagen(URL.createObjectURL(file))        
        
        setInput({...input, img: file})  
        
      
    }

    const handleCloudySubmit= async(event)=>{
        event.preventDefault();   
        
        try {        
            const formData = new FormData()
            formData.append("file",input.img)
            formData.append("upload_preset", "sponsor")
            formData.append("cloud_name","drpdobxfu")
            
            const {data}= await axios.post("https://api.cloudinary.com/v1_1/drpdobxfu/image/upload",formData)            

            setInput({...input, img: data.secure_url})  
            setCloudinary(true)
            
            alert("Subida con  exito!")          
            
          } catch (error) {
            console.log(error);
          }
    }

      
     

  return (
    <div className="form">
      <form id="formulario" onSubmit={handleSubmit}  >
            <h2 className="h2">Aqui crearas tu sponsor</h2>

        <div className="name">
            <h3>1° paso</h3>
            <label htmlFor="">Coloca el nombre del sponsor:</label>
            <input onChange={handleChange} type="text" name="nombre" value={input.nombre}/>
            {error.nombre && <p>{error.nombre}</p>}
        </div>          

        <div className="immg">
            <h3>2° paso</h3>
            <label className="label" htmlFor="">Selecciona la imagen</label>
            
            <input onChange={handleImgChange} type="file" name="imagen" accept="image/*"/>
        </div>
       
        <div className="bot">
            <h3>3° paso</h3>
            <label htmlFor="">Sube la imagen a la nube</label>                 
            <button onClick={handleCloudySubmit}>Subir</button>
        </div>

        <div>
            {imagen && <img className ="imagen"src={imagen} alt="img"/>}
        </div>            
            <br />            
            <button className="crear" type="submit">Crear sponsor</button>
      </form>      
        
    </div>
  )
}

export default CrearSponsor;