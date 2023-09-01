import CardsNoticias from "../CardsNoticias/CardsNoticias"
import CardPartidoContainer from "../CardPartidoContainer/CardPartidoContainer"
import { Grid, Typography } from "@mui/material"
import Filtros from "../Filtros/Filtros"


export default function Home (){


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