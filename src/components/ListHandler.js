import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import Pagination from './Pagination';
import BackButton from './BackButton';
import SortButton from './SortButton';
import List from './List';
import { useNavigate } from 'react-router-dom';

const ListHandler = ({ path, user }) => {
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('desc');
    const itemsPerPage = 10;
    const navigate = useNavigate();

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

    const handleSort = useCallback(() => {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    }, []);

    const sortedItems = useMemo(() => {
        if (!Array.isArray(data)) return [];

        return [...data].sort((a, b) => {
            if (a.wins !== undefined) {
                if (a.wins === b.wins) {
                    return a.losses - b.losses;
                }
                return sortOrder === 'asc' ? a.wins - b.wins : b.wins - a.wins;
            } else {
                return sortOrder === 'asc' ? a.score - b.score : b.score - a.score;
            }
        });
    }, [data, sortOrder]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = useMemo(() => {
        return sortedItems.slice(indexOfFirstItem, indexOfLastItem);
    }, [sortedItems, indexOfFirstItem, indexOfLastItem]);

    const totalPages = useMemo(() => {
        return data ? Math.ceil(data.length / itemsPerPage) : 0;
    }, [data]);

    const backClick = useCallback(() => {
        navigate("/");
    }, [navigate]);

    const handlePageChange = useCallback((pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    }, [totalPages]);

    return (
        <div className="ListContainer">
            <BackButton onClick={backClick} />
            <SortButton onSort={handleSort} />
            <List
                items={currentItems}
                user={user}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ListHandler;