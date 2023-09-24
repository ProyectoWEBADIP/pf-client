/* eslint-disable no-unused-vars */

import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import "./index.css";
import SignUp from "./components/SignUp/SignUp";
import NoticiaDetail from "./components/detailNoticia/NoticiaDetail";
import CrearNoticia from "./components/CraerNoticia/CrearNoticia";
import PerfilUsuario from "./components/PerfilUsuario/Perfil";
import AdminDashboard from "./dashboardAdminComponents/adminDashboard/AdminDashboard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "../helpers/theme";
import React, { useEffect, useState } from "react";
import EditarPartidos from "./components/EditarPartidos/EditarPartidos";
import { Banner } from "./components/Navbar/Banner/Banner";
import { Footer } from "./components/Footer/Footer";
import { ButtonUpper } from "./components/ButtonUpper/ButtonUpper";
import CrearSponsor from "./components/CrearSponsor/CrearSponsor";
import RecuperarContraseña from "./components/RecuperarContraseña/RecuperarContraseña";
import UpdateNoticia from "./components/UpdateNoticia/UpdateNoticia";
import UpDateSponsor from "./components/upDateSponsor/upDateSponsor";
import { SignIn } from "./components/Login/SignIn/SignIn";
import ClubHistoria from "./components/ClubHistoria/ClubHistoria";
import ClubComision from "./components/ClubComision/ClubComision";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ProtectedSuperAdminRoutes from "./components/ProtectedRoutes/ProtectedSuperAdminRoutes";
import NotFoundComponent from "./components/notFound/NotFound";
import Noticias from "./views/Noticias/Noticias";
import SuccessPayment from "./views/SuccessPayment/SuccessPayment";
import QRCarnet from "./components/QrCarnet/QrCarnet";
import Notices from "./components/Notices/Notices";
import ClubContacto from "./components/ClubContacto/ClubContacto";
import FutbolFemenino from "./components/FutbolFemenino/FutbolFemenino";
import { FutbolMasculino } from "./components/FutbolMasculino/FutbolMasculino";
import FutbolLogros from "./components/FutbolLogros/FutbolLogros";
import Aos from "aos";
import "aos/dist/aos.css";
import MasNaranja from "./components/MasNaranja/MasNaranja";

