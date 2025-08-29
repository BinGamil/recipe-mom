export default function RecipeView({ recipe }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
      <h2 className="text-lg font-semibold">Ingredients</h2>
      <ul className="list-disc ml-6 mb-4">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
      <h2 className="text-lg font-semibold">Instructions</h2>
      <ol className="list-decimal ml-6 space-y-2">
        {recipe.instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
