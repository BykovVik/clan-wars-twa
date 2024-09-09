import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import logo from "../image/logo.png"

const HomePage = () => {

    const [data, setUserData] = useState([])
    const [player, setPlayer] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const initData = window.Telegram.WebApp.initData;
            const params = new URLSearchParams(initData);
            const userParam = params.get('user');
            
            if (userParam) {
                const user = JSON.parse(decodeURIComponent(userParam));
                checkUser(user.user_id)
                setUserData(user);
            } else {
                setError("Telegram request error");
            }
        }
        
    }, [])

    const checkUser = async(user_id) => {
        try {
            const response = await axios.get(`/user/${user_id}`);
            if (response) {
                if(response.status === 200) {
                    setIsLoggedIn(true)
                }
                if(response.data.user_id){
                    setPlayer(response.data)
                }
            }
        } catch (error) {
            setIsLoggedIn(false)

            if (error) {
                setError("Backend request error")
            }
        }
    }

    const regHandler = async() => {
        try {
            const response = await axios.post('/user/', {
                name: data.first_name,
                user_id: data.user_id,
                score: 0,
                penalties: 0,
                is_capitan: false,
                clan_id: null
            });
            if (response) {
                setIsLoggedIn(true)
            }
        } catch (error) {
            setPlayer(null)
            if (error) {
                setError("Backend request error")
            }
        }
    }

    return (
        <div className="Container">
            <div className="ContentBox">
                <img src={logo} alt="pic" />
                {!error&&
                isLoggedIn ? (
                    <>
                        <p className="RegButton"><Link to="/clan-list"> Clan rating</Link></p>
                        <p className="RegButton"><Link to="/user-list"> User rating</Link></p>
                        <p className="RegButton"><Link to="/clan-search" state={{user: player}}> Challenge to a duel</Link></p>
                    </>
                    
                ) : (
                    <>
                        <p>Вы не зарегистрированы.</p>
                        <p className="RegButton"><Link onClick={regHandler} to="/">Зарегистрируйтесь</Link></p>
                    </>
                )}
                {error&&
                <p style={{marginTop: '30px', color: '#fef43c'}}>{error}</p>
                }
            </div>
        </div>
    )
}

export default HomePage