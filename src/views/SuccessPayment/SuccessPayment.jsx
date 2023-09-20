/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pagarCuotaPorMp } from '../../redux/profileActions/profileActions';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../redux/login-registerActions/loginActions';

const SuccessPayment = () => {
  const dispatch = useDispatch();
  const profileUser = useSelector((state) => state.perfilUsuario);
  const id = profileUser?.profile?.id;
  const navigate = useNavigate();
  useEffect(() => {
    const pagoRealizado = async () => {
      await dispatch(getUserById(localStorage.userId));
      await dispatch(pagarCuotaPorMp(id));
      setTimeout(() => {
        navigate(`/${profileUser?.id}/profile`);
      }, 3000);
    };
    pagoRealizado();
  }, [dispatch, id, navigate, profileUser.id]);
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
