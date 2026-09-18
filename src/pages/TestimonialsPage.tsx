import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  FileSpreadsheet, 
  Sparkles, 
  MessageSquarePlus, 
  User, 
  Send 
} from 'lucide-react';
import { api } from '../services/api';
import { Testimonial } from '../types';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

export const TestimonialsPage: React.FC = () => {
  const { user } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    role: 'Student / Graduate',
    companyOrCollege: user?.organization || 'Osmania University',
    rating: 5,
    comment: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const loadTestimonials = () => {
    setLoading(true);
    api.getTestimonials()
      .then(data => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.comment) return;

    setSubmitting(true);
    setSuccessMsg('');

    try {
      await api.submitTestimonial({
        ...formData,
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`
      });

      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      setSuccessMsg('Review recorded in Excel Testimonials worksheet!');
      setShowSubmitModal(false);
      loadTestimonials();
    } catch (err: any) {
      alert(err.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="testimonials-page-root" className="space-y-12 sm:space-y-16 pb-20">
      
      {/* Hero Header */}
      <section className="pt-12 pb-6 bg-gradient-to-b from-[#F7FAFA] to-[#EAF3F3]/30 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0E7C7B]/10 text-[#0E7C7B] text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 text-[#F2A93B]" />
            Alumni & Client Success Stories
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#1F3B4D] tracking-tight">
            Client & Student Testimonials
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover how Evolutionary Web Dude is empowering students and enterprises across Hyderabad with modern paperless workflows and full-stack software mastery.
          </p>

          <div className="pt-3">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-6 py-2.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-xs rounded-xl shadow-md inline-flex items-center gap-2 transition-all hover:scale-102"
            >
              <MessageSquarePlus className="w-4 h-4" />
              Write a Review (Syncs to Excel)
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            Loading testimonials from Excel file records...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="card-feel-good p-7 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#F2A93B]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Verified Client
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                  <img
                    src={t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#0E7C7B]/30"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-[#1F3B4D]">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {t.role} • <span className="text-[#0E7C7B]">{t.companyOrCollege}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Review Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#EAF3F3]">
            <h3 className="font-heading font-bold text-2xl text-[#1F3B4D] mb-1">
              Share Your Experience
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              Your feedback is written directly into the Testimonials worksheet in Excel.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Priyanshu Sharma"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                    Your Role / Title
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Software Engineer / Alum"
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                    College / Company
                  </label>
                  <input
                    type="text"
                    value={formData.companyOrCollege}
                    onChange={e => setFormData({ ...formData, companyOrCollege: e.target.value })}
                    placeholder="e.g. Osmania Univ / Tech Hub"
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                  Star Rating (1 to 5)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={`p-1.5 rounded-lg transition-colors ${
                        formData.rating >= star ? 'text-[#F2A93B]' : 'text-gray-300'
                      }`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                  Your Feedback / Testimonial *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.comment}
                  onChange={e => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Share details about the project mentorship, paperless software, or outcomes..."
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Excel Sheet: Testimonials</span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    {submitting ? 'Writing...' : 'Submit to Excel'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
