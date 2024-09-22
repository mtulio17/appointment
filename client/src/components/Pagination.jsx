import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={"← Previous"}
      nextLabel={"Next →"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={onPageChange}
      containerClassName={"flex items-center justify-center space-x-2 mt-4"} // Contenedor flex con espaciado
      previousLinkClassName={"text-gray-500 hover:text-blue-500"} // Estilo para "Previous"
      nextLinkClassName={"text-gray-500 hover:text-blue-500"} // Estilo para "Next"
      breakClassName={"text-gray-500"}
      pageClassName={"text-gray-500 hover:text-blue-500 px-2"} // Estilo para cada número de página
      activeClassName={"border-b-2 border-blue-500"} // Estilo para la página activa
      disabledClassName={"text-gray-300 cursor-not-allowed"} // Estilo cuando está deshabilitado
    />
  );
};

export default Pagination;
