import "./anotherBoton.css";
const SocioMenu = () => {
  return (
    <div>
      <div className="paste-button">
        <button className="button">Socios/as &nbsp; ⮟</button>
        <div className="dropdown-content">
          <a id="top" href="#">
            Novedades
          </a>
          <a id="middle" href="#">
            Asosiate
          </a>
          <a id="bottom" href="#">
            Preguntas Frecuentes
          </a>
        </div>
      </div>
    </div>
  );
};
export default SocioMenu;
