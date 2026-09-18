import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  Cpu, 
  Code2, 
  ShieldCheck, 
  Zap, 
  FileSpreadsheet, 
  Award,
  Calendar,
  Clock,
  Send,
  HelpCircle,
  Filter
} from 'lucide-react';
import { api } from '../services/api';
import { Course, ServiceDetail } from '../types';

interface ServicesPageProps {
  navigate: (path: string) => void;
  onEnroll: (course: Course) => void;
  onViewCurriculum: (course: Course) => void;
  onOpenQuoteModal: (service: ServiceDetail) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  navigate,
  onEnroll,
  onViewCurriculum,
  onOpenQuoteModal
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCourseTab, setActiveCourseTab] = useState('All');
  const [activeViewMode, setActiveViewMode] = useState<'programs' | 'services'>('programs');

  useEffect(() => {
    api.getCourses()
      .then(data => setCourses(data))
      .catch(err => console.error('Failed to load courses', err));
  }, []);

  const allServices: ServiceDetail[] = [
    {
      id: 'srv-1',
      number: '1',
      title: 'Adaptive Web Development',
      tagline: 'Dynamic websites that evolve and self-optimize based on real-time user interaction data.',
      description: 'Dynamic websites that evolve and self-optimize based on real-time user interaction data.',
      features: [
        'Evolutionary Optimization',
        'Next-Gen Performance',
        'Responsive Fluid Grid',
        'Real-time Telemetry Integration'
      ],
      startingPrice: '$999',
      timeline: '2-4 Weeks',
      techStack: ['React 18', 'TypeScript', 'Tailwind', 'Spring Boot']
    },
    {
      id: 'srv-2',
      number: '2',
      title: 'Innovative UX/UI Design',
      tagline: 'State-of-the-art visual design system built with deep psychology and micro-animations.',
      description: 'State-of-the-art visual design system built with deep psychology and micro-animations.',
      features: [
        'Custom Figma Design System',
        'Micro-Interactions & Motion',
        'Accessibility (WCAG 2.1 AA)',
        'Interactive Prototypes'
      ],
      startingPrice: '$749',
      timeline: '1-3 Weeks',
      techStack: ['Figma', 'Framer Motion', 'Tailwind CSS', 'Radix UI']
    },
    {
      id: 'srv-3',
      number: '3',
      title: 'AI Integration & Intelligent Modules',
      tagline: 'Empower your application with intelligent LLM APIs, autonomous agents, and smart search.',
      description: 'Empower your application with intelligent LLM APIs, autonomous agents, and smart search.',
      features: [
        'Custom AI Chatbots',
        'Predictive User Analytics',
        'Automated Content Generation',
        'Smart Semantic Search'
      ],
      startingPrice: '$1499',
      timeline: '3-5 Weeks',
      techStack: ['Gemini API', 'Vector Search', 'Node.js', 'Python']
    },
    {
      id: 'srv-4',
      number: '4',
      title: 'Full-Stack Architecture & Microservices',
      tagline: 'High-throughput backend architectures with distributed microservices and robust API gateways.',
      description: 'High-throughput backend architectures with distributed microservices and robust API gateways.',
      features: [
        'RESTful & GraphQL API Gateways',
        'Decoupled Service Meshes',
        'PostgreSQL & Cloud SQL Optimization',
        'Fault-Tolerant Circuit Breakers'
      ],
      startingPrice: '$1299',
      timeline: '3-6 Weeks',
      techStack: ['Spring Boot 3', 'Express', 'PostgreSQL', 'Docker']
    },
    {
      id: 'srv-5',
      number: '5',
      title: 'Paperless Office & Workflow Digitization',
      tagline: 'Eliminate paper clutter in universities, thesis submissions, and enterprise approvals.',
      description: 'Eliminate paper clutter in universities, thesis submissions, and enterprise approvals.',
      features: [
        'Automated PDF Verification & Signatures',
        'Academic Thesis Tracking Portals',
        'Multi-Tier Approval Hierarchies',
        'Excel & Cloud Data Synchronization'
      ],
      startingPrice: '$1199',
      timeline: '2-4 Weeks',
      techStack: ['ExcelJS', 'PDF-Lib', 'React', 'Secure Vault']
    },
    {
      id: 'srv-6',
      number: '6',
      title: 'Performance Optimization & Core Web Vitals',
      tagline: 'Elevate page load speeds, Lighthouse 100/100 ratings, and search engine organic rankings.',
      description: 'Elevate page load speeds, Lighthouse 100/100 ratings, and search engine organic rankings.',
      features: [
        'Sub-second First Contentful Paint (FCP)',
        'Zero Cumulative Layout Shift (CLS)',
        'Edge Asset Caching & CDN Routing',
        'Dynamic Code Splitting & Bundle Pruning'
      ],
      startingPrice: '$599',
      timeline: '1-2 Weeks',
      techStack: ['Vite', 'Brotli Compression', 'Cloudflare', 'Lighthouse']
    },
    {
      id: 'srv-7',
      number: '7',
      title: 'Cloud Deployment & DevOps Automation',
      tagline: 'Zero-downtime CI/CD deployment pipelines on Google Cloud, AWS, and containerized clusters.',
      description: 'Zero-downtime CI/CD deployment pipelines on Google Cloud, AWS, and containerized clusters.',
      features: [
        'Docker & Kubernetes Containerization',
        'GitHub Actions Automated Testing',
        'Cloud Run & Serverless Scaling',
        'Live Telemetry & Health Monitoring'
      ],
      startingPrice: '$899',
      timeline: '2-3 Weeks',
      techStack: ['Google Cloud Run', 'Docker', 'GitHub Actions', 'Nginx']
    },
    {
      id: 'srv-8',
      number: '8',
      title: 'Custom Headless CMS & E-Commerce',
      tagline: 'Blazing-fast digital stores and content engines tailored for custom catalog workflows.',
      description: 'Blazing-fast digital stores and content engines tailored for custom catalog workflows.',
      features: [
        'Custom Product & Inventory Pipelines',
        'Stripe & Razorpay Payment Integrations',
        'Headless Content Modeling',
        'Excel Export & Order Telemetry'
      ],
      startingPrice: '$1399',
      timeline: '3-5 Weeks',
      techStack: ['React', 'Stripe', 'Razorpay', 'ExcelDB']
    },
    {
      id: 'srv-9',
      number: '9',
      title: 'Enterprise Security & Compliance Audits',
      tagline: 'Hardened cybersecurity reviews, vulnerability assessments, and OWASP compliance auditing.',
      description: 'Hardened cybersecurity reviews, vulnerability assessments, and OWASP compliance auditing.',
      features: [
        'OWASP Top 10 Penetration Testing',
        'Encrypted Data-at-Rest & In-Transit',
        'JWT Token Rotation Security',
        'GDPR & DPDP Regulatory Compliance'
      ],
      startingPrice: '$849',
      timeline: '1-2 Weeks',
      techStack: ['Spring Security', 'JWT', 'SSL/TLS', 'Audit Logs']
    },
    {
      id: 'srv-10',
      number: '10',
      title: 'Continuous Maintenance & Evolutionary SLA',
      tagline: 'Ongoing algorithmic updates, security patches, uptime SLAs, and active code maintenance.',
      description: 'Ongoing algorithmic updates, security patches, uptime SLAs, and active code maintenance.',
      features: [
        '24/7 Server Health Monitoring',
        'Monthly Feature Refinements',
        'Automated Daily Excel & Database Backups',
        'Priority Hyderabad Engineering Support'
      ],
      startingPrice: '$399/mo',
      timeline: 'Ongoing SLA',
      techStack: ['Uptime Kuma', 'Backup Pipelines', 'SLA Guarantee']
    },
    {
      id: 'srv-11',
      number: '11',
      title: 'Mobile-First Progressive Web Apps (PWA)',
      tagline: 'Native app-like speed, offline capabilities, and push notifications with zero install barrier.',
      description: 'Native app-like speed, offline capabilities, and push notifications with zero install barrier.',
      features: [
        'Service Worker Offline Caching',
        'Add-to-Home-Screen (A2HS)',
        'Push Notification Triggers',
        'Adaptive Touch Gestures'
      ],
      startingPrice: '$899',
      timeline: '2-4 Weeks',
      techStack: ['PWA', 'Workbox', 'React 18', 'IndexedDB']
    }
  ];

  const filteredCourses = activeCourseTab === 'All'
    ? courses
    : courses.filter(c => c.category.toLowerCase().includes(activeCourseTab.toLowerCase()) || c.title.toLowerCase().includes(activeCourseTab.toLowerCase()));

  return (
    <div id="services-page-root" className="space-y-16 sm:space-y-20 pb-20">
      
      {/* 1. HERO HEADER */}
      <section className="pt-12 pb-8 bg-gradient-to-b from-[#F7FAFA] to-[#EAF3F3]/30 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0E7C7B]/10 text-[#0E7C7B] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F2A93B]" />
            Enterprise Services & Academic Training
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#1F3B4D] tracking-tight">
            Programs & Solutions Spectrum
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Accelerate your career through hands-on technology mastery or transform your organizational workflows with our 11 bespoke evolutionary web services.
          </p>

          {/* Tab Switcher */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setActiveViewMode('programs')}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-xs ${
                activeViewMode === 'programs'
                  ? 'bg-[#0E7C7B] text-white shadow-md'
                  : 'bg-white text-[#1F3B4D] border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Technology Training Programs
            </button>

            <button
              onClick={() => setActiveViewMode('services')}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-xs ${
                activeViewMode === 'services'
                  ? 'bg-[#0E7C7B] text-white shadow-md'
                  : 'bg-white text-[#1F3B4D] border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              11 Core Enterprise Services
            </button>
          </div>
        </div>
      </section>

      {/* 2. SECTION A: TECHNOLOGY TRAINING PROGRAMS (Screenshot 3 Matching) */}
      {activeViewMode === 'programs' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D98E20]">
                HYDERABAD HYBRID & ONLINE BATCHES
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1F3B4D]">
                Technology Training Programs
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Practical, project-based learning with industry mentors in Hyderabad. All registrations persist directly to our Excel database.
              </p>
            </div>

            {/* Course Category Filter */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-[#F7FAFA] border border-[#EAF3F3] rounded-2xl">
              {['All', 'Java', 'Python', 'MERN', 'Spring'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCourseTab(tab)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeCourseTab === tab
                      ? 'bg-[#0E7C7B] text-white shadow-xs'
                      : 'text-gray-600 hover:text-[#0E7C7B]'
                  }`}
                >
                  {tab === 'All' ? 'All Programs' : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid matching Screenshot 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="card-feel-good p-7 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#0E7C7B]/10 text-[#0E7C7B] border border-[#0E7C7B]/20">
                      {course.category}
                    </span>
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                      <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px]">
                        {course.duration}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 font-bold text-[11px] border border-amber-200">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1F3B4D] mb-2.5">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Modules */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                      Core Modules & Technologies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {course.modules.map((mod, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#F7FAFA] border border-[#EAF3F3] text-[#1F3B4D]"
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewCurriculum(course)}
                      className="px-4 py-2.5 text-xs font-bold text-[#0E7C7B] hover:bg-[#0E7C7B]/10 rounded-xl transition-colors border border-[#0E7C7B]/30"
                    >
                      View Syllabus
                    </button>
                  </div>

                  <button
                    onClick={() => onEnroll(course)}
                    className="px-5 py-2.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all hover:scale-102 active:scale-98"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Enroll in Program
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Not Sure Which Course to Pick? Card (Screenshot 3) */}
          <div className="bg-[#12232E] rounded-3xl p-8 sm:p-10 text-center text-white space-y-4 shadow-xl">
            <h3 className="font-heading font-extrabold text-2xl text-white">
              Not Sure Which Course to Pick?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
              Talk to the EWD team and we'll help you choose the right learning path based on your goals and background.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-2.5 bg-[#F2A93B] hover:bg-[#D98E20] text-[#12232E] font-bold text-xs sm:text-sm rounded-xl shadow-md inline-flex items-center gap-2 transition-all hover:scale-102"
              >
                Contact EWD Team
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 3. SECTION B: 11 CORE ENTERPRISE SERVICES */}
      {activeViewMode === 'services' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D98E20]">
              ENTERPRISE & RESEARCH PORTALS
            </span>
            <h2 className="font-heading font-extrabold text-3xl text-[#1F3B4D]">
              All 11 Core Service Domains
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Custom-crafted digital platforms with continuous self-optimization algorithms and paperless workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service) => (
              <div
                key={service.id}
                className="card-feel-good p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-[#0E7C7B]/10 text-[#0E7C7B] font-heading font-extrabold text-sm flex items-center justify-center">
                      {service.number}
                    </div>
                    <span className="text-[11px] font-semibold text-gray-400">
                      Timeline: {service.timeline}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#1F3B4D] mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                    {service.tagline}
                  </p>

                  <div className="space-y-2 mb-5">
                    {service.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0E7C7B] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-5">
                    {service.techStack.map((tech, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block font-medium">Starting from</span>
                    <span className="font-heading font-bold text-sm text-[#1F3B4D]">{service.startingPrice}</span>
                  </div>

                  <button
                    onClick={() => onOpenQuoteModal(service)}
                    className="px-4 py-2 bg-[#F2A93B] hover:bg-[#D98E20] text-[#12232E] font-bold text-xs rounded-xl shadow-xs transition-all hover:scale-102 active:scale-98"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
