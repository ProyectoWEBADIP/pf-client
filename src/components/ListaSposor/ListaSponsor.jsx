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
  sponsor.sort((a, b) => a.location - b.location)

  useEffect(() => {
    dispatch(getAllSponsor());
  }, [dispatch]);

  return (
    <div className="principal_sponsor_cont">
      <div className="secundario_sponsor_">
        <div className="terciario_sponsor_cont">
          <div className="cont_titulos_sponsor">
            <div className="tabla_sponsor_nro">
              <h4 className="h4-updateSponsor">ID</h4>
            </div>
            <div className="tabla_sponsor_img">
              <h4 className="h4-updateSponsor">Logo</h4>
            </div>
            <div className="tabla_sponsor_title">
              <h4 className="h4-updateSponsor">Nombre</h4>
            </div>
            <div className="tabla_sponsor_nro">
              <h4 className="h4-updateSponsor" title="Ubicacion">Ubi</h4>
            </div>
          </div>

          {sponsor?.map((el, index) => {
            return (
              <div className="cont_map_sponsor" key={el.id}>
                <div className="tabla_sponsor_nro">
                  <h4 className="h4-updateSponsor">{el.id}</h4>
                </div>

                <div className="tabla_sponsor_img">
                  <img className="dash_img_sponsor" src={el.image} alt="img" />
                </div>
                <div className="tabla_sponsor_title">
                  <h4 className="h4-updateSponsor">{el.title}</h4>
                </div>
                <div className="tabla_sponsor_nro">
                  <h4 className="h4-updateSponsor">{el.location}</h4>
                </div>
              </div>
            );
          })}
        </div>      
          
          
      </div>
    </div>
  );
};

export default ListaSponsor;
