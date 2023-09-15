import "./anotherBoton.css";
const PatrocinioMenu = () => {
  return (
    <div>
      <div className="paste-button">
        <button className="button">Patrocinadores &nbsp; ⮟</button>
        <div className="dropdown-content">
          <a id="top" href="#">
            Sponsor...
          </a>
          <a id="middle" href="#">
            Sponsor...
          </a>
          <a id="bottom" href="#">
            Sponsor...
          </a>
        </div>
      </div>
    </div>
  );
};
export default PatrocinioMenu;
