import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Linkedin, 
  Send, 
  CheckCircle2, 
  FileSpreadsheet, 
  MessageSquare, 
  Sparkles,
  Phone,
  Clock
} from 'lucide-react';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    serviceInterest: 'General Inquiry',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.submitContact(formData);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        serviceInterest: 'General Inquiry',
        message: ''
      });
    } catch (err: any) {
      setError(err.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="contact-page-root" className="space-y-12 sm:space-y-16 pb-20">
      
      {/* Header */}
      <section className="pt-12 pb-6 bg-gradient-to-b from-[#F7FAFA] to-[#EAF3F3]/30 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0E7C7B]/10 text-[#0E7C7B] text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5 text-[#F2A93B]" />
            Connect &bull; Contact Us
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#1F3B4D] tracking-tight">
            Contact Us
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind, want paperless workflow automation, or looking to enroll in our technical training programs? Send us a message — records sync directly to our Excel lead database.
          </p>
        </div>
      </section>

      {/* Grid: Details & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-feel-good-dark p-8 space-y-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#F2A93B]">
                  PHYSICAL & DIGITAL HUB
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-white mt-1">
                  Hyderabad Development Center
                </h3>
              </div>

              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#0E7C7B]/20 text-[#0E7C7B] mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs uppercase tracking-wider">Address</h5>
                    <p className="text-xs text-gray-300 mt-0.5">
                      HITEC City, Hyderabad, Telangana, India 500032
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#0E7C7B]/20 text-[#0E7C7B] mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs uppercase tracking-wider">Direct Email</h5>
                    <a 
                      href="mailto:Evolutionarywebdude@gmail.com" 
                      className="text-xs text-[#F2A93B] hover:underline block mt-0.5"
                    >
                      Evolutionarywebdude@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#0E7C7B]/20 text-[#0E7C7B] mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs uppercase tracking-wider">Operating Hours</h5>
                    <p className="text-xs text-gray-300 mt-0.5">
                      Mon - Sat: 9:00 AM - 7:00 PM IST (Response within 4 hours)
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">Response within 4 business hours</span>

                <a 
                  href="https://www.linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0E7C7B]" /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Submission Form */}
          <div className="lg:col-span-7 card-feel-good p-8 sm:p-10">
            
            {success ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="font-heading font-bold text-2xl text-[#1F3B4D]">
                  Message Successfully Transmitted!
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Our Hyderabad team has received your message and will respond promptly.
                </p>

                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 bg-[#0E7C7B] text-white font-bold text-xs rounded-xl hover:bg-[#0A5E5D] transition-colors shadow-md"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#1F3B4D] mb-1">
                    Contact Us Form
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Send us your requirements or inquiry. Our team responds in under 4 business hours.
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Rao"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ananya@company.com"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98480 11122"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={e => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Paperless Office Solutions">Paperless Office Solutions</option>
                      <option value="Technology Training Programs">Technology Training Programs</option>
                      <option value="Adaptive Web Development">Adaptive Web Development</option>
                      <option value="Commercial Software Licensing">Commercial Software Licensing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief description of your query"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                    Your Message / Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project requirements, institution, or student goals..."
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all active:scale-98 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
