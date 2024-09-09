import React from 'react';
import king_gold from "../image/king_gold.png"
import king_silver from "../image/king_silver.png"
import king_bronze from "../image/king_bronze.png"
import king_empty from "../image/king_empty.png"

const ListItem = ({ item, index }) => {
    const isClan = item.wins !== undefined;

    return (
        <li>
            {isClan ? (
                <>
                    {index + 1 === 1 && (
                        <p><img src={king_gold} alt='pic'/> {item.title.substring(0, 20)} - {item.wins} - {item.losses}</p>
                    )}
                    {index + 1 === 2 && (
                        <p><img src={king_silver} alt='pic'/> {item.title.substring(0, 20)} - {item.wins} - {item.losses}</p>
                    )}
                    {index + 1 === 3 && (
                        <p><img src={king_bronze} alt='pic'/> {item.title.substring(0, 20)} - {item.wins} - {item.losses}</p>
                    )}
                    {index + 1 > 3 && (
                        <p><img src={king_empty} alt='pic'/> {item.title.substring(0, 20)} - {item.wins} - {item.losses}</p>
                    )}
                </>
                
            ) : (
                <>
                    {index + 1 === 1 && (
                        <p><img src={king_gold} alt='pic'/> {item.name} - {item.score} - {item.penalties}</p>
                    )}
                    {index + 1 === 2 && (
                        <p><img src={king_silver} alt='pic'/> {item.name} - {item.score} - {item.penalties}</p>
                    )}
                    {index + 1 === 3 && (
                        <p><img src={king_bronze} alt='pic'/> {item.name} - {item.score} - {item.penalties}</p>
                    )}
                    {index + 1 > 3 && (
                        <p><img src={king_empty} alt='pic'/> {item.name} - {item.score} - {item.penalties}</p>
                    )}
                </>
            )}
        </li>
    );
};

export default ListItem;