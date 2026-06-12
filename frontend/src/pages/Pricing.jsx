import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Single",
      price: "$39",
      period: "one-time",
      description: "Perfect for one project.",
      features: [
        "1 template of your choice",
        "Lifetime updates",
        "Use in 1 project",
        "Email support"
      ],
      popular: false,
      buttonText: "Get Single"
    },
    {
      name: "Pro",
      price: "$149",
      period: "one-time",
      description: "Most popular. All templates.",
      features: [
        "Every current template",
        "Lifetime updates",
        "Use in unlimited projects",
        "Priority support",
        "Early access"
      ],
      popular: true,
      buttonText: "Get Pro"
    },
    {
      name: "Team",
      price: "$399",
      period: "one-time",
      description: "For agencies & teams.",
      features: [
        "Everything in Pro",
        "Up to 10 developers",
        "Client projects allowed",
        "1-on-1 onboarding call",
        "Dedicated Slack channel"
      ],
      popular: false,
      buttonText: "Get Team"
    }
  ];

  return (
    <div className="bg-[#030303] min-h-screen text-white font-sans antialiased selection:bg-indigo-500/30 flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full mx-auto relative">
        
        {/* Decorative Ambient Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1 bg-zinc-900/80 border border-zinc-800/60 backdrop-blur-md rounded-full text-[11px] font-semibold text-indigo-400 tracking-wider uppercase">
            Pricing Plans
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Simple, honest <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">pricing</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Pay once. Own forever. Lifetime updates included on every plan.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-[#09090b]/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border flex flex-col justify-between hover:bg-[#0c0c0e]/60 transition-all duration-300 group ${
                plan.popular 
                  ? 'border-indigo-500/50 shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-500/30' 
                  : 'border-zinc-900 hover:border-zinc-800'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] tracking-widest font-extrabold rounded-full uppercase shadow-md shadow-indigo-500/20">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              {/* Plan Metadata */}
              <div>
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">{plan.name}</h3>
                <p className="text-zinc-500 text-xs mt-1 mb-6 leading-relaxed">{plan.description}</p>
                
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-white">{plan.price}</span>
                  <span className="text-zinc-500 text-xs font-medium">/{plan.period}</span>
                </div>
                
                <div className="h-px bg-zinc-900 w-full mb-6" />
                
                {/* Features List */}
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-zinc-300 text-sm leading-tight">
                      <div className={`p-0.5 rounded-full mr-3 mt-0.5 shrink-0 ${
                        plan.popular ? 'bg-indigo-500/10 text-indigo-400' : 'bg-zinc-900 text-zinc-400'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="text-zinc-300 text-xs md:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* CTA Button */}
              <Link
                to="/contact"
                className={`block w-full text-center py-3 rounded-xl font-semibold text-xs md:text-sm active:scale-[0.99] transition-all duration-200 ${
                  plan.popular
                    ? 'bg-white text-black hover:bg-zinc-200 shadow-md shadow-white/5'
                    : 'bg-zinc-900/50 border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Pricing;