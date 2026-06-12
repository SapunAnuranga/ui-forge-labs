import React, { useState, useEffect } from 'react';
import { getAdminTemplates, getAdminMessages } from '../../api';

const Dashboard = ({ setActiveTab }) => {
  const [stats, setStats] = useState({ templates: 0, active: 0, drafts: 0, messages: 0 });

  useEffect(() => {
    (async () => {
      try {
        const [templates, messages] = await Promise.all([getAdminTemplates(), getAdminMessages()]);
        setStats({
          templates: templates.length,
          active: templates.filter(t => t.active).length,
          drafts: templates.filter(t => !t.active).length,
          messages: messages.length
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const cards = [
    { title: 'Total Templates', value: stats.templates, icon: '📁', color: 'from-blue-500/20 to-cyan-500/5', text: 'text-blue-400' },
    { title: 'Active Items', value: stats.active, icon: '●', color: 'from-green-500/20 to-emerald-500/5', text: 'text-green-400' },
    { title: 'Drafts', value: stats.drafts, icon: '○', color: 'from-orange-500/20 to-amber-500/5', text: 'text-orange-400' },
    { title: 'Total Messages', value: stats.messages, icon: '✉️', color: 'from-purple-500/20 to-pink-500/5', text: 'text-purple-400' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, i) => (
          <div key={i} className={`bg-gradient-to-br ${card.color} border border-gray-800 rounded-2xl p-6 flex items-center justify-between`}>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{card.title}</p>
              <h3 className="text-3xl font-bold text-white mt-2">{card.value}</h3>
            </div>
            <span className={`text-2xl ${card.text}`}>{card.icon}</span>
          </div>
        ))}
      </div>

      <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setActiveTab('add-template')} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl transition">
            + Add New Template
          </button>
          <button onClick={() => setActiveTab('templates')} className="px-4 py-2 bg-gray-850 hover:bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium rounded-xl transition">
            Manage Templates
          </button>
          <button onClick={() => setActiveTab('messages')} className="px-4 py-2 bg-gray-850 hover:bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium rounded-xl transition">
            View Inbox Messages
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;