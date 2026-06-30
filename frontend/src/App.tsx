import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Recipe {
  _id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [newRecipe, setNewRecipe] = useState<Recipe>({
    _id: '',
    name: '',
    description: '',
    ingredients: [],
    instructions: [],
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${API_URL}/api/recipes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipes();
  }, []);

  const handleCreateRecipe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });
      if (response.ok) {
        const data = await response.json();
        setRecipes([...recipes, data]);
        setNewRecipe({
          _id: '',
          name: '',
          description: '',
          ingredients: [],
          instructions: [],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateRecipe = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });
      if (response.ok) {
        const data = await response.json();
        setRecipes(recipes.map((recipe) => (recipe._id === id ? data : recipe)));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/recipes/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Recipe List</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <ul>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
            <button onClick={() => handleUpdateRecipe(recipe._id)}>Update</button>
            <button onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h1>Create New Recipe</h1>
      <form onSubmit={handleCreateRecipe}>
        <label>Name:</label>
        <input
          type="text"
          value={newRecipe.name}
          onChange={(event) => setNewRecipe({ ...newRecipe, name: event.target.value })}
        />
        <br />
        <label>Description:</label>
        <input
          type="text"
          value={newRecipe.description}
          onChange={(event) => setNewRecipe({ ...newRecipe, description: event.target.value })}
        />
        <br />
        <label>Ingredients:</label>
        <input
          type="text"
          value={newRecipe.ingredients.join(', ')}
          onChange={(event) => setNewRecipe({ ...newRecipe, ingredients: event.target.value.split(', ') })}
        />
        <br />
        <label>Instructions:</label>
        <input
          type="text"
          value={newRecipe.instructions.join(', ')}
          onChange={(event) => setNewRecipe({ ...newRecipe, instructions: event.target.value.split(', ') })}
        />
        <br />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default App;