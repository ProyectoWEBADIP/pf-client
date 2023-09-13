/* eslint-disable no-unused-vars */
import { Typography } from "@mui/material";
import CardsNoticias from "../CardsNoticias/CardsNoticias";
import CardPartidoContainer from "../CardPartidoContainer/CardPartidoContainer";
import Filtros from "../Filtros/Filtros";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNoticias } from "../../redux/noticiasActions/noticiasActions";
import NotFoundComponent from "../notFound/notFound";
import { getAllCategories } from "../../redux/categoriasActions/categoriasActions";
import "./home.css";
export default function Home() {
  const dispatch = useDispatch();
  const noticias = useSelector((state) => state.noticias);
  const perfilUsuario = useSelector(state=>state.perfilUsuario)
  useEffect(() => {
    dispatch(getAllCategories());
    if(!perfilUsuario.length && localStorage.userId){
    dispatch(getUserById(localStorage.userId))
    }
    dispatch(getAllNoticias());
    dispatch(getAllSponsor());    
  }, [dispatch]);

  return (
    <div className="homeContainer">
      <div className="Sidebar">
        <h2>Filtrar noticias</h2>
        <Filtros />
      </div>
      <div className="Noticias">
        <Typography variant="h2" fontWeight="bold" mt={4}>
          Noticias
        </Typography>
        <CardsNoticias />
        {/* {notFoundNoticias ? <CardsNoticias /> : <NotFoundComponent />} */}
      </div>
        <div className="Partidos">
          <CardPartidoContainer />
          <div className='sponsor'>
          <Sponsor2/>
          </div>
        </div></>
      ):< div className='loadingCont'>
      <div className="🤚">
	<div className="👉"></div>
	<div className="👉"></div>
	<div className="👉"></div>
	<div className="👉"></div>
	<div className="🌴"></div>		
	<div className="👍"></div>
</div>
      </div>}
      
    </div>
  );
}
