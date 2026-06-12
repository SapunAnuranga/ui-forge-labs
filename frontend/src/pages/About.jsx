import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Code2, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '24+', label: 'Templates shipped' },
    { number: '1.2k', label: 'Happy developers' },
    { number: '4.9', label: 'Avg rating' },
    { number: '48k+', label: 'Hours saved' },
  ];

  const principles = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
      title: 'Quality over quantity',
      description: "We'd rather ship one perfect template than ten mediocre ones.",
    },
    {
      icon: <Code2 className="w-5 h-5 text-purple-400" />,
      title: 'Clean, typed code',
      description: "If you can't read it in five minutes, we rewrite it.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      title: 'Motion with intent',
      description: 'Animation should clarify — never decorate.',
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-emerald-400" />,
      title: 'Lifetime updates',
      description: 'Buy once. Receive every future update at no extra cost.',
    },
  ];

  const team = [
    {
      name: 'Aiden Park',
      role: 'Design Engineer',
      avatar: 'AP',
      color: 'from-blue-500/20 to-indigo-500/20 border-indigo-500/30 text-indigo-300',
    },
    {
      name: 'Mia Torres',
      role: 'Frontend Developer',
      avatar: 'MT',
      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300',
    },
    {
      name: 'Lucas Müller',
      role: 'Motion Designer',
      avatar: 'LM',
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300',
    },
  ];

  return (
    <div className="bg-[#030303] min-h-screen text-white font-sans antialiased selection:bg-indigo-500/30">

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 pt-24 pb-16 text-center overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-gradient-to-b from-indigo-500/10 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="inline-block mb-5 px-3 py-1 bg-zinc-900/80 border border-zinc-800/60 backdrop-blur-md rounded-full text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
          Our Story
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.15]">
          Built by developers,<br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            for developers.
          </span>
        </h1>
        
        <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          LumenUI started as a side project — a place to collect the patterns, components, and layouts
          we kept rebuilding for every new client. It turned out other developers wanted them too.
        </p>
      </section>

      {/* Stats Section */}
      <section className="border-y border-zinc-900/80 bg-[#09090b]/40 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-14 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-4xl font-extrabold text-zinc-100 mb-1 tracking-tight group-hover:text-white transition-colors">
                  {stat.number}
                </div>
                <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative/Story Section */}
      <section className="container mx-auto px-6 py-24 relative">
        <div className="max-w-2xl mx-auto space-y-6 text-zinc-400 leading-relaxed text-base md:text-[1.05rem]">
          <p>
            Today we craft a small, opinionated library of React + Tailwind templates. Every template
            ships with clean, typed code, thoughtful animation, and zero filler. No bloated starter
            kits, no half-finished pages, no UI kits you'll never use.
          </p>
          <p>
            We obsess over the details so you can focus on the work that only you can do. Every pixel
            is intentional. Every component is production-ready on day one.
          </p>
        </div>
      </section>

      {/* Principles Section */}
      <section className="bg-[#09090b]/50 border-y border-zinc-900 py-24 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Our principles</h2>
            <p className="text-zinc-500 text-sm">The rules we never break.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {principles.map((p, i) => (
              <div
                key={i}
                className="bg-[#030303]/60 border border-zinc-900 rounded-2xl p-6 hover:border-zinc-800 hover:bg-[#0c0c0e]/60 transition-all duration-300 group"
              >
                <div className="p-2.5 bg-zinc-900/50 border border-zinc-800/40 rounded-xl mb-4 w-fit group-hover:border-zinc-700 transition-colors">
                  {p.icon}
                </div>
                <h3 className="text-zinc-200 font-bold text-base mb-2 group-hover:text-white transition-colors">{p.title}</h3>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">The team</h2>
          <p className="text-zinc-500 text-sm">Small by design. Focused by choice.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <div key={i} className="bg-[#09090b]/20 border border-zinc-900/60 rounded-2xl p-6 text-center hover:border-zinc-800 transition-colors">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} border flex items-center justify-center mx-auto mb-4 shadow-inner`}
              >
                <span className="font-bold text-base tracking-wide">{member.avatar}</span>
              </div>
              <p className="text-zinc-200 font-bold text-sm tracking-tight">{member.name}</p>
              <p className="text-zinc-500 text-xs mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 pb-24">
        <div className="max-w-2xl mx-auto bg-gradient-to-b from-zinc-900/40 to-zinc-950/10 border border-zinc-900 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Ready to ship faster?</h2>
          <p className="text-zinc-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Browse the full template library and find your next starting point.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/templates"
              className="w-full sm:w-auto px-6 py-3 bg-white text-black rounded-xl text-sm font-semibold hover:bg-zinc-200 active:scale-[0.98] transition-all text-center shadow-md"
            >
              Browse templates
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-6 py-3 border border-zinc-800 text-zinc-300 rounded-xl text-sm font-medium hover:border-zinc-700 hover:text-white active:scale-[0.98] transition-all text-center backdrop-blur-sm"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;