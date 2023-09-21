import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './Notices.css';
import {
  getAllNoticias,
  paginado,
} from '../../redux/noticiasActions/noticiasActions';
import { Link } from 'react-router-dom';
import { getNoticiasByCategory } from '../../redux/noticiasActions/noticiasActions';
import { getAllCategories } from '../../redux/categoriasActions/categoriasActions';
import SearchBar from '../Searchbar/SearchBar';

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

  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    dispatch(getAllNoticias());
    dispatch(getAllCategories());
  }, []);
  let noticesByCategory = useSelector((state) => state.noticeById);

  const handleSelect = async (event) => {
    if (event.target.value !== 'default') {
      setIsLoading(true)
       await dispatch(getNoticiasByCategory(event.target.value));
      setIsLoading(false)
    } else {
      setIsLoading(true)
      await dispatch(getAllNoticias());
      setIsLoading(false)
    }
  };

  return (
    <div className="noticias-apartado-container">
      <span>Noticias</span>
      <div className="filters-noticias-container">
        <SearchBar />
        <select onChange={handleSelect}>
          <option value={'default'}>Selecciones una categoria</option>
          {categorys?.map((el) => {
            return (
              <option value={el.id} key={el.id}>
                {el.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="paginado-notices">
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
                className={page === number ? 'active' : ''}
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
      {allNoticias.length === 0 ? (
        <div>
          <h2>No hay Noticias</h2>
        </div>
      ) : !isLoading?(
         <div className="card-container-noticiasInpisables">
           {currentNotices?.map((e) => {
             return (
               <div className="card-cartas-noticias" title={e.resume} key={e.id}>
                 <div className="ImagenTituloCard">
                   <img src={e.image} alt={e.title} />
                   <h2>{e.title}</h2>
                 </div>
                 <div className="boton-card-noticia">
                   <Link to={`/detalle/${e.id}`}>
                     <button className="boton-card-noticia">Ver más</button>
                   </Link>
                 </div>
               </div>
             );
           })}
           
         </div>
       ): 
         <span className="loader-noticias-filtros"></span>
        }
    </div>
  );
}
