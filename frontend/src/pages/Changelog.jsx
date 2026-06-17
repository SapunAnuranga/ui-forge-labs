import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Sparkles, Zap, Bug, GitBranch } from 'lucide-react';

const ChangelogPage = () => {
  const changelog = [
    {
      version: "v1.3.0",
      date: "June 15, 2026",
      badge: "Major",
      color: "emerald",
      changes: [
        { type: "added", label: "New template category: SaaS Dashboards" },
        { type: "added", label: "Dark/Light mode toggle component added to all templates" },
        { type: "improved", label: "Mobile navigation experience" },
        { type: "fixed", label: "Hero section responsiveness on tablet devices" },
      ]
    },
    {
      version: "v1.2.1",
      date: "May 28, 2026",
      badge: "Patch",
      color: "amber",
      changes: [
        { type: "fixed", label: "Navbar active link highlighting bug" },
        { type: "improved", label: "License page design & readability" },
        { type: "added", label: "New pricing tier visuals" },
      ]
    },
    {
      version: "v1.2.0",
      date: "May 10, 2026",
      badge: "Minor",
      color: "purple",
      changes: [
        { type: "added", label: "Extended License option" },
        { type: "added", label: "New AI-powered template previews" },
        { type: "improved", label: "Overall site performance and loading speed" },
      ]
    },
    {
      version: "v1.1.0",
      date: "April 22, 2026",
      badge: "Major",
      color: "indigo",
      changes: [
        { type: "added", label: "10+ new premium templates" },
        { type: "added", label: "Changelog page" },
        { type: "improved", label: "Template filtering and search" },
        { type: "fixed", label: "Various styling inconsistencies" },
      ]
    },
    {
      version: "v1.0.0",
      date: "March 15, 2026",
      badge: "Launch",
      color: "white",
      changes: [
        { type: "added", label: "Official launch of UI Forge Labs" },
        { type: "added", label: "Initial 15 website templates" },
        { type: "added", label: "Personal, Commercial & Extended licensing system" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-200">
      {/* Navbar */}
      

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl">
            <GitBranch className="w-9 h-9 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-white">Changelog</h1>
            <p className="text-zinc-500 mt-2">Stay up to date with the latest improvements</p>
          </div>
        </div>

        <div className="space-y-12">
          {changelog.map((release, index) => (
            <div key={index} className="relative pl-8 border-l border-zinc-800">
              {/* Timeline Dot */}
              <div className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-indigo-500 border-4 border-[#030303]" />

              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-mono font-bold text-white">{release.version}</span>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-${release.color}-500/10 text-${release.color}-400`}>
                    {release.badge}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-zinc-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {release.date}
                </div>
              </div>

              <div className="space-y-4">
                {release.changes.map((change, i) => (
                  <div key={i} className="flex gap-4 text-zinc-300">
                    <div className="mt-1">
                      {change.type === "added" && <Sparkles className="w-5 h-5 text-emerald-400" />}
                      {change.type === "improved" && <Zap className="w-5 h-5 text-amber-400" />}
                      {change.type === "fixed" && <Bug className="w-5 h-5 text-rose-400" />}
                    </div>
                    <p>{change.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-20 pt-12 border-t border-zinc-800 text-center">
          <p className="text-zinc-500 text-sm">
            We’re constantly improving UI Forge Labs.<br />
            More updates coming soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangelogPage;