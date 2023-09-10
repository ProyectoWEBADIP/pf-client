import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getAllSponsor } from '../../redux/sponsorActions/sponsorActions';
import './upDateSponsor.css';
import axios from 'axios';

const UpDateSponsor = () => {
    const dispatch=useDispatch();
    const sponsor = useSelector((state)=>state.sponsor);
    const [imagen,setImagen]=useState("")
    const [state,setState]=useState({title:"",image:"",location:0});
    const[selec,setSelec]=useState({})

    useEffect(()=>{

        dispatch(getAllSponsor())
        
        
    },[dispatch,state.image])

    const handleSelect=(event)=>{
      const id= parseInt(event.target.value);    

      const obj= sponsor.filter((e)=>e.id === id)
      console.log(obj);
      setState(
        {
          title:obj[0].title,
          image:obj[0].image,
          location:obj[0].location
        }
      )   
      
      
    }

    const handleChange=(event)=>{
      
      setState({
        ...state,
        [event.target.name]:event.target.value
      })
      
    }
   
    const handleImgChange=(event)=>{
      const file= event.target.files[0]      

      setImagen(URL.createObjectURL(file))
     
      
      setState({...state,image:file})
      
      console.log(state.image,"state.img");
    }

    const handleCloudySubmit= async(event)=>{
      event.preventDefault();

      try {
        const formData= new FormData()
        formData.append("file",state.image)
        formData.append("upload_preset","sponsor")
        formData.append("cloud_name","drpdobxfu")
        const {data}= await axios.post("https://api.cloudinary.com/v1_1/drpdobxfu/image/upload",formData)

        setState({
          ...state,
          image:data.secure_url
        })
        console.log(state.image);
        alert("Subida con exito!")
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className='contenedor'>
                                      {/* ----------------------------carta izquierda */}
      <div className='selec'>
        <select onChange={handleSelect} className="select">
          <option value="">Seleccione sponsor a editar</option>
          {sponsor?.map((e)=>{
            return(
              <option key={e.id} value={e.id}>Nombre:{e.title} Categoria:{e.location}</option>
            )
          })}
        </select>
      </div>
                                    {/* ----------------------------carta DERECHA */}
      <div className='carta'>
          <input onChange={handleChange} className='campo1' type="text" name="title" placeholder='Nombre...' value={state.title}/>
          <select value={state.location} onChange={handleChange} className="campo2">
            <option >Categoria</option>
            <option value={1} name="location">categoria 1</option>    
            <option value={2} name="location">categoria 2</option>   
            <option value={3} name="location">categoria 3</option>   
            <option value={4} name="location">categoria 4</option>         
          </select> 

               <img className='img' value={state.image} src={state.image} alt="image" /> 
               
          <div>
            <input onChange={handleImgChange} type="file" name="image" accept="image/*"/>
            <button onClick={handleCloudySubmit}>Subir imagen a la nube</button>
          </div>
            

          <div className='divboton'>
            <button className='boton'>Guardar</button>
            <button >Cancelar</button>
          </div>
      </div>

    </div>
  )
}
export default UpDateSponsor;