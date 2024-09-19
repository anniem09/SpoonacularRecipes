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
        <div className='wrapper'>
            <div className='detailWrapper'>
                <h2>{recipe.title}</h2>
                <div className='imgContainer'>
                    <img src={recipe.image} alt={recipe.title} className='RecipeDetailImg' />
                </div>
                {/*Health Tags*/}
                <div className='tagsContainer'>
                    {tags.length > 0 ? (
                        tags.map((tag, index) => (
                            <span key={index} className='tags'>
                                {tag}
                            </span>
                        ))
                    ) : (
                        <p>No dietary information available</p>
                    )}
                </div>

                <div className='ingredientsContainer'>
                    <h3>Ingredients</h3>
                    <ul className='ingredientList'>
                        {recipe.extendedIngredients.map((ingredient) => (
                            <Ingredient
                                key={ingredient.id}
                                name={ingredient.original}
                            />
                        ))}
                    </ul>
                </div>

                <InstructionList instructions={recipe.instructions} />
            </div>

            <button onClick={onBack} className='backButton'>Back to Recipes</button>
        </div>
    );
};