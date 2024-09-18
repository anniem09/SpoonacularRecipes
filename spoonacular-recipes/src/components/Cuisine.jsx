import React from 'react';

export default function Cuisine({ cuisines, selectedCuisine, onCuisineChange }) {
    return (
        <select value={selectedCuisine} onChange={(e) => onCuisineChange(e.target.value)}>
            <option value="">All Cuisines</option>
            {cuisines.map((cuisine, index) => (
                <option key={index} value={cuisine}>
                    {cuisine}
                </option>
            ))}
        </select>
    );
};