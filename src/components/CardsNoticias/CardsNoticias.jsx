/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CardNoticia from "../cardNoticia/CardNoticia";
import "./cardsNoticias.css";
import { useSelector } from "react-redux";
import { Container, display, padding } from "@mui/system";
import { Grid } from "@mui/material";

const CardsNoticias = () => {
  const noticias = useSelector((state) => state.noticias);

  const [currentPage, setCurrentPage] = useState(0);
  const totalPage = Math.ceil(noticias?.length / 2);
  function getCountriesForPage() {
    //startIndex es donde arranca el paginado, currentpage es 0, se multiplca por 10 y ese va a ser el indice de donde
    //se va a inciar el slice para parcial el array de paises y el endIndex es la cantidad de paises que va a abarcar el slice
    //en este caso seria slice(0, 9)
    const startIndex = currentPage * 2;
    const endIndex = startIndex + 2;
    return noticias.slice(startIndex, endIndex);
  }
  //esta funcion controla el currentPage, suma uno a la pagina acutal y limita que no exeda el numero de paginas disponible
  function handleNextPage() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPage - 1));
  }

  function handlePrevPage() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 0));
  }
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);
  const noticiasForPage = getCountriesForPage();

  return (
    <div>
      <Container sx={{ display: "flex", flexWrap: "wrap" }}>
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
      <hr />
      <div>
        <div>
          <button onClick={handlePrevPage} disabled={currentPage === 0}>
            Anterior
          </button>
        </div>
        <div>
        {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber - 1)}
              disabled={currentPage === pageNumber - 1}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPage - 1}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CardsNoticias;
