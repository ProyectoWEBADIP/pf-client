/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import CardsNoticias from "./components/CardsNoticias/CardsNoticias";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "../src/components/Login/Login";
import SingUp from "../src/components/Login/SingUp";
import NoticiaDetail from "./components/detailNoticia/NoticiaDetail";
import CrearNoticia from "./components/CraerNoticia/CrearNoticia";
import { CrearRol } from "./components/CrearRole/CrearRol";
import PerfilUsuario from "./components/PerfilUsuario/Perfil";
import CrearSponsor from "./components/CrearSponsor/CrearSponsor";
import Sponsor1 from "./components/Sponsor/sponsor1/Sponsor1";
import AdminDashboard from "./dashboardAdminComponents/adminDashboard/AdminDashboard";
import CardSponsor from "./components/CardSponsor/CardSponsor";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "../helpers/theme";
import React, { useState } from "react";
import UpDateSponsor from "./components/upDateSponsor/upDateSponsor"
function App() {
   const storedThemeMode = localStorage.getItem("themeMode") || "light";
   const [themeMode, setThemeMode] = useState(storedThemeMode);

   const toggleThemeMode = () => {
      const prefThemeMode = themeMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", prefThemeMode);
      setThemeMode(prefThemeMode);
   };

   const theme = createTheme(getDesignTokens(themeMode));

   return (
      <div className="AppContainer">
         <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar themeMode={themeMode} toggleThemeMode={toggleThemeMode} />
            <Routes>
               <Route path={"/"} element={<Home />} />
               <Route path={"/login"} element={<Login />} />
               <Route path={"/login/SignUp"} element={<SingUp />} />
               <Route path={"/detalle/:id"} element={<NoticiaDetail />} />
               <Route path={"/crearNoticia"} element={<CrearNoticia />} />
               <Route path={"/:id/profile"} element={<PerfilUsuario />} />
               <Route path={"/auth/dashboard"} element={<AdminDashboard />} />
               <Route path={"/crearRoles"} element={<CrearRol />} />
               <Route path={"/crearSponsor"} element={<CrearSponsor/>}/>
               <Route path={"/sponsor1"} element={<Sponsor1/>}/>
               <Route path={"/cardSponsor"} element={<CardSponsor/>}/>
               <Route path={"/editarSponsor"} element={<UpDateSponsor/>}/>
            </Routes>
         </ThemeProvider>
      </div>
   );
}

export default App;
