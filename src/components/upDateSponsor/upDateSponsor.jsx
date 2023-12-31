/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getAllSponsor,updateSponsor } from '../../redux/sponsorActions/sponsorActions';
import './upDateSponsor.css';
import { submitImgCloudy } from '../../redux/sponsorActions/sponsorActions';
import AlertSuccess from '../../assets/AlertSuccess/AlertSuccess';
import AlertError from '../../assets/AlertError/AlertError';



const UpDateSponsor = () => {
    const dispatch=useDispatch();
    const sponsor = useSelector((state)=>state.sponsor);   
    const [sponsorPisado, setSponsorPisado] = useState({});   
    const [state,setState]=useState({title:"",image:"",location:0});    
    const [enter,setEnter]=useState(false)
    const [newImg,setNewImg]=useState({});
    const [sure,setSure]=useState(false)   
    const [location,setLocation]=useState("");  
    const [hayCambios,setHayCambios]=useState(false);
    const imgHome="https://res.cloudinary.com/drpdobxfu/image/upload/v1695303663/sponsor/Captura_de_pantalla_2023-09-14_181923_fxljsv.png";
    const imgDetalle="https://res.cloudinary.com/drpdobxfu/image/upload/v1695303666/sponsor/Captura_de_pantalla_2023-09-14_181954_wphd7x.png";
    const userId=localStorage.userId;    
    const [response,setResponse]=useState(false)
    const [loading,setLoading]=useState(false)
    const [errorAlert,setErrorAlert]=useState('')
    const [showError,setShowError]=useState(false)
    
    
    useEffect(()=>{
      
      dispatch(getAllSponsor());
      
    },[dispatch])       
    
   
   
    const handleSelect=(event)=>{
      setEnter(true)   
      
      const obj= sponsor[+event.target.value]  
      

      if(event.target.value==-1){
        setState({title:"",image:"",location:""})
      } else{
        //si selecciono sponsor para editar enter=true
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
      setHayCambios(true)
        setState({
          ...state,
          [event.target.name]:event.target.value
        })       
        setLocation(state.location)        
      }else{
        setErrorAlert('Seleccione un sponsor')
        setShowError(true)
        setTimeout(()=>{setShowError(false)},4000)
      }
       
    }

    const handleLocation=(event)=>{
      //value=ubication dnd quiero mostrarlo
      if(enter){
      setHayCambios(true)      
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
      }else{
        setErrorAlert('Seleccione un sponsor')
        setShowError(true)
        setTimeout(()=>{setShowError(false)},4000)
      }
      
      
    }

    const handleAcept=(event)=>{
      event.preventDefault()

      //setea en 0 la location del sponsor que quiere pisar
      dispatch(updateSponsor(sponsorPisado.id,{location:0}))      
      setErrorAlert(`Haz quitado a ${sponsorPisado.title}, para volver a mostrarlo debes darle una ubicacion`)
        setShowError(true)
        setTimeout(()=>{setShowError(false)},4000)
      //este es el psonsor que se mostrara
      setState({...state, location:sponsorPisado.location})    
      
      setSure(false)
      
    }

    const handleCancel=(event)=>{
      event.preventDefault()
      setSure(false)
    }
    
   
    const handleImgChange = async (event)=>{
      
      const file= event.target.files[0]
      if(enter){
        setNewImg(URL.createObjectURL(file))
        setState({...state, image:file})
        setLoading(true)
        const cloudiResponse= await dispatch(submitImgCloudy(file))
        setLoading(false)       
        setState({...state,image:cloudiResponse.secure_url})
        setResponse(<AlertSuccess success={cloudiResponse.message}/>)
        setTimeout(()=>{setResponse(false)},3000)
      }else{
        setErrorAlert('Seleccione un sponsor')
        setShowError(true)
        setTimeout(()=>{setShowError(false)},4000)
      }
    }  
     
  

    const deleteImg=()=>{

      setHayCambios(true)
      setState({...state,image:""})      
      setLocation(state.location)      
      
    }

    const handleSubmit=async (event)=>{
      event.preventDefault();
      const body={
        id: state.id,
        title:state.title,
        image:state.image,
        active:true,
        location:+location,
        user_id:userId
      }     
      
      //si selecciono un sponsor y realizo cambios
      if(enter && hayCambios){
        setLoading(true)
        await dispatch(updateSponsor(body.id,body))
        setLoading(false)        
        dispatch(getAllSponsor());
        }else if(!enter){
          setErrorAlert('Seleccione un sponsor')
          setShowError(true)
          setTimeout(()=>{setShowError(false)},4000)
        }else if(enter && !hayCambios){
          setErrorAlert('No se registraron cambios')
          setShowError(true)
          setTimeout(()=>{setShowError(false)},4000)
        }

    }  

  return (
    
      <div className='cont_update_sponsor'>
                                          {/* ----------------------------carta izquierda */}
          <div className='cardIzq_update_sponsor'>
            <select onChange={handleSelect} className="select_sponsor-_editar">
              <option value={-1} name="allsponsor">Seleccione sponsor a editar</option>
              {sponsor?.map((e,index)=>{
                return(
                  <option key={e.id} name={index} value={index}>Nombre:{e.title.split('',10)} Ubicacion:{e.location}</option>
                )
              })}
            </select>
            <p className='texto_sponsor_ej'>Aqui te damos un ejemplo de como funcionan las ubicaciones</p>
              <div className='maqueta_ubicar_sponsor'>                
                <img className="ejemplo_update_sponsor" src={imgHome} alt="home" />
                <img className="ejemplo_update_sponsor" src={imgDetalle} alt="detalleNoticia" />
              </div>
              


          </div>
                                        {/* ----------------------------carta DERECHA */}
          <div className='cardDerecha_update_sponsor'>
          {showError ? (
              <div className="alerts">
                <AlertError error={errorAlert} />
              </div>
            ) : null}
            {loading? <div className='loader_update_sponsor'><span className="loader"></span></div>:null}
              {response? <div className='response-update-sponsor'>{response}</div>:null}
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
                
                <div className='cont_renderImg_sponsor'>
                    {state.image !== "" ? (
                      <img className='img_sponsor_editar' src={state?.image} alt="image"/> 
                      ) : (
                      <input className='file_sponsor_update' onChange={handleImgChange} type="file" name="image" accept="image/*"/>
                      )
                    }
                </div>
                    <div className='cont_alerta_sponsor'>
                    {sure ?
                    <div className="sure_sponsor_alerta">
                        <h3>¿En esta ubicacion se encuentra: {sponsorPisado.title}, deseas reemplazarlo?</h3>
                        <button className="aceptar_buton_sponsor" onClick={handleAcept}>Aceptar</button>
                        <button className="aceptar_buton_sponsor" onClick={handleCancel}>Cancelar</button>
                    </div>:null
                    }
                    </div>
                <div>
                  {state.image!== "" && (
                      <button className='eliminar_imagen_sponsor'  onClick={deleteImg}>Eliminar imagen</button>  
                  )}
                              
                </div>                

                <div className='contenedor_guardar_sponsor'>
                  <button onClick={handleSubmit} className='butonUpdate_guardar_sponsor'>Guardar cambios</button>                
                </div>
           
          </div>
          

      </div>
    
  )
}
export default UpDateSponsor;