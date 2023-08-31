import React from 'react';
import { Link } from 'react-router-dom';
import './cardNoticia.css';


const CardNoticia = ({titulo,id,img}) => {
    
  return (
    <div className='cardCont'>
      
      <Link to={`/detalle/${id}`}>
      <div className='contTitle'>
        <h1 className='title'>{titulo}</h1>
      </div>
      </Link>      
    </div>
  )
}

export default CardNoticia;