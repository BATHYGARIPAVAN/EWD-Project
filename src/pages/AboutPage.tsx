import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Target, 
  FileText, 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  Send,
  Zap,
  Leaf,
  Layers,
  Compass
} from 'lucide-react';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  const timelineMilestones = [
    {
      phase: 'Phase 1 - Inception',
      title: 'Identifying Paper–Heavy Office Friction',
      description: 'Recognized that academic researchers and corporate office teams were weighed down by manual paperwork, physical document routing, and legacy portal designs.',
      side: 'right',
      color: 'teal'
    },
    {
      phase: 'Phase 2 - Research',
      title: 'Evolutionary Algorithmic Engine',
      description: 'Engineered our proprietary client telemetry system combining micro-interaction tracking with dynamic React layout self-optimization.',
      side: 'left',
      color: 'amber'
    },
    {
      phase: 'Phase 3 - Expansion',
      title: 'Paperless Academic Solutions',
      description: 'Deployed zero-waste digital document portals across leading educational institutions and enterprise offices in Hyderabad and globally.',
      side: 'right',
      color: 'teal'
    },
    {
      phase: 'Phase 4 - Today',
      title: 'Full-Spectrum Web Engineering',
      description: 'Extending our ecosystem to 11 full-service domains spanning AI integration, mobile development, e-commerce, and cybersecurity.',
      side: 'left',
      color: 'amber'
    }
  ];

  const principles = [
    {
      number: '1',
      title: '1. User–Centric Ergonomics',
      desc: 'Every button, color contrast, and form field is designed to minimize cognitive strain and enable effortless task completion.',
      icon: Layers
    },
    {
      number: '2',
      title: '2. Environmental Sustainability',
      desc: 'Eliminating paper waste in offices and academic institutions while keeping web application bundles lightweight and energy efficient.',
      icon: Leaf
    },
    {
      number: '3',
      title: '3. Continuous Optimization',
      desc: 'Code should never remain static. Our evolutionary approach adapts websites to real user interactions continuously.',
      icon: Zap
    }
  ];

  return (
    <motion.div 
      id="about-page-root" 
      className="space-y-16 sm:space-y-24 pb-24 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      
      {/* 1. TOP HERO BANNER */}
      <section className="pt-14 sm:pt-20 pb-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-5">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#EAF3F3] text-[#0E7C7B] text-xs font-extrabold uppercase tracking-wider border border-[#0E7C7B]/20 shadow-2xs">
              ABOUT EVOLUTIONARY WEB DUDE
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#1F3B4D] tracking-tight leading-tight max-w-4xl mx-auto"
          >
            Pioneering Paperless Work &<br className="hidden sm:inline" /> Next–Gen Web Solutions
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed pt-1"
          >
            Our startup was born from a vision to modernize academic and enterprise environments by replacing outdated paper processes with intelligent, self-optimizing web platforms.
          </motion.p>
        </div>
      </section>

      {/* 2. OUR MISSION & PAPERLESS OFFICE COMMITMENT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Concentric Circle Icon Badge */}
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-10 h-10 rounded-full bg-[#0E7C7B]/10 text-[#0E7C7B] flex items-center justify-center border border-[#0E7C7B]/20 shadow-2xs"
          >
            <Target className="w-5 h-5" />
          </motion.div>

          {/* Section Title */}
          <h2 className="font-heading font-extrabold text-2xl sm:text-3.5xl text-[#1F3B4D] tracking-tight">
            Our Mission & Paperless Office Commitment
          </h2>

          {/* Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            <p>
              Evolutionary Web Dude is dedicated to freeing academics, researchers, and office workers from administrative gridlock. Traditional work environments waste thousands of hours manually processing paper files, signatures, and static forms.
            </p>
            <p>
              We build intuitive web applications that digitize every step of document creation, review, and archival. Our evolutionary algorithms continually learn from user interaction patterns to streamline navigation and remove UX bottlenecks automatically.
            </p>
          </div>

          {/* Partner With Us CTA */}
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Partner With Us</span>
            </motion.button>
          </div>

          {/* 4 Feature Items Grid (2x2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 pt-8">
            
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ x: 3 }}
              className="space-y-2 group"
            >
              <div className="text-teal-600 mb-2">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-base text-[#1F3B4D] group-hover:text-[#0E7C7B] transition-colors">
                Paperless Academic Work
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Digital portals for thesis review, grant applications, and student record management.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              whileHover={{ x: 3 }}
              className="space-y-2 group"
            >
              <div className="text-amber-500 mb-2">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-base text-[#1F3B4D] group-hover:text-[#D98E20] transition-colors">
                Enterprise Offices
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Automated document approval chains, employee onboarding, and zero-paper operations.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ x: 3 }}
              className="space-y-2 group"
            >
              <div className="text-amber-400 mb-2">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-base text-[#1F3B4D] group-hover:text-[#D98E20] transition-colors">
                Adaptive UI Systems
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Front-end interfaces that dynamically adjust layouts to maximize user productivity.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              whileHover={{ x: 3 }}
              className="space-y-2 group"
            >
              <div className="text-teal-600 mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-base text-[#1F3B4D] group-hover:text-[#0E7C7B] transition-colors">
                Enterprise Security
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Encrypted JWT authorization, audit logs, and compliance standards.
              </p>
            </motion.div>

          </div>

        </motion.div>
      </section>

      {/* 3. EVOLUTIONARY TIMELINE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D98E20]">
            OUR EVOLUTION
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#1F3B4D]">
            Evolutionary Timeline
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Scroll down to watch our technological milestones unfold in real time.
          </p>
        </div>

        {/* Timeline Container with Center Vertical Line */}
        <div className="relative pt-6 pb-6">
          {/* Vertical Center Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-10 md:space-y-14">
            {timelineMilestones.map((item, idx) => {
              const isRight = item.side === 'right';
              return (
                <div 
                  key={idx} 
                  className={`relative flex flex-col md:flex-row items-center ${
                    isRight ? 'md:justify-end' : 'md:justify-start'
                  }`}
                >
                  {/* Timeline Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isRight ? 30 : -30, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.45, delay: idx * 0.1 }}
                    whileHover={{ 
                      y: -4, 
                      scale: 1.015,
                      boxShadow: '0 12px 28px -8px rgba(14, 124, 123, 0.12)',
                      borderColor: 'rgba(14, 124, 123, 0.35)'
                    }}
                    className={`w-full md:w-[46%] ml-8 md:ml-0 bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-7 shadow-xs space-y-3 transition-all ${
                      isRight ? 'md:mr-0' : 'md:ml-0'
                    }`}
                  >
                    {/* Phase Badge */}
                    <div>
                      <span className="inline-block px-3 py-1 rounded-md bg-[#0E7C7B]/10 text-[#0E7C7B] text-[11px] font-extrabold tracking-wide">
                        {item.phase}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#1F3B4D] leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PRINCIPLES THAT DRIVE OUR CODE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        <div className="text-center">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3.5xl text-[#1F3B4D]">
            Principles That Drive Our Code
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ 
                y: -5,
                borderColor: 'rgba(14, 124, 123, 0.35)',
                boxShadow: '0 10px 25px -5px rgba(14, 124, 123, 0.1)'
              }}
              className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 space-y-3.5 shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#1F3B4D]">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </motion.div>
  );
};

