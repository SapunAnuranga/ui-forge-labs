import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Download, Code2, Palette, Globe, Zap, Shield } from 'lucide-react';

const DocumentationPage = () => {
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
              <Link to="/templates" className="text-sm text-zinc-400 hover:text-white transition-colors">Templates</Link>
              <Link to="/pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</Link>
              <Link to="/license" className="text-sm text-zinc-400 hover:text-white transition-colors">License</Link>
              <Link to="/changelog" className="text-sm text-zinc-400 hover:text-white transition-colors">Changelog</Link>
              <Link to="/faq" className="text-sm text-zinc-400 hover:text-white transition-colors">FAQ</Link>
            </div>

            <Link
              to="/templates"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-2xl text-sm font-semibold hover:bg-zinc-200 transition-all"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl">
            <BookOpen className="w-9 h-9 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-white">Documentation</h1>
            <p className="text-zinc-500 mt-2">Complete guide to using UI Forge Labs templates</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none prose-zinc">
          
          {/* Quick Start */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-indigo-400" /> Quick Start
            </h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-mono font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-white">Download the template</h4>
                  <p className="text-zinc-400">After purchase, download the .zip file from your dashboard.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-mono font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-white">Extract and install</h4>
                  <p className="text-zinc-400">Run <code className="bg-zinc-800 px-2 py-1 rounded">npm install</code> then <code className="bg-zinc-800 px-2 py-1 rounded">npm run dev</code></p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-mono font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-white">Start customizing</h4>
                  <p className="text-zinc-400">Edit components, change colors, and update content.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Installation */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Installation</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 font-mono text-sm">
              <pre className="text-emerald-400">
{`# 1. Extract the downloaded zip
# 2. Navigate to the project folder
cd my-template

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev`}
              </pre>
            </div>
          </div>

          {/* Folder Structure */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Folder Structure</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-sm overflow-auto">
              <pre className="text-zinc-400">
{`src/
├── components/          # Reusable components
├── pages/              # Main pages
├── assets/             # Images and static files
├── styles/             # Global styles (if any)
├── App.jsx
├── main.jsx
├── index.css
public/
package.json
tailwind.config.js
README.md`}
              </pre>
            </div>
          </div>

          {/* Customization Guide */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-6">
              <Palette className="w-8 h-8 text-purple-400" /> Customization Guide
            </h2>
            <div className="space-y-8">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8">
                <h3 className="font-semibold text-lg text-white mb-4">Changing Colors</h3>
                <p className="text-zinc-400">Edit the Tailwind config or replace the color classes (indigo, purple, zinc) throughout the components.</p>
              </div>
              
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8">
                <h3 className="font-semibold text-lg text-white mb-4">Adding New Sections</h3>
                <p className="text-zinc-400">Copy existing components and modify them. All components are built with React and fully modular.</p>
              </div>
              
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8">
                <h3 className="font-semibold text-lg text-white mb-4">Replacing Images</h3>
                <p className="text-zinc-400">Replace images in the <code className="bg-zinc-800 px-2 py-0.5 rounded">/src/assets</code> folder. All images are optimized.</p>
              </div>
            </div>
          </div>

          {/* Deployment */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-6">
              <Globe className="w-8 h-8 text-emerald-400" /> Deployment
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                <h3 className="font-semibold text-white mb-3">Vercel (Recommended)</h3>
                <p className="text-sm text-zinc-400">Connect your GitHub repo and deploy with zero configuration.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                <h3 className="font-semibold text-white mb-3">Netlify</h3>
                <p className="text-sm text-zinc-400">Drag & drop the build folder or connect Git repository.</p>
              </div>
            </div>
          </div>

          {/* License & Support */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Important Notes</h2>
            <div className="bg-zinc-900 border border-amber-900/30 rounded-3xl p-8 space-y-6 text-sm">
              <div className="flex gap-4">
                <Shield className="w-6 h-6 text-amber-400 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-400">License Reminder</p>
                  <p className="text-zinc-400">Make sure you are using the template according to your purchased license (Personal / Commercial / Extended).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Code2 className="w-6 h-6 text-indigo-400 mt-0.5" />
                <div>
                  <p className="font-medium text-indigo-400">Need Help?</p>
                  <p className="text-zinc-400">Check our <Link to="/faq" className="text-indigo-400 hover:underline">FAQ</Link> or contact support at hello@uiforgelabs.com</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-20 text-center text-xs text-zinc-500">
          Last Updated: June 2026
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;