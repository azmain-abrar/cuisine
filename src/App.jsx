import { useState, useEffect } from "react";
import "./App.css";

const AREAS = [
  "Italian", "French", "Greek", "Spanish", "British",
  "Polish", "Portuguese", "Dutch", "Irish", "Croatian",
];

export default function App() {
  const [meals, setMeals] = useState([]);
  const [area, setArea] = useState("Italian");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFavs, setShowFavs] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  useEffect(() => {
    async function fetchMeals() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setMeals((data.meals || []).map((m) => ({ ...m, area })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMeals();
  }, [area]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(meal) {
    setFavorites((prev) =>
      prev.some((f) => f.idMeal === meal.idMeal)
        ? prev.filter((f) => f.idMeal !== meal.idMeal)
        : [...prev, meal]
    );
  }

  const list = showFavs ? favorites : meals;
  const filteredMeals = list.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>🍽️ European Meal Finder</h1>

      <div className="controls">
        <select
          value={area}
          onChange={(e) => {
            setArea(e.target.value);
            setShowFavs(false);
          }}
        >
          {AREAS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        <input
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setShowFavs(!showFavs)}>
          {showFavs ? "⬅ All Meals" : `❤️ Favorites (${favorites.length})`}
        </button>
      </div>

      <h2>{showFavs ? "My Favorites" : `${area} Meals`}</h2>

      {loading && !showFavs && <p>Loading...</p>}
      {error && !showFavs && <p className="error">Error: {error}</p>}
      {!loading && !error && filteredMeals.length === 0 && (
        <p>{showFavs ? "No favorites yet." : "No meals found."}</p>
      )}

      <div className="grid">
        {filteredMeals.map((meal) => (
          <MealCard
            key={meal.idMeal}
            meal={meal}
            isFav={favorites.some((f) => f.idMeal === meal.idMeal)}
            onToggle={() => toggleFavorite(meal)}
          />
        ))}
      </div>
    </div>
  );
}

function MealCard({ meal, isFav, onToggle }) {
  return (
    <div className="card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h3>{meal.strMeal}</h3>
      <p>{meal.area} cuisine</p>
      <button onClick={onToggle}>{isFav ? "❤️ Saved" : "🤍 Save"}</button>
    </div>
  );
}