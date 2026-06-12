import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Sparkles, SearchCode } from 'lucide-react';
import { getTemplate, createCheckoutSession } from '../api';
import { useToast } from '../components/Toast';

const TemplateDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const toast = useToast();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    loadTemplate();

    const payment = searchParams.get('payment');
    if (payment === 'success') {
      toast('Payment successful! Check your email for download access.', 'success');
    } else if (payment === 'cancelled') {
      toast('Payment was cancelled.', 'info');
    }
  }, [id]);

  const loadTemplate = async () => {
    try {
      const data = await getTemplate(id);
      setTemplate(data);
    } catch (err) {
      setTemplate(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    setBuying(true);
    try {
      const { url } = await createCheckoutSession(template.id);
      window.location.href = url;
    } catch (err) {
      toast(err.message || 'Unable to start checkout.', 'error');
    } finally {
      setBuying(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#030303] min-h-screen flex items-center justify-center text-white">
        <div className="w-10 h-10 border-2 border-zinc-800 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // If template not found (404 Page)
  if (!template) {
    return (
      <div className="bg-[#030303] min-h-screen flex items-center justify-center text-white font-sans">
        <div className="text-center px-6 max-w-sm">
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl w-fit mx-auto mb-5 text-zinc-500">
            <SearchCode className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Template not found</h2>
          <p className="text-zinc-500 text-sm mb-8 leading-relaxed">The template you're looking for doesn't exist or may have been moved.</p>
          <Link to="/templates" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-zinc-200 active:scale-[0.98] transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to templates
          </Link>
        </div>
      </div>
    );
  }

  const features = template.features || [
    'Production-ready React + Tailwind code',
    'Fully responsive layout',
    'Clean, well-organized components',
    'Easy to customize and extend',
    'Dark mode friendly design',
    'Lifetime updates included',
  ];

  return (
    <div className="bg-[#030303] min-h-screen text-white font-sans antialiased selection:bg-indigo-500/30">
      <div className="container mx-auto px-6 py-16 max-w-5xl relative">

        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-indigo-500/5 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Back Link Button */}
        <Link to="/templates" className="group inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-white uppercase tracking-wider mb-10 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" /> Back to templates
        </Link>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Core Info & Details */}
          <div className="lg:col-span-7 space-y-10">

            {/* Header Content */}
            <div className="flex flex-col items-start">
              <div className="p-3.5 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl mb-5 shadow-inner text-4xl">
                {template.icon || '🌐'}
              </div>
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="px-2.5 py-0.5 bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-xs font-medium rounded-md">
                  {template.category}
                </span>
                <span className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-md">
                  Instant Download
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">{template.title}</h1>
              <p className="text-zinc-400 text-base leading-relaxed font-normal">{template.description}</p>
            </div>

            {/* About Section */}
            <div className="border-t border-zinc-900 pt-8">
              <h2 className="text-lg font-bold tracking-tight text-zinc-200 mb-3.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" /> About this template
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
                {template.fullDescription || template.description}
              </p>
            </div>

            {/* Features Grid */}
            <div className="border-t border-zinc-900 pt-8">
              <h2 className="text-lg font-bold tracking-tight text-zinc-200 mb-4">Key features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start text-zinc-400 text-sm leading-snug">
                    <div className="p-0.5 bg-zinc-900 text-indigo-400 rounded-full mr-3 shrink-0 border border-zinc-800/50">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-zinc-300 text-sm font-normal">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            {template.tags && template.tags.length > 0 && (
              <div className="border-t border-zinc-900 pt-8">
                <h2 className="text-lg font-bold tracking-tight text-zinc-200 mb-4">Built with</h2>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-[#09090b] border border-zinc-900 text-zinc-400 rounded-xl text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Checkout Sticky Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <div className="bg-[#09090b]/40 border border-zinc-900 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-xl shadow-black/20 text-center">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest block mb-1">Pricing</span>
              <div className="text-5xl font-extrabold tracking-tight text-white mb-2">${template.price}</div>
              <p className="text-zinc-500 text-xs font-medium mb-8 uppercase tracking-wider">One-time payment · Lifetime updates</p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleBuyNow}
                  disabled={buying}
                  className="w-full py-3.5 bg-white text-black font-semibold rounded-xl text-sm hover:bg-zinc-200 active:scale-[0.99] transition-all shadow-md shadow-white/5 disabled:opacity-50"
                >
                  {buying ? 'Redirecting...' : 'Buy Now'}
                </button>
                <button className="w-full py-3.5 bg-zinc-900/50 border border-zinc-800 text-zinc-300 font-medium rounded-xl text-sm hover:border-zinc-700 hover:text-white active:scale-[0.99] transition-all">
                  Live Preview Demo
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-900/60 flex flex-col items-center gap-2 text-[11px] text-zinc-500 font-medium uppercase tracking-wider">
                <div>🔒 Secure Checkout via Stripe</div>
                <div>⚡ Instant access via email & GitHub</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TemplateDetails;
