import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import "./Notices.css"
import { getAllNoticias } from "../../redux/noticiasActions/noticiasActions"
import { Link } from "react-router-dom"
import { getNoticiasByCategory } from "../../redux/noticiasActions/noticiasActions"
import { getAllCategories } from "../../redux/categoriasActions/categoriasActions"
import SearchBar from "../Searchbar/SearchBar"
import {Grid} from '@mui/material';

export default function Notices(){
    useEffect(()=>{
        dispatch(getAllNoticias())
        dispatch(getAllCategories())
    },[])
    const dispatch = useDispatch()
    const categorys = useSelector((state) => state.categorias)
    console.log(categorys);
    const allNoticias = useSelector((state) => state.noticias)
    let noticesByCategory = useSelector((state) => state.noticeById)
    console.log(noticesByCategory);

    
    
   
    
    const handleSelect = (event) => {
        if(event.target.value !== "default"){
            dispatch(getNoticiasByCategory(event.target.value))
        }else {
            dispatch(getAllNoticias())
        }
    }


return (
    <div>
  
        <h1>Todas las noticias</h1>
       <SearchBar/>
        <div>
            <h2>Buscar por categoria</h2>
            <select onChange={handleSelect}>
            <option value={"default"}>Selecciones una categoria</option>    
            {categorys?.map((el) => {
                return <option value={el.id} key={el.id}>{el.name}</option>
            })}
            </select>
        </div>
        {allNoticias.length === 0 ? <div><h2>No hay Noticias</h2></div> : <div className="card-container-noticiasInpisables">
        {allNoticias?.map((e) => {
            return <div className="card-cartas-noticias" title={e.resume} key={e.id}>
                <div className="ImagenTituloCard">
                <img src={e.image} alt={e.title} />
                <h2>{e.title}</h2>
                </div>
                <div className="boton-card-noticia">
                <Link to={`/detalle/${e.id}`}><button className="boton-card-noticia">Ver más</button></Link>
                </div>
            </div>
        })}
        </div>}
        
        
        
        
        </div>

)
}