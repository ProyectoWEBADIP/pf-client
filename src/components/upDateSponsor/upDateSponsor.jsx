import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getAllSponsor,updateSponsor } from '../../redux/sponsorActions/sponsorActions';
import './upDateSponsor.css';
import axios from 'axios';



const UpDateSponsor = () => {
    const dispatch=useDispatch();
    const sponsor = useSelector((state)=>state.sponsor);   
    const [sponsorPisado, setSponsorPisado] = useState({});   
    const [state,setState]=useState({title:"",image:"",location:0});    
    const [enter,setEnter]=useState(false)
    const [newImg,setNewImg]=useState({});
    const [sure,setSure]=useState(false)   
    const [location,setLocation]=useState("");  
    const imgHome="https://res.cloudinary.com/drpdobxfu/image/upload/v1694546094/sponsor/home_tjpfhm.png";
    const imgDetalle="https://res.cloudinary.com/drpdobxfu/image/upload/v1694546093/sponsor/detalle_ltrsus.png";
   
    
    useEffect(()=>{
      
      dispatch(getAllSponsor());
      
    },[dispatch])       
    
   

    const handleSelect=(event)=>{
      // id del sponsor elegido para editar  
        
      //busca el sponsor que quier editar y lo carga en el estado
      const obj= sponsor[+event.target.value]    
      
      if(event.target.value==-1){
        setState({title:"",image:"",location:""})
      } else{
        setEnter(true)   
        setState(
          {
            id: obj.id,
            title:obj.title,
            image:obj.image,
            location:obj.location
          }
        )  
      }
      
    }
    

    const handleChange=(event)=>{
      
      if(enter){
        setState({
          ...state,
          [event.target.name]:event.target.value
        })
        
      }else{
        alert("seleccione sponsor a editar")
      }
       
    }

    const handleLocation=(event)=>{
      
      setLocation(+event.target.value)
      
     //el que quiere cambiar lo busca por location
      const aModificar= sponsor.filter((el)=>el.location==event.target.value)      
      setSponsorPisado(aModificar[0])
      
      
  
      if(!aModificar[0]){
        setState({
                ...state,
                location:+event.target.value
              })
              
      }else{
        setSure(true)
      }
      
    }

    const handleAcept=(event)=>{
      event.preventDefault()   

      //setea en 0 la location del sponsor que quiere pisar
      dispatch(updateSponsor(sponsorPisado.id,{location:0}))
      alert(`Haz quitado a ${sponsorPisado.title}, para volver a mostrarlo debes darle una ubicacion`)      
    
      //este es el psonsor que se mostrara
      setState({...state,location:sponsorPisado.location})     
      setSure(false)
      
    }

    const handleCancel=(event)=>{
      event.preventDefault()
      setSure(false)
    }
    
   
    const handleImgChange = async (event)=>{
      event.preventDefault();
      const file= event.target.files[0]    
      if(enter){
        setNewImg(file)
      }else{
        alert("seleccione sponsor a editar")
      }
    }  
     
    const handleCloudiChange= async()=>{
      if(state.image === "" && newImg!==""){
        try {
          const formData = new FormData();
          formData.append("file", newImg);
          formData.append("upload_preset", "sponsor");
          formData.append("cloud_name", "drpdobxfu");
  
          const { data } = await axios.post(
            "https://api.cloudinary.com/v1_1/drpdobxfu/image/upload",
            formData
          );
          setState({ ...state, image: data.secure_url });
  
          alert("Subida con exito!");
        } catch (error) {
          console.log(error);
        }
      }
    }

    const deleteImg=()=>{

      
      setState({...state,image:""})
      
    }

    const handleSubmit=(event)=>{
      event.preventDefault();     

      const body={
        id: state.id,
        title:state.title,
        image:state.image,
        active:true,
        location:+location
      }
      
      if(enter){
        dispatch(updateSponsor(body.id,body))
        alert("¡Sponsor editado con exito!")
        dispatch(getAllSponsor());
        }else{
          alert("seleccione sponsor a editar")
      }


    }

    

  return (
    
        <div className='contenedor'>
                                          {/* ----------------------------carta izquierda */}
          <div className='selec'>
            <select onChange={handleSelect} className="select">
              <option value={-1} name="allsponsor">Seleccione sponsor a editar</option>
              {sponsor?.map((e,index)=>{
                return(
                  <option key={e.id} name={index} value={index}>Nombre:{e.title} Ubicacion:{e.location}</option>
                )
              })}
            </select>
            <p className='texto'>Aqui te damos un ejemplo de como funcionan las ubicaciones</p>
              <div className='contimg'>
                
                <img className="ejemplo" src={imgHome} alt="home" />
                <img className="ejemplo" src={imgDetalle} alt="detalleNoticia" />
              </div>
              


          </div>
                                        {/* ----------------------------carta DERECHA */}
          <div className='carta'>
              <input onChange={handleChange} className='campo1' type="text" name="title" placeholder='Nombre...' value={state.title}/>
              <select value={state.location} name="location" onChange={handleLocation} className="campo2">
                <option >Ubicacion</option>
                <option value={1}>1</option>    
                <option value={2}>2</option>   
                <option value={3}>3</option>   
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
                <option value={13}>13</option>
                <option value={14}>14</option>
                <option value={15}>15</option>
                <option value={16}>16</option>
                <option value={17}>17</option>
                <option value={18}>18</option>
                <option value={19}>19</option>
                <option value={20}>20</option>         
              </select> 
              
               {state.image !== "" ? (
                 <img className='img' src={state?.image} alt="image"/> 
                ) : (
                <input onChange={handleImgChange} type="file" name="image" accept="image/*"/>
                )
              }
                  {sure ?
                   <div className="sure">
                      <h3>¿En esta ubicacion se encuentra: {sponsorPisado.title}, deseas reemplazarlo?</h3>
                      <button className="aceptar" onClick={handleAcept}>Aceptar</button>
                      <button className="aceptar" onClick={handleCancel}>Cancelar</button>
                   </div>:null
                  }
              <div>
                {state.image!== "" ? (
                    <button className='eliminar'  onClick={deleteImg}>Eliminar imagen</button>  
                ):<button  onClick={handleCloudiChange}>Subir imagen a la nube</button>}
                            
              </div>                

              <div className='divboton'>
                <button onClick={handleSubmit} className='boton'>Guardar cambios</button>                
              </div>
          </div>

        </div>
    
  )
}
export default UpDateSponsor;