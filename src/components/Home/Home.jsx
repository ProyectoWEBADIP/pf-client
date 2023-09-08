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
import Paginado from '../Paginado/Paginado';

export default function Home() {
  const dispatch = useDispatch();
  const noticias = useSelector((state) => state.noticias);
  
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllNoticias());
  }, [dispatch]);

  return (
    <div className="homeContainer">
      <div className="Sidebar">
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
      </div>
    </div>
  );
}
