import { Box } from "@mui/material";
import naranjaTeam from "./img/naranjaTeam.jpg";
import logo from './img/Escudo ADIP sin fondo.png'
import banderin from "./img/banderin2.jpg"
import masculino from "./img/masculino2.jpg"
import logros from "./img/copa2.jpg"
import femenino from "./img/femenino.jpg"
import "./banner.css";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

export const Banner = () => {
  const location = useLocation();
  
  return (
    <div className="bannerConteiner">
      <Box
        sx={{
          position:'relative',
          backgroundImage:  location.pathname === "/club/historia" || location.pathname === "/club/comision" || location.pathname === "/club/contacto" ?  `url(${banderin})` 
          : location.pathname === "/futbol/logros" ?  `url(${logros})` 
          : location.pathname === "/futbol/masculino" ?  `url(${masculino})`
          : location.pathname === "/futbol/femenino" ?  `url(${femenino})`
          : `url(${naranjaTeam})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100%",
          height: 320,
          justifyContent: "center",
        }}
      >
        <div className="logoBannerConteiner">
        
          <img
            src={logo}
            alt=""
          />

          <div className="socialConteiner">
            <Link
              to="https://www.facebook.com/adipoficial?mibextid=b06tZ0"
              target="_blank"
            >
              <Facebook fontSize="large" />
            </Link>
            <Link
              to="https://twitter.com/adipoficial?s=11&t=NCevVmV4_7DounIlalLlCA"
              target="_blank"
            >
              <Twitter fontSize="large" />
            </Link>
            <Link
              to="https://www.instagram.com/adipoficial/?igshid=MzRlODBiNWFlZA%3D%3D"
              target="_blank"
            >
              <Instagram fontSize="large" />
            </Link>
          </div>
        </div>
      </Box>
    </div>
  );
};

