import "./anotherBoton.css";
 const ClubMenu = () => {
  return (
    <div>
      <div className="paste-button">
        <button className="button">Club &nbsp; ⮟</button>
        <div className="dropdown-content">
          <a id="top" href="#">
            Datos Interesantes
          </a>
          <a id="middle" href="/club/comision">
            Autoridades
          </a>
          <a id="bottom" href="/club/historia">
            Historia
          </a>
        </div>
      </div>
    </div>
  );
};
export default ClubMenu;