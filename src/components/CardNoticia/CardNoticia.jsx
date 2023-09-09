/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './cardNoticia.css';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { deleteNotice, getAllNoticias, getNoticeById } from '../../redux/noticiasActions/noticiasActions';
import { useNavigate } from 'react-router-dom';


const CardNoticia = ({title, id, image, date}) => {

  const dispatch = useDispatch()
  
  const handleDeleteNotice = () => {
    const body = {active: false}
    dispatch(deleteNotice(id, body))
    alert("Eliminando noticia")
    dispatch(getAllNoticias())  
  } 
  
  
  const navigate = useNavigate()
  const handleUpdateNotice = () =>{
    
    navigate(`/editarNoticia/${id}`)
  }
    
    
  return (
    <>
    <Card className="noticesCards" sx={{minWidth:250 , minHeight: 300, maxHeight:350, maxWidth:250 }}>
      <CardActionArea>
      <CardMedia className="imageCard" component="img" image={image} height="200px"/>
      <CardContent>
          <Typography variant='h6'>{title}</Typography>
          <Typography variant='body2'>{date?.split("T")[0]}</Typography>
          <Button onClick={()=>{handleDeleteNotice()}}>Eliminar</Button>
          <Button onClick={()=>{handleUpdateNotice()}}><Link to={`/editarNoticia/${id}}`}>Editar</Link></Button>
          <Link to={`/detalle/${id}`}>Ver más</Link>
      </CardContent>
      </CardActionArea>
    </Card>
    </>
  )
}

export default CardNoticia;
