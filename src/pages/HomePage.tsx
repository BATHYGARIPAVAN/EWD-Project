import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Cpu, 
  GraduationCap, 
  Compass, 
  CheckCircle2, 
  Globe2, 
  Zap,
  Rocket
} from 'lucide-react';
import { api } from '../services/api';
import { Testimonial, ServiceDetail, Course } from '../types';
import { FrontlinesCoursesSection } from '../components/courses/FrontlinesCoursesSection';

interface HomePageProps {
  navigate: (path: string) => void;
  onOpenQuoteModal?: (service: ServiceDetail) => void;
  onRequestQuote?: () => void;
  onEnrollCourse?: (course?: any) => void;
  onViewCurriculum?: (course: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  navigate, 
  onOpenQuoteModal,
  onRequestQuote,
  onEnrollCourse,
  onViewCurriculum 
}) => {
  const handleExploreCourses = () => {
    const el = document.getElementById('courses-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/courses');
    }
  };

  return (
    <div id="home-page-root" className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. HERO / WELCOME SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden bg-gradient-to-b from-[#F7FAFA] via-[#EAF3F3]/40 to-[#F7FAFA]">
        {/* Ambient atmospheric backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-tr from-[#0E7C7B]/10 via-[#F2A93B]/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          
          {/* Tagline Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0E7C7B]/20 text-[#0E7C7B] text-xs sm:text-sm font-extrabold shadow-2xs tracking-wide">
            <Sparkles className="w-4 h-4 text-[#F2A93B]" />
            <span>Innovate. Build. Evolve.</span>
          </div>

          {/* Main Title */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#1F3B4D] tracking-tight leading-[1.15]">
            Welcome to <br />
            <span className="text-[#0E7C7B]">Evolutionary</span>{' '}
            <span className="text-[#1F3B4D]">Web</span>{' '}
            <span className="text-[#F2A93B]">Dude</span>
          </h1>

          {/* Core Lead Paragraphs */}
          <div className="max-w-2xl mx-auto space-y-3.5 text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
            <p>
              We create modern digital solutions and provide practical, industry-focused learning experiences designed for a rapidly evolving technology landscape.
            </p>
            <p className="text-sm sm:text-base text-gray-500">
              From innovative web applications to hands-on technology education, we help businesses and aspiring professionals turn ideas into meaningful digital outcomes.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-explore-services-btn"
              onClick={() => navigate('/services')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-[#0E7C7B]/25 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-explore-courses-btn"
              onClick={handleExploreCourses}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#F2A93B] hover:bg-[#D98E20] text-[#12232E] font-bold text-sm sm:text-base rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 2. TECHNOLOGY BUILT FOR THE FUTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-feel-good p-8 sm:p-12 lg:p-16 relative overflow-hidden bg-white border border-[#EAF3F3] shadow-xl rounded-3xl">
          
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#0E7C7B]/10 text-[#0E7C7B]">
              <Compass className="w-3.5 h-3.5 text-[#F2A93B]" />
              OUR COMMITMENT
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#1F3B4D] tracking-tight">
              Technology Built for the Future
            </h2>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-medium">
              Evolutionary Web Dude is committed to combining innovation, creativity, and modern technology to deliver impactful digital experiences.
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Our goal is simple: build reliable solutions, encourage continuous learning, and help individuals and organizations stay prepared for the future of technology.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/about')}
                className="px-6 py-3 bg-[#1F3B4D] hover:bg-[#12232E] text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-98 flex items-center gap-2 cursor-pointer"
              >
                <span>About Our Mission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="text-[#0E7C7B] hover:text-[#0A5E5D] font-bold text-sm flex items-center gap-1.5 group cursor-pointer"
              >
                <span>Connect With Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Decorative geometric background icon */}
          <div className="hidden lg:block absolute right-10 bottom-4 w-72 h-72 opacity-10 pointer-events-none text-[#0E7C7B]">
            <Globe2 className="w-full h-full stroke-[1.2]" />
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D98E20]">
            CORE DOMAINS
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#1F3B4D]">
            What We Do
          </h2>
          <p className="text-sm text-gray-600">
            Delivering modern development, intelligent digital solutions, and practical engineering education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: Web Development */}
          <div className="card-feel-good p-7 sm:p-8 flex flex-col justify-between rounded-3xl bg-white border border-[#EAF3F3] hover:border-[#0E7C7B]/40 hover:shadow-xl transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0E7C7B]/10 text-[#0E7C7B] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6 text-[#0E7C7B]" />
              </div>

              <h3 className="font-heading font-bold text-xl text-[#1F3B4D]">
                Web Development
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                We design and develop modern, responsive, and user-focused web applications.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-[#0E7C7B]">Modern & Responsive</span>
              <button
                onClick={() => navigate('/services')}
                className="text-xs font-bold text-gray-600 hover:text-[#0E7C7B] flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Digital Solutions */}
          <div className="card-feel-good p-7 sm:p-8 flex flex-col justify-between rounded-3xl bg-white border border-[#EAF3F3] hover:border-[#0E7C7B]/40 hover:shadow-xl transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F2A93B]/15 text-[#D98E20] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6 text-[#D98E20]" />
              </div>

              <h3 className="font-heading font-bold text-xl text-[#1F3B4D]">
                Digital Solutions
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                We create efficient technology solutions that simplify workflows and support business growth.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-[#D98E20]">Workflow Efficiency</span>
              <button
                onClick={() => navigate('/services')}
                className="text-xs font-bold text-gray-600 hover:text-[#D98E20] flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Technology Education */}
          <div className="card-feel-good p-7 sm:p-8 flex flex-col justify-between rounded-3xl bg-white border border-[#EAF3F3] hover:border-[#0E7C7B]/40 hover:shadow-xl transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1F3B4D]/10 text-[#1F3B4D] flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6 text-[#1F3B4D]" />
              </div>

              <h3 className="font-heading font-bold text-xl text-[#1F3B4D]">
                Technology Education
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                We provide practical, hands-on learning experiences that help aspiring professionals develop industry-relevant skills.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-[#1F3B4D]">Hands-On Skills</span>
              <button
                onClick={() => navigate('/courses')}
                className="text-xs font-bold text-gray-600 hover:text-[#1F3B4D] flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>View courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FRONTLINES EDUTECH LIVE & SELF-PACED COURSES SECTION */}
      <FrontlinesCoursesSection
        onEnrollCourse={onEnrollCourse}
        onViewCurriculum={onViewCurriculum}
        navigate={navigate}
      />

      {/* 5. READY TO BEGIN YOUR JOURNEY? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#12232E] via-[#1F3B4D] to-[#0E7C7B] rounded-3xl p-8 sm:p-14 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
          
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto text-[#F2A93B]">
            <Rocket className="w-6 h-6" />
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
              Whether you want to build a digital solution or develop your technology skills, Evolutionary Web Dude is ready to support your next step.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center">
            <button
              id="get-started-cta-btn"
              onClick={() => navigate('/contact')}
              className="px-10 py-4 bg-[#F2A93B] hover:bg-[#D98E20] text-[#12232E] font-extrabold text-base rounded-xl shadow-xl transition-all hover:scale-102 active:scale-98 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};


