/* eslint-disable no-unused-vars */
import { Typography } from '@mui/material';
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
export default function Home() {
  const dispatch = useDispatch();
  const notFoundNoticias = useSelector((state) => state.notFoundNoticias);
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
        <Typography variant="h2" fontWeight="bold" mt={4}>
          Noticias
        </Typography>
        {notFoundNoticias ? <NotFoundComponent /> : <CardsNoticias />}
      </div>
      <div className="Partidos">
        <CardPartidoContainer />
      </div>
    </div>
  );
}
