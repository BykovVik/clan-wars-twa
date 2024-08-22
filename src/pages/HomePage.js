import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const HomePage = () => {

    const [data, setUserData] = useState([])
    const [error, setError] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [clan, setUserInClan] = useState(null)

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const initData = window.Telegram.WebApp.initData;
            const params = new URLSearchParams(initData);
            const userParam = params.get('user');
            
            if (userParam) {
                const user = JSON.parse(decodeURIComponent(userParam));
                setUserData(user);
            } else {
                console.error('User data is not available');
            }
        }

        checkUser(2) //на боевом серве поместить внутрь верхнего условия
        
    }, [])

    const checkUser = async(user_id) => {
        try {
            const response = await axios.get(`/user/${user_id}`);
            if (response) {
                setIsLoggedIn(true)
                if(response.data.clan_id) {
                    setUserInClan(true)
                } else {
                    setUserInClan(false)
                }
            }
        } catch (error) {
            console.error(error)
            setIsLoggedIn(false)
        }
    }

    const regHandler = async() => {
        try {
            const response = await axios.post('/users/', {
                name: "tony", //data.first_name
                user_id: 2, //data.id
                score: 20,
                penalties: 11,
                rating: 211,
                clan_id: null
            });
            if (response) {
                setIsLoggedIn(true)
            }
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div className="Container">
            <div className="ContentBox">
                <h1>Добро пожаловать в Игру Кланов</h1>
                {isLoggedIn ? (
                    clan ? (
                    <p>Вы в клане {clan.name}</p>
                    ) : (
                    <p>Вы не состоите в клане. <Link to="/clan-list" state={{user_id: 2}}>Присоединитесь к клану</Link>.</p>
                    )
                ) : (
                    <div>
                        <p>Вы не зарегистрированы. <Link onClick={regHandler} to="/">Зарегистрируйтесь</Link>.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage