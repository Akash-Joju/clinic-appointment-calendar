import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Calendar from './components/Calendar';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <div className="flex justify-between items-center p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        {loggedIn && (
          <button
            onClick={() => setLoggedIn(false)}
            className="text-sm px-3 py-1 rounded bg-red-500 text-white"
          >
            🔓 Logout
          </button>
        )}
      </div>

      {loggedIn ? (
        <Calendar />
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
