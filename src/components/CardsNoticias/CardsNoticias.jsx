/* eslint-disable no-unused-vars */
import React from 'react';
import CardNoticia from '../cardNoticia/CardNoticia';
import './cardsNoticias.css';
import { useSelector } from 'react-redux';

const CardsNoticias = () => {

  const noticias = useSelector((state) => state.noticias);
  return (
    <div className="cont">
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
    </div>
  );
};

export default CardsNoticias;
