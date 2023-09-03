/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './cardNoticia.css';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button } from '@mui/material';


const CardNoticia = ({titulo, id, img}) => {
    
  return (
    <>
    <Card sx={{m:2, minWidth:300 , minHeight: 350, maxHeight:350, maxWidth:300 }}>
      <CardActionArea>
      <CardMedia component="img" image={img} height="200px"/>
      <CardContent>
          <Typography variant='h6'>{titulo}</Typography>
          <Button href={`/detalle/${id}`}>Ver más</Button>
      </CardContent>
      </CardActionArea>
    </Card>
    </>
  )
}

export default CardNoticia;
