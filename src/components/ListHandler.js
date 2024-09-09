import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import BackButton from './BackButton';
import List from './List';

const ListHandler = ({ path }) => {
    const [data, setData] = useState(null);
    const [title, setTitle] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(path);
                setData(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchData();
    }, [path]);

    const sortedTopItems = useMemo(() => {
        if (!Array.isArray(data)) return [];

        const sorted = [...data].sort((a, b) => {
            if (a.wins !== undefined) {
                if (a.wins === b.wins) {
                    return a.losses - b.losses;
                }
                setTitle("clans")
                return b.wins - a.wins;
            } else {
                if (a.score === b.score) {
                    return a.penalties - b.penalties;
                }
                setTitle("users")
                return b.score - a.score;
            }
        });
        return sorted.slice(0, 10);
    }, [data]);

    return (
        <div className="ListContainer">
            <BackButton
                title={title}
            />
            <List
                items={sortedTopItems}
            />
        </div>
    );
};

export default ListHandler;