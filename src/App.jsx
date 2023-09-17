/* eslint-disable no-unused-vars */
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "../src/components/Login/Login";
import SingUp from "../src/components/Login/SingUp";
import NoticiaDetail from "./components/detailNoticia/NoticiaDetail";
import CrearNoticia from "./components/CraerNoticia/CrearNoticia";
import PerfilUsuario from "./components/PerfilUsuario/Perfil";
import AdminDashboard from "./dashboardAdminComponents/adminDashboard/AdminDashboard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "../helpers/theme";
import React, { useState } from "react";
import { Banner } from "./components/Navbar/Banner/Banner";
import { Footer } from "./components/Footer/Footer";
import { ButtonUpper } from "./components/ButtonUpper/ButtonUpper";
import { CrearRol } from "./components/CrearRole/CrearRol";
import CrearSponsor from "./components/CrearSponsor/CrearSponsor";
import Sponsor1 from "./components/Sponsor/sponsor1/Sponsor1";
import RecuperarContraseña from "./components/RecuperarContraseña/RecuperarContraseña";
import UpdateNoticia from "./components/UpdateNoticia/UpdateNoticia";
import CardSponsor from "./components/CardSponsor/CardSponsor";
import UpDateSponsor from "./components/upDateSponsor/upDateSponsor";
import Sponsor2 from "./components/Sponsor/sponsor2/Sponsor2";
import Sponsor3 from "./components/Sponsor/sponsor3/Sponsor3";
import Sponsor4 from "./components/Sponsor/sponsor4/Sponsor4";
import { SignIn } from "./components/Login/SignIn/SignIn";

function App() {
  const storedThemeMode = localStorage.getItem("themeMode") || "light";
  const [themeMode, setThemeMode] = useState(storedThemeMode);

  const toggleThemeMode = () => {
    const prefThemeMode = themeMode === "light" ? "dark" : "light";
    localStorage.setItem("themeMode", prefThemeMode);
    setThemeMode(prefThemeMode);
  };
  const location = useLocation();
  const theme = createTheme(getDesignTokens(themeMode));

  return (
    <div className="AppContainer">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {location.pathname !== "/" ? null : <Banner />}
        {location.pathname !== "/auth/dashboard" ? (
          <Navbar themeMode={themeMode} toggleThemeMode={toggleThemeMode} />
        ) : null}
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<SignIn />} />
          <Route path={"/login/SignUp"} element={<SingUp />} />
          <Route path={"/detalle/:id"} element={<NoticiaDetail />} />
          <Route path={"/crearNoticia"} element={<CrearNoticia />} />
          <Route path={"/:id/profile"} element={<PerfilUsuario />} />
          <Route
            path={"/auth/dashboard"}
            element={
              <AdminDashboard
                themeMode={themeMode}
                toggleThemeMode={toggleThemeMode}
              />
            }
          />
          <Route path={"/crearRoles"} element={<CrearRol />} />
          <Route
            path={"/login/recuperacion"}
            element={<RecuperarContraseña />}
          />
          <Route path={"/editarNoticia/:id"} element={<UpdateNoticia />} />
          <Route path={"/crearSponsor"} element={<CrearSponsor />} />
          <Route path={"/sponsor1"} element={<Sponsor1 />} />
          <Route path={"/cardSponsor"} element={<CardSponsor />} />
          <Route path={"/editarSponsor"} element={<UpDateSponsor />} />
          <Route path={"/sponsor2"} element={<Sponsor2 />} />
          <Route path={"/sponsor3"} element={<Sponsor3 />} />
          <Route path={"/sponsor4"} element={<Sponsor4 />} />
        </Routes>
        <ButtonUpper />
        {/* {location.pathname !== "/" ? null : } */}
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
