/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pagarCuotaPorMp } from '../../redux/profileActions/profileActions';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../redux/login-registerActions/loginActions';

const SuccessPayment = () => {
  const dispatch = useDispatch();
//   let [user, setUser] = useState({})
  const profileUser = useSelector((state) => state.perfilUsuario);
  console.log("profileUser", profileUser);
//   const id = profileUser?.profile?.id;
//   const navigate = useNavigate();
//   const saldo = 0;
//   const pagoRealizado = async () => {
//     console.log("user",user);
//     await ;
//   setTimeout(() => {
//     navigate(`/${user?.id}/profile`);
//   }, 3000);
// };
// const buscarUsuario = async() => {
//     const userData = await dispatch(getUserById(localStorage.userId)); 
//     user = userData     
//     console.log("user effect", user);
// }
// console.log(localStorage.userId);
  

  useEffect(() => {
    dispatch(pagarCuotaPorMp(profileUser.profile?.id, {saldo: 0}))
    // buscarUsuario();
    // pagoRealizado();
}, []);


    
  return (
    <div>
      <h1>
        Tu pago ha sido aprobado. Serás redireccionado a tu perfil en un
        instante.
      </h1>
      <h2>
        Tu pago ha sido aprobado. Serás redireccionado a tu perfil en un
        instante.
      </h2>
      <h2>
        Tu pago ha sido aprobado. Serás redireccionado a tu perfil en un
        instante.
      </h2>
      <h2>
        Tu pago ha sido aprobado. Serás redireccionado a tu perfil en un
        instante.
      </h2>
      <h2>
        Tu pago ha sido aprobado. Serás redireccionado a tu perfil en un
        instante.
      </h2>
      <h2>
        Tu pago ha sido aprobado. Serás redireccionado a tu perfil en un
        instante.
      </h2>
      <h2>
        Tu pago ha sido aprobado. Serás redireccionado a tu perfil en un
        instante.
      </h2>
      <h2>
        Tu pago ha sido aprobado. Serás redireccionado a tu perfil en un
        instante.
      </h2>
      <h2>
        Tu pago ha sido aprobado. Serás redireccionado a tu perfil en un
        instante.
      </h2>
      <h2>
        Tu pago ha sido aprobado. Serás redireccionado a tu perfil en un
        instante.
      </h2>
    </div>
  );
};

export default SuccessPayment;