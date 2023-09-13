/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "../src/components/Login/Login";
import SingUp from "../src/components/Login/SingUp";
import NoticiaDetail from "./components/detailNoticia/NoticiaDetail";
import CrearNoticia from "./components/CraerNoticia/CrearNoticia";
import PerfilUsuario from "./components/PerfilUsuario/Perfil"

import AdminDashboard from "./dashboardAdminComponents/adminDashboard/AdminDashboard";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "../helpers/theme";
import React, { useState } from "react";

function App() {
   const storedThemeMode = localStorage.getItem("themeMode") || "light";
   const [themeMode, setThemeMode] = useState(storedThemeMode);

   const toggleThemeMode = () => {
      const prefThemeMode = themeMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", prefThemeMode);
      setThemeMode(prefThemeMode);
   };
const location = useLocation()
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
          <Route path={"/auth/dashboard"} element={<AdminDashboard/>}/>      
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
