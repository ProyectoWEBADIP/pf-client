import "./anotherBoton.css";
 const ClubMenu = () => {
  return (
    <div>
      <div className="paste-button">
        <button className="button">Club &nbsp; ⮟</button>
        <div className="dropdown-content">
          <a id="top" to="#">
            Datos Interesantes
          </a>
          <a id="middle" to="/club/comision">
            Autoridades
          </a>
          <a id="bottom" to="/club/historia">
            Historia
          </a>
        </div>
      </div>
    </div>
  );
};
export default ClubMenu;