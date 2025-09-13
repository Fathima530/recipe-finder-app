import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./component/SearchBar";
import SuggestionsList from "./component/SuggestionsList";
import RecipeDetail from "./component/RecipeDetail";

function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(query.trim());
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  async function fetchSuggestions(q) {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      setSuggestions(data.meals || []);
    } catch {
      setError("Failed to fetch suggestions.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectMeal(idMeal) {
    setSelectedMeal(null);
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      );
      const data = await res.json();
      setSelectedMeal(data.meals?.[0] || null);
    } catch {
      setError("Failed to fetch meal details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-3">🍳 Recipe Finder</h1>
      <p className="text-center text-muted">
        Type a meal name (e.g., "chicken") to get suggestions
      </p>

      <SearchBar value={query} onChange={setQuery} onClear={() => setQuery("")} />

      {loading && <div className="alert alert-info mt-3">Loading...</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {/* Show “No meals found” if search is done but suggestions are empty */}
      {!loading && query.length > 1 && suggestions.length === 0 && !error && (
        <div className="alert alert-warning mt-3">No meals found!</div>
      )}

      <SuggestionsList meals={suggestions} onSelect={handleSelectMeal} />

      {selectedMeal && <RecipeDetail meal={selectedMeal} />}
    </div>
  );
}

export default App;
