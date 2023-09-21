/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pagarCuotaPorMp } from '../../redux/profileActions/profileActions';
import { useNavigate } from 'react-router-dom';
import './successPayment.css'
const SuccessPayment = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const saldo = {
    saldo:0
  };
  useEffect(() => {
    dispatch(pagarCuotaPorMp(localStorage.userId, saldo))
    setTimeout(() => {
      navigate(`/${localStorage.userId}/profile`)
    }, 3000);
}, []);


    
  return (
    <div className='success-payment-container'>
      <img src={'https://res.cloudinary.com/drpdobxfu/image/upload/v1695232166/vvjv9rxfwnaiofx0isgj.png'} alt="" />
      <h1>
        Tu pago ha sido aprobado. Serás redireccionado a tu perfil en un
        instante.
      </h1>
      
    </div>
  );
};

export default SuccessPayment;