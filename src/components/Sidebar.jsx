import React, { useState } from "react";

export default function Sidebar({ recipes, onSelect }) {
  const categories = [...new Set(recipes.map((r) => r.category))];
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [search, setSearch] = useState("");

  // Initialize expanded categories when recipes load
  React.useEffect(() => {
    if (categories.length > 0) {
      setExpandedCategories(new Set([categories[0]]));
    }
  }, [categories.length]);

  // 搜索逻辑
  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleCategory = (category) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="w-64 bg-white shadow-lg p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">📑 Recipes ({recipes.length})</h2>
      {/* 搜索框 */}
      <input
        type="text"
        placeholder="🔍 Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      
      {/* 类别和菜谱列表 */}
      <div className="space-y-1">
        {categories.map((category) => {
          const categoryRecipes = filteredRecipes.filter(r => r.category === category);
          const totalCategoryRecipes = recipes.filter(r => r.category === category);
          const isExpanded = expandedCategories.has(category);
          
          if (search && categoryRecipes.length === 0) return null;
          
          return (
            <div key={category}>
              {/* 类别标题 */}
              <button
                onClick={() => toggleCategory(category)}
                className={`w-full text-left px-2 py-2 rounded font-semibold flex items-center justify-between ${
                  isExpanded ? "bg-blue-100 text-blue-800" : "hover:bg-gray-200"
                }`}
              >
                <span>{category} ({totalCategoryRecipes.length})</span>
                <span className="text-sm">{isExpanded ? "▼" : "▶"}</span>
              </button>
              
              {/* 该类别下的菜谱 */}
              {isExpanded && (
                <ul className="ml-4 mt-1 space-y-1">
                  {categoryRecipes.length > 0 ? (
                    categoryRecipes.map((recipe) => (
                      <li key={recipe.id}>
                        <button
                          onClick={() => onSelect(recipe)}
                          className="w-full text-left px-2 py-1 rounded text-sm hover:bg-gray-100"
                        >
                          {recipe.title}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 italic text-sm px-2">No recipes found</li>
                  )}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
