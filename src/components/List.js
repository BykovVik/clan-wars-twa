import React from 'react';
import ListItem from './ListItem';

const List = ({ items, user }) => {
    
    return (
        <ul>
            {items.map(item => (
                <ListItem
                    key={item.id}
                    item={item}
                    user={user}
                />
            ))}
        </ul>
    );
};

export default List;