// 📁 src/components/Login.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'staff@clinic.com' && password === '123456') {
      onLogin();
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Clinic Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
