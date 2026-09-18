import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Globe, 
  Award, 
  Layers,
  Send,
  Check,
  Tag,
  ShieldCheck,
  Coins
} from 'lucide-react';
import { Course } from '../../types';
import { CourseThumbnail } from './CourseThumbnail';

interface CourseQuickModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (course: Course) => void;
}

export const CourseQuickModal: React.FC<CourseQuickModalProps> = ({
  course,
  onClose,
  onEnroll
}) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  if (!course) return null;

  const isLive = course.status === 'Open for Enrollment' || 
    (course.buttonText && course.buttonText.toLowerCase().includes('enroll'));

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) return;
    setInquirySubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#12232E]/70 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EAF3F3] overflow-hidden z-10 my-8"
        >
          {/* Header Banner - Branded Course Poster without Toy in Color Theme */}
          <div className="relative bg-[#12232E] overflow-hidden">
            <CourseThumbnail course={course} aspectRatio="16/9" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md z-20"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
            {/* Start Date, Timings & Pricing Highlight Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F2A93B]/15 text-[#D98E20] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-[#F2A93B]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10.5px] text-slate-400 font-extrabold uppercase tracking-wider">Batch Start Date</div>
                  <div className="text-xs sm:text-sm font-bold text-[#12232E] truncate">{course.startDate || 'Instant Access'}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-slate-200/70 pt-2 sm:pt-0 sm:pl-3">
                <div className="w-10 h-10 rounded-xl bg-[#0E7C7B]/15 text-[#0E7C7B] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#0E7C7B]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10.5px] text-slate-400 font-extrabold uppercase tracking-wider">Class Timings</div>
                  <div className="text-xs sm:text-sm font-bold text-[#12232E] truncate">{course.timings || 'Flexible Hours'}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-slate-200/70 pt-2 sm:pt-0 sm:pl-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Tag className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10.5px] text-slate-400 font-extrabold uppercase tracking-wider">Program Fee</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm sm:text-base font-black text-[#12232E]">{course.fee}</span>
                    {course.originalFee && (
                      <span className="text-[11px] text-slate-400 line-through">{course.originalFee}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Special Pricing & Offer Callout */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50/50 to-amber-50/40 border border-emerald-200/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[11px] font-black uppercase bg-emerald-600 text-white">
                  {course.discountPercent || 60}% OFF
                </span>
                <span className="text-xs font-bold text-slate-700">
                  Special Early Bird Admission Discount Active
                </span>
              </div>
              {course.emiStartsAt && (
                <div className="text-xs text-slate-600 font-medium">
                  Easy No-Cost EMI from <strong className="text-[#0E7C7B] font-extrabold">{course.emiStartsAt}</strong>
                </div>
              )}
            </div>

            {/* Course Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0E7C7B]">
                Course Overview
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Core Modules Covered */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1F3B4D]">
                Technologies & Tools Covered
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {course.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-xl bg-[#F7FAFA] border border-[#EAF3F3] text-xs font-medium text-[#1F3B4D]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0E7C7B] shrink-0" />
                    <span className="truncate">{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Outcomes */}
            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0E7C7B]">
                  What You Will Achieve
                </h4>
                <ul className="space-y-1.5">
                  {course.learningOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                      <Sparkles className="w-3.5 h-3.5 text-[#F2A93B] shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Callback / Notify Me for Next Batch */}
            {!isLive && (
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-extrabold text-[#12232E] uppercase tracking-wide">
                    Pre-Register / Get Batch Schedule Updates
                  </div>
                  <span className="text-[10px] bg-[#F2A93B] text-[#12232E] font-bold px-2 py-0.5 rounded-md">
                    Upcoming
                  </span>
                </div>
                {inquirySubmitted ? (
                  <div className="p-3 bg-white rounded-xl border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Thank you! Our academic counselors will notify you when batch timings are released.</span>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      required
                      className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-amber-200 focus:outline-none focus:border-[#0E7C7B]"
                    />
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      required
                      className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-amber-200 focus:outline-none focus:border-[#0E7C7B]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1F3B4D] hover:bg-[#12232E] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Notify Me</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="p-5 sm:p-6 bg-[#F8FAFC] border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Fee:</span>
                <span className="text-xl font-black text-[#12232E]">{course.fee}</span>
                {course.originalFee && (
                  <span className="text-xs text-slate-400 line-through font-semibold">{course.originalFee}</span>
                )}
                {course.discountPercent && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                    {course.discountPercent}% OFF
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Telugu & English instruction • Includes certificate & placement prep
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEnroll(course);
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0E7C7B] to-[#0A5E5D] hover:from-[#0A5E5D] hover:to-[#074645] text-white text-xs sm:text-sm font-extrabold shadow-md flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F2A93B]" />
                <span>{isLive ? 'Enroll Now' : 'Register for Course'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
