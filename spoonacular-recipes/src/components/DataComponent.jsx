import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';

const DataComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {

        //Retrieve Recipes from spoonacular API
        //Need to un-hardcode query parameter
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.spoonacular.com/recipes/complexSearch?cuisine=Italian', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': '799f17f427f745cfa3909c2030949b5f',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                const results = result.results || [];

                setData(results);
                setLoading(false);

            } catch (error) {
                console.error('Fetch failed:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    //Handle Pagination
    //Calculate total pages based on returned recipe count
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startingIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startingIndex, startingIndex + itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    //Returning simple list of recipes
    //Filtered by current page set of data
    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {currentData.length > 0 ? (
                    currentData.slice(0, 10).map((item) => (
                        <li key={item.id}>
                            <strong>{item.title}</strong>
                            <img src={item.image} alt={item.title} />
                        </li>
                    ))
                ) : (
                    <p>No Recipes available</p>
                )}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
            />
        </div>
    );
};

export default DataComponent;
