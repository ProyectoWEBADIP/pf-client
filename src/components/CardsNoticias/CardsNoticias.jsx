/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import CardNoticia from '../cardNoticia/CardNoticia';
import './cardsNoticias.css';
import { useSelector } from 'react-redux';
import { Container, display, padding } from '@mui/system';
import { Grid } from '@mui/material';
import LastNotice from '../CardNoticiaGrande/LastNotice';

const CardsNoticias = () => {
  const noticias = useSelector((state) => state.noticias);
  const noticiaGrande = noticias[0];
  const noticiasPequeñas = noticias?.slice(1,noticias.length-1)
  return (
    <div className="notContainer">
      <LastNotice
      id={noticiaGrande?.id}
      title={noticiaGrande?.title}
      content={noticiaGrande?.content}
      image={noticiaGrande?.image}
      resume={noticiaGrande?.resume}
      date={noticiaGrande?.date}
      />
      {noticiasPequeñas?.map((notice) => (
        <CardNoticia
          key={notice.id}
          id={notice.id}
          title={notice.title}
          content={notice.content}
          image={notice.image}
          resume={notice.resume}
          date={notice.date}
        />
      ))}
    </div>
  );
};

export default CardsNoticias;
