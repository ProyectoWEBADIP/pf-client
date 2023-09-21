/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import './errorPayment.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
const ErrorPayment = () => {
  const navigate = useNavigate()
    const id = localStorage.userId
  return (
    <div className='error-payment-container'>
      <img src={'https://res.cloudinary.com/drpdobxfu/image/upload/v1695261698/lmrzoj4irhissl3kjurc.webp'} alt="" />
      <h1>
        Hubo un problema con el pago, ante cualquier inconveniente, por favor comunícate con nosotros:
        cobranzas@adip.com.ar
      </h1>
<Link to={`/${id}/profile`}><button>Volver a mi perfil</button></Link>
      
    </div>
  );
};

export default ErrorPayment;