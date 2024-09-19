import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import Cuisine from './Cuisine';
import RecipeDetail from './RecipeDetail';

const DataComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [query, setQuery] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState(null);

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
        const fetchData = async () => {
            const storedData = localStorage.getItem('recipes');
            const storedCuisine = localStorage.getItem('selectedCuisine');
            const storedQuery = localStorage.getItem('query');

            //Check if data already loaded, if not fetch from api and store
            if (storedData && storedCuisine === selectedCuisine && storedQuery === query) {
                setData(JSON.parse(storedData));
                setLoading(false);
            } else {
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

                    localStorage.setItem('recipes', JSON.stringify(results));
                    localStorage.setItem('selectedCuisine', selectedCuisine);
                    localStorage.setItem('query', query);

                } catch (error) {
                    console.error('Fetch failed:', error);
                    setError(error);
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [query, selectedCuisine]);

    //Handle Pagination
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startingIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startingIndex, startingIndex + itemsPerPage);

    // Event handlers
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

    const handleRecipeClick = async (recipeId) => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '799f17f427f745cfa3909c2030949b5f',
                },
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const recipeDetail = await response.json();
            setSelectedRecipe(recipeDetail);

        } catch (error) {
            console.error('Failed to fetch recipe details:', error);
            setError(error);
        }
    };

    const handleBack = () => {
        setSelectedRecipe(null);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    //Return RecipeDetail Page when a recipe is selected
    if (selectedRecipe) {
        return <RecipeDetail recipe={selectedRecipe} onBack={handleBack} />;
    }

    //Returning paginated list of recipes
    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <Cuisine cuisines={cuisines} selectedCuisine={selectedCuisine} onCuisineChange={handleCuisineChange} />

            <div className='recipesList'>
                <ul>
                    {currentData.length > 0 ? (
                        currentData.slice(0, 10).map((item) => (
                            <li key={item.id} onClick={() => handleRecipeClick(item.id)}>
                                <img src={item.image} alt={item.title} className='recipePic' />
                                <p>{item.title}</p>
                            </li>
                        ))
                    ) : (
                        <p>No Recipes available</p>
                    )}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handleNextPage={handleNextPage}
                        handlePrevPage={handlePrevPage}
                    />
                </ul>

            </div>
        </div>
    );
};

export default DataComponent;