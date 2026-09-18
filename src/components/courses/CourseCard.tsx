import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  GraduationCap,
  Zap,
  Globe,
  Flame,
  Award,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Course } from '../../types';
import { CourseThumbnail } from './CourseThumbnail';

interface CourseCardProps {
  course: Course;
  index: number;
  onEnroll: (course: Course) => void;
  onViewCurriculum: (course: Course) => void;
  onQuickView: (course: Course) => void;
  viewMode?: 'grid' | 'list';
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  index,
  onEnroll,
  onViewCurriculum,
  onQuickView,
  viewMode = 'grid'
}) => {
  const isSelfPaced = course.status === 'Self-Paced';
  const isLive = course.status === 'Open for Enrollment' || 
    (!isSelfPaced && Boolean(course.buttonText && course.buttonText.toLowerCase().includes('enroll')));
  const isUpcoming = !isLive && !isSelfPaced;

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEnroll(course);
  };

  const handleCardClick = () => {
    if (isLive || isSelfPaced) {
      onEnroll(course);
    } else {
      onQuickView(course);
    }
  };

  const handleSyllabusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewCurriculum(course);
  };

  // -------------------------------------------------------------
  // 1. LIST VIEW: Polished Horizontal Enterprise Card Layout
  // -------------------------------------------------------------
  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.28, delay: Math.min(index * 0.03, 0.25) }}
        onClick={handleCardClick}
        className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-[#0E7C7B]/60 shadow-[0_2px_10px_rgba(18,35,46,0.04)] hover:shadow-[0_18px_36px_-10px_rgba(18,35,46,0.12)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col md:flex-row cursor-pointer"
      >
        {/* Top hover accent bar */}
        <div className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#0E7C7B] to-[#F2A93B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

        {/* Poster Column */}
        <div className="w-full md:w-80 lg:w-96 md:shrink-0 overflow-hidden relative">
          <CourseThumbnail course={course} aspectRatio="16/9" />
        </div>

        {/* Content Column */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            {/* Badges bar */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-[#0E7C7B]/10 text-[#0E7C7B]">
                {course.category}
              </span>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Globe className="w-3.5 h-3.5 text-[#0E7C7B]" />
                <span>{course.language || 'Telugu & English'}</span>
              </div>

              <span className="text-slate-300">•</span>

              <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                <span>{course.level}</span>
              </div>

              {course.isPopular && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-black uppercase tracking-wider bg-[#F2A93B]/15 text-[#B87103] border border-[#F2A93B]/30">
                  <Flame className="w-3 h-3 text-[#F2A93B] fill-current" />
                  <span>Popular</span>
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#12232E] group-hover:text-[#0E7C7B] transition-colors leading-snug">
              {course.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Timing + Start Date Micro Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-2.5 px-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#F2A93B]/10 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-[#F2A93B]" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Batch Starts</span>
                <span className="font-bold text-[#12232E] truncate block text-xs">
                  {course.startDate || (isSelfPaced ? 'Instant Access' : 'Coming soon')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#0E7C7B]" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Class Schedule</span>
                <span className="font-bold text-[#12232E] truncate block text-xs">
                  {course.timings || (isSelfPaced ? 'Flexible Hours / Self-Paced' : 'To be announced')}
                </span>
              </div>
            </div>
          </div>

          {/* Module tags, Price & Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3 border-t border-slate-100">
            {/* Technology / Modules Chips */}
            <div className="flex flex-wrap gap-1.5 items-center">
              {course.modules?.slice(0, 4).map((mod, mIdx) => (
                <span
                  key={mIdx}
                  className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100/80 text-slate-700 border border-slate-200/60"
                >
                  {mod}
                </span>
              ))}
              {(course.modules?.length || 0) > 4 && (
                <span className="px-2 py-1 rounded-md text-[10.5px] font-bold text-slate-400 bg-slate-50 border border-slate-200/50">
                  +{(course.modules?.length || 0) - 4} more
                </span>
              )}
            </div>

            {/* Price block + Action Buttons */}
            <div className="flex items-center justify-between lg:justify-end gap-3 sm:gap-4 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              {/* Course Price Tag */}
              <div className="text-left lg:text-right shrink-0">
                <div className="flex items-baseline gap-2 lg:justify-end">
                  <span className="text-xl sm:text-2xl font-black text-[#12232E] tracking-tight">
                    {course.fee}
                  </span>
                  {course.originalFee && (
                    <span className="text-xs text-slate-400 line-through font-semibold">
                      {course.originalFee}
                    </span>
                  )}
                  {course.discountPercent && (
                    <span className="px-1.5 py-0.5 rounded text-[10.5px] font-black uppercase tracking-wide bg-emerald-100 text-emerald-800">
                      {course.discountPercent}% OFF
                    </span>
                  )}
                </div>
                {course.emiStartsAt && (
                  <span className="text-[11px] font-medium text-slate-500 block">
                    EMI from <strong className="text-[#0E7C7B] font-bold">{course.emiStartsAt}</strong>
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleSyllabusClick}
                  className="px-3.5 py-2.5 text-xs font-bold text-[#0E7C7B] hover:text-[#0A5E5D] hover:bg-[#0E7C7B]/8 rounded-xl border border-[#0E7C7B]/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Syllabus</span>
                </button>

                {isLive ? (
                  <button
                    onClick={handleEnrollClick}
                    className="px-4 sm:px-5 py-2.5 bg-gradient-to-r from-[#0E7C7B] to-[#0A5E5D] hover:from-[#0A5E5D] hover:to-[#074645] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-[0_4px_12px_rgba(14,124,123,0.25)] hover:shadow-[0_6px_16px_rgba(14,124,123,0.35)] flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#F2A93B]" />
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ) : isSelfPaced ? (
                  <button
                    onClick={handleEnrollClick}
                    className="px-4 sm:px-5 py-2.5 bg-gradient-to-r from-[#0E7C7B] to-[#0A5E5D] hover:from-[#0A5E5D] hover:to-[#074645] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-[0_4px_12px_rgba(14,124,123,0.25)] hover:shadow-[0_6px_16px_rgba(14,124,123,0.35)] flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#F2A93B] fill-current" />
                    <span>Start Learning</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(course);
                    }}
                    className="px-4 sm:px-5 py-2.5 bg-[#1F3B4D] hover:bg-[#12232E] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Know More</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F2A93B]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // -------------------------------------------------------------
  // 2. GRID VIEW: High-Impact, Balanced & Cohesive Vertical Card
  // -------------------------------------------------------------
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.32, delay: Math.min(index * 0.04, 0.35) }}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-[#0E7C7B]/60 shadow-[0_3px_12px_rgba(18,35,46,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(18,35,46,0.14)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Top subtle highlight gradient on hover */}
      <div className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#0E7C7B] to-[#F2A93B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      {/* 1. Header Poster Area (16:9 Aspect Ratio) */}
      <div className="relative overflow-hidden">
        <CourseThumbnail course={course} aspectRatio="16/9" />
      </div>

      {/* 2. Main Card Body Content */}
      <div className="p-5 sm:p-5.5 flex flex-col flex-1 justify-between space-y-4">
        
        <div className="space-y-2.5">
          {/* Top Tag Row: Category + Language + Popular */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="px-2.5 py-1 rounded-md text-[10.5px] font-extrabold uppercase tracking-wider bg-[#0E7C7B]/10 text-[#0E7C7B] truncate">
                {course.category}
              </span>
              <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-500 font-medium shrink-0">
                <Globe className="w-3 h-3 text-[#0E7C7B]" />
                <span>{course.language || 'Telugu'}</span>
              </div>
            </div>

            {course.isPopular && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#F2A93B]/15 text-[#B87103] border border-[#F2A93B]/30 shrink-0">
                <Flame className="w-2.5 h-2.5 text-[#F2A93B] fill-current" />
                <span>Popular</span>
              </span>
            )}
          </div>

          {/* Course Title */}
          <h3 className="font-heading font-extrabold text-[17px] sm:text-[18px] text-[#12232E] group-hover:text-[#0E7C7B] transition-colors line-clamp-2 leading-snug min-h-[46px] flex items-center">
            {course.title}
          </h3>

          {/* Brief Course Focus / Description */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Structured Dual Schedule Micro-Cards */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
          {/* Start Date Card */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#F2A93B]/12 flex items-center justify-center shrink-0">
              <Calendar className="w-3.5 h-3.5 text-[#F2A93B]" />
            </div>
            <div className="min-w-0">
              <span className="block text-[9.5px] font-extrabold uppercase tracking-wider text-slate-400">
                Starts
              </span>
              <span className="font-bold text-[#12232E] text-[11.5px] sm:text-xs truncate block" title={course.startDate}>
                {course.startDate || (isSelfPaced ? 'Instant' : 'Coming soon')}
              </span>
            </div>
          </div>

          {/* Schedule Timings Card */}
          <div className="flex items-center gap-2 min-w-0 border-l border-slate-200/70 pl-2">
            <div className="w-7 h-7 rounded-lg bg-[#0E7C7B]/12 flex items-center justify-center shrink-0">
              <Clock className="w-3.5 h-3.5 text-[#0E7C7B]" />
            </div>
            <div className="min-w-0">
              <span className="block text-[9.5px] font-extrabold uppercase tracking-wider text-slate-400">
                Schedule
              </span>
              <span className="font-bold text-[#12232E] text-[11.5px] sm:text-xs truncate block" title={course.timings}>
                {course.timings ? course.timings.replace('pm', ' PM').replace('am', ' AM') : (isSelfPaced ? 'Flexible' : 'TBA')}
              </span>
            </div>
          </div>
        </div>

        {/* Core Modules Chips */}
        {course.modules && course.modules.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {course.modules.slice(0, 3).map((mod, mIdx) => (
              <span
                key={mIdx}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100/90 text-slate-700 border border-slate-200/60 truncate max-w-[130px]"
              >
                {mod}
              </span>
            ))}
            {course.modules.length > 3 && (
              <span className="px-2 py-0.5 rounded-md text-[10.5px] font-bold text-slate-400 bg-slate-50 border border-slate-200/50">
                +{course.modules.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Pricing & Offer Section */}
        <div className="pt-3 pb-1 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-xl font-black text-[#12232E] tracking-tight">
                {course.fee}
              </span>
              {course.originalFee && (
                <span className="text-xs text-slate-400 line-through font-semibold">
                  {course.originalFee}
                </span>
              )}
              {course.discountPercent && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wide bg-emerald-100 text-emerald-800">
                  {course.discountPercent}% OFF
                </span>
              )}
            </div>
            {course.emiStartsAt && (
              <span className="text-[10.5px] font-medium text-slate-500 block">
                EMI from <strong className="text-[#0E7C7B] font-bold">{course.emiStartsAt}</strong>
              </span>
            )}
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
              <ShieldCheck className="w-3 h-3 text-[#0E7C7B]" />
              Verified
            </span>
          </div>
        </div>

        {/* Card Footer & Action Buttons */}
        <div className="space-y-2">
          {/* Main Action Button */}
          {isLive ? (
            <button
              onClick={handleEnrollClick}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-[#0E7C7B] to-[#0A5E5D] hover:from-[#0A5E5D] hover:to-[#074645] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-[0_4px_12px_rgba(14,124,123,0.25)] hover:shadow-[0_6px_16px_rgba(14,124,123,0.35)] flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F2A93B]" />
              <span>Enroll in Batch</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : isSelfPaced ? (
            <button
              onClick={handleEnrollClick}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-[#0E7C7B] to-[#0A5E5D] hover:from-[#0A5E5D] hover:to-[#074645] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-[0_4px_12px_rgba(14,124,123,0.25)] hover:shadow-[0_6px_16px_rgba(14,124,123,0.35)] flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-[#F2A93B] fill-current" />
              <span>Start Learning</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(course);
              }}
              className="w-full py-2.5 px-4 bg-[#1F3B4D] hover:bg-[#12232E] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
            >
              <span>Explore Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F2A93B] group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Secondary Curriculum Button */}
          <button
            onClick={handleSyllabusClick}
            className="w-full py-1.5 text-xs font-bold text-[#0E7C7B] hover:text-[#0A5E5D] hover:bg-[#0E7C7B]/8 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>View Full Syllabus</span>
            <ChevronRight className="w-3 h-3 text-[#0E7C7B]/60" />
          </button>
        </div>

      </div>
    </motion.div>
  );
};


