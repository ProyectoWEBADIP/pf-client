/* eslint-disable no-unused-vars */
import React from 'react';
import './developers.css';
import { devs } from './devs';
import DevCard from './DevCard';
import { useTypewriter,Cursor } from 'react-simple-typewriter';
const Developers = () => {
  const [typeEffect] = useTypewriter({
    words:['detrás de este proyecto!💻','colocando tu cursor sobre la foto!📷'],
    loop:{},
    typeSpeed:100,
    deleteSpeed:80,
    delaySpeed:3000
  })
  return (
    <div className="devs-view-container">
      <span>!Conoce al equipo {typeEffect}<Cursor/></span>
      <div className="tecnologias-container">

      </div>
      <div className='devs-container'>
      {
   devs.map((dev,i)=>{
    return (
      <DevCard
      key={i}
      image={dev.image}
      name={dev.name}
      role={dev.role}
      ghub={dev.ghub}
      linkedin={dev.linkedin}
      />
    )
   }) }</div>
    </div>
  );
};

export default Developers;
