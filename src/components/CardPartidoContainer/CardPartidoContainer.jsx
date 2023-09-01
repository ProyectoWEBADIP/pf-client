import CardPartido from "../CardPartido/CardPartido"
import style from "./CardPartidoContainer.module.css"

export default function CardPartidoContainer(){
    let info = [{
        titulo: "ANTERIOR",
        categoria: "PRIMERA MASCULINA",
        competencia: "TORNEO APERTURA 2023",
        escudoLocal: "C:\Users\Usuario\Desktop\PF\pf-client\src\componentes",
        escudoVisitante: "../CardPartido/Escudo ADIP sin fondo.png",
        resultado: "1-0",
        fecha: "Domingo 27/8 15:30", 
        ubicacion: "ADIP (10 Y 485)",
        descripcion: "En Villa Castells, la primera masculina se quedo con los 3 puntos de un partido trabado con un gol de penal de plastino"
    },
    {
        titulo: "PROXIMO",
        categoria: "PRIMERA MASCULINA",
        competencia: "TORNEO APERTURA 2023",
        escudoLocal: "C:\Users\Usuario\Desktop\Escudo ADIP sin fondo.png",
        escudoVisitante: "C:\Users\Usuario\Desktop\Escudo ADIP sin fondo.png",
        resultado: "VS",
        fecha: "Domingo 3/9 15:30", 
        ubicacion: "ADIP (10 Y 485)",
        descripcion: "En Villa Castells, la primera masculina se quedo con los 3 puntos de un partido trabado con un gol de penal de plastino"
    },
    {
        titulo: "ANTERIOR",
        categoria: "PRIMERA FEMENINA",
        competencia: "TORNEO APERTURA 2023",
        escudoLocal: "C:\Users\Usuario\Desktop\Escudo ADIP sin fondo.png",
        escudoVisitante: "C:\Users\Usuario\Desktop\Escudo ADIP sin fondo.png",
        resultado: "1-0",
        fecha: "Domingo 27/8 15:30", 
        ubicacion: "ADIP (10 Y 485)",
        descripcion: "En Villa Castells, la primera masculina se quedo con los 3 puntos de un partido trabado con un gol de penal de plastino"
    },
    {
        titulo: "PROXIMO",
        categoria: "PRIMERA FEMENINA",
        competencia: "TORNEO APERTURA 2023",
        escudoLocal: "C:\Users\Usuario\Desktop\Escudo ADIP sin fondo.png",
        escudoVisitante: "C:\Users\Usuario\Desktop\Escudo ADIP sin fondo.png",
        resultado: "VS",
        fecha: "Domingo 3/9 15:30", 
        ubicacion: "ADIP (10 Y 485)",
        descripcion: "En Villa Castells, la primera masculina se quedo con los 3 puntos de un partido trabado con un gol de penal de plastino"
    },
]
 return(
    <div className={style.cont}>
    {info?.map((info, i)=>{
            return (
                <div className={style.contCard} key={i}>
                    <CardPartido
                        key={i}
                        titulo={info.titulo}
                        categoria={info.categoria}
                        competencia={info.competencia}
                        escudoLocal={info.escudoLocal}
                        escudoVisitante={info.escudoVisitante}
                        resultado={info.resultado}
                        fecha={info.fecha}
                        ubicacion={info.ubicacion}
                        />
                </div>
            )
        })
        }
        </div>
        )
}