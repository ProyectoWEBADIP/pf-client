/* eslint-disable no-unused-vars */
import React from 'react';
import './Updates.css';

import img from '../../../assets/Escudo ADIP sin fondo.png';
export const UpdatesData = [
  {
    img,
    name: 'Andrew Thomas',
    content: 'has ordered Apple smart watch 2500mh battery.',
    time: '25 seconds ago',
  },
  {
    img,
    name: 'James Bond',
    content: 'has received Samsung gadget for charging battery.',
    time: '30 minutes ago',
  },
  {
    img,
    name: 'Iron Man',
    content: 'has ordered Apple smart watch, samsung Gear 2500mh battery.',
    time: '2 hours ago',
  },
];
const Updates = () => {
  return (
    <div className="Updates">
      {UpdatesData.map((comment, i) => {
        return (
          <div key={i} className="update">
            <img src={comment.img} alt={comment.name} />
            <div className="noti">
              <div style={{ marginBottom: '0.5rem' }}>
                <span>{comment.name}</span>
                <span> {comment.content}</span>
              </div>
              <span>{comment.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Updates;
