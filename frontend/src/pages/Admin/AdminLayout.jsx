import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import TemplateList from './TemplateList';
import AddTemplate from './AddTemplate';
import Messages from './Messages';
import Categories from './Categories';
import Settings from './Settings';
import Login from './Login';
import { isLoggedIn, verifyToken, clearToken } from '../../api';

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (!isLoggedIn()) {
      setAuthed(false);
      setChecking(false);
      return;
    }
    try {
      await verifyToken();
      setAuthed(true);
    } catch {
      clearToken();
      setAuthed(false);
    } finally {
      setChecking(false);
    }
  };

  const handleLogout = () => {
    clearToken();
    setAuthed(false);
    setActiveTab('dashboard');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'categories', label: 'Categories', icon: '🏷️' },
    { id: 'templates', label: 'Manage Templates', icon: '📁' },
    { id: 'add-template', label: 'Add New Template', icon: '➕' },
    { id: 'messages', label: 'Inbox Messages', icon: '✉️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'templates':
        return <TemplateList />;
      case 'add-template':
        return <AddTemplate setActiveTab={setActiveTab} />;
      case 'categories':
        return <Categories />;
      case 'messages':
        return <Messages />;
      case 'settings':
        return <Settings onLogout={handleLogout} />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] text-gray-400 text-sm">
        Loading...
      </div>
    );
  }

  if (!authed) {
    return <Login onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-[#0b0f19] text-gray-200 font-sans">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900/40 border-r border-gray-800/80 p-6 hidden md:flex flex-col justify-between shrink-0">
        <div>
          <div className="mb-8 pl-2">
            <h1 className="text-xl font-bold text-white">
              UI Forge <span className="text-indigo-400">Labs</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">Management Console</p>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                    }`}
                >
                  <span className="text-lg opacity-90">{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-gray-800/60 pl-2 space-y-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <span className="text-lg opacity-90">🚪</span>
            Logout
          </button>
          <p className="text-xs text-gray-600">v1.1.0 · Live Mode</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 border-b border-gray-800/60 flex items-center justify-between px-6 md:px-10 bg-gray-900/10 backdrop-blur-sm">
          <div className="text-sm font-medium text-gray-400 capitalize">
            Pages / <span className="text-white">{activeTab.replace('-', ' ')}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-white">Admin Account</p>
              <p className="text-[10px] text-green-400 font-medium">● Online</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
            <button
              onClick={handleLogout}
              className="md:hidden text-xs text-red-400 px-2 py-1 border border-red-500/30 rounded-lg"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
