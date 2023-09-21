import { Box } from "@mui/material";
import naranjaTeam from "./img/naranjaTeam.jpg";
import logo from './img/Escudo ADIP sin fondo.png'
import banderin from "./img/banderin2.jpg"
import masculino from "./img/masculino2.jpg"
import logros from "./img/copa3.jpg"
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
          backgroundImage:  location.pathname === "/club/historia" || location.pathname === "/club/comision" || location.pathname === "/club/contacto" 
          || location.pathname === "/sumate/naranja" ?  `url(https://res.cloudinary.com/drpdobxfu/image/upload/v1695156861/info%20club/banderin2_smq847.jpg)` 
          : location.pathname === "/futbol/logros" ?  `url(https://res.cloudinary.com/drpdobxfu/image/upload/v1695255513/info%20club/copa3_qs5p9l.jpg)` 
          : location.pathname === "/futbol/masculino" ?  `url(https://res.cloudinary.com/drpdobxfu/image/upload/v1695130617/info%20club/masculino2--_tehiqe.jpg)`
          : location.pathname === "/futbol/femenino" ?  `url(https://res.cloudinary.com/drpdobxfu/image/upload/v1695255419/info%20club/femenino_oq6wts.jpg)`
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

