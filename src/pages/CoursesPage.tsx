import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Course } from '../types';
import { FrontlinesCoursesSection } from '../components/courses/FrontlinesCoursesSection';

interface CoursesPageProps {
  navigate: (path: string) => void;
  onEnrollCourse: (course: Course) => void;
  onViewCurriculum: (course: Course) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  navigate,
  onEnrollCourse,
  onViewCurriculum
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Are all courses taught in Telugu?',
      answer: 'Yes! All live lecture sessions, doubt discussions, and project explanations are conducted in Telugu with industry-standard English technical terminology. This ensures deep conceptual understanding without language barriers.'
    },
    {
      question: 'Will session recordings be provided if I miss a live class?',
      answer: 'Absolutely. Every live class is recorded and uploaded to your student portal dashboard within 24 hours. You will have lifetime or extended access to review the lectures, source codes, and notes.'
    },
    {
      question: 'Can non-IT and freshers join these batches?',
      answer: 'Yes. Our curriculum is specifically crafted from ground zero (absolute basics) to advanced real-world implementations. Over 45% of our alumni come from Mechanical, Civil, Electrical, and degree backgrounds.'
    },
    {
      question: 'What kind of placement assistance is provided?',
      answer: 'We provide end-to-end placement readiness: ATS resume building, LinkedIn profile makeover, technical mock interviews, behavioral HR prep, and direct job notifications through our hiring partner network.'
    },
    {
      question: 'Are there hands-on practical projects included?',
      answer: 'Yes. Each course includes multiple micro-assignments and an extensive enterprise capstone project that you build, push to GitHub, and deploy live to demonstrate in your interviews.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7FAFA]">
      
      {/* 1. Breadcrumb bar */}
      <div className="bg-white border-b border-[#EAF3F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2 font-medium">
            <button 
              onClick={() => navigate('/')} 
              className="hover:text-[#0E7C7B] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#1F3B4D] font-bold">Frontlines EduTech Courses</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[#0E7C7B] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Admissions Open for 2026 Batches</span>
          </div>
        </div>
      </div>

      {/* 2. Primary Frontlines EduTech Courses Section */}
      <FrontlinesCoursesSection
        onEnrollCourse={onEnrollCourse}
        onViewCurriculum={onViewCurriculum}
        navigate={navigate}
      />

      {/* 3. Frequently Asked Questions (Telugu Aspirants FAQ) */}
      <section className="py-12 sm:py-16 bg-white border-t border-[#EAF3F3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E7C7B]/10 text-[#0E7C7B] text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Doubts?</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1F3B4D]">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              Common questions answered for students aspiring to launch their software careers in Telugu
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#EAF3F3] bg-[#F7FAFA] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-heading font-bold text-sm sm:text-base text-[#1F3B4D]">
                      {faq.question}
                    </span>
                    <span className="text-[#0E7C7B] shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-[#EAF3F3]/60">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Counselor Guidance Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-[#1F3B4D] via-[#12232E] to-[#0E7C7B] p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          
          <div className="space-y-3 max-w-xl z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#F2A93B] text-[#12232E]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free Career Counseling</span>
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Confused about which course fits your career goal?
            </h3>
            <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
              Talk directly with our academic mentors. We assess your background, branch, and career goals to recommend the right live batch with roadmap guidance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 z-10 w-full sm:w-auto">
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#F2A93B] hover:bg-[#D98E20] text-[#12232E] font-extrabold text-xs sm:text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-102 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Request Call Back</span>
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>

          {/* Decorative background watermark */}
          <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10 pointer-events-none">
            <GraduationCap className="w-72 h-72 text-white" />
          </div>
        </div>
      </section>

    </div>
  );
};
