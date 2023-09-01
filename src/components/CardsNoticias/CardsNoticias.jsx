import React from "react";
import CardNoticia from "../cardNoticia/CardNoticia";
import "./cardsNoticias.css";
import { Container, display, padding } from "@mui/system";
import { Grid } from "@mui/material";

const CardsNoticias = () => {
  const arr = [
    {
      id: 1,
      titulo: "¡ADIP gano y goleó el fin de semana!",
      body: "El equipo de fútbol local logró una victoria impresionante en la final del campeonato, asegurándose el título después de un emocionante partido que mantuvo a los fanáticos al borde de sus asientos.",
      img: "https://diariohoynet.nyc3.cdn.digitaloceanspaces.com/adjuntos/galerias/000/569/0000569277.jpg",
    },
    {
      id: 2,
      titulo: "ADIP es el nuevo tricampeón!"  ,
      body: "Nuestro destacado atleta nacional dejó su marca en los Juegos Olímpicos al establecer un nuevo récord en la prueba de sprint. Su dedicación y esfuerzo finalmente dieron sus frutos, ganándose un lugar en la historia del deporte.",
      img: "https://diariohoynet.nyc3.cdn.digitaloceanspaces.com/adjuntos/galerias/000/568/0000568061.jpg",
    },
    {
      id: 3,
      titulo: "Otro finde de fútbol para nuestras infantiles",
      body: "El equipo de baloncesto de nuestra ciudad demostró su habilidad en la cancha al asegurarse un lugar en las finales de la liga. Después de una temporada llena de desafíos, están listos para competir por el campeonato.",
      img: "https://media.cdn.eldestapeweb.com/eldestape/072022/1658882126514/feli-futbol-femenino2-jpeg..webp?cw=1322&ch=743&extw=jpeg",
    },
    {
      id: 4,
      titulo: "Nuevo récord mundial en natación",
      body: "Un nadador talentoso batió todas las expectativas al establecer un nuevo récord mundial en la categoría de natación de estilo libre. Su velocidad y técnica impresionantes lo llevaron a superar la marca anterior y ganarse el respeto de la comunidad deportiva.",
      img: "https://img2.rtve.es/i/?w=1600&i=1659088822807.jpg",
    },
    {
      id: 5,
      titulo: "Tenista internacional gana su tercer Grand Slam del año",
      body: "El tenista internacional continúa su racha ganadora al llevarse su tercer título de Grand Slam en lo que va del año. Su dominio en la cancha y su dedicación incansable lo convierten en uno de los mejores atletas de la historia del tenis.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSdrNy7Rns9hYPVw5t1ZJ2A-G0kRAyFhsc9w&usqp=CAU",
    },
  ];
  return (
    <Container sx={{display:"flex", flexWrap:"wrap"}}>
      {arr?.map((e) => (
        <CardNoticia
          key={e.id}
          id={e.id}
          titulo={e.titulo}
          body={e.body}
          img={e.img}
        />
      ))}
   
    </Container>
  );
};

export default CardsNoticias;
