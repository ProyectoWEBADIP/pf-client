import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Searchbar/SearchBar";
import Notificaciones from "../Notificaciones/Notificaciones";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="contNav">
      <Link to="/">
        Home
      </Link>
      <Link to="/login">
        Login
      </Link>
      <Notificaciones />
      <SearchBar />
      <Link to={"/crearNoticia"}>
        Crear Noticia
      </Link>
      <Link to={"/miPerfil"}>
        Mi perfil
      </Link>
    </div>
  );
};

export default Navbar;
