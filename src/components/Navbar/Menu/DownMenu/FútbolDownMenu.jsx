import "./anotherBoton.css";
const FutbolMenu = () => {
  return (
    <div>
      <div className="paste-button">
        <button className="button">Fútbol &nbsp;⮟</button>
        <div className="dropdown-content">
          <a id="top" to="#">
            Fútbol Femenino
          </a>
          <a id="middle" to="#">
            Fútbol Masculino
          </a>
          <a id="bottom" to="#">
            Estadisticas
          </a>
        </div>
      </div>
    </div>
  );
};

export default FutbolMenu;
