import React from "react";

export default function SuggestionsList({ meals = [], onSelect }) {
  if (!meals.length) return null;

  return (
    <div className="row g-3 mt-3">
      {meals.map((meal) => (
        <div className="col-md-4" key={meal.idMeal}>
          <div
            className="card h-100 shadow-sm"
            style={{ cursor: "pointer" }}
            onClick={() => onSelect(meal.idMeal)}
          >
            <img
              src={meal.strMealThumb}
              className="card-img-top"
              alt={meal.strMeal}
            />
            <div className="card-body">
              <h5 className="card-title">{meal.strMeal}</h5>
              <p className="card-text">
                {meal.strCategory} • {meal.strArea}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
