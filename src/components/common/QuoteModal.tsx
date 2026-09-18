import React, { useState } from 'react';
import { X, CheckCircle2, FileSpreadsheet, Send, ShieldCheck, Building, User, Mail, Phone } from 'lucide-react';
import { api } from '../../services/api';
import { ServiceDetail } from '../../types';

interface QuoteModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ service, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    projectScope: '',
    budget: 'Standard',
    timeline: 'Within 1-2 Months'
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !service) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please provide your name, email, and phone number.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Quote Request: ${service.title}`,
        serviceInterest: service.title,
        message: `Organization: ${formData.organization || 'Individual'}\nEstimated Budget Tier: ${formData.budget}\nTarget Timeline: ${formData.timeline}\nScope Details: ${formData.projectScope || 'Requesting full project proposal and consultation.'}`
      });

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Quote request submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="quote-modal-container"
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#EAF3F3] relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-[#1F3B4D] hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-heading font-bold text-2xl text-[#1F3B4D]">
              Proposal Request Received!
            </h3>

            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Your inquiry for <strong>{service.title}</strong> has been logged to the EWD Excel Lead tracker.
            </p>

            <div className="p-4 bg-[#F7FAFA] border border-[#EAF3F3] rounded-2xl text-xs text-left space-y-2 max-w-md mx-auto">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Recorded in Excel: Contacts Worksheet</span>
              </div>
              <p className="text-gray-500">
                Our solutions engineering lead in Hyderabad will review your requirements and send a customized proposal to <strong>{formData.email}</strong>.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 bg-[#0E7C7B] text-white font-bold text-sm rounded-xl hover:bg-[#0A5E5D] transition-colors shadow-md"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-[#0E7C7B]/10 text-[#0E7C7B] flex items-center justify-center text-xs font-bold">
                {service.number}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Custom Architecture Proposal
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl text-[#1F3B4D]">
              Request Quote: {service.title}
            </h2>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              Tailored paperless & web architecture estimates. Submissions sync directly to our internal Excel pipeline.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                    Contact Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@company.org"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98480 12345"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                    Organization / Institution
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={e => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Hyderabad Institute / Corp"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                    Budget Estimate
                  </label>
                  <select
                    value={formData.budget}
                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                  >
                    <option value="Starter (Under $1,000)">Starter (Under $1,000 / ₹80k)</option>
                    <option value="Standard ($1,000 - $3,000)">Standard ($1,000 - $3,000 / ₹2.5L)</option>
                    <option value="Enterprise ($3,000+)">Enterprise ($3,000+ / ₹5L+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                    Target Deployment
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                  >
                    <option value="Urgent (2-4 Weeks)">Urgent (2-4 Weeks)</option>
                    <option value="Within 1-2 Months">Within 1-2 Months</option>
                    <option value="Flexible / Q3 Planning">Flexible / Future Planning</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                  Brief Project Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.projectScope}
                  onChange={e => setFormData({ ...formData, projectScope: e.target.value })}
                  placeholder="Outline any special workflows, user loads, or integrations required..."
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Saves to Excel: Contacts</span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-[#F2A93B] hover:bg-[#D98E20] text-[#12232E] font-bold text-xs rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {submitting ? 'Sending...' : 'Request Detailed Quote'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
