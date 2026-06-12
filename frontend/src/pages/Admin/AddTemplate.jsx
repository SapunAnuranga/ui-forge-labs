import React, { useState, useEffect } from 'react';
import { useToast } from '../../components/Toast';
import { getCategories, addTemplate } from '../../api';

const AddTemplate = ({ setActiveTab }) => {
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: 0,
    description: '',
    icon: '🌐',
    tags: '',
    active: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
        if (cats.length > 0) setFormData(prev => ({ ...prev, category: cats[0].name }));
      } catch (err) {
        toast(err.message || 'Failed to load categories.', 'error');
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast('Please fill all required fields!', 'error');
      return;
    }

    try {
      await addTemplate({
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseInt(formData.price) || 0,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      });
      toast('New template created successfully!', 'success');
      setActiveTab('templates');
    } catch (err) {
      toast(err.message || 'Failed to create template.', 'error');
    }
  };

  return (
    <div className="h-full flex flex-col justify-center max-w-4xl mx-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">Create New Template</h2>
        <p className="text-xs text-gray-500">Add a new product to the marketplace</p>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-gray-900/30 border border-gray-800 rounded-2xl p-5 space-y-4 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] text-gray-400 font-medium uppercase mb-1.5">Template Title *</label>
            <input
              type="text"
              required
              placeholder="e.g., Saas Dashboard UI Kit"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-xl text-white text-sm focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-[11px] text-gray-400 font-medium uppercase mb-1.5">Category</label>
            <select
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-xl text-white text-sm focus:outline-none transition"
            >
              {categories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
              {categories.length === 0 && <option value="Uncategorized">Uncategorized</option>}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] text-gray-400 font-medium uppercase mb-1.5">Emoji Icon</label>
            <input
              type="text"
              maxLength="2"
              value={formData.icon}
              onChange={e => setFormData({ ...formData, icon: e.target.value })}
              className="w-full text-center px-3 py-2 bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-xl text-white text-sm focus:outline-none transition"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-[11px] text-gray-400 font-medium uppercase mb-1.5">Price ($)</label>
            <input
              type="number"
              min="0"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-xl text-white text-sm focus:outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] text-gray-400 font-medium uppercase mb-1.5">Description *</label>
          <textarea
            required
            rows="3"
            placeholder="Describe your digital template features..."
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-xl text-white text-sm focus:outline-none transition resize-none"
          />
        </div>

        <div>
          <label className="block text-[11px] text-gray-400 font-medium uppercase mb-1.5">Tags (Comma Separated)</label>
          <input
            type="text"
            placeholder="react, tailwind, dashboard"
            value={formData.tags}
            onChange={e => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-xl text-white text-sm focus:outline-none transition"
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-800/50">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="activeStatus"
              checked={formData.active}
              onChange={e => setFormData({ ...formData, active: e.target.checked })}
              className="w-4 h-4 rounded border-gray-800 text-blue-600 focus:ring-0 bg-gray-900"
            />
            <label htmlFor="activeStatus" className="text-xs text-gray-400 select-none cursor-pointer">
              Publish instantly to marketplace
            </label>
          </div>

          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-xl transition shadow-lg shadow-blue-600/10"
          >
            Save Template
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTemplate;