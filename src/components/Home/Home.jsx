import CardsNoticias from '../CardsNoticias/CardsNoticias';
import CardPartidoContainer from '../CardPartidoContainer/CardPartidoContainer';
import { Typography } from '@mui/material';
import Filtros from '../Filtros/Filtros';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllNoticias } from '../../redux/noticiasActions/noticiasActions';

export default function Home() {
  //!HOOKS
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNoticias());
  }, [dispatch]);
  
  return (
    <div>
      <CardPartidoContainer />
      <Typography variant="h2" fontWeight="bold">
        Noticias
      </Typography>
      <br />
      <Filtros />
      <CardsNoticias />
    </div>
  );
}
