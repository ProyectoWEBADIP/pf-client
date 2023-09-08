/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './cardNoticia.css';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button } from '@mui/material';


const CardNoticia = ({title, id, image, date}) => {
    
  return (
    <>
    <Card className="noticesCards" sx={{minWidth:250 , minHeight: 300, maxHeight:350, maxWidth:250 }}>
      <CardActionArea>
      <CardMedia className="imageCard" component="img" image={image} height="200px"/>
      <CardContent>
          <Typography variant='h6'>{title}</Typography>
          <Typography variant='body2'>{date?.split("T")[0]}</Typography>

          <Button href={`/detalle/${id}`}>Ver más</Button>
      </CardContent>
      </CardActionArea>
    </Card>
    </>
  )
}

export default CardNoticia;
