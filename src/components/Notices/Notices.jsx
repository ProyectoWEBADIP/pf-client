import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./Notices.css";
import { getAllNoticias } from "../../redux/noticiasActions/noticiasActions";
import { Link } from "react-router-dom";
import { getNoticiasByCategory } from "../../redux/noticiasActions/noticiasActions";
import { getAllCategories } from "../../redux/categoriasActions/categoriasActions";
import { paginado } from "../../redux/noticiasActions/noticiasActions";
import SearchBar from "../Searchbar/SearchBar";

export default function Notices() {
   const dispatch = useDispatch();
   const categorys = useSelector((state) => state.categorias);
   const allNoticias = useSelector((state) => state.noticias);

   const [page, setPage] = useState(1);
   const pageForNotices = 9;

   const indexOfLastNotice = page * pageForNotices;
   const indexOfFirstNotice = indexOfLastNotice - pageForNotices;

   const currentNotices = allNoticias.slice(
      indexOfFirstNotice,
      indexOfLastNotice
   );

   const totalPage = Math.ceil(allNoticias.length / pageForNotices);

   const handlePageChange = (newPage) => {
      setPage(newPage);
   };

   useEffect(() => {
      dispatch(getAllNoticias());
      dispatch(getAllCategories());
      dispatch(paginado());
   }, []);

   const handleSelect = (event) => {
      if (event.target.value !== "default") {
         dispatch(getNoticiasByCategory(event.target.value));
      } else {
         dispatch(getAllNoticias());
      }
   };

   const pageNumbers = [];
   for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i);
   }

   return (
      <div>
         <h1>Todas las noticias</h1>
         <SearchBar />
         <div>
            <h2>Buscar por categoria</h2>
            <select onChange={handleSelect}>
               <option value={"default"}>Selecciones una categoria</option>
               {categorys?.map((el) => {
                  return (
                     <option value={el.id} key={el.id}>
                        {el.name}
                     </option>
                  );
               })}
            </select>
         </div>
         {allNoticias.length === 0 ? (
            <div>
               <h2>No hay Noticias</h2>
            </div>
         ) : (
            <>
               <div className="card-container-noticiasInpisables">
                  {currentNotices?.map((e) => {
                     return (
                        <div
                           className="card-cartas-noticias"
                           title={e.resume}
                           key={e.id}
                        >
                           <div className="ImagenTituloCard">
                              <img src={e.image} alt={e.title} />
                              <h2>{e.title}</h2>
                           </div>
                           <div className="boton-card-noticia">
                              <Link to={`/detalle/${e.id}`}>
                                 <button className="boton-card-noticia">
                                    Ver más
                                 </button>
                              </Link>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </>
         )}
         <div className="paginado">
            <button
               onClick={() => handlePageChange(page - 1)}
               disabled={page === 1}
            >
               Anterior
            </button>
            {pageNumbers.map((number) => (
               <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={page === number ? "active" : ""}
               >
                  {number}
               </button>
            ))}
            <button
               onClick={() => handlePageChange(page + 1)}
               disabled={page === totalPage}
            >
               Siguiente
            </button>
         </div>
      </div>
   );
}
