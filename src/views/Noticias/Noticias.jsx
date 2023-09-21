/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllNoticias } from '../../redux/noticiasActions/noticiasActions'
import './noticias.css'
const Noticias = () => {
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getAllNoticias())
  })
const noticias = useSelector(state=>state.noticias)
console.log(noticias);
  return (
    
    <div className="apartado-noticias-infinitescroll-container">
<div className="noticias-infinitescroll-container">
<h1>hola</h1>
</div>
    </div>
  )
}

export default Noticias