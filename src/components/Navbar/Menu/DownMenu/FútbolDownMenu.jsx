import "./anotherBoton.css";
const FutbolMenu = () => {
  return (
    <div>
      <div className="paste-button">
        <button className="button">Fútbol &nbsp;⮟</button>
        <div className="dropdown-content">
          <a id="top" href="#">
            Fútbol Femenino
          </a>
          <a id="middle" href="#">
            Fútbol Masculino
          </a>
          <a id="bottom" href="#">
            Estadisticas
          </a>
        </div>
      </div>
    </div>
  );
};

export default FutbolMenu;
