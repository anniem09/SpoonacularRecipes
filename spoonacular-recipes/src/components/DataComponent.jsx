import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import Cuisine from './Cuisine';

const DataComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [query, setQuery] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const cuisines = [
        'African',
        'Asian',
        'American',
        'British',
        'Cajun',
        'Caribbean',
        'Chinese',
        'Eastern European',
        'European',
        'French',
        'German',
        'Greek',
        'Indian',
        'Irish',
        'Italian',
        'Japanese',
        'Jewish',
        'Korean',
        'Latin American',
        'Mediterranean',
        'Mexican',
        'Middle Eastern',
        'Nordic',
        'Southern',
        'Spanish',
        'Thai',
        'Vietnamese'
    ];

    useEffect(() => {

        //Retrieve Recipes from spoonacular API
        const fetchData = async () => {
            try {
                const cuisineParam = selectedCuisine ? `&cuisine=${selectedCuisine}` : '';
                const searchParam = query ? `query=${query}` : '';

                const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${searchParam}${cuisineParam}`, {
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
                setCurrentPage(1);

            } catch (error) {
                console.error('Fetch failed:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [query, selectedCuisine]);

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

    const handleSearch = (searchTerm) => {
        setQuery(searchTerm);
    };

    const handleCuisineChange = (cuisine) => setSelectedCuisine(cuisine);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    //Returning simple list of recipes
    //Filtered by current page set of data
    return (
        <div>
            <h1>Recipes</h1>

            <SearchBar onSearch={handleSearch} />
            <Cuisine cuisines={cuisines} selectedCuisine={selectedCuisine} onCuisineChange={handleCuisineChange} />

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
