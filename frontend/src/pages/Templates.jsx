import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTemplates } from '../api';
import { 
  Search, 
  Star, 
  Download, 
  Paintbrush, 
  Rocket, 
  ShoppingCart, 
  BarChart3, 
  Layers, 
  FileText, 
  ExternalLink, 
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';

const Templates = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Portfolio', 'SaaS', 'E-commerce', 'Dashboard', 'Landing', 'Blog'];

  // Map static IDs to corresponding elegant Lucide icons
  const iconMap = {
    1: <Paintbrush className="w-12 h-12 text-purple-400 stroke-[1.5]" />,
    2: <Rocket className="w-12 h-12 text-indigo-400 stroke-[1.5]" />,
    3: <ShoppingCart className="w-12 h-12 text-emerald-400 stroke-[1.5]" />,
    4: <BarChart3 className="w-12 h-12 text-amber-400 stroke-[1.5]" />,
    5: <Layers className="w-12 h-12 text-sky-400 stroke-[1.5]" />,
    6: <FileText className="w-12 h-12 text-rose-400 stroke-[1.5]" />,
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const data = await getTemplates();
      setTemplates(data);
    } catch (error) {
      console.error("Error loading templates:", error);
    }
    setLoading(false);
  };

  // Only display active items to general users
  const activeTemplates = templates.filter(t => t.active === true);
  
  const filteredTemplates = activeTemplates.filter(template => {
    const matchesSearch = search === '' || 
      template.title.toLowerCase().includes(search.toLowerCase()) ||
      template.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || template.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="bg-[#030303] min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-zinc-800 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Loading Library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#030303] min-h-screen text-white font-sans antialiased selection:bg-indigo-500/30">
      <div className="container mx-auto px-4 py-20 max-w-6xl relative">
        
        {/* Decorative Top Background Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 bg-zinc-900/80 border border-zinc-800/60 backdrop-blur-md rounded-full text-[11px] font-semibold text-indigo-400 tracking-wider uppercase">
            <SlidersHorizontal className="w-3 h-3" /> Marketplace
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Template <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Library</span>
          </h1>
          <p className="text-zinc-400 text-base max-w-xl mx-auto leading-relaxed">
            Every template is built with React, Vite, and Tailwind — production-ready and built to customize.
          </p>
        </div>

        {/* Search Bar Row */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              placeholder="Search components or layouts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#09090b]/60 border border-zinc-900 text-sm text-white rounded-xl placeholder-zinc-600 focus:outline-none focus:border-zinc-800 focus:ring-1 focus:ring-indigo-500/30 backdrop-blur-sm transition-all"
            />
          </div>
        </div>

        {/* Categories Pills Filter */}
        <div className="flex flex-wrap justify-center items-center gap-2 max-w-3xl mx-auto mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 uppercase ${
                activeCategory === category
                  ? 'bg-white text-black shadow-md shadow-white/5 scale-[1.02]'
                  : 'bg-zinc-900/40 border border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Counter Summary */}
        <div className="mb-12 text-center">
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
            Showing <span className="text-zinc-200 font-bold">{filteredTemplates.length}</span> verified results
          </p>
        </div>

        {/* Empty State UI */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-24 max-w-sm mx-auto">
            <div className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-2xl w-fit mx-auto mb-4 text-zinc-600">
              <FolderOpen className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="text-base font-bold text-zinc-200 mb-1">No templates found</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">We couldn't find matches matching "{search}". Try searching for another term.</p>
          </div>
        ) : (
          /* Cards Grid Distribution */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-[#09090b]/40 border border-zinc-900 rounded-2xl overflow-hidden hover:border-zinc-800/80 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Top Interactive Thumbnail Area */}
                <div className="h-44 bg-gradient-to-b from-zinc-950 to-[#09090b] border-b border-zinc-900 flex items-center justify-center relative overflow-hidden">
                  {/* Subtle inner grid aura */}
                  <div className="absolute inset-0 bg-indigo-500/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="transform group-hover:scale-110 transition-transform duration-300 text-5xl">
                    {template.icon || '🌐'}
                  </div>
                </div>

                {/* Content Core Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">{template.category}</span>
                        <h3 className="text-lg font-bold text-zinc-200 tracking-tight mt-0.5 group-hover:text-white transition-colors">{template.title}</h3>
                      </div>
                      <span className="text-xl font-extrabold text-zinc-100 tracking-tight">${template.price}</span>
                    </div>

                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-4 font-normal font-sans">{template.description}</p>

                    {/* Tags Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {template.tags && template.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-zinc-900/60 border border-zinc-800/40 text-zinc-400 text-[11px] font-medium rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Micro Indicators Footer */}
                  <div>
                    <div className="flex justify-between items-center mb-5 pt-3 border-t border-zinc-900/60">
                      <div className="flex items-center gap-1 text-zinc-300 text-xs font-semibold">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{template.rating || 5.0}</span>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-500 text-xs font-medium tracking-tight">
                        <Download className="w-3 h-3 stroke-[2.5]" />
                        <span>{template.downloads ? template.downloads.toLocaleString() : 0} purchases</span>
                      </div>
                    </div>

                    {/* Dual Action CTA Buttons */}
                    <div className="flex gap-2.5">
                      <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 active:scale-[0.98] rounded-xl text-xs font-semibold transition-all">
                        Demo <ExternalLink className="w-3 h-3" />
                      </button>
                      <Link
                        to={`/template/${template.id}`}
                        className="flex-1 text-center px-3 py-2 bg-zinc-900 text-zinc-200 border border-zinc-800/80 hover:bg-white hover:text-black hover:border-white active:scale-[0.98] rounded-xl text-xs font-bold transition-all"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;