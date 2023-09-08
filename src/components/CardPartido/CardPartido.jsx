/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import style from "./cardPartido.module.css"
import logo from "../../assets/Escudo ADIP sin fondo.png"
import { Box, Button, Paper, Toolbar, Typography } from "@mui/material"
export default function CardPartido({titulo, categoria, competencia, escudoLocal, escudoVisitante, resultado, fecha, ubicacion}){
return (
    <Paper elevation={3}>
     <Box padding={1}>
        <Typography variant="h5" fontWeight="bold">{titulo}</Typography>
        <Typography variant="body1" fontWeight="light">{categoria}</Typography>
        <Typography variant="body2" fontWeight="bold">{competencia}</Typography>
        
        <Toolbar>
            <div className={style.escudo}>
                <img src={logo} alt="logo"/>
            </div>
            <h1 className={style.result}>{resultado}</h1>
            <div className={style.escudo}>
                <img src={logo} alt="logo"/>
            </div>
        </Toolbar>
        
        <Typography variant="body2" fontWeight="bold">{fecha}</Typography>
        <Typography variant="body2" fontWeight="light">{ubicacion}</Typography>

        <Button href="/partido">Ver detalle</Button>
    </Box>
    </Paper>

)
}

{/* <Paper elevation={3}>
<Box sx={}>
<div className={style.contenedorCard}>
            <h1 className={style.title}>{titulo}</h1>
            <h2>{categoria}</h2>
            <h2 className={style.competencia}>{competencia}</h2>
            
            <Toolbar>
                <div className={style.escudo}>
                    <img src={logo} alt="logo"/>
                </div>
                <h1 className={style.result}>{resultado}</h1>
                <div className={style.escudo}>
                    <img src={logo} alt="logo"/>
                </div>
            </Toolbar>
            
            
            <div>
                <h3 className={style.name}>{fecha}</h3>
                <p className={style.info}>{ubicacion}</p>
            </div>

            <button className={style.button}>
                Ver detalle
            </button>
</div>
</Box>
</Paper> */}
