import React from 'react';
import Ingredient from './Ingredient';
import InstructionList from './Instructions';

export default function RecipeDetail({ recipe, onBack }) {
    const tags = [];

    if (recipe.dairyFree) tags.push('Dairy Free');
    if (recipe.glutenFree) tags.push('Gluten Free');
    if (recipe.vegan) tags.push('Vegan');
    if (recipe.vegetarian) tags.push('Vegetarian');
    if (recipe.ketogenic) tags.push('Ketogenic');
    if (recipe.lowFodmap) tags.push('Low FODMAP');
    if (recipe.sustainable) tags.push('Sustainable');
    if (recipe.veryHealthy) tags.push('Very Healthy');
    if (recipe.veryPopular) tags.push('Very Popular');
    if (recipe.whole30) tags.push('Whole30');
    if (recipe.gaps !== "no") tags.push(`GAPS`);

    console.log('Extended Ingredients:', recipe?.extendedIngredients);
    console.log('Recipe:', recipe.instructions);

    return (
        <div>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />

            {/*Health Tags*/}
            <div>
                {tags.length > 0 ? (
                    tags.map((tag, index) => (
                        <span key={index} className={tags}>
                            {tag}
                        </span>
                    ))
                ) : (
                    <p>No dietary information available</p>
                )}
            </div>

            <div>
                <h3>Ingredients</h3>
                <ul>
                    {recipe.extendedIngredients.map((ingredient) => (
                        <Ingredient
                            key={ingredient.id}
                            name={ingredient.original}
                        />
                    ))}
                </ul>
            </div>

            <InstructionList instructions={recipe.instructions} />

            <button onClick={onBack}>Back to Recipes</button>
        </div>
    );
};