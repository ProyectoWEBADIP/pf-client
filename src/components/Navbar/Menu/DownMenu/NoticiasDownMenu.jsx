import { Link } from "react-router-dom";
import "./anotherBoton.css";
const NoticiasMenu = () => {
  return (
    <div>
      <div className="paste-button">
        <button className="button">Noticias &nbsp; ⮟</button>
        <div className="dropdown-content">
          <Link id="top" to="/noticias">
            Todas las noticias
          </Link>
         
        </div>
      </div>
    </div>
  );
};
export default NoticiasMenu;