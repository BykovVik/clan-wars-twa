import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    
    return (
        <div>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            Предыдущая
        </button>
        <span>Страница {currentPage} из {totalPages}</span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
            Следующая
        </button>
        </div>
    );
}

export default Pagination;