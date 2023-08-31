import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getHistory } from '../../redux/login-registerActions/loginActions';

export default function NoticiaDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();
  let path = useLocation();

  useEffect(() => {
    dispatch(getHistory(path.pathname));
  }, []);


  const arr = [
    {
      id: 1,
      titulo: '¡Equipo local gana el campeonato de fútbol!',
      body: 'El equipo de fútbol local logró una victoria impresionante en la final del campeonato, asegurándose el título después de un emocionante partido que mantuvo a los fanáticos al borde de sus asientos.',
      img: 'https://diariohoynet.nyc3.cdn.digitaloceanspaces.com/adjuntos/galerias/000/496/0000496131.jpg',
    },
    {
      id: 2,
      titulo: 'Atleta nacional establece nuevo récord en los Juegos Olímpicos',
      body: 'Nuestro destacado atleta nacional dejó su marca en los Juegos Olímpicos al establecer un nuevo récord en la prueba de sprint. Su dedicación y esfuerzo finalmente dieron sus frutos, ganándose un lugar en la historia del deporte.',
      img: 'https://www.clarin.com/img/2023/07/08/optYrcwoz_360x240__1.jpg',
    },
    {
      id: 3,
      titulo: 'Equipo de baloncesto se clasifica para las finales de la liga',
      body: 'El equipo de baloncesto de nuestra ciudad demostró su habilidad en la cancha al asegurarse un lugar en las finales de la liga. Después de una temporada llena de desafíos, están listos para competir por el campeonato.',
      img: 'https://www.clarin.com/img/2022/08/26/JUfs6IdeN_360x240__1.jpg',
    },
    {
      id: 4,
      titulo: 'Nuevo récord mundial en natación',
      body: 'Un nadador talentoso batió todas las expectativas al establecer un nuevo récord mundial en la categoría de natación de estilo libre. Su velocidad y técnica impresionantes lo llevaron a superar la marca anterior y ganarse el respeto de la comunidad deportiva.',
      img: 'https://img2.rtve.es/i/?w=1600&i=1659088822807.jpg',
    },
    {
      id: 5,
      titulo: 'Tenista internacional gana su tercer Grand Slam del año',
      body: 'El tenista internacional continúa su racha ganadora al llevarse su tercer título de Grand Slam en lo que va del año. Su dominio en la cancha y su dedicación incansable lo convierten en uno de los mejores atletas de la historia del tenis.',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSdrNy7Rns9hYPVw5t1ZJ2A-G0kRAyFhsc9w&usqp=CAU',
    },
  ];
  const noticias = arr.filter((el) => el.id == id);

  return (
    <div>
      {noticias.map((el) => {
        return (
          <div key={el.id}>
            <h1>{el.titulo}</h1>
            <p>{el.body}</p>
          </div>
        );
      })}
    </div>
  );
}
