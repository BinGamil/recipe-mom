import { useState } from 'react';

function AccessControl({ onAccessGranted }) {
  const [userInput, setUserInput] = useState('');
  const [showError, setShowError] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const correctPassphrase = 'familyrecipes2025'; // Change this password as needed
    
    if (userInput === correctPassphrase) {
      sessionStorage.setItem('recipeAccess', 'granted');
      onAccessGranted();
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🍳</div>
          <h1 className="text-2xl font-bold text-gray-800">Family Recipe Collection</h1>
          <p className="text-gray-600 mt-2">Enter the magic word to view recipes</p>
        </div>
        
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter passphrase"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 transition-colors"
              autoFocus
            />
          </div>
          
          {showError && (
            <div className="text-red-500 text-sm text-center">
              Oops! Wrong passphrase. Try asking Mom or Dad! 🤔
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Open Recipe Book 📖
          </button>
        </form>
        
        <div className="mt-4 text-xs text-gray-400 text-center">
          Made with ❤️ for the family
        </div>
      </div>
    </div>
  );
}

export default AccessControl;
