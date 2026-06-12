import React, { useState, useEffect } from 'react';
import { useToast } from '../../components/Toast';
import { getCategories, addCategory, deleteCategory } from '../../api';

const Categories = () => {
  const toast = useToast();
  const [categories, setCategories] = useState([]);
  const [newCatName, setNewCatName] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      toast(err.message || 'Failed to load categories.', 'error');
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    try {
      const newCat = await addCategory(newCatName.trim());
      setCategories((prev) => [...prev, newCat]);
      setNewCatName('');
      toast('Category added successfully!', 'success');
    } catch (err) {
      toast(err.message || 'Failed to add category.', 'error');
    }
  };

  const handleDeleteCategoryClick = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the category "${name}"?`);
    if (confirmDelete) {
      try {
        await deleteCategory(id);
        setCategories((prev) => prev.filter((c) => c.id !== id));
        toast('Category removed.', 'error');
      } catch (err) {
        toast(err.message || 'Failed to delete category.', 'error');
      }
    }
  };

  return (
    <div className="h-full flex flex-col justify-center max-w-5xl mx-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">Classification Hub</h2>
        <p className="text-xs text-gray-500">Manage groupings and metadata categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-1">
          <form onSubmit={handleAddCategory} className="bg-gray-900/30 border border-gray-800 rounded-2xl p-4 space-y-4">
            <div>
              <label className="block text-[11px] text-gray-400 uppercase tracking-wider mb-1.5">Category Name</label>
              <input
                type="text"
                required
                placeholder="e.g., Mobile Apps"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-xl text-white text-xs focus:outline-none transition"
              />
            </div>
            <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-xl transition shadow-lg shadow-blue-600/10">
              Create Category
            </button>
          </form>
        </div>

        <div className="md:col-span-2">
          <div className="bg-gray-900/30 border border-gray-800 rounded-2xl overflow-hidden max-h-[55vh] overflow-y-auto">
            <div className="divide-y divide-gray-800/50">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between p-3.5 hover:bg-gray-800/10 transition">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 font-mono text-xs">#</span>
                    <span className="text-xs font-medium text-white">{cat.name}</span>
                  </div>
                  <button 
                    onClick={() => handleDeleteCategoryClick(cat.id, cat.name)} 
                    className="px-2.5 py-1 text-xs text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg border border-red-500/10 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {categories.length === 0 && <p className="text-gray-500 text-center py-6 text-xs">No categories listed.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;