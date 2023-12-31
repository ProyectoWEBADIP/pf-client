import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import "./Footer.css";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div className="container-footer">
      <footer>
        
        <div className="redes-footer">
          <span className="icon-facebook">
            <Link
              to="https://www.facebook.com/adipoficial?mibextid=b06tZ0"
              target="_blank"
            >
              <Facebook sx={{ fontSize: 35 }} />
            </Link>
          </span>
          <span className="icon-instagram">
            <Link
              to="https://www.instagram.com/adipoficial/?igshid=MzRlODBiNWFlZA%3D%3D"
              target="_blank"
            >
              <Instagram sx={{ fontSize: 35 }} />
            </Link>
          </span>
          <span className="icon-twitter">
            <Link
              to="https://twitter.com/adipoficial?s=11&t=NCevVmV4_7DounIlalLlCA"
              target="_blank"
            >
              <Twitter sx={{ fontSize: 35 }} />
            </Link>
          </span>
        </div>
        <hr />
        <h4>@ 2023 Club ADIP - Todos los derechos reservados</h4>
      </footer>
    </div>
  );
};
