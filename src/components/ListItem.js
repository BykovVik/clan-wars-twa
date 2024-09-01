import React from 'react';
import plus from '../image/plus.png';
import war from '../image/war.png';
import war_b from '../image/war_black.png';
import config from '../config.json';
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

    const challengeToFight = async (clan_id) => {
        try {
            const botToken = config.TOKEN;
            const chat_id = clan_id;
            const message = "Один из кланов, участвующих в нашей игре, вызывает вас на битву.";
            const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
            const callback_data_yes = `accept_battle:${user.clan_id}:${clan_id}`;
            const callback_data_no = `no_battle:${user.clan_id}`;

            const inlineKeyboard = {
                inline_keyboard: [
                    [
                        { text: "Принять бой!", callback_data: callback_data_yes },
                        { text: "Отказаться!", callback_data: callback_data_no }
                    ]
                ]
            };

            await axios.post(url, {
                chat_id: chat_id,
                text: message,
                reply_markup: inlineKeyboard
            });
        } catch (error) {
            console.error("Ошибка при вызове на бой:", error);
        }
    };

    return (
        <li className="Item">
            {isClan ? (
                <>
                    {item.title.substring(0, 20)} - {item.wins} - {item.losses}
                    {user?.clan_id === null && (
                        <img onClick={() => addUserToClan(item.id)} src={plus} alt="add icon" />
                    )}
                    {user?.clan_id != null && user.is_capitan ? (
                        <img onClick={() => challengeToFight(item.chat_id)} src={war} alt="war icon" />
                    ) : (
                        <img src={war_b} alt="war disabled icon" />
                    )}
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