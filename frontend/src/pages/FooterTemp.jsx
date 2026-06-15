import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Sparkles, ShoppingCart } from 'lucide-react';

const TemplatesPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Portfolio', 'SaaS', 'E-commerce', 'Agency', 'Dashboard'];

  const templates = [
    {
      id: 1,
      title: "Nova Portfolio",
      price: 39,
      category: "Portfolio",
      description: "A minimalist dark portfolio with bold typography and silky motion.",
      tech: ["React", "Vite", "Tailwind", "Framer Motion"],
      image: "https://picsum.photos/id/1015/600/400", // Replace with real image later
      liveDemo: "#",
      customize: "/customize/nova"
    },
    {
      id: 2,
      title: "Atlas SaaS",
      price: 49,
      category: "SaaS",
      description: "Modern SaaS landing with pricing, testimonials and feature grid.",
      tech: ["React", "Vite", "Tailwind", "TypeScript"],
      image: "https://picsum.photos/id/201/600/400",
      liveDemo: "#",
      customize: "/customize/atlas"
    },
    {
      id: 3,
      title: "Lumen Shop",
      price: 59,
      category: "E-commerce",
      description: "Premium e-commerce storefront with product detail and cart.",
      tech: ["React", "Vite", "Tailwind", "Zustand"],
      image: "https://picsum.photos/id/106/600/400",
      liveDemo: "#",
      customize: "/customize/lumen"
    },
    // Add more templates here as needed
  ];

  const filteredTemplates = activeCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-200">
      {/* Navbar */}
      <nav className="bg-[#030303]/80 border-b border-zinc-900 sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 max-w-6xl">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
              UI Forge<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Labs</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm text-zinc-400 hover:text-white transition-colors">Home</Link>
              <Link to="/templates" className="text-sm text-white font-medium">Templates</Link>
              <Link to="/pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</Link>
              <Link to="/license" className="text-sm text-zinc-400 hover:text-white transition-colors">License</Link>
              <Link to="/docs" className="text-sm text-zinc-400 hover:text-white transition-colors">Docs</Link>
              <Link to="/faq" className="text-sm text-zinc-400 hover:text-white transition-colors">FAQ</Link>
            </div>

            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-2xl text-sm font-semibold hover:bg-zinc-200 transition-all"
            >
              Upgrade License
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black tracking-tighter text-white mb-4">
            Premium Templates
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Beautifully crafted React + Tailwind templates. Production-ready, fully customizable, and loved by developers.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-white text-black'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-xs font-mono rounded-full border border-zinc-700">
                  {template.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white">{template.title}</h3>
                  <div className="text-right">
                    <span className="text-3xl font-semibold text-white">${template.price}</span>
                  </div>
                </div>

                <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
                  {template.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {template.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <a
                    href={template.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-2xl text-sm font-semibold transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                  <Link
                    to={template.customize}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black rounded-2xl text-sm font-semibold hover:bg-zinc-200 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    Customize
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Need something custom?</h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            Looking for a unique design or specific functionality? We offer custom template development.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-semibold hover:bg-zinc-100 transition-all"
          >
            Request Custom Template
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;