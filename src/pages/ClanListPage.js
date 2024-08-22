import React from "react";
import { useLocation } from 'react-router-dom';
import ListHandler from '../components/ListHandler'

const ClanListPage = () => {

    let { state } = useLocation();
    const user_id = state.user_id

    return (
        <div>
            <ListHandler path="/clans-list/"/>
        </div>
    )
}

export default ClanListPage