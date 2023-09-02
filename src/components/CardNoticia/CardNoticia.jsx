/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './cardNoticia.css';

const CardNoticia = (props) => {
  return (
    <div className="cardCont">
      <Link to={`/detalle/${props.id}`}>
        <div className="contTitle">
          <h1 className="title">{props.title}</h1>
        </div>
      </Link>
    </div>
  );
};

export default CardNoticia;
