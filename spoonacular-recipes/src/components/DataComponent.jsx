import React, { useState, useEffect } from 'react';

const DataComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        //Retrieve Recipes from spoonacular API
        //Need to un-hardcode query parameter
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.spoonacular.com/recipes/complexSearch?query=pasta', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        //'x-api-key': '799f17f427f745cfa3909c2030949b5f',
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    //Returning simple list of recipes
    //Need to change to pagination
    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {data.length > 0 ? (
                    data.slice(0, 10).map((item) => (
                        <li key={item.id}>
                            <strong>{item.title}</strong>
                            <img src={item.image} alt={item.title} />
                        </li>
                    ))
                ) : (
                    <p>No Recipes available</p>
                )}
            </ul>
        </div>
    );
};

export default DataComponent;
