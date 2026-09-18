import React from 'react';
import { 
  Zap,
  Calendar,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Course } from '../../types';
import { getCoursePoster } from '../../data/courseThumbnails';
import { TechLogoTile } from './TechLogos';

interface CourseThumbnailProps {
  course: Course;
  className?: string;
  showBadges?: boolean;
  aspectRatio?: '16/9' | 'auto';
}

export const CourseThumbnail: React.FC<CourseThumbnailProps> = ({
  course,
  className = '',
  showBadges = true,
  aspectRatio = '16/9'
}) => {
  const posterMeta = getCoursePoster(course.id, course.title);

  // Status computation
  const isSelfPaced = course.status === 'Self-Paced';
  const isLive = course.status === 'Open for Enrollment' || 
    (!isSelfPaced && Boolean(course.buttonText && course.buttonText.toLowerCase().includes('enroll')));

  // Gather 4-5 technology keys for pure image display
  const techTools = posterMeta.keyTools && posterMeta.keyTools.length > 0
    ? posterMeta.keyTools.slice(0, 5)
    : [course.category, 'Code', 'Project'];

  return (
    <div 
      className={`relative w-full overflow-hidden bg-[#12232E] select-none flex flex-col justify-between ${
        aspectRatio === '16/9' ? 'aspect-[16/9]' : 'h-full min-h-[190px]'
      } ${className}`}
    >
      {/* 1. Rich Atmospheric Background: Slate Navy Canvas + Soft Teal/Amber Lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B151C] via-[#12232E] to-[#172D3D]" />

      {/* Atmospheric Soft Lighting Flares (Theme Colors) */}
      <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-[#0E7C7B]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-[#F2A93B]/15 blur-3xl pointer-events-none" />

      {/* Subtle Micro-Grid Engineering Pattern */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`tech-grid-${course.id}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#0E7C7B" strokeWidth="0.75" />
            <circle cx="32" cy="0" r="1.2" fill="#F2A93B" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#tech-grid-${course.id})`} />
      </svg>

      {/* 2. Top Header Bar: Clean Academy Brand & Status Indicator */}
      <div className="relative z-10 px-3.5 pt-3 sm:px-4 sm:pt-3.5 flex items-center justify-between gap-2">
        {/* FLM Tech Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B151C]/80 border border-white/15 backdrop-blur-md shadow-xs">
          <div className="w-1.5 h-1.5 rounded-full bg-[#F2A93B] shadow-[0_0_6px_#F2A93B]" />
          <span className="text-[10px] sm:text-[11px] font-black tracking-wider text-white uppercase">
            FLM <span className="text-[#F2A93B]">TECH</span>
          </span>
        </div>

        {/* Live / Self-Paced Status Badge */}
        {showBadges && (
          <div className="flex items-center gap-1.5">
            {isLive ? (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide bg-[#0E7C7B] text-white shadow-xs border border-emerald-300/30 backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                </span>
                <span>Live Batch</span>
              </div>
            ) : isSelfPaced ? (
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide bg-[#F2A93B] text-[#12232E] shadow-xs">
                <Zap className="w-3 h-3 fill-current" />
                <span>Self-Paced</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide bg-[#1F3B4D]/90 text-white shadow-xs border border-white/15">
                <Calendar className="w-3 h-3 text-[#F2A93B]" />
                <span>Upcoming</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Center Main Stage: Clean Typography + Pure Technology Images (NO TEXT ON TECHS!) */}
      <div className="relative z-10 px-4 py-2 sm:px-5 sm:py-3 flex flex-col justify-center my-auto space-y-2.5 sm:space-y-3">
        {/* Titles Group */}
        <div className="space-y-1">
          {/* Eyebrow specialization in Golden Amber */}
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#F2A93B]">
              {posterMeta.trackTag || 'CAREER TRACK'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0E7C7B]" />
          </div>

          {/* Primary High-Impact Course Title */}
          <h3 className="font-heading font-black text-white text-base sm:text-lg md:text-xl leading-tight tracking-tight uppercase line-clamp-1 drop-shadow-sm">
            {posterMeta.mainTitle}
          </h3>

          {/* Subtitle / Focus Area */}
          <p className="font-heading font-extrabold text-[#EAF3F3]/85 text-xs sm:text-[13px] leading-tight tracking-wide uppercase line-clamp-1">
            {posterMeta.highlightTitle}
          </p>
        </div>

        {/* PURE TECHNOLOGY IMAGES ONLY - NO TEXT! */}
        {techTools && techTools.length > 0 && (
          <div className="pt-0.5">
            <div className="flex items-center gap-2 sm:gap-2.5">
              {techTools.map((tech, idx) => (
                <TechLogoTile 
                  key={idx} 
                  tech={tech} 
                  size="md"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Minimalist Bottom Ribbon: Clean, Balanced Footnote */}
      <div className="relative z-10 px-3.5 pb-2.5 sm:px-4 sm:pb-2.5 pt-1.5 flex items-center justify-between border-t border-white/10 bg-[#0B151C]/60 backdrop-blur-xs text-white">
        {/* Left: Real Projects Indicator */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-gray-300 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#0E7C7B]" />
          <span className="text-[#EAF3F3] font-semibold">Real-World Projects</span>
        </div>

        {/* Right: Duration Tag */}
        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#F2A93B]">
          <Sparkles className="w-3 h-3 text-[#F2A93B]" />
          <span>{course.duration || 'Comprehensive'}</span>
        </div>
      </div>

      {/* 5. Crisp 2.5px Brand Gradient Accent Bar on the very bottom edge */}
      <div className="w-full h-[2.5px] bg-gradient-to-r from-[#0E7C7B] via-[#F2A93B] to-[#0E7C7B]" />
    </div>
  );
};
