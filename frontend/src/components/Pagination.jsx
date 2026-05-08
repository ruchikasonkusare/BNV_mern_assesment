import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="page-btn"
      >
        ‹
      </button>

      <span className="page-number">{currentPage}</span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="page-btn"
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;