import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/templates', label: 'Templates' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#030303]/80 border-b border-zinc-900 sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 max-w-6xl">
        <div className="flex justify-between items-center">
          
          <Link to="/" className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
            UI Forge<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Labs</span>
          </Link>

          <div className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors relative py-1 ${
                  isActive(link.to) ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              to="/templates"
              className="inline-flex items-center gap-1 px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-xl text-xs font-bold hover:bg-white hover:text-black hover:border-white transition-all duration-200"
            >
              Browse <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <button
            className="md:hidden text-zinc-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-1.5 border-t border-zinc-900 pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  isActive(link.to)
                    ? 'text-white bg-zinc-900/60 border border-zinc-800/40'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/30'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to="/templates"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-5 py-3 bg-white text-black rounded-xl text-xs font-bold transition-all"
              >
                Browse Marketplace
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;