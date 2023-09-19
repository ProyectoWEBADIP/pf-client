import "./anotherBoton.css";
const PatrocinioMenu = () => {
  return (
    <div>
      <div className="paste-button">
        <button className="button">Patrocinadores &nbsp; ⮟</button>
        <div className="dropdown-content">
          <a id="top" to="#">
            Sponsor...
          </a>
          <a id="middle" to="#">
            Sponsor...
          </a>
          <a id="bottom" to="#">
            Sponsor...
          </a>
        </div>
      </div>
    </div>
  );
};
export default PatrocinioMenu;
