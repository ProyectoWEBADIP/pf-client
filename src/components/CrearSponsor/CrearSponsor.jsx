import { useState } from "react";
import axios from 'axios';
;
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
    const userId= localStorage.userId;   
    
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
            location: 0,
            user_id:userId
        }        


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
            alert(error.message);
          }
    }

      
     

  return (
    <div className="contenedor_form">
        <div className="cont_form_sponsor">
            <form className="et_form_sponsor" id="formulario" onSubmit={handleSubmit}  >
                <h2 className="h2_form_ponsor">Aqui crearas tu sponsor</h2>

                <div className="name_sponsor_form">
                    <h4>1° paso</h4>
                    <label htmlFor="">Coloca el nombre del sponsor</label>
                    <input className="input_name_sponsor" onChange={handleChange} type="text" name="nombre" value={input.nombre}/>
                    {error.nombre && <p>{error.nombre}</p>}
                </div>          

                <div className="Tipofile_sponsor_form">
                    <h4>2° paso</h4>
                    <label  htmlFor="">Selecciona la imagen</label>                    
                    <input className="img_sponsor" onChange={handleImgChange} type="file" name="imagen" accept="image/*"/>
                </div>
        
                <div className="subirImagen_sponsor_form">
                    <h4>3° paso</h4>
                    <label htmlFor="">Sube la imagen a la nube</label>                 
                    <button className='buton_subirImg_sponsor' onClick={handleCloudySubmit}>Subir</button>
                </div>

                <div className="renderiza_img_sponsor">
                    {imagen && <img className ="imagen"src={imagen} alt="img"/>}
                </div>            
                <br />            
                <button className="buton_crear_sponsor" type="submit">Crear sponsor</button>
            </form>
        </div>      
        
    </div>
  )
}

export default CrearSponsor;