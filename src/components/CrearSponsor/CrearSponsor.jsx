import { useState } from "react";
import { useDispatch} from "react-redux";
import './crearSponsor.css';
import { postSponsor,getAllSponsor } from "../../redux/sponsorActions/sponsorActions";
import validation from "./validation";
import { useEffect } from "react";
import { submitImgCloudy } from "../../redux/sponsorActions/sponsorActions";
import AlertSuccess from "../../assets/AlertSuccess/AlertSuccess";
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

        if(cloudinary && input.nombre!==""){            
            dispatch(postSponsor(body))
            form.reset();
            setInput({
                nombre:"",
                img:"",                
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
    const [response,setResponse]=useState(false)
    const[loading,setLoading]=useState(false)
    
    const handleImgChange= async(event)=>{
        const file=event.target.files[0]
        setImagen(URL.createObjectURL(file))        
        setInput({...input, img: file})  
        setLoading(true)
        const cloudiResponde= await dispatch(submitImgCloudy(file))
        setLoading(false)
        setResponse(<AlertSuccess success={cloudiResponde.message}/>)
        setTimeout(()=>{setResponse(false)},3000)
        setInput({...input,img:cloudiResponde.secure_url})
        setCloudinary(true)
    }

       
     

  return (
    <div className="contenedor_form">
        <div className="cont_form_sponsor">
            <form className="et_form_sponsor" id="formulario" onSubmit={handleSubmit}  >
                {loading?<div className="loader_sponsor_container"><span className="loader"></span></div>:null}
                {response?<div className="response-succes-sponsor">{response}</div>:null}
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

                <div className="renderiza_img_sponsor">
                    {imagen && <img className ="imagen"src={imagen} alt="img"/>}
                </div>            
                <br />            
                <button className="buton_create_sponsor" type="submit">Crear sponsor</button>
            </form>
        </div>      
      
    </div>
  )
}

export default CrearSponsor;