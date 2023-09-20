import { Link } from "react-router-dom";
import "./anotherBoton.css";
const FutbolMenu = () => {
  return (
    <div>
      <div className="paste-button">
        <button className="button">Fútbol &nbsp;⮟</button>
        <div className="dropdown-content">
          <Link id="top" to="/futbol/femenino">
            Fútbol Femenino
          </Link>
          <Link id="middle" to="/futbol/masculino">
            Fútbol Masculino
          </Link>
          <Link id="bottom" to="/futbol/logros">
            Logros
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FutbolMenu;
