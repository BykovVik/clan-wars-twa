import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const HomePage = () => {

    const [data, setUserData] = useState([])
    const [error, setError] = useState()

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
        
    }, [])

    const regHandler = async() => {
        try {
            const response = await axios.post('/users/', {
                name: "tony",
                user_id: 2,
                score: 20,
                penalties: 11,
                rating: 211,
                //"clan_id": 232323 не отправляем
            },);
        
            console.log('User created:', response.data);
        } catch (error) {
            setError(error)
        }
    }

    const isLoggedIn = false;
    const clan = null;

    return (
        <div className="Container">
            <div className="ContentBox">
                <h1>Добро пожаловать в Игру Кланов</h1>
                {isLoggedIn ? (
                    clan ? (
                    <p>Вы в клане {clan.name}</p>
                    ) : (
                    <p>Вы не состоите в клане. <Link to="/">Присоединитесь к клану</Link>.</p>
                    )
                ) : (
                    <div>
                        {error &&
                            <>
                                <p>{error.message}</p>
                                <p>{error.name}</p>
                                <p>{error.code}</p>
                            </>
                        }
                        <p>Вы не зарегистрированы. <Link onClick={regHandler} to="/">Зарегистрируйтесь</Link>.</p>
                        <p style={{color: "white"}}>{data.id}</p>
                        <p style={{color: "white"}}>{data.first_name}</p>
                        <p style={{color: "white"}}>{data.username}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage