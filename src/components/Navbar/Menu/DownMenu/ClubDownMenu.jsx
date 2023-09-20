import { Link } from "react-router-dom";
import "./anotherBoton.css";
 const ClubMenu = () => {
  return (
    <div>
      <div className="paste-button">
        <button className="button">Club &nbsp; ⮟</button>
        <div className="dropdown-content">
          <Link  to='/club/contacto'>
           <span id="top">Contacto</span>
          </Link>
          <Link to="/club/historia">
            <span  id="bottom">Historia</span>
          </Link>
          <Link  to="/club/comision">
            <span id="middle">Autoridades</span>
          </Link>
          
        </div>
      </div>
    </div>
  );
};
export default ClubMenu;