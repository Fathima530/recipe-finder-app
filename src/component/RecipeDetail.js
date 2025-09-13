import React from "react";

export default function RecipeDetail({ meal }) {
  if (!meal) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    }
  }

  return (
    <div className="card mt-4 shadow-lg">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={meal.strMealThumb}
            className="img-fluid rounded-start"
            alt={meal.strMeal}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">{meal.strMeal}</h2>
            <p className="card-text">
              <strong>Category:</strong> {meal.strCategory} <br />
              <strong>Cuisine:</strong> {meal.strArea}
            </p>
            <h5>Ingredients</h5>
            <ul>
              {ingredients.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <h5>Instructions</h5>
            <p style={{ whiteSpace: "pre-line" }}>{meal.strInstructions}</p>
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="btn btn-danger mt-2"
              >
                Watch on YouTube ▶
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
