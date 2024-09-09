import React, {useCallback} from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({title}) => {
    const navigate = useNavigate();
    const backClick = useCallback(() => {
        navigate("/");
    }, [navigate]);

    return (
        <div className="BackArrow" onClick={backClick}>
            
            {title === "search" &&
                <p>← {title.toUpperCase() }<span> for enemy</span></p> 
            }
            {title !== "search" &&
                <p>← TOP <span>{title}</span></p> 
            }
        </div>
    );
};

export default BackButton;