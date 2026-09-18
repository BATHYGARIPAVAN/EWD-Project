import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, BookOpen, Clock, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { Course } from '../../types';

interface CourseCurriculumModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onEnroll?: (course: Course) => void;
  onEnrollClick?: (course: Course) => void;
}

export const CourseCurriculumModal: React.FC<CourseCurriculumModalProps> = ({
  course,
  isOpen,
  onClose,
  onEnroll,
  onEnrollClick
}) => {
  if (!isOpen || !course) return null;

  const handleEnroll = () => {
    onClose();
    if (typeof onEnroll === 'function') {
      onEnroll(course);
    } else if (typeof onEnrollClick === 'function') {
      onEnrollClick(course);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div 
        id="course-curriculum-modal"
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#EAF3F3] relative max-h-[90vh] overflow-y-auto"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-[#1F3B4D] hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </motion.button>

        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-[#0E7C7B]/10 text-[#0E7C7B]">
            {course.category}
          </span>
          <span className="text-xs text-gray-500 font-medium">
            Level: {course.level} • Duration: {course.duration}
          </span>
        </div>

        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1F3B4D] mb-2">
          {course.title}
        </h2>

        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          {course.description}
        </p>

        {/* Modules Chips */}
        <div className="mb-6">
          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400 mb-2.5">
            Core Modules & Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {course.modules.map((mod, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#F7FAFA] border border-[#EAF3F3] text-[#1F3B4D] transition-colors"
              >
                {mod}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Weekly Syllabus Roadmap */}
        <div className="mb-6">
          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#0E7C7B]" />
            Practical Curriculum Breakdown
          </h4>

          <div className="space-y-3">
            {course.syllabus.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ x: 3 }}
                className="p-3.5 bg-[#F7FAFA] rounded-2xl border border-[#EAF3F3] hover:border-[#0E7C7B]/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#0E7C7B]">{item.week}</span>
                  <span className="text-[11px] font-semibold text-gray-400">Week Module {idx + 1}</span>
                </div>
                <h5 className="font-heading font-bold text-sm text-[#1F3B4D]">{item.topic}</h5>
                <p className="text-xs text-gray-600 mt-1">{item.details}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8">
          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#F2A93B]" />
            What You Will Achieve
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {course.learningOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-[10.5px] text-gray-400 block font-bold uppercase tracking-wider">Program Investment</span>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-black text-xl text-[#12232E]">{course.fee}</span>
              {course.originalFee && (
                <span className="text-xs text-gray-400 line-through font-semibold">{course.originalFee}</span>
              )}
              {course.discountPercent && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                  {course.discountPercent}% OFF
                </span>
              )}
            </div>
            {course.emiStartsAt && (
              <span className="text-[11px] text-slate-500 font-medium block">
                EMI starts at <strong className="text-[#0E7C7B] font-bold">{course.emiStartsAt}</strong>
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              Close
            </button>
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEnroll}
              className="px-6 py-2.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Enroll in Program
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
