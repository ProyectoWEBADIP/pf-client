/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './swiperNotices.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useSelector } from 'react-redux';
import {  Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

export default function SwiperNotices() {

  const noticias = useSelector((state) => state.noticias);

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {noticias.map((not,i)=>{
          return (
        <SwiperSlide key={i}>
            <Card
        className="noticesCards"
        sx={{ minWidth: "70%", minHeight: '100%', maxHeight: '100%', maxWidth: '100%' }}
      >
        <CardActionArea>
          <CardMedia
            className="imageCard"
            component="img"
            image={not.image}
          />
          
        </CardActionArea>
      </Card>
      <CardContent className="cardContent">

            <span>{not.title}</span>

            <Link to={`/detalle/${not.id}`}>
              <button className='leerMasButton'>Leer más</button>
            </Link>
          </CardContent>
        </SwiperSlide>

          )
        })}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
