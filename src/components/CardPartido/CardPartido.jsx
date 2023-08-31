import style from "./cardPartido.module.css"


export default function CardPartido({titulo, categoria, competencia, escudoLocal, escudoVisitante, resultado, fecha, ubicacion}){
return (
    <div className={style.contenedorCard}>
                <h1 className={style.title}>{titulo}</h1>
                <h2>{categoria}</h2>
                <h2 className={style.competencia}>{competencia}</h2>
                <div>
                    <div className={style.escudo}>
                        
                    </div>
                    <h1 className={style.result}>{resultado}</h1>
                    <div className={style.escudo}>
                    </div>
                </div>
                
                <div>
                    <h3 className={style.name}>{fecha}</h3>
                    <p className={style.info}>{ubicacion}</p>
                </div>

                <button className={style.button}>
                    Ver detalle
                </button>
    </div>

)
}