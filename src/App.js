import React, { useState } from 'react';
import Login from './components/Login';
import Calendar from './components/Calendar';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {loggedIn ? <Calendar /> : <Login onLogin={() => setLoggedIn(true)} />}
    </div>
  );
}

export default App;
