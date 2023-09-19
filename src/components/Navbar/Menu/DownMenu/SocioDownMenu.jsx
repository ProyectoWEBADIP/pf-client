import { Link } from "react-router-dom";
import "./anotherBoton.css";
const SocioMenu = () => {
  return (
    <div>
      <div className="paste-button">
        <button className="button">Socios/as &nbsp; ⮟</button>
        <div className="dropdown-content">
          <Link id="top" to="/noticias">
            Novedades
          </Link>
          <Link id="middle" to="/login/SingUp">
            Asociate
          </Link>
          <Link id="bottom" to="/preguntasFrecuentes">
            Preguntas Frecuentes
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SocioMenu;
