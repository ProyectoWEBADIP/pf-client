/* eslint-disable no-unused-vars */
import React from 'react';
import CardNoticia from '../cardNoticia/CardNoticia';
import './cardsNoticias.css';
import { useSelector } from 'react-redux';
import { Container, display, padding } from "@mui/system";
import { Grid } from "@mui/material";

const CardsNoticias = () => {
  const noticias = useSelector((state) => state.noticias);
  return (
    <Container sx={{display:"flex", flexWrap:"wrap"}}>
      {noticias?.map((notice) => (
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
   
    </Container>
  );
};

export default CardsNoticias;
