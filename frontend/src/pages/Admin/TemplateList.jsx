import React, { useState, useEffect } from 'react';
import { useToast } from '../../components/Toast';
import { getAdminTemplates, getCategories, updateTemplate, deleteTemplate } from '../../api';

const TemplateList = () => {
  const toast = useToast();
  const [templates, setTemplates] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [tpls, cats] = await Promise.all([getAdminTemplates(), getCategories()]);
      setTemplates(tpls);
      setCategories(cats);
    } catch (err) {
      toast(err.message || 'Failed to load templates.', 'error');
    }
  };

  const startEdit = (template) => {
    setEditingId(template.id);
    setEditData({
      title: template.title || '',
      category: template.category || (categories[0]?.name || ''),
      price: template.price ?? 0,
      description: template.description || '',
      icon: template.icon || '🌐',
      tags: (template.tags || []).join(', '),
      active: template.active ?? true,
      rating: template.rating || 5.0,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = async (id) => {
    if (!editData.title.trim()) {
      toast('Title cannot be empty!', 'error');
      return;
    }
    try {
      const updated = await updateTemplate(id, {
        title: editData.title.trim(),
        category: editData.category,
        price: parseInt(editData.price) || 0,
        description: editData.description.trim(),
        icon: editData.icon.trim() || '🌐',
        tags: editData.tags.split(',').map((x) => x.trim()).filter(Boolean),
        active: editData.active,
        rating: parseFloat(editData.rating) || 5.0,
      });
      setTemplates((prev) => prev.map((t) => (t.id === id ? updated : t)));
      setEditingId(null);
      toast('Template updated successfully!', 'success');
    } catch (err) {
      toast(err.message || 'Failed to update template.', 'error');
    }
  };

  const toggleActive = async (id) => {
    const tpl = templates.find((t) => t.id === id);
    try {
      const updated = await updateTemplate(id, { active: !tpl.active });
      setTemplates((prev) => prev.map((t) => (t.id === id ? updated : t)));
      toast(`"${updated.title}" ${updated.active ? 'published' : 'set to draft'}.`, 'info');
    } catch (err) {
      toast(err.message || 'Failed to update status.', 'error');
    }
  };

  const handleDeleteClick = async (id, title) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (confirmDelete) {
      try {
        await deleteTemplate(id);
        setTemplates((prev) => prev.filter((t) => t.id !== id));
        toast('Template deleted successfully.', 'error');
      } catch (err) {
        toast(err.message || 'Failed to delete template.', 'error');
      }
    }
  };

  const filtered = templates.filter(
    (t) =>
      t.title?.toLowerCase().includes(search.toLowerCase()) ||
      t.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">Templates Ledger</h2>
          <p className="text-xs text-gray-500">Manage, edit or remove products</p>
        </div>
        <input
          type="text"
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
        />
      </div>

      <div className="bg-gray-900/30 rounded-2xl border border-gray-800 overflow-hidden max-h-[70vh] flex flex-col">
        <div className="overflow-x-auto overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-800 bg-gray-950/40 sticky top-0 backdrop-blur-md z-10">
              <tr>
                <th className="px-4 py-3 text-gray-400 font-medium w-16 text-center">Icon</th>
                <th className="px-4 py-3 text-gray-400 font-medium">Title</th>
                <th className="px-4 py-3 text-gray-400 font-medium">Category</th>
                <th className="px-4 py-3 text-gray-400 font-medium">Price</th>
                <th className="px-4 py-3 text-gray-400 font-medium">Status</th>
                <th className="px-4 py-3 text-gray-400 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filtered.map((template) => {
                const isEditing = editingId === template.id;
                return (
                  <React.Fragment key={template.id}>
                    <tr className={`hover:bg-gray-800/10 transition ${isEditing ? 'bg-blue-500/5' : ''}`}>
                      <td className="px-4 py-3 text-center text-xl">{template.icon || '🌐'}</td>
                      <td className="px-4 py-3 text-white font-medium truncate max-w-[180px]">{template.title}</td>
                      <td className="px-4 py-3 text-gray-400">{template.category}</td>
                      <td className="px-4 py-3 text-emerald-400 font-semibold">${template.price}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleActive(template.id)}
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition ${
                            template.active ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                          }`}
                        >
                          {template.active ? 'Active' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => isEditing ? cancelEdit() : startEdit(template)}
                            className="px-2.5 py-1 bg-blue-600/10 text-blue-400 border border-blue-600/20 rounded-lg text-xs hover:bg-blue-600/20 transition"
                          >
                            {isEditing ? 'Close' : 'Edit'}
                          </button>
                          <button
                            onClick={() => handleDeleteClick(template.id, template.title)}
                            className="px-2.5 py-1 bg-red-600/10 text-red-400 border border-red-600/20 rounded-lg text-xs hover:bg-red-600/20 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isEditing && (
                      <tr>
                        <td colSpan="6" className="px-5 py-4 bg-gray-900/40 border-t border-b border-gray-800">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] text-gray-400 mb-1">Title</label>
                              <input type="text" value={editData.title} onChange={e => setEditData({...editData, title: e.target.value})} className="w-full px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-xs focus:outline-none" />
                            </div>
                            <div>
                              <label className="block text-[11px] text-gray-400 mb-1">Category</label>
                              <select value={editData.category} onChange={e => setEditData({...editData, category: e.target.value})} className="w-full px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-xs focus:outline-none">
                                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="block text-[11px] text-gray-400 mb-1">Price ($)</label>
                              <input type="number" value={editData.price} onChange={e => setEditData({...editData, price: e.target.value})} className="w-full px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-xs focus:outline-none" />
                            </div>
                            <div className="md:col-span-3">
                              <label className="block text-[11px] text-gray-400 mb-1">Description</label>
                              <textarea value={editData.description} onChange={e => setEditData({...editData, description: e.target.value})} className="w-full px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-xs focus:outline-none" rows="2" />
                            </div>
                            <div className="md:col-span-3 flex justify-end gap-2 pt-2 border-t border-gray-800/40">
                              <button onClick={() => saveEdit(template.id)} className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition">Save Changes</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-10 text-center text-gray-500 text-xs">No templates found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TemplateList;