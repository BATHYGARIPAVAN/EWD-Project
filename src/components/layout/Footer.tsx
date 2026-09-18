import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Send, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { api } from '../../services/api';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    try {
      await api.subscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Subscription failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer id="main-footer" className="bg-[#12232E] text-white pt-16 pb-12 border-t border-[#1F3B4D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#1F3B4D]/60">
          
          {/* Column 1: Brand & Core Mission (Span 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div 
              onClick={() => navigate('/')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0E7C7B] flex items-center justify-center shadow-md border border-[#0E7C7B]/30 group-hover:scale-105 transition-transform duration-200">
                <span className="font-heading font-extrabold text-xs tracking-wider text-white">
                  EWD
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-heading font-bold text-2xl text-white tracking-tight">
                  Evolutionary
                </span>
                <span className="font-heading font-bold text-2xl text-[#0E7C7B] ml-1.5">
                  Web Dude
                </span>
              </div>
            </div>

            <p className="text-[#F2A93B] font-bold text-sm">
              Innovating today. Building for tomorrow.
            </p>

            <p className="text-gray-300 text-sm leading-relaxed pr-4">
              We combine technology, creativity, and practical learning to create meaningful digital experiences and empower future-ready professionals.
            </p>
          </div>

          {/* Column 2: Quick Links (Span 3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="font-heading font-bold text-base text-white tracking-wide uppercase text-xs">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button 
                  onClick={() => navigate('/')} 
                  className="hover:text-[#0E7C7B] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#0E7C7B]" /> Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/about')} 
                  className="hover:text-[#0E7C7B] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#0E7C7B]" /> About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/services')} 
                  className="hover:text-[#0E7C7B] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#0E7C7B]" /> Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/courses')} 
                  className="hover:text-[#0E7C7B] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#0E7C7B]" /> Courses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/contact')} 
                  className="hover:text-[#0E7C7B] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3 h-3 text-[#0E7C7B]" /> Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Newsletter (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-heading font-bold text-base text-white tracking-wide uppercase text-xs">
              Contact
            </h3>

            <div className="space-y-2.5 text-sm text-gray-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#0E7C7B] shrink-0" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0E7C7B] shrink-0" />
                <a 
                  href="mailto:evolutionarywebdude@gmail.com" 
                  className="hover:text-[#F2A93B] transition-colors"
                >
                  evolutionarywebdude@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              {subscribed ? (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl flex items-center gap-2 text-emerald-300 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Thank you for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-3.5 py-2 bg-[#1F3B4D]/60 border border-[#2D526A] rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#0E7C7B]"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2 bg-[#F2A93B] hover:bg-[#D98E20] text-[#12232E] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    {submitting ? 'Subscribing...' : 'Subscribe for Updates'}
                  </button>
                  {errorMsg && <p className="text-[11px] text-red-400">{errorMsg}</p>}
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 Evolutionary Web Dude. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/')}>Home</span>
            <span>&bull;</span>
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/about')}>About</span>
            <span>&bull;</span>
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/services')}>Services</span>
            <span>&bull;</span>
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/courses')}>Courses</span>
            <span>&bull;</span>
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/contact')}>Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

