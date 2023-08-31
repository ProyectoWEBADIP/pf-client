import { useSelector } from "react-redux";
import CardsNoticias from "./components/CardsNoticias/CardsNoticias";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "../src/components/Login/Login"
import SingUp from "../src/components/Login/SingUp"
import NoticiaDetail from "./components/detailNoticia/NoticiaDetail";
import CrearNoticia from "./components/CraerNoticia/CrearNoticia";
import PerfilUsuario from "./components/PerfilUsuario/Perfil"


function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path={"/"} element={<Home/>}/>
      <Route path={"/login"} element={<Login/>}/>
      <Route path={"/login/SignUp"} element={<SingUp/>}/>
      <Route path={"/detalle/:id"} element={<NoticiaDetail/>}/>
      <Route path={"/crearNoticia"} element={<CrearNoticia/>}/>
      <Route path={"/miPerfil"} element={<PerfilUsuario/>} />
      

      </Routes>
      

    </div>
  );
}

export default App;
