import React from 'react';
import ListItem from './ListItem';

const List = ({ items }) => {
    
    return (
        <ul>
            {items.map((item, index) => (
                <ListItem
                    key={item.id}
                    item={item}
                    index={index}
                />
            ))}
        </ul>
    );
};

export default List;