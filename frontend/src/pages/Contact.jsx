import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';
import { sendMessage } from '../api';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await sendMessage(formData);
      toast("Message sent! We'll get back to you soon.", 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      navigate('/');
    } catch (err) {
      toast(err.message || 'Failed to send message.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#030303] min-h-screen text-white font-sans flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">touch</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            Questions, custom requests, or just want to say hi? Drop us a line.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="bg-[#09090b]/40 border border-zinc-800/50 rounded-2xl p-5 flex items-center gap-4 hover:border-zinc-700/50 transition-all duration-300">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-300">Email</h3>
                <p className="text-zinc-400 text-sm mt-0.5">hello@lumenui.dev</p>
              </div>
            </div>

            {/* Chat Card */}
            <div className="bg-[#09090b]/40 border border-zinc-800/50 rounded-2xl p-5 flex items-center gap-4 hover:border-zinc-700/50 transition-all duration-300">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-300">Chat</h3>
                <p className="text-zinc-400 text-sm mt-0.5">Available Mon–Fri, 9–6 UTC</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-[#09090b]/40 border border-zinc-800/50 rounded-2xl p-5 flex items-center gap-4 hover:border-zinc-700/50 transition-all duration-300">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-300">Based in</h3>
                <p className="text-zinc-400 text-sm mt-0.5">Remote · worldwide</p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7 bg-[#09090b]/30 border border-zinc-800/60 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-[#0c0c0e] border border-zinc-800 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-[#0c0c0e] border border-zinc-800 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="w-full px-4 py-3 bg-[#0c0c0e] border border-zinc-800 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you need..."
                  className="w-full px-4 py-3 bg-[#0c0c0e] border border-zinc-800 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:pointer-events-none"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Sending...' : 'Send message'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;