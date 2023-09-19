import "./anotherBoton.css";
const SocioMenu = () => {
  return (
    <div>
      <div className="paste-button">
        <button className="button">Socios/as &nbsp; ⮟</button>
        <div className="dropdown-content">
          <a id="top" to="#">
            Novedades
          </a>
          <a id="middle" to="#">
            Asosiate
          </a>
          <a id="bottom" to="#">
            Preguntas Frecuentes
          </a>
        </div>
      </div>
    </div>
  );
};
export default SocioMenu;
