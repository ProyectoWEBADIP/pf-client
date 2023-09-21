/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllSponsor } from "../../redux/sponsorActions/sponsorActions";
import "./listaSponsor.css";
import CrearSponsor from "../CrearSponsor/CrearSponsor";
import { updateSponsor } from "../../redux/sponsorActions/sponsorActions";

const ListaSponsor = () => {
  const sponsor = useSelector((state) => state.sponsor);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSponsor());
  }, [dispatch]);

  return (
    <div className="principal_sponsor_cont">
      <div className="secundario_sponsor_">
        <div className="terciario_sponsor_cont">
          <div className="cont_titulos_sponsor">
            <div className="tabla_sponsor_nro">
              <h4>ID</h4>
            </div>
            <div className="tabla_sponsor_">
              <h4>Logo</h4>
            </div>
            <div className="tabla_sponsor_title">
              <h4>Nombre</h4>
            </div>
            <div className="tabla_sponsor_nro">
              <h4 title="Ubicacion">Ubi</h4>
            </div>
          </div>

          {sponsor?.map((el, index) => {
            return (
              <div className="cont_map_sponsor" key={el.id}>
                <div className="tabla_sponsor_nro">
                  <h4>{el.id}</h4>
                </div>

                <div className="tabla_sponsor_">
                  <img className="dash_img_sponsor" src={el.image} alt="img" />
                </div>
                <div className="tabla_sponsor_title">
                  <h4>{el.title}</h4>
                </div>
                <div className="tabla_sponsor_nro">
                  <h4>{el.location}</h4>
                </div>
              </div>
            );
          })}
        </div>

          {/* <div className="contenido_botones_">
            <button className="buton_crear_sponsor">Crear Sponsor</button>
            <button className="buton_crear_sponsor">Editar Sponsor</button>
          </div>
          */}
          
          
      </div>
    </div>
  );
};

export default ListaSponsor;
