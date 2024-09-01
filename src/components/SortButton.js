import React from 'react';
import sortIcon from '../image/sort.png';

const SortButton = ({ onSort }) => {
    return (
        <h3 onClick={onSort}>
            Сортировать <span className="Sort"><img src={sortIcon} alt="sort icon" /></span>
        </h3>
    );
};

export default SortButton;