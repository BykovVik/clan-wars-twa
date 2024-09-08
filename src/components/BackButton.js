import React, {useCallback} from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();
    const backClick = useCallback(() => {
        navigate("/");
    }, [navigate]);

    return (
        <div className="BackArrow" onClick={backClick}>
            ← 
        </div>
    );
};

export default BackButton;