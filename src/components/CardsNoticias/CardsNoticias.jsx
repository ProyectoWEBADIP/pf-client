/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import CardNoticia from '../cardNoticia/CardNoticia';
import './cardsNoticias.css';
import { useSelector } from 'react-redux';
import { Container, display, padding } from '@mui/system';
import { Grid } from '@mui/material';

const CardsNoticias = () => {
  const noticias = useSelector((state) => state.noticias);
  const pPage= 6;

  const [currentPage, setCurrentPage] = useState(0);
  const totalPage = Math.ceil(noticias?.length / pPage);
  function noticesPerPage() {
    //startIndex es donde arranca el paginado, currentpage es 0, se multiplca por 10 y ese va a ser el indice de donde
    //se va a inciar el slice para parcial el array de paises y el endIndex es la cantidad de paises que va a abarcar el slice
    //en este caso seria slice(0, 9)
    const startIndex = currentPage * pPage;
    const endIndex = startIndex + pPage;
    return noticias?.slice(startIndex, endIndex);
  }
  //esta funcion controla el currentPage, suma uno a la pagina acutal y limita que no exeda el numero de paginas disponible
  function handleNextPage() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPage - 1));
  }

  function handlePrevPage() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 0));
  }
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);
  const noticiasForPage = noticesPerPage();

  return (
    <div>
     {pageNumbers.length? <div className="paginado">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          Anterior
        </button>

        {pageNumbers?.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber - 1)}
            disabled={currentPage === pageNumber - 1}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPage - 1}
        >
          Siguiente
        </button>
      </div>:null}
      <Container sx={{ display: 'flex',justifyContent:'center', flexWrap: 'wrap', width: '100vw' }}>
        {noticiasForPage?.map((notice) => (
          <CardNoticia
            key={notice.id}
            id={notice.id}
            title={notice.title}
            content={notice.content}
            image={notice.image}
            resume={notice.resume}
            date={notice.date}
          />
        ))}
      </Container>
    </div>
  );
};

export default CardsNoticias;
