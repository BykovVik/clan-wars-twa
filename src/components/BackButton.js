import React from 'react';

const BackButton = ({ onClick }) => {
    return (
        <div className="BackArrow" onClick={onClick}>
            ← 
        </div>
    );
};

export default BackButton;