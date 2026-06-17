import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Users, Briefcase, Building } from 'lucide-react';

const LicensePage = () => {
  return (
    <div className="min-h-screen bg-[#030303] text-zinc-200">
      

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-zinc-900 rounded-2xl">
            <Shield className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-white">License Agreement</h1>
            <p className="text-zinc-500 mt-1">Last Updated: July 2026</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none prose-zinc">
          <p className="text-lg text-zinc-400 leading-relaxed">
            Welcome to <span className="text-white font-medium">UI Forge Labs</span>. 
            By purchasing, downloading, or using our templates, you agree to the following license terms.
          </p>

          {/* Personal License */}
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-6">
              <Users className="w-7 h-7 text-emerald-400" />
              <h2 className="text-3xl font-bold text-white">Personal License</h2>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8">
              <p className="text-zinc-400 mb-6">This license allows you to:</p>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✅</span>
                  Use the template for one personal website
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✅</span>
                  Modify the design and content
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✅</span>
                  Use the template for non-commercial projects
                </li>
              </ul>
              <div className="h-px bg-zinc-800 my-6" />
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">❌</span>
                  Resell the template
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">❌</span>
                  Redistribute the source code
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">❌</span>
                  Claim the template as your own work
                </li>
              </ul>
            </div>
          </div>

          {/* Commercial License */}
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-6">
              <Briefcase className="w-7 h-7 text-amber-400" />
              <h2 className="text-3xl font-bold text-white">Commercial License</h2>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8">
              <p className="text-zinc-400 mb-6">This license allows you to:</p>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✅</span>
                  Use the template for one client project
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✅</span>
                  Modify the design, components, and content
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✅</span>
                  Deploy the website for commercial use
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✅</span>
                  Charge your client for development services
                </li>
              </ul>
              <div className="h-px bg-zinc-800 my-6" />
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">❌</span>
                  Resell the template itself
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">❌</span>
                  Share source files publicly
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">❌</span>
                  Use the same license for multiple client projects
                </li>
              </ul>
            </div>
          </div>

          {/* Extended License */}
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-6">
              <Building className="w-7 h-7 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">Extended License</h2>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8">
              <p className="text-zinc-400 mb-6">This license allows you to:</p>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✅</span>
                  Use the template in multiple commercial projects
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✅</span>
                  Create websites for multiple clients
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✅</span>
                  Customize and modify without restrictions
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✅</span>
                  Use in agency workflows
                </li>
              </ul>
              <div className="h-px bg-zinc-800 my-6" />
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">❌</span>
                  Sell the original template as a competing product
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">❌</span>
                  Redistribute source code files
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">❌</span>
                  Upload the template to marketplaces
                </li>
              </ul>
            </div>
          </div>

          {/* Prohibited Uses */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-6">Prohibited Uses</h2>
            <div className="bg-red-950/30 border border-red-900/50 rounded-3xl p-8">
              <p className="text-zinc-400 mb-6">You may NOT:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  Resell templates purchased from UI Forge Labs
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  Share template source code publicly
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  Upload templates to ThemeForest, Creative Market, GitHub, or similar marketplaces
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  Remove copyright notices where applicable
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  Use templates for illegal activities
                </li>
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-6">Intellectual Property</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 leading-relaxed text-zinc-300">
              All templates, designs, code, graphics, and assets remain the intellectual property of 
              <span className="text-white font-medium"> UI Forge Labs</span>. 
              Purchasing a template grants a license to use the product, <span className="font-medium">not ownership</span> of the original source work.
            </div>
          </div>

          {/* Support Policy */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-6">Support Policy</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-zinc-900/50 border border-emerald-900/30 rounded-3xl p-8">
                <h3 className="font-semibold text-emerald-400 mb-4">Support Includes</h3>
                <ul className="space-y-3 text-sm">
                  <li>• Installation assistance</li>
                  <li>• Bug fixes</li>
                  <li>• Minor configuration help</li>
                </ul>
              </div>
              <div className="bg-zinc-900/50 border border-rose-900/30 rounded-3xl p-8">
                <h3 className="font-semibold text-rose-400 mb-4">Support Does Not Include</h3>
                <ul className="space-y-3 text-sm">
                  <li>• Custom feature development</li>
                  <li>• Major design changes</li>
                  <li>• Third-party integrations</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              Customers may receive updates based on their license plan.
            </p>
          </div>

          {/* Recommended Plans */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-white mb-8">Recommended License Plans</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-zinc-900 rounded-3xl overflow-hidden">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="px-8 py-6 text-left text-sm font-semibold text-zinc-400">License</th>
                    <th className="px-8 py-6 text-left text-sm font-semibold text-zinc-400">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="px-8 py-6 font-medium text-white">Personal</td>
                    <td className="px-8 py-6 text-zinc-400">Students, portfolios, personal websites</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-6 font-medium text-white">Commercial</td>
                    <td className="px-8 py-6 text-zinc-400">Freelancers, small businesses</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-6 font-medium text-white">Extended</td>
                    <td className="px-8 py-6 text-zinc-400">Agencies, multiple client projects</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Legal */}
          <div className="mt-20 pt-12 border-t border-zinc-800 text-sm text-zinc-500 space-y-8">
            <div>
              <h3 className="font-semibold text-zinc-400 mb-3">Refund Policy</h3>
              <p>Please review our <Link to="/refund" className="text-indigo-400 hover:underline">Refund Policy</Link> page before making a purchase.</p>
            </div>

            <div>
              <h3 className="font-semibold text-zinc-400 mb-3">Termination</h3>
              <p>Violation of these license terms may result in immediate termination of your license without refund.</p>
            </div>

            <div>
              <h3 className="font-semibold text-zinc-400 mb-3">Contact</h3>
              <p>
                For licensing questions, contact:<br />
                <span className="text-white">hello@uiforgelabs.com</span><br />
                <a href="https://www.uiforgelabs.com" className="text-indigo-400 hover:underline">www.uiforgelabs.com</a>
              </p>
            </div>

            <div className="text-xs pt-8 border-t border-zinc-800">
              © 2026 UI Forge Labs. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicensePage;