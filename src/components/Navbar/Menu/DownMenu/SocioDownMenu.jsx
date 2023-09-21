import { Link } from "react-router-dom";
import "./anotherBoton.css";
const SocioMenu = () => {
  return (
    <div>
      <div className="paste-button">
        <button className="button">Sumate! &nbsp; ⮟</button>
        <div className="dropdown-content">
        <Link id="bottom" to="/sumate/naranja">
            Hacete +Naranja!
          </Link>       
          <Link id="bottom2" to="/preguntasFrecuentes">
            Preguntas Frecuentes
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SocioMenu;