import ErrorPayment from './views/ErrorPayment/ErrorPayment';
import PendientPayment from './views/PendientPayment/PendientPayment';
import Developers from './views/Developers/Developers';
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
   useEffect(() => {
      Aos.init();
   }, []);


  return (
    <div className="AppContainer">
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {location.pathname === '/' || location.pathname === '/club/historia' || location.pathname === '/club/comision' 
        || location.pathname === '/club/contacto' || location.pathname === '/futbol/femenino' || location.pathname === '/futbol/masculino' || location.pathname === '/futbol/logros' 
        || location.pathname === '/sumate/naranja' 
         ? <Banner /> : null }
        {location.pathname !== '/auth/dashboard' ? (
          <Navbar themeMode={themeMode} toggleThemeMode={toggleThemeMode} />
        ) : null}
        <Routes>
        <Route path={'/successPayment'} element={<SuccessPayment />} />
        <Route path={'/errorPayment'} element={<ErrorPayment />} />
        <Route path={'/pendientPayment'} element={<PendientPayment />} />
          <Route path={'/'} element={<Home />} />
          <Route path={'/login'} element={<SignIn />} />
          <Route path={'/login/SignUp'} element={<SignUp />} />
          <Route path={'/detalle/:id'} element={<NoticiaDetail />} />
          <Route path={'/:id/profile'} element={<PerfilUsuario />} />
          <Route path={"/QrCarnetDigital/:dni"} element={<QRCarnet/>}/>
          <Route path={'/success/'} element={<SuccessPayment />} />
          <Route path={"/noticias"} element={<Notices/>}/>

          
          <Route element={<ProtectedRoutes />}>
            <Route path={'/crearNoticia'} element={<CrearNoticia />} />
            <Route path={'/editarNoticia/:id'} element={<UpdateNoticia />} />
            <Route path={'/editarSponsor'} element={<UpDateSponsor />} />
            <Route path={'/crearSponsor'} element={<CrearSponsor />} />
            <Route path={'/editarNoticia/:id'} element={<UpdateNoticia />} />
            <Route path={'/crearSponsor'} element={<CrearSponsor />} />
            <Route path={'/editarSponsor'} element={<UpDateSponsor />} />
            <Route path={'/editarPartidos'} element={<EditarPartidos />} />
          </Route>
          <Route path={'/club/historia'} element={<ClubHistoria />} />
          <Route path={'/club/comision'} element={<ClubComision />} />
          <Route path={'/club/contacto'} element={<ClubContacto />} />
          <Route path={'/futbol/femenino'} element={<FutbolFemenino />} />
          <Route path={'/futbol/masculino'} element={<FutbolMasculino />} />
          <Route path={'/futbol/logros'} element={<FutbolLogros />} />
          <Route path={'/sumate/naranja'} element={<MasNaranja />} />
          <Route path={'/developers'} element={<Developers />} />


          <Route
            path={'/auth/dashboard'}
            element={
              <ProtectedSuperAdminRoutes/>}>
                <AdminDashboard
                  themeMode={themeMode}
                  toggleThemeMode={toggleThemeMode}
               />
               
               </Route>
               <Route path={"/successPayment"} element={<SuccessPayment />} />
               <Route path={"/errorPayment"} element={<ErrorPayment />} />
               <Route path={"/pendientPayment"} element={<PendientPayment />} />
               <Route path={"/"} element={<Home />} />
               <Route path={"/login"} element={<SignIn />} />
               <Route path={"/login/SignUp"} element={<SignUp />} />
               <Route path={"/detalle/:id"} element={<NoticiaDetail />} />
               <Route path={"/:id/profile"} element={<PerfilUsuario />} />
               <Route path={"/QrCarnetDigital/:dni"} element={<QRCarnet />} />
               <Route path={"/success/"} element={<SuccessPayment />} />
               <Route path={"/noticias"} element={<Notices />} />

               <Route element={<ProtectedRoutes />}>
                  <Route path={"/crearNoticia"} element={<CrearNoticia />} />
                  <Route
                     path={"/editarNoticia/:id"}
                     element={<UpdateNoticia />}
                  />
                  <Route path={"/editarSponsor"} element={<UpDateSponsor />} />
                  <Route path={"/crearSponsor"} element={<CrearSponsor />} />
                  <Route
                     path={"/editarNoticia/:id"}
                     element={<UpdateNoticia />}
                  />
                  <Route path={"/crearSponsor"} element={<CrearSponsor />} />
                  <Route path={"/editarSponsor"} element={<UpDateSponsor />} />
                  <Route
                     path={"/editarPartidos"}
                     element={<EditarPartidos />}
                  />
               </Route>
               <Route path={"/club/historia"} element={<ClubHistoria />} />
               <Route path={"/club/comision"} element={<ClubComision />} />
               <Route path={"/club/contacto"} element={<ClubContacto />} />
               <Route path={"/futbol/femenino"} element={<FutbolFemenino />} />
               <Route
                  path={"/futbol/masculino"}
                  element={<FutbolMasculino />}
               />
               <Route path={"/futbol/logros"} element={<FutbolLogros />} />
               <Route path={"/sumate/naranja"} element={<MasNaranja />} />

               <Route
                  path={"/auth/dashboard"}
                  element={
                     <ProtectedSuperAdminRoutes>
                        <AdminDashboard
                           themeMode={themeMode}
                           toggleThemeMode={toggleThemeMode}
                        />
                     </ProtectedSuperAdminRoutes>
                  }
               />
               <Route
                  path={"/login/recuperacion"}
                  element={<RecuperarContraseña />}
               />
               <Route path="*" element={<NotFoundComponent />} />
            </Routes>
            <ButtonUpper />
            {location.pathname === `/${localStorage.userId}/profile` ||
            location.pathname === "/auth/dashboard" ? null : (
               <Footer />
            )}
         </ThemeProvider>
      </div>
   );
}

export default App;
