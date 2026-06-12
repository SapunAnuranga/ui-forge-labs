import React, { useState } from 'react';
import { login, setToken } from '../../api';

const Login = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(username.trim(), password);
      setToken(data.token);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] text-gray-200 font-sans px-4">
      <div className="w-full max-w-sm bg-gray-900/40 border border-gray-800/80 rounded-2xl p-8">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-white">
            UI Forge <span className="text-indigo-400">Labs</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">Admin Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] text-gray-400 font-medium uppercase mb-1.5">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-xl text-white text-sm focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-[11px] text-gray-400 font-medium uppercase mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-xl text-white text-sm focus:outline-none transition"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition shadow-lg shadow-blue-600/10"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
