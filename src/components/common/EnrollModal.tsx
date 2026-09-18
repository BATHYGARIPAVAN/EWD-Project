import React, { useState } from 'react';
import { X, CheckCircle2, FileSpreadsheet, Send, User, Mail, Phone, BookOpen, Building2, GraduationCap, Calendar, Globe, MapPin, ChevronDown } from 'lucide-react';
import { Course } from '../../types';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

interface EnrollModalProps {
  course?: Course | null;
  selectedCourse?: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  navigate?: (path: string) => void;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({ 
  course: courseProp, 
  selectedCourse, 
  isOpen, 
  onClose, 
  onSuccess 
}) => {
  const course = selectedCourse || courseProp;
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    userName: user?.name || '',
    userEmail: user?.email || '',
    userPhone: user?.phone || '',
    collegeName: user?.organization || '',
    qualification: '',
    yearOfPassout: '',
    preferredMode: 'Online' as 'Online' | 'Offline',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !course) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userName || !formData.userEmail || !formData.userPhone) {
      setError('Please fill in your name, email, and phone number.');
      return;
    }
    if (!formData.collegeName) {
      setError('Please fill in your college name.');
      return;
    }
    if (!formData.qualification) {
      setError('Please select your qualification.');
      return;
    }
    if (!formData.yearOfPassout) {
      setError('Please provide your year of passout.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.createEnrollment({
        courseId: course.id,
        courseTitle: course.title,
        courseCategory: course.category,
        userId: user?.id,
        userName: formData.userName,
        userEmail: formData.userEmail,
        userPhone: formData.userPhone,
        collegeName: formData.collegeName,
        qualification: formData.qualification,
        yearOfPassout: formData.yearOfPassout,
        educationOrJob: `${formData.qualification} - ${formData.collegeName}`,
        experienceLevel: 'Fresher / Student',
        mode: formData.preferredMode,
        preferredMode: formData.preferredMode,
        preferredBatch: 'Regular' as any,
        notes: `College: ${formData.collegeName} | Passout: ${formData.yearOfPassout} | Qualification: ${formData.qualification}`,
        status: 'Under Review',
        paymentStatus: 'Pending',
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Enrollment registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="enrollment-modal-container"
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#EAF3F3] relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-[#1F3B4D] hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-heading font-bold text-2xl text-[#1F3B4D]">
              Enrollment Confirmed!
            </h3>

            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Your registration for <strong className="text-[#0E7C7B]">{course.title}</strong> has been saved directly to our Excel records.
            </p>

            <div className="p-4 bg-[#F7FAFA] border border-[#EAF3F3] rounded-2xl text-xs text-left space-y-2 max-w-md mx-auto">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Recorded in Excel: Enrollments Worksheet</span>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div><span className="font-semibold text-gray-700">Candidate:</span> {formData.userName}</div>
                <div><span className="font-semibold text-gray-700">Email:</span> {formData.userEmail}</div>
                <div><span className="font-semibold text-gray-700">Phone:</span> {formData.userPhone}</div>
                <div><span className="font-semibold text-gray-700">College:</span> {formData.collegeName}</div>
                <div><span className="font-semibold text-gray-700">Qualification:</span> {formData.qualification} ({formData.yearOfPassout})</div>
                <div><span className="font-semibold text-gray-700">Mode:</span> {formData.preferredMode}</div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#0E7C7B] text-white font-bold text-sm rounded-xl hover:bg-[#0A5E5D] transition-colors shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#0E7C7B]/10 text-[#0E7C7B]">
                {course.category}
              </span>
              <span className="text-xs text-gray-400 font-medium">Duration: {course.duration}</span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl text-[#1F3B4D]">
              Enroll in {course.title}
            </h2>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              Fill in your details below. All entries persist to our Excel store in admin dashboard.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                  Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.userName}
                    onChange={e => setFormData({ ...formData, userName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B] focus:ring-1 focus:ring-[#0E7C7B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={formData.userPhone}
                      onChange={e => setFormData({ ...formData, userPhone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B] focus:ring-1 focus:ring-[#0E7C7B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={formData.userEmail}
                      onChange={e => setFormData({ ...formData, userEmail: e.target.value })}
                      placeholder="e.g. rahul@example.com"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B] focus:ring-1 focus:ring-[#0E7C7B]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                  College Name *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.collegeName}
                    onChange={e => setFormData({ ...formData, collegeName: e.target.value })}
                    placeholder="e.g. Osmania University / JNTU Hyderabad"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B] focus:ring-1 focus:ring-[#0E7C7B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                    Education Qualification *
                  </label>
                  <div className="relative">
                    <select
                      value={formData.qualification}
                      onChange={e => setFormData({ ...formData, qualification: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B] appearance-none pr-8"
                    >
                      <option value="" disabled>Select qualification</option>
                      <option value="B.Tech / B.E">B.Tech / B.E</option>
                      <option value="MCA">MCA</option>
                      <option value="BCA">BCA</option>
                      <option value="B.Sc Computer Science / IT">B.Sc Computer Science / IT</option>
                      <option value="M.Tech / M.E">M.Tech / M.E</option>
                      <option value="Degree / Diploma">Degree / Diploma</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                    Year of Passout *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.yearOfPassout}
                      onChange={e => setFormData({ ...formData, yearOfPassout: e.target.value })}
                      placeholder="e.g. 2026"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B] focus:ring-1 focus:ring-[#0E7C7B]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                  Interested Course *
                </label>
                <div className="p-3 bg-[#EAF3F3]/60 border border-[#0E7C7B]/30 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-xs text-[#1F3B4D]">{course.title}</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                    Pre-selected
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F3B4D] mb-1.5">
                  Preferred Mode *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredMode: 'Online' })}
                    className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                      formData.preferredMode === 'Online'
                        ? 'border-2 border-[#0E7C7B] bg-[#0E7C7B]/5 text-[#0E7C7B]'
                        : 'border border-gray-200 text-gray-600'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Online
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredMode: 'Offline' })}
                    className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                      formData.preferredMode === 'Offline'
                        ? 'border-2 border-[#0E7C7B] bg-[#0E7C7B]/5 text-[#0E7C7B]'
                        : 'border border-gray-200 text-gray-600'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Offline
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Saves to Excel: Enrollments</span>
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
                    className="px-6 py-2.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {submitting ? 'Submitting to Excel...' : 'Submit Enrollment'}
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

