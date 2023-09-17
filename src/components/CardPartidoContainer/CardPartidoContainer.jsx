import { useSelector } from "react-redux";
import CardPartido from "../CardPartido/CardPartido"
import style from "./CardPartidoContainer.module.css"
import logo from './../../assets/Escudo ADIP sin fondo.png'
export default function CardPartidoContainer(){
  const info = useSelector((state) => state.partidos);
  const masculinos = info.slice(0,1);
  const femeninos = info.slice(2,3)
 return(

    <div className={style.cont}>
      {masculinos?.map((info, i) => {
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
        );
      })}
    <div className={style.separador}>
        <img src={logo} alt="" />
    </div>
      {femeninos?.map((info, i) => {
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
        );
      })}
    </div>

        )
}