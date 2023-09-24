/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./MainDash.css";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/usersActions/usersActions";
import NoticiasDash from "../NoticiasDash/NoticiasDash";
import CrearSponsor from "../../../components/CrearSponsor/CrearSponsor";
import ListaSponsor from "../../../components/ListaSposor/ListaSponsor";
import UpDateSponsor from "../../../components/upDateSponsor/upDateSponsor";
import { Link } from "react-router-dom";

import NotificacionesMail from "../NotificacionesMail/NotificacionesMail";
import EditarPartidos from "../../../components/EditarPartidos/EditarPartidos";

const MainDash = () => {
   const actualDash = useSelector((state) => state.actualDash);
   const dispatch = useDispatch();
   const [vistaSponsor, setVistaSponsor] = useState(0);
   useEffect(() => {
      dispatch(getAllUsers());
   });

   return (
      <div>
         {actualDash === 0 ? (
            <div className="MainDash">
               <div>
                  <div className="cont_notice_link">
                     <h2>
                        <span>P</span>anel de noticias
                     </h2>
                     <Link to="/crearNoticia">
                        <button className="buton_notice_crear">
                           Crear Noticia
                        </button>
                     </Link>
                  </div>

                  <NoticiasDash />
               </div>
            </div>
         ) : actualDash === 1 ? (
            <div className="MainDash">
               {" "}
               <div>
                  <h2>Usuarios registrados</h2>
                  <Table />
               </div>
            </div>
         ) : actualDash === 2 ? (
            <div className="MainDash">
               <h1>Notificaciones</h1>
               <NotificacionesMail />
            </div>
         ) : actualDash === 3 ? (
            <div className="MainDash">
               {" "}
               <div>
                  <h2>Sponsors</h2>
                  <div className="cont_sponsorMain">
                     {vistaSponsor === 1 ? (
                        <CrearSponsor />
                     ) : vistaSponsor === 2 ? (
                        <UpDateSponsor />
                     ) : (
                        <ListaSponsor />
                     )}

                     <div className="contenido_botones_">
                        {vistaSponsor === 0 ? (
                           <div>
                              <button
                                 onClick={() => setVistaSponsor(1)}
                                 className="buton_crear_sponsor"
                              >
                                 Crear Sponsor
                              </button>
                              <button
                                 onClick={() => setVistaSponsor(2)}
                                 className="buton_crear_sponsor"
                              >
                                 Editar Sponsor
                              </button>
                           </div>
                        ) : (
                           <button
                              onClick={() => setVistaSponsor(0)}
                              className="buton_crear_sponsor"
                           >
                              Lista Sponsor
                           </button>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         ) : actualDash === 4 ? (
            <div className="MainDash">
               <h1>Partidos</h1>
               <EditarPartidos />
            </div>
         ) : null}
      </div>
   );
};

export default MainDash;
