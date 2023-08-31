import { Link } from "react-router-dom";
import style from "./Perfil.module.css"
export default function perfil(){
    return (
        <div>
            

            <div className={style.container}>
            <div className={style.image}>
            <img src="https://pbs.twimg.com/profile_images/1454099552106074116/eEn8pMnN_400x400.jpg"/>

            </div>

            <div className={style.title}>
            <h1 className={style.name}>OLI DALLACHIESA</h1>
            <h1>Carnet N° 40458644</h1>
            </div>

            <div className={style.info}>
                <h2 className={style.category}>Categoría - Mayores Femenino</h2>
                
                <div className={style.payment}>
                    <h3 className={style.lastPayment}>Ultimo pago: </h3>
                    <h2 className={style.status}>SEPTIEMBRE ✔</h2>
                    <h3 className={style.debt}>Deuda acumulada: $0</h3>
                </div>
            </div>

            </div>
        </div>
    )
}