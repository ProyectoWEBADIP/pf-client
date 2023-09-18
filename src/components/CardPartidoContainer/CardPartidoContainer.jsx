import { useSelector } from 'react-redux';
import CardPartido from '../CardPartido/CardPartido';
import style from './CardPartidoContainer.module.css';
import logo from './../../assets/Escudo ADIP sin fondo.png';
export default function CardPartidoContainer() {
  const info = useSelector((state) => state.partidos);

  const femeninos = info.filter(i=>i.category_name === 'Femenino').sort((a, b) => {
    if (a.title > b.title) return 1;
    if (a.title < b.title) return -1;
    return 0;})
  const masculinos = info.filter(i=>i.category_name === 'Masculino').sort((a, b) => {
    if (a.title > b.title) return 1;
    if (a.title < b.title) return -1;
    return 0;})

  return (
    <div className={style.cont}>
      {masculinos?.map((info, i) => {
        return (
          <div className={style.contCard} key={i}>
            <CardPartido
              key={i}
              title={info.title}
              category_name={info.category_name}
              competence={info.competence}
              Local_shield={info.Local_shield}
              visitor_shield={info.visitor_shield}
              date={info.date}
              location={info.location}
              description={info.description}
              home_goals={info.home_goals}
              visitor_goals={info.visitor_goals}
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
              title={info.title}
              category_name={info.category_name}
              competence={info.competence}
              Local_shield={info.Local_shield}
              visitor_shield={info.visitor_shield}
              date={info.date}
              location={info.location}
              description={info.description}
              home_goals={info.home_goals}
              visitor_goals={info.visitor_goals}
            />
          </div>
        );
      })}
    </div>
  );
}
