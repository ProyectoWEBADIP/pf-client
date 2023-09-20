import { Link } from "react-router-dom";
import "./anotherBoton.css";
 const ClubMenu = () => {
  return (
    <div>
      <div className="paste-button">
        <button className="button">Club &nbsp; ⮟</button>
        <div className="dropdown-content">
          <Link  to='#'>
           <span id="top"> Datos Interesantes</span>
          </Link>
          <Link  to="/club/comision">
            <span id="middle">Autoridades</span>
          </Link>
          <Link to="/club/historia">
            <span  id="bottom">Historia</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ClubMenu;