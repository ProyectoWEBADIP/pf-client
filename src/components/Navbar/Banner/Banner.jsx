import { Box } from "@mui/material";
import naranjaTeam from "./img/naranjaTeam.jpg";
import "./banner.css";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Link } from "react-router-dom";
export const Banner = () => {
  return (
    <div className="bannerConteiner">
      <Box
        sx={{
          backgroundImage: `url(${naranjaTeam})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100%",
          height: 420,
          justifyContent: "center",
        }}
      >
        <div className="logoBannerConteiner">
          <img
            src="src/components/Navbar/Banner/img/Escudo ADIP sin fondo.png"
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

