import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import RecipeView from "./components/RecipeView";
import AccessControl from "./components/AccessControl";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    // Check existing access
    const accessStatus = sessionStorage.getItem('recipeAccess');
    if (accessStatus === 'granted') {
      setHasAccess(true);
    }

    // Load recipe data
    fetch("/recipes.json")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setSelected(data[0]); // 默认选中第一个
      });
  }, []);

  const grantAccess = () => {
    setHasAccess(true);
  };

  const revokeAccess = () => {
    sessionStorage.removeItem('recipeAccess');
    setHasAccess(false);
  };

  // Show access control if not authenticated
  if (!hasAccess) {
    return <AccessControl onAccessGranted={grantAccess} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-lg font-semibold">🏠 Family Recipes</h1>
          <button
            onClick={revokeAccess}
            className="text-sm text-red-500 hover:text-red-700 px-3 py-1 rounded border border-red-200 hover:bg-red-50 transition-colors"
          >
            Lock 🔒
          </button>
        </div>
        <Sidebar recipes={recipes} onSelect={setSelected} />
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {selected ? <RecipeView recipe={selected} /> : <p>Select a recipe</p>}
      </div>
    </div>
  );
}
