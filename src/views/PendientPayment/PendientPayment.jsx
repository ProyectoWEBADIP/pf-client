/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import './pendientPayment.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
const PendientPayment = () => {
    const id = localStorage.userId
  return (
    <div className='error-payment-container'>
      <img src={'https://res.cloudinary.com/drpdobxfu/image/upload/v1695262373/mcoolyhoruw2fmsmpckj.webp'} alt="" />
      <h1>
        Tu pago está pendiente de aprobación, ante cualquier inconveniente, por favor comunícate con nosotros:
        cobranzas@adip.com.ar
      </h1>
<Link to={`/${id}/profile`}><button>Volver a mi perfil</button></Link>
      
    </div>
  );
};

export default PendientPayment;