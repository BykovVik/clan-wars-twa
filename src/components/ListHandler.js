import React, {useEffect, useState} from "react";
import axios from "axios";
import Pagination from './Pagination'

const ListHandler = (path) => {

    const [data, setData] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const clansData = async() => {
            const response = await axios.get(String(path.path));
            if (response.data) {
                setData(response.data)
            }
        }
        clansData()
    }, [])

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    if (data) {
        var currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
        var totalPages = Math.ceil(data.length / itemsPerPage);
    }
    
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
          setCurrentPage(pageNumber);
        }
    };


    return (
        <div>
            <ul>
                {(path.path === "/clans-list/")&&
                    currentItems &&
                        currentItems.map(clan => (
                            <li key={clan.id}>{clan.title} - {clan.wins} - {clan.losses}</li>   
                    ))
                }
                {(path.path === "/users-list/")&&
                    currentItems &&
                        currentItems.map(user => (
                            <li key={user.id}>{user.name} - {user.rating}</li>   
                    ))
                }
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default ListHandler