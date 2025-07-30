import { useQuery } from "@tanstack/react-query";
import { fetchRecipeByCategory } from "../utils/todos";
import { useParams } from "react-router";
import React from 'react';


function RecipeDetail(){
    const { id } = useParams()
    const {data : recipe , isError, isLoading, error} = useQuery({
        queryKey:['recipe', id],
         queryFn:()=> fetchRecipeByCategory(id)})
    
console.log("res=> ", recipe)
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-lg">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-2/5">
          <img 
            src={recipe?.image} 
            alt={recipe?.name} 
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
        </div>
        
        <div className="md:w-3/5">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-800">{recipe?.name}</h1>
            <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
              {recipe?.rating} ★ ({recipe?.reviewCount})
            </div>
          </div>
          
          <p className="text-gray-600 mt-2">{recipe?.cuisine} Cuisine • {recipe?.mealType.join(', ')}</p>
          
          <div className="flex flex-wrap gap-2 my-4">
            {recipe?.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <StatCard value={`${recipe?.prepTimeMinutes} min`} label="Prep Time" />
            <StatCard value={`${recipe?.cookTimeMinutes} min`} label="Cook Time" />
            <StatCard value={recipe?.servings} label="Servings" />
            <StatCard value={recipe?.difficulty} label="Difficulty" />
            <StatCard value={`${recipe?.caloriesPerServing} kcal`} label="Calories" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ingredients Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-amber-500">
            Ingredients
          </h2>
          <ul className="space-y-2">
            {recipe?.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <span className="text-gray-700">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-amber-500">
            Instructions
          </h2>
          <ol className="space-y-4">
            {recipe?.instructions.map((step, index) => (
              <li key={index} className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                </div>
                <p className="text-gray-700">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>


  );
};

// Helper component for stats
const StatCard = ({ value, label }) => (
  <div className="bg-gray-50 p-3 rounded-lg text-center">
    <p className="text-lg font-semibold text-gray-800">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

export default RecipeDetail;