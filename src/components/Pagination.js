import React from "react";
import ar from '../image/arrow_r.png'
import al from '../image/arrow_l.png'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    
    return (
        <div className="Pagination">
            <button className="Arrow" onClick={() => onPageChange(currentPage - 1)}>
                {currentPage != 1&&
                    <img src={al} alt="pic"/>
                }
            </button>
            <span> Страница {currentPage} из {totalPages} </span>
            <button className="Arrow" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
                {currentPage != totalPages &&
                    <img src={ar} alt="pic"/>
                }
            </button>
        </div>
    );
}

export default Pagination;