/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../Searchbar/SearchBar';
import Notificaciones from '../Notificaciones/Notificaciones';
import './navbar.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/login-registerActions/loginActions';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  function logOut() {
    dispatch(logout());
    navigate('/login');
  }

  const access_token = localStorage.access_token;

  return (
    <div className="contNav">
      <Link to="/">Home</Link>
      {access_token  ? (
        <button onClick={() => logOut()}>Cerrar sesión</button>
      ) : (
        <Link to="/login">
          <button>Iniciar sesión</button>
        </Link>
      )}
      <Notificaciones />
      <SearchBar />
      <Link to={'/crearNoticia'}>Crear Noticia</Link>
      <Link to={'/miPerfil'}>Mi perfil</Link>
    </div>
  );
};

export default Navbar;
