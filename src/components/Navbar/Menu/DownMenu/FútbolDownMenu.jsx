import { Link } from "react-router-dom";
import "./anotherBoton.css";
const FutbolMenu = () => {
  return (
    <div>
      <div className="paste-button">
        <button className="button">Fútbol &nbsp;⮟</button>
        <div className="dropdown-content">
          <Link id="top" to="#">
            Fútbol Femenino
          </Link>
          <Link id="middle" to="#">
            Fútbol Masculino
          </Link>
          <Link id="bottom" to="#">
            Estadisticas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FutbolMenu;
