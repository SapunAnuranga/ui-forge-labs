import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, Shield, FileText, Zap } from 'lucide-react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is UI Forge Labs?",
      answer: "UI Forge Labs is a premium marketplace offering high-quality, modern React + Tailwind CSS website templates. Our templates are designed for speed, beauty, and developer experience.",
      icon: HelpCircle
    },
    {
      question: "How does the licensing work?",
      answer: "We offer three license types: Personal (for your own projects), Commercial (for one client), and Extended (for agencies and multiple clients). Each license has different permissions. Full details are available on our License page.",
      icon: Shield
    },
    {
      question: "Can I modify and customize the templates?",
      answer: "Yes! All templates are fully customizable. You can change colors, content, layout, and add new features. The code is clean and well-commented.",
      icon: Zap
    },
    {
      question: "Are the templates responsive?",
      answer: "Absolutely. All our templates are built mobile-first and fully responsive across all devices — from mobile phones to large desktop screens.",
      icon: FileText
    },
    {
      question: "What is included in each template purchase?",
      answer: "You get the complete source code (React + Tailwind), all assets (images, icons), documentation, and lifetime access to updates for your license tier.",
      icon: FileText
    },
    {
      question: "Do you offer refunds?",
      answer: "We have a 14-day money-back guarantee. Refunds are available if you're not satisfied, provided you haven't violated our license terms. See our Refund Policy for details.",
      icon: Shield
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer installation help, bug fixes, and minor configuration support. We do not provide custom development or third-party integrations. Support response time is usually within 48 hours.",
      icon: HelpCircle
    },
    {
      question: "Can I use a template for multiple client projects?",
      answer: "Only with the Extended License. The Commercial License allows usage for only one client project. Please choose your license carefully.",
      icon: Shield
    },
    {
      question: "How do I receive updates?",
      answer: "Updates are automatically available in your dashboard. Extended license holders get priority access to new features and templates.",
      icon: Zap
    },
    {
      question: "Are the templates compatible with Next.js?",
      answer: "Most templates are built with Create React App but can be easily migrated to Next.js. We are gradually adding official Next.js versions.",
      icon: FileText
    }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-200">
     

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl">
            <HelpCircle className="w-9 h-9 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-white">Frequently Asked Questions</h1>
            <p className="text-zinc-500 mt-2">Everything you need to know about UI Forge Labs</p>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden transition-all duration-200 hover:border-zinc-700"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-4">
                    <Icon className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    <span className="font-medium text-lg text-white group-hover:text-indigo-300 transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 px-8 ${
                    isOpen ? 'max-h-96 pb-8' : 'max-h-0'
                  }`}
                >
                  <div className="text-zinc-400 leading-relaxed border-t border-zinc-800 pt-6">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-16 text-center bg-zinc-900/50 border border-zinc-800 rounded-3xl p-10">
          <h3 className="text-2xl font-semibold text-white mb-3">Still have questions?</h3>
          <p className="text-zinc-400 mb-6">
            Our team is happy to help. Reach out and we'll get back to you within 24-48 hours.
          </p>
          <a
            href="mailto:hello@uiforgelabs.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-2xl font-semibold hover:bg-zinc-200 transition-all"
          >
            Contact Support
          </a>
        </div>

        <div className="mt-12 text-center text-xs text-zinc-500">
          Last updated: June 2026
        </div>
      </div>
    </div>
  );
};

export default FAQPage;