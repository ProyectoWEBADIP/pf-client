import CardsNoticias from "../CardsNoticias/CardsNoticias"
import CardPartidoContainer from "../CardPartidoContainer/CardPartidoContainer"


export default function Home (){


    return (
        <div>
            <CardPartidoContainer/>

            <h1>Noticias</h1>
            <br/>
            <div className="Filtros">
                <label>Filtros :</label>
                <select value="filtros">
                    <option value="cat" disabled selected hidden>Selecciona una cateogoría</option>
                </select>

                <label>Ordenar por:</label>
                <select value="ordenamiento">
                    <option value="order" disabled selected hidden>Seleccionar</option>
                    <option value="order">Más reciente</option>
                    
                </select>
            </div>
            <CardsNoticias/>
        </div>
    )
}