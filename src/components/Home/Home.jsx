import { Grid, Typography } from "@mui/material"
import CardsNoticias from '../CardsNoticias/CardsNoticias';
import CardPartidoContainer from '../CardPartidoContainer/CardPartidoContainer';
import Filtros from '../Filtros/Filtros';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllNoticias } from '../../redux/noticiasActions/noticiasActions';
import { getAllCategories } from "../../redux/categoriasActions/categoriasActions";


export default function Home (){
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNoticias());
    dispatch(getAllCategories())
  }, [dispatch]);
  

    return (
        <div>
            <CardPartidoContainer/>
            <Typography variant="h2" fontWeight="bold" mt={4}>Noticias</Typography>
            <br/>
           <Grid container>
                <Grid item xs={3}>
                    <Filtros/>
                </Grid>
                <Grid item xs={9} >
                    <CardsNoticias/>
                </Grid>
           </Grid>  
        </div>
    )
}
