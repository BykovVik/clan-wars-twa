import React, {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';
import ListHandler from '../components/ListHandler'
import axios from "axios";

const ClanListPage = () => {

    let { state } = useLocation();
    const user_id = state.user_id
    const [data, setData] = useState()


    useEffect(() => {
        const getUser = async() => {
            const response = await axios.get(`/user/${user_id}`);
            if (response.data) {
                setData(response.data)
            }
        }
        getUser()
    }, [])

    return (
        <div>
            <ListHandler path="/clans-list/" user={data}/>
        </div>
    )
}

export default ClanListPage