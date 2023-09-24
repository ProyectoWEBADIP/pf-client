import { useState } from "react";
import { useDispatch} from "react-redux";
import './crearSponsor.css';
import { postSponsor,getAllSponsor } from "../../redux/sponsorActions/sponsorActions";
import validation from "./validation";
import { useEffect } from "react";
import { submitImgCloudy } from "../../redux/sponsorActions/sponsorActions";
import AlertSuccess from "../../assets/AlertSuccess/AlertSuccess";
import AlertError from '../../assets/AlertError/AlertError';

const CrearSponsor = () => {
    const [input,setInput]= useState({nombre:"",img:"",active:true});
    const [imagen,setImagen]=useState("");    
    const dispatch= useDispatch();
    const [error,setError]=useState({});
    const [cloudinary,setCloudinary]=useState(false)   
    const userId= localStorage.userId;   
    const [showSuccess, setShowSuccess] = useState(false);
    const [successAlert, setSuccessAlert] = useState('');
    const [errorAlert,setErrorAlert]=useState('')
    const [showError,setShowError]=useState(false)
    
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

        let disable=true 
        for(const err in error){
        if(error[err]===""){
            disable=false
        }else{
            disable=true
            break;
        }
        }

        
        if(cloudinary && input.nombre!=="" && !disable){            
            dispatch(postSponsor(body))
            form.reset();
            setInput({
                nombre:"",
                img:"",                
                active:true,              
            })

            setImagen("")

            setSuccessAlert('¡Sponsor creado con éxito!');
            setShowSuccess(true);
            setTimeout(() => {
              setShowSuccess(false);
            }, 4000);
        }else{
            setErrorAlert('Revisa los pasos para crear tu sponsor')
            setShowError(true)
            setTimeout(()=>{setShowError(false)},4000)
        }

    }

    const handleChange=(event)=>{        
        event.preventDefault();
        setInput({
            ...input,
            [event.target.name] : event.target.value            
        })          
       
        setError(validation({...input,[event.target.name] : event.target.value},event.target.name))  

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
        {showError ? (
              <div className="alerts">
                <AlertError error={errorAlert} />
              </div>
            ) : null}
            {showSuccess ? (
              <div className="alerts">
                <AlertSuccess success={successAlert} />
              </div>
            ) : null}
            <form className="et_form_sponsor" id="formulario" onSubmit={handleSubmit}  >
                {loading?<div className="loader_sponsor_container"><span className="loader"></span></div>:null}
                {response?<div className="response-succes-sponsor">{response}</div>:null}

               
                
                    <h2 className="h2_form_sponsor">Aqui crearas tu sponsor</h2>
             
                <div className="name_sponsor_form">
                    <h4 className="h4-div-sponsor">1° paso</h4>
                    <label className="label_colocaNombre_">Coloca el nombre del sponsor</label>
                    <input className="input_name_sponsor" onChange={handleChange} type="text" name="nombre" value={input.nombre}/>
                    {error.nombre && <p>{error.nombre}</p>}
                </div>          

                <div className="Tipofile_sponsor_form">
                    <h4 className="h4-div-sponsor"> 2° paso</h4>
                    <label className="input_selecImg_sponsor" htmlFor="">Selecciona la imagen</label>                    
                    <input className="img_sponsor" onChange={handleImgChange} type="file" name="imagen" accept="image/*"/>
                </div>                

                <div className="renderiza_img_sponsor">
                    {imagen && <img className ="imagen-crear-sponsor"src={imagen} alt="img"/>}
                </div>            
                <br />            
                <button className="buton_create_sponsor" type="submit">Crear sponsor</button>
            </form>
        </div>      
      
    </div>
  )
}

export default CrearSponsor;