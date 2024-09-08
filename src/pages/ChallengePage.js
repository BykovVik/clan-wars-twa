import React, { useState, useEffect } from 'react';
import axios from 'axios';
import war from '../image/war.png';
import config from '../config.json';
import BackButton from '../components/BackButton';
import { useLocation } from 'react-router-dom';

const ClanSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [clans, setClans] = useState([]);
    const [filteredClans, setFilteredClans] = useState([]);
    const [user, setUser] = useState()
    let { state } = useLocation();
    const user_id = state.user_id

    useEffect(() => {
        const fetchClans = async () => {
            try {
                const response = await axios.get('/clans-list/'); 
                setClans(response.data);
            } catch (error) {
                console.error('Ошибка загрузки кланов:', error);
            }
        };

        fetchClans();

        const getUser = async() => {
            const response = await axios.get(`/user/${user_id}`);
            if (response.data) {
                setUser(response.data)
            }
        }
        getUser()
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        handleSearch(value);
    };

    const handleSearch = (term) => {
        if (term.trim() === '') {
            // Если строка поиска пуста, очищаем отфильтрованный список
            setFilteredClans([]);
        } else {
            const lowercasedTerm = term.toLowerCase();
            const filtered = clans.filter(clan =>
                clan.title.toLowerCase().includes(lowercasedTerm)
            );
            setFilteredClans(filtered);
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
        <div className="ListContainer">
            <BackButton />
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Поиск клана по имени..."
            />
            <ul>
                {filteredClans.length > 0 ? (
                    filteredClans
                    .slice(-3)
                    .map(clan => (
                        <li key={clan?.id}>{clan.title.substring(0, 20)} - {clan.wins} - {clan.losses} <img onClick={() => challengeToFight(clan.chat_id)} src={war} alt="war icon" /></li>
                    ))
                ) : searchTerm === '' ? (
                    <li>Введите название клана для поиска</li>
                ) : (
                    <li>Кланы не найдены</li>
                )}
            </ul>
        </div>
    );
};

export default ClanSearch;