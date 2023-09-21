import { Link } from "react-router-dom";
import "./anotherBoton.css";
const PatrocinioMenu = () => {
  return (
    <div>
      <div className="paste-button">
        
        <button className="button"> 
        <Link to="/noticias">Noticias</Link>
        </button>
       
        {/* <div className="dropdown-content">
          <Link id="top" to="/sponsors">
            Sponsor...
          </Link>
          <Link id="middle" to="#">
            Sponsor...
          </Link>
          <Link id="bottom" to="/">
            Sponsor...
          </Link>
        </div> */}
      </div>
    </div>
  );
};
export default PatrocinioMenu;
