import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ListItem = ({ item, user }) => {
    const isClan = item.wins !== undefined;
    const navigate = useNavigate();

    const addUserToClan = async (newClanId) => {
        try {
            const response = await axios.patch(`/user/${user.user_id}`, { clan_id: newClanId });
            if (response.data) {
                navigate("/");
            }
        } catch (error) {
            console.error("Ошибка при добавлении пользователя в клан:", error);
        }
    };

    return (
        <li>
            {isClan ? (
                <>
                    {item.title.substring(0, 20)} - {item.wins} - {item.losses}
                </>
            ) : (
                <>
                    {item.name} - {item.score}
                </>
            )}
        </li>
    );
};

export default ListItem;