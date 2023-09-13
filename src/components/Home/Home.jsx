/* eslint-disable no-unused-vars */
import { CircularProgress, LinearProgress, Skeleton, Typography } from '@mui/material';
import CardsNoticias from '../CardsNoticias/CardsNoticias';
import CardPartidoContainer from '../CardPartidoContainer/CardPartidoContainer';
import Filtros from '../Filtros/Filtros';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNoticias } from '../../redux/noticiasActions/noticiasActions';
import NotFoundComponent from '../notFound/notFound';
import { getAllCategories } from '../../redux/categoriasActions/categoriasActions';
import './home.css';
import NestedList from '../Filtros/Filtros';
import { getAllSponsor } from '../../redux/sponsorActions/sponsorActions';



import Paginado from '../Paginado/Paginado';
import { getUserById } from '../../redux/login-registerActions/loginActions';

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
      {noticias.length?(
        <>
        <div className="SidebarHome">
          <h2>Filtrar noticias</h2>
          <Filtros />
        </div>
        <div className="Noticias">
       
        <h1 id='NoticiasText'>
            Noticias
         </h1>
          
          {!noticias.length ? 
  <div>
  <CircularProgress disableShrink />;
  </div>: <CardsNoticias />}
         
      </div>
        <div className="Partidos">
          <CardPartidoContainer />
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
