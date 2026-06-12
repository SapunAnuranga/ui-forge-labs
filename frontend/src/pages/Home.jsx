import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Paintbrush, Zap, ArrowRight, Star, ShoppingCart, Rocket } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Code2 className="w-6 h-6 text-indigo-400" />,
      title: "Production-ready",
      description: "Clean, typed code. No spaghetti, no surprises."
    },
    {
      icon: <Paintbrush className="w-6 h-6 text-purple-400" />,
      title: "Pixel-perfect design",
      description: "Crafted by designers who actually ship."
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: "Lightning fast",
      description: "Optimized assets and lazy loading by default."
    }
  ];

  const featuredTemplates = [
    {
      id: 1,
      title: "Nova Portfolio",
      category: "Portfolio",
      price: 39,
      description: "A minimalist dark portfolio with bold typography and silky motion.",
      icon: <Paintbrush className="w-5 h-5 text-purple-400" />,
      tags: ["React", "Vite", "Tailwind", "Framer Motion"]
    },
    {
      id: 2,
      title: "Atlas SaaS",
      category: "SaaS",
      price: 49,
      description: "Modern SaaS landing with pricing, testimonials and feature grid.",
      icon: <Rocket className="w-5 h-5 text-indigo-400" />,
      tags: ["React", "Vite", "Tailwind", "TypeScript"]
    },
    {
      id: 3,
      title: "Lumen Shop",
      category: "E-commerce",
      price: 59,
      description: "Premium e-commerce storefront with product detail and cart.",
      icon: <ShoppingCart className="w-5 h-5 text-emerald-400" />,
      tags: ["React", "Vite", "Tailwind", "Zustand"]
    }
  ];

  const testimonials = [
    {
      text: "These templates saved us weeks. The code quality is on par with anything we'd write in-house.",
      name: "Sarah Chen",
      role: "Founder, Northstar"
    },
    {
      text: "I've launched three products on LumenUI. It's the only template shop I keep coming back to.",
      name: "Marcus Rivera",
      role: "Indie Hacker"
    },
    {
      text: "Beautifully composed, thoughtfully animated. You can tell a real designer touched every pixel.",
      name: "Aiko Tanaka",
      role: "Design Engineer"
    }
  ];

  return (
    <div className="bg-[#030303] min-h-screen text-white font-sans antialiased selection:bg-indigo-500/30">
      
      {/* Hero Section */}
      <section className="relative container mx-auto px-6 py-24 md:py-32 text-center overflow-hidden">
        {/* Decorative Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-20 left-1/3 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-zinc-900/80 border border-zinc-800/60 backdrop-blur-md rounded-full text-xs font-medium text-zinc-300">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          New: 6 templates added this month
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.1]">
          Premium templates, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            crafted to ship.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          A curated library of React + Tailwind templates for portfolios, SaaS, dashboards,
          and stores — designed for developers who care about the details.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/templates" className="w-full sm:w-auto px-6 py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-white/5 text-sm text-center">
            Browse templates
          </Link>
          <Link to="/pricing" className="w-full sm:w-auto px-6 py-3.5 bg-zinc-900/50 border border-zinc-800 text-zinc-300 font-medium rounded-xl hover:border-zinc-700 hover:text-white active:scale-[0.98] transition-all duration-200 backdrop-blur-sm text-sm text-center">
            View pricing
          </Link>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 mt-16 text-xs font-medium text-zinc-500 uppercase tracking-wider">
          <div className="flex items-center gap-1.5 bg-zinc-900/30 px-3 py-1.5 rounded-lg border border-zinc-900">
            <div className="flex text-amber-500 gap-0.5"><Star className="w-3.5 h-3.5 fill-current" /></div>
            <span className="text-zinc-400">4.9/5 from 1200+ devs</span>
          </div>
          <span className="hidden sm:inline text-zinc-800">•</span>
          <div>Lifetime updates</div>
          <span className="hidden sm:inline text-zinc-800">•</span>
          <div>MIT-friendly license</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#09090b]/60 border-y border-zinc-900 py-20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center md:items-start text-center md:text-left group">
                <div className="p-3 bg-zinc-900/80 border border-zinc-800/50 rounded-xl mb-4 group-hover:border-zinc-700 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-zinc-200 mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Templates Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-14 max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Featured templates</h2>
            <p className="text-zinc-400 mt-1 text-sm">Hand-picked starting points for your next project.</p>
          </div>
          <Link to="/templates" className="group inline-flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            View all templates <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredTemplates.map((template) => (
            <div key={template.id} className="bg-[#09090b]/40 border border-zinc-900 rounded-2xl p-6 hover:border-zinc-800/80 hover:bg-[#0c0c0e]/50 transition-all duration-300 flex flex-col group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800/60">
                    {template.icon}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">{template.category}</span>
                    <h3 className="text-lg font-bold text-zinc-100 mt-0.5 group-hover:text-white transition-colors">{template.title}</h3>
                  </div>
                </div>
                <span className="text-base font-bold bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800/40">${template.price}</span>
              </div>
              
              <p className="text-zinc-400 text-sm mb-5 flex-grow leading-relaxed">{template.description}</p>
              
              <div className="flex flex-wrap gap-1.5 mb-6">
                {template.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-zinc-900/80 border border-zinc-800/50 text-zinc-400 text-[11px] font-medium rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3 mt-auto">
                <button className="flex-1 px-3 py-2 border border-zinc-800 text-zinc-300 font-medium rounded-xl text-xs hover:border-zinc-700 hover:text-white transition-colors">
                  Live Demo
                </button>
                <Link to={`/template/${template.id}`} className="flex-1 text-center px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl text-xs hover:opacity-90 active:scale-[0.98] transition-all">
                  Customize
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#09090b]/60 border-y border-zinc-900 py-24 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Loved by builders worldwide</h2>
            <p className="text-zinc-400 text-sm">See how developers scale their shipping speed.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#030303]/80 rounded-2xl p-6 border border-zinc-900 flex flex-col justify-between hover:border-zinc-800 transition-colors">
                <p className="text-zinc-300 text-sm italic leading-relaxed mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-3 border-t border-zinc-900 pt-4">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-80 flex items-center justify-center font-bold text-xs text-white">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-200">{testimonial.name}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative container mx-auto px-6 py-28 text-center overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        
        <div className="max-w-xl mx-auto bg-gradient-to-b from-zinc-900/30 to-zinc-950/10 p-8 md:p-12 border border-zinc-900 rounded-3xl backdrop-blur-sm">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Ready to ship faster?</h2>
          <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
            Get instant access to every template, with lifetime updates included.
          </p>
          <Link to="/pricing" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 active:scale-[0.98] transition-all text-sm">
            See pricing <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;