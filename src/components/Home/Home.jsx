import CardsNoticias from "../CardsNoticias/CardsNoticias"
import CardPartidoContainer from "../CardPartidoContainer/CardPartidoContainer"
import { Typography } from "@mui/material"
import Filtros from "../Filtros/Filtros"


export default function Home (){


    return (
        <div>
            <CardPartidoContainer/>
            <Typography variant="h2" fontWeight="bold">Noticias</Typography>
            <br/>

           
            <Filtros/>

            
            <CardsNoticias/>
        </div>
    )
}