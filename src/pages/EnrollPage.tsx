import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Building2, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  MapPin, 
  Send, 
  CheckCircle2, 
  FileSpreadsheet, 
  Sparkles, 
  Clock, 
  Layers, 
  ShieldCheck,
  Coins,
  ChevronDown,
  ChevronUp,
  Star,
  Download,
  Play,
  PhoneCall,
  MessageCircle,
  Check,
  Award,
  Zap,
  Tag,
  HelpCircle,
  Briefcase,
  Code,
  Users,
  Video,
  Gift,
  ArrowRight,
  Share2,
  X,
  Terminal,
  FileText,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Course } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CourseThumbnail } from '../components/courses/CourseThumbnail';

interface EnrollPageProps {
  courseSlug?: string;
  selectedCourse?: Course | null;
  navigate: (path: string) => void;
  onViewCurriculum?: (course: Course) => void;
}

export const EnrollPage: React.FC<EnrollPageProps> = ({
  courseSlug,
  selectedCourse: propCourse,
  navigate,
  onViewCurriculum
}) => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course | null>(propCourse || null);
  const [loading, setLoading] = useState(!propCourse);

  // Active section for sticky sub-nav
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'projects' | 'career' | 'reviews' | 'faq' | 'enroll'>('overview');

  // Checkout Form State
  const [name, setName] = useState(user?.name || '');
  const [mobileNumber, setMobileNumber] = useState(user?.phone || '');
  const [emailAddress, setEmailAddress] = useState(user?.email || '');
  const [collegeName, setCollegeName] = useState(user?.organization || '');
  const [qualification, setQualification] = useState('');
  const [yearOfPassout, setYearOfPassout] = useState('');
  const [preferredMode, setPreferredMode] = useState<'Online' | 'Offline'>('Online');
  const [experienceLevel, setExperienceLevel] = useState<'Fresher' | 'Student' | 'Career Switcher' | 'Experienced Developer'>('Fresher');
  const [whatsappConsent, setWhatsappConsent] = useState(true);

  // Coupon System
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; type: 'flat' | 'percent' } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoSubmitting, setDemoSubmitting] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);
  const [demoName, setDemoName] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [activeSyllabusAccordion, setActiveSyllabusAccordion] = useState<number | null>(0);
  const [activeFaqAccordion, setActiveFaqAccordion] = useState<number | null>(0);
  const [courseSelectorOpen, setCourseSelectorOpen] = useState(false);

  // Form reference for smooth scrolling
  const checkoutSectionRef = useRef<HTMLDivElement>(null);

  // Load courses if not provided or to resolve slug
  useEffect(() => {
    api.getCourses()
      .then((data) => {
        setCourses(data);
        if (!propCourse) {
          if (courseSlug) {
            const cleanSlug = courseSlug.toLowerCase().replace('/enroll/', '').replace('enroll/', '').trim();
            const matched = data.find(c => 
              c.id.toLowerCase() === cleanSlug ||
              c.id.toLowerCase().replace('crs-', '') === cleanSlug ||
              c.title.toLowerCase().replace(/[^a-z0-9]/g, '-').includes(cleanSlug) ||
              cleanSlug.includes('java') && c.title.toLowerCase().includes('java') ||
              cleanSlug.includes('web') && c.title.toLowerCase().includes('web') ||
              cleanSlug.includes('python') && c.title.toLowerCase().includes('python')
            );
            setCourse(matched || data[0]);
          } else {
            setCourse(data[0]);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching courses for enrollment:', err);
        setLoading(false);
      });
  }, [courseSlug, propCourse]);

  const currentCourse: Course = course || (courses.length > 0 ? courses[0] : {
    id: 'crs-java-fullstack',
    title: 'Advanced Java with Spring Boot & Microservices in Telugu',
    category: 'FULL STACK',
    description: 'Master enterprise distributed systems, Spring Boot 3, Microservices, Kafka, Redis, and Cloud Architecture with practical Telugu & English live mentoring from Evolutionary Web Dude.',
    icon: 'Coffee',
    modules: ['Core Java 21', 'Spring Boot 3', 'Microservices', 'Spring Data JPA', 'Kafka', 'Redis', 'Docker', 'AWS', 'JUnit 5 & Mockito'],
    level: 'Beginner to Advanced',
    duration: '12 Weeks',
    fee: '₹9,999',
    originalFee: '₹39,999',
    discountPercent: 75,
    emiStartsAt: '₹1,999/mo',
    startDate: 'September 22, 2026',
    timings: '7:00 PM - 8:30 PM IST',
    status: 'Open for Enrollment',
    syllabus: [],
    learningOutcomes: [
      'Architect cloud-native microservices from scratch',
      'Master Spring Boot 3, REST APIs & Spring Security 6',
      'Implement real-time messaging with Apache Kafka & Redis',
      'Deploy containerized applications on AWS Cloud'
    ]
  });

  // Calculate pricing numbers
  const parseNumericPrice = (priceStr?: string): number => {
    if (!priceStr) return 9999;
    const cleaned = priceStr.replace(/[^0-9]/g, '');
    return cleaned ? parseInt(cleaned, 10) : 9999;
  };

  const basePriceNumber = parseNumericPrice(currentCourse.fee);
  const originalPriceNumber = parseNumericPrice(currentCourse.originalFee) || (basePriceNumber * 3);

  // Apply coupon calculations
  let couponDiscountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'flat') {
      couponDiscountAmount = appliedCoupon.discount;
    } else {
      couponDiscountAmount = Math.round((basePriceNumber * appliedCoupon.discount) / 100);
    }
  }

  const finalPayableAmount = Math.max(0, basePriceNumber - couponDiscountAmount);

  // Scroll to checkout form
  const scrollToCheckout = () => {
    setActiveTab('enroll');
    if (checkoutSectionRef.current) {
      checkoutSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle Coupon Apply
  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    setCouponError('');
    setCouponSuccess('');

    if (!code) {
      setCouponError('Please enter a valid coupon code.');
      return;
    }

    if (code === 'EWDPROMO' || code === 'FLM10') {
      setAppliedCoupon({ code, discount: 1000, type: 'flat' });
      setCouponSuccess('Coupon "EWDPROMO" applied! Extra ₹1,000 Early Bird discount added.');
      setCouponInput(code);
    } else if (code === 'EARLYBIRD') {
      setAppliedCoupon({ code, discount: 1500, type: 'flat' });
      setCouponSuccess('Coupon "EARLYBIRD" applied! ₹1,500 bonus discount activated.');
      setCouponInput(code);
    } else if (code === 'EWD20') {
      setAppliedCoupon({ code, discount: 20, type: 'percent' });
      setCouponSuccess('Coupon "EWD20" applied! 20% discount applied to program fee.');
      setCouponInput(code);
    } else {
      setCouponError('Invalid or expired coupon code. Try using "EWDPROMO".');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponSuccess('');
    setCouponError('');
  };

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!mobileNumber.trim()) {
      setErrorMessage('Please enter your WhatsApp/Mobile number.');
      return;
    }
    if (!emailAddress.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!collegeName.trim()) {
      setErrorMessage('Please enter your college name or company.');
      return;
    }
    if (!qualification || qualification === 'Select qualification') {
      setErrorMessage('Please select your educational qualification.');
      return;
    }
    if (!yearOfPassout.trim()) {
      setErrorMessage('Please enter your graduation passout year.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const generatedId = `EWD-${currentCourse.category.substring(0, 3)}-${Date.now().toString().slice(-4)}`;
      setEnrollmentId(generatedId);

      const payload = {
        courseId: currentCourse.id,
        courseTitle: currentCourse.title,
        courseCategory: currentCourse.category,
        userId: user?.id || '',
        userName: name.trim(),
        userEmail: emailAddress.trim(),
        userPhone: mobileNumber.trim(),
        collegeName: collegeName.trim(),
        qualification: qualification,
        yearOfPassout: yearOfPassout.trim(),
        educationOrJob: `${qualification} - ${collegeName.trim()}`,
        experienceLevel: experienceLevel,
        mode: preferredMode,
        preferredMode: preferredMode,
        preferredBatch: 'Regular' as any,
        notes: `Coupon: ${appliedCoupon ? appliedCoupon.code : 'None'} | Final Fee: ₹${finalPayableAmount.toLocaleString('en-IN')} | WhatsApp Updates: ${whatsappConsent ? 'Yes' : 'No'} | Registered via EWD Live Checkout`,
        status: 'Under Review',
        paymentStatus: 'Pending',
      };

      await api.createEnrollment(payload);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Enrollment error:', err);
      setErrorMessage(err.message || 'Failed to submit enrollment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Demo Registration handler
  const handleBookDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoName || !demoPhone) return;
    setDemoSubmitting(true);
    setTimeout(() => {
      setDemoSubmitting(false);
      setDemoSuccess(true);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    }, 600);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#0E7C7B] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-gray-500">Loading course admissions...</p>
      </div>
    );
  }

  // Course curriculum data with fallback
  const detailedModules = [
    {
      moduleNumber: '01',
      title: 'Core & Advanced Java 21 Mastery',
      duration: 'Week 1 - 2',
      topics: [
        'Modern Java 21 features, virtual threads & pattern matching',
        'Deep dive into JVM Architecture, Memory Model & Garbage Collection',
        'Object-Oriented Design Principles (SOLID) with Telugu analogies',
        'Collections Framework internals (HashMap, ConcurrentHashMap, List)',
        'Java Streams API, Functional Interfaces, Lambdas & Optional'
      ]
    },
    {
      moduleNumber: '02',
      title: 'Spring Framework Core & Inversion of Control',
      duration: 'Week 3 - 4',
      topics: [
        'Spring IoC Container, Bean Lifecycles & Configuration Modes',
        'Dependency Injection (Constructor vs Setter injection best practices)',
        'Spring Core Annotations (@Component, @Service, @Repository, @Autowired)',
        'Aspect-Oriented Programming (AOP) for logging & transaction tracking',
        'Spring Profiles, Environment variables & Configuration Properties'
      ]
    },
    {
      moduleNumber: '03',
      title: 'Spring Boot 3 & High-Performance REST APIs',
      duration: 'Week 5 - 6',
      topics: [
        'Spring Boot 3 architecture, Autoconfiguration & Starters',
        'Designing production-ready RESTful APIs with Clean Controller patterns',
        'Request validation with Hibernate Validator & Custom Constraints',
        'Centralized Global Exception Handling with @ControllerAdvice & ProblemDetails',
        'API documentation using SpringDoc OpenAPI / Swagger 3'
      ]
    },
    {
      moduleNumber: '04',
      title: 'Hibernate 6, Spring Data JPA & Database Optimization',
      duration: 'Week 7',
      topics: [
        'Entity Lifecycle, Relationships (@OneToMany, @ManyToMany, Cascading)',
        'Writing optimized JPQL, Native Queries & JPA Specifications',
        'Handling N+1 query problem, 1st & 2nd level caching architectures',
        'Database transaction isolation levels and rollback strategies',
        'Database versioning and schema migrations using Liquibase/Flyway'
      ]
    },
    {
      moduleNumber: '05',
      title: 'Distributed Microservices Architecture & Cloud Components',
      duration: 'Week 8 - 9',
      topics: [
        'Monolithic to Microservices decompilation strategies',
        'Service Discovery & Registration using Netflix Eureka Server',
        'API Gateway design, request routing & rate-limiting with Spring Cloud Gateway',
        'Client-side load balancing with Spring Cloud LoadBalancer',
        'Fault tolerance & Circuit Breakers using Resilience4j'
      ]
    },
    {
      moduleNumber: '06',
      title: 'Real-Time Messaging with Apache Kafka & Redis Caching',
      duration: 'Week 10',
      topics: [
        'Event-driven architecture with Apache Kafka (Producers, Consumers, Topics)',
        'Kafka partition keys, consumer groups & offset management in Telugu',
        'Distributed in-memory caching with Redis (Cache-Aside pattern, TTL, eviction)',
        'Redis distributed locking for high-concurrency payment safety'
      ]
    },
    {
      moduleNumber: '07',
      title: 'Enterprise Security: Spring Security 6 & JWT Auth',
      duration: 'Week 11',
      topics: [
        'Spring Security 6 filter chain architecture from ground up',
        'Stateless JWT (JSON Web Token) authentication and token refresh cycles',
        'Role-Based Access Control (RBAC) & method-level security (@PreAuthorize)',
        'Securing internal Microservices communication with OAuth2 Resource Server'
      ]
    },
    {
      moduleNumber: '08',
      title: 'Testing (JUnit 5 / Mockito) & AWS Cloud Deployment',
      duration: 'Week 12',
      topics: [
        'Unit testing with JUnit 5 and mock testing with Mockito',
        'Integration testing with Testcontainers & SpringBootTest',
        'Containerization of Microservices using Docker & Multi-stage builds',
        'Production AWS deployment (EC2, S3, RDS, CloudWatch monitoring)'
      ]
    }
  ];

  // Industry capstone projects
  const industryProjects = [
    {
      title: 'Enterprise FinTech Payment & Wallet Microservices System',
      description: 'A distributed banking wallet engine processing peer-to-peer transfers, double-entry ledgers, and payment webhooks. Implements the Saga pattern for distributed transactions across independent services with Apache Kafka event streams.',
      stack: ['Spring Boot 3', 'Kafka', 'PostgreSQL', 'Eureka', 'Redis'],
      badge: 'Flagship Project'
    },
    {
      title: 'AI-Powered Resume Screening & Career Hub Portal',
      description: 'An enterprise recruitment pipeline that parses resume PDFs, computes vector embeddings, and matches candidate profiles against live job descriptions using Spring AI and PostgreSQL pgvector.',
      stack: ['Spring AI', 'PostgreSQL', 'REST API', 'React 18', 'Docker'],
      badge: 'AI & Enterprise'
    },
    {
      title: 'High-Concurrency E-Commerce Flash Sale Platform',
      description: 'An ultra-fast product flash sale booking service designed to prevent overselling. Uses Redis distributed locks, rate limiters, and asynchronous order placement queues capable of handling 50,000 requests/sec.',
      stack: ['Spring Boot', 'Redis', 'Resilience4j', 'Kafka', 'JWT'],
      badge: 'High Concurrency'
    },
    {
      title: 'Cloud-Native Healthcare Slot Scheduling Service',
      description: 'Multi-tenant doctor consultation booking backend with automated SMS/email reminders, calendar sync, doctor availability locks, and HIPAA-compliant data encryption.',
      stack: ['Spring Cloud Gateway', 'MySQL', 'Docker', 'AWS EC2'],
      badge: 'Cloud Native'
    }
  ];

  // FAQs
  const courseFaqs = [
    {
      question: 'Will classes be conducted in Telugu or English?',
      answer: 'Instruction is delivered in natural, easy-to-understand Telugu with all technical terminology, industry keywords, and code syntax explained in English. This bilingual methodology eliminates the language barrier so you grasp complex system design patterns effortlessly.'
    },
    {
      question: 'What if I miss a live session?',
      answer: 'Every single live lecture is recorded in crystal-clear 1080p HD. Recordings, GitHub source code repositories, class presentations, and daily task sheets are uploaded within 2 hours to your private EWD student dashboard with 2 years of unlimited access.'
    },
    {
      question: 'I am from a Non-IT or Mechanical/Civil branch. Can I join this program?',
      answer: 'Yes, absolutely! Over 45% of our successful alumni transitioned from non-CS backgrounds. We start with Core Java fundamentals and object-oriented thinking before progressing step-by-step into enterprise frameworks and distributed architectures.'
    },
    {
      question: 'How does the 1:1 Doubt Support and Mentorship work?',
      answer: 'You will be added to a private batch Discord/WhatsApp community where our mentors are active daily. We also hold weekly dedicated live doubt-clearing sessions where you can share your screen and debug issues alongside the mentor.'
    },
    {
      question: 'What placement and interview assistance is provided?',
      answer: 'Our comprehensive Career Booster module includes 1:1 ATS-compliant resume revamping, LinkedIn optimization, 5+ technical mock interviews with Senior Product Engineers, HR round coaching, and direct referrals through the EWD alumni and hiring partner network.'
    },
    {
      question: 'Are there any installment or EMI payment plans available?',
      answer: 'Yes! We offer flexible No-Cost EMI options starting from ₹1,999/month. You can reserve your seat today by submitting this enrollment form, and our admissions coordinator will help you set up an installment plan that fits your budget.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-[#0E7C7B]/20">
      
      {/* 1. TOP ANNOUNCEMENT BANNER */}
      <div className="bg-gradient-to-r from-[#0E7C7B] via-[#0A5E5D] to-[#12232E] text-white py-2.5 px-4 text-xs font-semibold text-center flex items-center justify-center gap-2 border-b border-white/10">
        <span className="inline-flex items-center gap-1.5 bg-[#F2A93B] text-[#12232E] font-black px-2 py-0.5 rounded text-[10.5px] uppercase tracking-wider">
          <Sparkles className="w-3 h-3 fill-current" /> Limited Offer
        </span>
        <span>
          Upcoming Live Batch Starting <strong className="text-[#F2A93B]">{currentCourse.startDate || 'September 22, 2026'}</strong>. Special Early Bird Discount Applied!
        </span>
        <button 
          onClick={scrollToCheckout}
          className="underline hover:text-[#F2A93B] transition-colors ml-1 font-bold cursor-pointer hidden sm:inline"
        >
          Claim Your Seat &rarr;
        </button>
      </div>

      {/* 2. HERO COURSE HEADER SECTION */}
      <section className="relative bg-gradient-to-b from-[#12232E] via-[#0D1C24] to-[#12232E] text-white pt-8 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/10">
        {/* Soft Background Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0E7C7B]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#F2A93B]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between gap-4 pb-6">
            <button
              onClick={() => {
                if (onViewCurriculum && currentCourse) {
                  onViewCurriculum(currentCourse);
                } else {
                  navigate('/courses');
                }
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-full transition-all cursor-pointer backdrop-blur-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Course Catalog</span>
            </button>

            {/* Course Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCourseSelectorOpen(!courseSelectorOpen)}
                className="text-xs font-bold text-teal-300 hover:text-teal-200 flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <span>Change Course</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {courseSelectorOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 z-50 p-2 space-y-1 max-h-80 overflow-y-auto">
                  <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Select Program
                  </div>
                  {courses.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setCourse(c);
                        setCourseSelectorOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs rounded-xl transition-colors font-medium flex items-center justify-between ${
                        c.id === currentCourse.id ? 'bg-[#0E7C7B]/10 text-[#0E7C7B] font-bold' : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="truncate">{c.title}</span>
                      {c.id === currentCourse.id && <Check className="w-3.5 h-3.5 text-[#0E7C7B] shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hero Grid: Main Info + Right Preview Rail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E7C7B]/30 border border-[#0E7C7B]/50 text-teal-300 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#F2A93B]" />
                  <span>TELUGU & ENGLISH BILINGUAL INSTRUCTION</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-gray-300 text-xs font-medium">
                  {currentCourse.category}
                </span>
              </div>

              {/* Course Title */}
              <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                {currentCourse.title}
              </h1>

              {/* Subtitle / Description */}
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl font-normal">
                {currentCourse.description}
              </p>

              {/* Social Proof & Rating Metrics */}
              <div className="flex flex-wrap items-center gap-4 py-1 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 bg-amber-400/15 border border-amber-400/30 px-3 py-1.5 rounded-full text-amber-300 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5.0</span>
                  <span className="text-gray-400 font-normal">(1,850+ Telugu Students)</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Award className="w-4 h-4 text-teal-300" />
                  <span>100% Practical Live Architecture</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Briefcase className="w-4 h-4 text-[#F2A93B]" />
                  <span>12 - 25 LPA Targeted Curriculum</span>
                </div>
              </div>

              {/* High-Impact 4-Metric Grid (Frontlines Style) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="space-y-0.5">
                  <div className="text-[10px] text-gray-400 uppercase font-extrabold tracking-wider flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#F2A93B]" />
                    <span>Batch Date</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    {currentCourse.startDate || 'Sep 22, 2026'}
                  </div>
                </div>

                <div className="space-y-0.5 border-l border-white/10 pl-3">
                  <div className="text-[10px] text-gray-400 uppercase font-extrabold tracking-wider flex items-center gap-1">
                    <Clock className="w-3 h-3 text-teal-300" />
                    <span>Timings</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    {currentCourse.timings || '7:00 PM - 8:30 PM'}
                  </div>
                </div>

                <div className="space-y-0.5 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-3">
                  <div className="text-[10px] text-gray-400 uppercase font-extrabold tracking-wider flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#F2A93B]" />
                    <span>Duration</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    {currentCourse.duration || '12 Weeks Live'}
                  </div>
                </div>

                <div className="space-y-0.5 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-3">
                  <div className="text-[10px] text-gray-400 uppercase font-extrabold tracking-wider flex items-center gap-1">
                    <Video className="w-3 h-3 text-teal-300" />
                    <span>Mode</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    Live + 2 Yr Vault
                  </div>
                </div>
              </div>

              {/* Pricing & Savings Callout Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-900/60 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">All-Inclusive Fee:</span>
                    <span className="text-2xl sm:text-3xl font-black text-[#F2A93B] tracking-tight">{currentCourse.fee}</span>
                    {currentCourse.originalFee && (
                      <span className="text-sm text-gray-400 line-through font-semibold">{currentCourse.originalFee}</span>
                    )}
                    <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase bg-emerald-500 text-white shadow-xs">
                      {currentCourse.discountPercent || 75}% OFF
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                    Early Bird Offer Active • Save ₹30,000 Today
                  </div>
                </div>

                {currentCourse.emiStartsAt && (
                  <div className="text-xs text-gray-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                    No-Cost EMI from <strong className="text-teal-300 font-extrabold">{currentCourse.emiStartsAt}</strong>
                  </div>
                )}
              </div>

              {/* Hero Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={scrollToCheckout}
                  className="flex-1 sm:flex-none px-7 py-3.5 bg-gradient-to-r from-[#F2A93B] to-[#D98E20] hover:from-[#D98E20] hover:to-[#B67312] text-[#12232E] font-black text-sm sm:text-base rounded-xl shadow-[0_4px_16px_rgba(242,169,59,0.35)] transition-all flex items-center justify-center gap-2 hover:scale-102 active:scale-98 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 fill-current text-[#12232E]" />
                  <span>Enroll Now (Reserve Seat)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setDemoModalOpen(true)}
                  className="flex-1 sm:flex-none px-5 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-xs cursor-pointer"
                >
                  <Play className="w-4 h-4 text-teal-300 fill-teal-300" />
                  <span>Book Free Live Demo</span>
                </button>
              </div>

            </div>

            {/* Right Sticky Card (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/20 ring-1 ring-white/10 space-y-5">
                
                {/* Visual Thumbnail */}
                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200">
                  <CourseThumbnail course={currentCourse} aspectRatio="16/9" />
                </div>

                {/* Pricing Block */}
                <div className="space-y-1 border-b border-slate-100 pb-4">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-[#12232E] tracking-tight">{currentCourse.fee}</span>
                      {currentCourse.originalFee && (
                        <span className="text-xs text-slate-400 line-through font-semibold">{currentCourse.originalFee}</span>
                      )}
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase bg-emerald-100 text-emerald-800">
                      Save ₹30,000
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Includes GST, LMS & Certificate</span>
                    <span className="text-[#0E7C7B] font-bold">EMI from {currentCourse.emiStartsAt}</span>
                  </div>
                </div>

                {/* Instant Action Triggers */}
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={scrollToCheckout}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-[#0E7C7B] to-[#0A5E5D] hover:from-[#0A5E5D] hover:to-[#074645] text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-101"
                  >
                    <Zap className="w-4 h-4 text-[#F2A93B] fill-current" />
                    <span>Proceed to Course Checkout</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDemoModalOpen(true)}
                    className="w-full py-2.5 px-4 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-[#0E7C7B]" />
                    <span>Watch Sample Demo Lecture</span>
                  </button>
                </div>

                {/* Program Inclusions Checklist */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    This Evolutionary Program Includes:
                  </span>
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>100+ Hours</strong> Live Interactive Telugu & English Classes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>4 Real-World Enterprise Microservices</strong> Capstone Projects</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>2 Years Unrestricted Access</strong> to HD Recordings & Code</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>1:1 Mentorship & Doubt Sessions</strong> with Senior Architects</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Resume Revamp, Mock Interviews</strong> & Referral Access</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Verified EWD Certification</strong> of Completion</span>
                    </div>
                  </div>
                </div>

                {/* Guarantee & Contact */}
                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-3.5 space-y-2 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>100% Satisfaction & Placement Support</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Need assistance or have queries? Talk directly with our admissions counselor:
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <a
                      href="https://wa.me/918333077727"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-extrabold text-[#0E7C7B] hover:underline flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Support</span>
                    </a>
                    <span className="text-slate-300">•</span>
                    <a
                      href="tel:+918333077727"
                      className="text-xs font-extrabold text-slate-700 hover:text-[#0E7C7B] flex items-center gap-1"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>+91 83330 77727</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. STICKY IN-PAGE NAVIGATION TABS */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-2.5 gap-2 text-xs font-bold">
            <div className="flex items-center gap-1 shrink-0">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'syllabus', label: 'Curriculum & Modules' },
                { id: 'projects', label: 'Real-Time Projects' },
                { id: 'career', label: 'Career Booster' },
                { id: 'reviews', label: 'Student Reviews' },
                { id: 'faq', label: 'FAQs' },
                { id: 'enroll', label: 'Enroll & Checkout' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    if (tab.id === 'enroll') {
                      scrollToCheckout();
                    } else {
                      const el = document.getElementById(`section-${tab.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#0E7C7B] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick Sticky Enroll Trigger */}
            <div className="hidden sm:flex items-center gap-3 shrink-0 pl-4 border-l border-slate-200">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-extrabold uppercase">Total Fee</span>
                <span className="text-sm font-black text-[#12232E]">{currentCourse.fee}</span>
              </div>
              <button
                type="button"
                onClick={scrollToCheckout}
                className="px-4 py-2 bg-[#F2A93B] hover:bg-[#D98E20] text-[#12232E] font-black text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Enroll Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MAIN PAGE BODY (70% Content + Side Flow) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* SECTION 1: OVERVIEW & WHY LEARN WITH EWD */}
        <section id="section-overview" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#0E7C7B]">
              THE EVOLUTIONARY ADVANTAGE
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#12232E]">
              Why Learn With Evolutionary Web Dude?
            </h2>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              We eliminated the traditional university lecture model and replaced it with enterprise-grade production engineering taught natively in Telugu. Here is what sets EWD apart:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0E7C7B] flex items-center justify-center font-black">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">Telugu & English Bilingual</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complex topics like multithreading, Kafka partitioning, and JPA cascading are broken down using everyday Telugu context before implementing in clean English code.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D98E20] flex items-center justify-center font-black">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">Zero Copy-Paste Code</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every single REST controller, service interface, security filter, and Dockerfile is typed live line-by-line during class. You learn how architects actually write code.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">Real Production Stacks</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No toy calculator apps. You build distributed microservices using Eureka, Spring Cloud Gateway, Redis, Apache Kafka, and Docker on AWS cloud environments.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">1:1 Mentorship & Community</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get your code reviewed, bugs fixed, and architectural questions answered by senior engineers via private Discord groups and live weekend doubt clinics.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: COMPREHENSIVE CURRICULUM ACCORDION */}
        <section id="section-syllabus" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-[#0E7C7B]">
                DETAILED SYLLABUS & ROADMAP
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#12232E]">
                What You Will Learn Across 12 Weeks
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                8 comprehensive modules spanning fundamentals, enterprise patterns, distributed architecture, and cloud deployment.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                // Toggle expand all
                setActiveSyllabusAccordion(activeSyllabusAccordion === null ? 0 : null);
              }}
              className="text-xs font-bold text-[#0E7C7B] hover:text-[#0A5E5D] flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>{activeSyllabusAccordion !== null ? 'Collapse View' : 'Expand Modules'}</span>
            </button>
          </div>

          {/* Module List Accordion */}
          <div className="space-y-3">
            {detailedModules.map((mod, idx) => {
              const isOpen = activeSyllabusAccordion === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setActiveSyllabusAccordion(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="w-8 h-8 rounded-xl bg-[#0E7C7B]/10 text-[#0E7C7B] text-xs font-black flex items-center justify-center shrink-0">
                        {mod.moduleNumber}
                      </span>
                      <div>
                        <h3 className="font-heading font-extrabold text-sm sm:text-base text-slate-900">
                          {mod.title}
                        </h3>
                        <span className="text-[11px] text-slate-500 font-semibold">{mod.duration} • {mod.topics.length} Key Topics</span>
                      </div>
                    </div>

                    <div className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-2.5 bg-[#F8FAFC]">
                      <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400 block pt-2">
                        Topics & Practical Coding Deliverables:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {mod.topics.map((t, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200/60">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: REAL-WORLD CAPSTONE PROJECTS */}
        <section id="section-projects" className="space-y-6 scroll-mt-24">
          <div className="space-y-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-[#0E7C7B]">
              PRODUCTION RESUME BUILDERS
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#12232E]">
              4 Enterprise Projects You Will Code Live
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              These are not standard university clones. Each project models real fintech, AI, and e-commerce distributed systems that impress technical interviewers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industryProjects.map((proj, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-[#0E7C7B]/10 text-[#0E7C7B]">
                      {proj.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-400">Project #{idx + 1}</span>
                  </div>

                  <h3 className="font-heading font-extrabold text-base text-slate-900 group-hover:text-[#0E7C7B] transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    Tech Stack Implemented:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((tech, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 rounded-lg text-[10.5px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: CAREER BOOSTER & PLACEMENT SUPPORT */}
        <section id="section-career" className="bg-gradient-to-br from-[#12232E] to-[#1F3B4D] text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 scroll-mt-24 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <span className="inline-block px-3 py-1 rounded-md bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
              EWD CAREER LAUNCHPAD
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Complete Placement & Interview Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              Coding expertise alone doesn’t guarantee offers. We coach you through the exact technical screening, resume keyword matching, and salary negotiation strategies needed to crack 12-25 LPA roles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-white">1:1 ATS Resume Revamp</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                We craft an ATS-optimized resume highlighting microservices, Kafka, Redis, and real enterprise metrics so recruiter screeners short-list you immediately.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-400/20 text-teal-300 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-white">5+ Technical Mock Interviews</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Live 1-on-1 interview simulations with Senior Tech Leads. Receive brutal and constructive feedback on code quality, design choices, and communication.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-white">Salary Negotiation Playbook</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Learn how to handle multiple competing offers, navigate counter-proposals, and negotiate 50-100% compensation hikes with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: INTERACTIVE ENROLLMENT & CHECKOUT FORM (CORE EXPERIENCE) */}
        <section 
          id="section-enroll" 
          ref={checkoutSectionRef} 
          className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 space-y-8 scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#0E7C7B]">
                STEP 1 OF 1 • INSTANT SEAT ADMISSION
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#12232E]">
                Enroll in <span className="text-[#0E7C7B]">{currentCourse.title}</span>
              </h2>
              <p className="text-xs text-slate-500">
                Fill in your candidate details below to lock in the Early Bird price and reserve your batch seat.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 self-start sm:self-auto shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Guaranteed Batch Seat</span>
            </div>
          </div>

          {/* Success Screen after Form Submit */}
          {isSuccess ? (
            <div className="p-8 sm:p-10 text-center space-y-6 bg-gradient-to-b from-emerald-50/50 to-white rounded-3xl border border-emerald-200 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  SEAT CONFIRMATION ID: {enrollmentId}
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
                  Welcome Aboard, {name}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Your registration for <strong className="text-[#0E7C7B]">{currentCourse.title}</strong> has been logged into our Excel records. Our admissions coordinator will reach out to you within 2 hours.
                </p>
              </div>

              {/* Order Confirmation Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 text-left max-w-md mx-auto space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-600">Total Program Investment:</span>
                  <span className="text-base font-black text-[#12232E]">₹{finalPayableAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1.5">
                  <div><span className="font-semibold text-slate-800">Student Name:</span> {name}</div>
                  <div><span className="font-semibold text-slate-800">Mobile / WhatsApp:</span> {mobileNumber}</div>
                  <div><span className="font-semibold text-slate-800">Email:</span> {emailAddress}</div>
                  <div><span className="font-semibold text-slate-800">College / Company:</span> {collegeName}</div>
                  <div><span className="font-semibold text-slate-800">Qualification:</span> {qualification} ({yearOfPassout})</div>
                  <div><span className="font-semibold text-slate-800">Training Mode:</span> {preferredMode}</div>
                  {appliedCoupon && (
                    <div className="text-emerald-600 font-bold">
                      Applied Coupon: {appliedCoupon.code} (-₹{couponDiscountAmount.toLocaleString('en-IN')})
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/918333077727?text=Hi%20EWD%20Team%2C%20I%20just%20enrolled%20for%20${encodeURIComponent(currentCourse.title)}%20with%20Enrollment%20ID%20${enrollmentId}.%20Please%20guide%20me%20on%20batch%20timings.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Join Batch WhatsApp Community</span>
                </a>

                <button
                  onClick={() => navigate('/courses')}
                  className="px-5 py-3 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Explore Other Programs
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form Input Columns (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {errorMessage && (
                  <div className="p-3.5 bg-red-50 text-red-700 border border-red-200 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Full Candidate Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-[#0E7C7B] transition-all"
                    />
                  </div>

                  {/* Mobile & Email (2 cols) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>Mobile / WhatsApp Number *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-[#0E7C7B] transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>Email Address *</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="e.g. rahul@example.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-[#0E7C7B] transition-all"
                      />
                    </div>
                  </div>

                  {/* College / Organization */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>College / University / Current Company *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      placeholder="e.g. Osmania University / JNTUH / Capgemini"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-[#0E7C7B] transition-all"
                    />
                  </div>

                  {/* Qualification & Year of Passout (2 cols) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                        <span>Highest Qualification *</span>
                      </label>
                      <div className="relative">
                        <select
                          value={qualification}
                          onChange={(e) => setQualification(e.target.value)}
                          required
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-[#0E7C7B] transition-all appearance-none pr-9 text-slate-800"
                        >
                          <option value="" disabled>Select qualification</option>
                          <option value="B.Tech / B.E (CS/IT)">B.Tech / B.E (CS/IT)</option>
                          <option value="B.Tech / B.E (ECE/EEE/Mech/Civil)">B.Tech / B.E (Non-CS Branch)</option>
                          <option value="MCA / M.Tech">MCA / M.Tech / ME</option>
                          <option value="BCA / B.Sc (Comp Science)">BCA / B.Sc (Comp Science)</option>
                          <option value="Degree / Diploma">Degree / Diploma</option>
                          <option value="Working Professional">Working Professional (IT / Non-IT)</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Year of Passout *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={yearOfPassout}
                        onChange={(e) => setYearOfPassout(e.target.value)}
                        placeholder="e.g. 2026 / 2025 / 2024"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-[#0E7C7B] transition-all"
                      />
                    </div>
                  </div>

                  {/* Mode & Experience Level (2 cols) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                        Preferred Training Mode:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPreferredMode('Online')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                            preferredMode === 'Online'
                              ? 'bg-[#0E7C7B] text-white border-[#0E7C7B] shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Live Online</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPreferredMode('Offline')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                            preferredMode === 'Offline'
                              ? 'bg-[#0E7C7B] text-white border-[#0E7C7B] shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Offline Hyd</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                        Current Experience Profile:
                      </label>
                      <div className="relative">
                        <select
                          value={experienceLevel}
                          onChange={(e) => setExperienceLevel(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-[#0E7C7B] transition-all appearance-none pr-9 text-slate-800"
                        >
                          <option value="Student">College Student (1st - Final Year)</option>
                          <option value="Fresher">Recent Graduate / Fresher</option>
                          <option value="Career Switcher">Non-IT to IT Career Switcher</option>
                          <option value="Experienced Developer">Working Developer looking to upskill</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Batch Updates Consent */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="whatsapp-updates"
                      checked={whatsappConsent}
                      onChange={(e) => setWhatsappConsent(e.target.checked)}
                      className="w-4 h-4 text-[#0E7C7B] rounded border-slate-300 focus:ring-[#0E7C7B]"
                    />
                    <label htmlFor="whatsapp-updates" className="text-xs text-slate-600 font-medium cursor-pointer">
                      Send batch schedule, syllabus PDF, and class Zoom links via WhatsApp
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 px-6 bg-gradient-to-r from-[#0E7C7B] to-[#0A5E5D] hover:from-[#0A5E5D] hover:to-[#074645] text-white font-black text-sm sm:text-base rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-101 active:scale-99 disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Reserving Your Seat in Excel Database...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-[#F2A93B]" />
                          <span>Complete Registration & Reserve Seat (₹{finalPayableAmount.toLocaleString('en-IN')})</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-slate-400 mt-2 font-medium">
                      No upfront payment required right now. The EWD admissions coordinator will verify your registration and confirm batch access.
                    </p>
                  </div>

                </form>

              </div>

              {/* Order Summary & Coupon Rail (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="font-extrabold text-xs uppercase tracking-wider text-slate-700">
                      Order Summary
                    </span>
                    <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      Live Cohort
                    </span>
                  </div>

                  {/* Course Details Card */}
                  <div className="space-y-1">
                    <h4 className="font-heading font-black text-sm text-[#12232E]">
                      {currentCourse.title}
                    </h4>
                    <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
                      <span>{currentCourse.duration}</span>
                      <span>•</span>
                      <span>{preferredMode} Mode</span>
                    </div>
                  </div>

                  {/* Price Breakdown Calculation */}
                  <div className="space-y-2 pt-2 border-t border-slate-200 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span>Regular Program Fee:</span>
                      <span className="line-through text-slate-400">{currentCourse.originalFee || '₹39,999'}</span>
                    </div>

                    <div className="flex items-center justify-between text-emerald-700 font-semibold">
                      <span>Early Bird Scholarship Discount:</span>
                      <span>-₹{(originalPriceNumber - basePriceNumber).toLocaleString('en-IN')}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex items-center justify-between text-[#0E7C7B] font-bold">
                        <span>Coupon ({appliedCoupon.code}):</span>
                        <span>-₹{couponDiscountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span>GST & Platform Handling:</span>
                      <span className="text-emerald-600 font-semibold">Included (₹0)</span>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-300 font-black text-sm text-slate-900">
                      <span>Total Payable:</span>
                      <span className="text-xl text-[#0E7C7B]">₹{finalPayableAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Coupon Code Section */}
                  <div className="pt-2 border-t border-slate-200 space-y-2">
                    <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                      Have a Coupon / Promo Code?
                    </label>

                    {appliedCoupon ? (
                      <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                          <Tag className="w-3.5 h-3.5" />
                          <span>{appliedCoupon.code} Applied</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-xs text-red-600 hover:text-red-800 font-bold cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          placeholder="e.g. EWDPROMO"
                          className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold uppercase focus:outline-none focus:border-[#0E7C7B]"
                        />
                        <button
                          type="button"
                          onClick={() => handleApplyCoupon()}
                          className="px-3.5 py-2 bg-[#12232E] hover:bg-[#0E7C7B] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                    )}

                    {couponError && <p className="text-[11px] text-red-600 font-medium">{couponError}</p>}
                    {couponSuccess && <p className="text-[11px] text-emerald-600 font-medium">{couponSuccess}</p>}

                    {/* Quick Code Badge suggestion */}
                    {!appliedCoupon && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                        <span>Tip: Apply</span>
                        <button
                          type="button"
                          onClick={() => handleApplyCoupon('EWDPROMO')}
                          className="font-bold text-[#0E7C7B] underline cursor-pointer"
                        >
                          EWDPROMO
                        </button>
                        <span>for extra ₹1,000 off</span>
                      </div>
                    )}
                  </div>

                  {/* Trust Badges */}
                  <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>7-Day Full Refund Guarantee if not satisfied</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Direct verification with Evolutionary Web Dude</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

        </section>

        {/* SECTION 6: STUDENT TESTIMONIALS & SUCCESS STORIES */}
        <section id="section-reviews" className="space-y-6 scroll-mt-24">
          <div className="space-y-1.5 text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-wider text-[#0E7C7B]">
              REAL REVIEWS FROM TELUGU STUDENTS
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#12232E]">
              From Non-IT & Freshers to High-Paying Tech Roles
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Read how our students from Andhra Pradesh and Telangana cracked product roles through bilingual learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "Telugu lo Spring Boot, Eureka, and Kafka explanation valla naaku concept clarity vachindi. English lo chuste ardham kaani multithreading and microservices questions interviews lo easily clear chesa. Placed as Backend Dev at 9.5 LPA!"
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-slate-900">Sai Krishna Reddy</div>
                  <div className="text-[10.5px] text-slate-400">B.Tech 2025 • Hyderabad</div>
                </div>
                <span className="text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                  Placed
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "Mechanical background nunchi IT switch avvalani chala bhayam unde. EWD live coding sessions lo scratch nunchi nerpincharu. Daily assignments and resume review made all the difference. Got offer letter in 4 months!"
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-slate-900">Pooja Varshini</div>
                  <div className="text-[10.5px] text-slate-400">Career Switcher • Visakhapatnam</div>
                </div>
                <span className="text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                  Placed
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "The FinTech Payment Microservices project is gold. In my technical round, 80% questions were from the Kafka Saga transactions we built in class. Interviewer was stunned by my architecture knowledge!"
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-slate-900">Venkata Ramana</div>
                  <div className="text-[10.5px] text-slate-400">MCA Graduate • Vijayawada</div>
                </div>
                <span className="text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                  Placed
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: MENTOR PROFILE */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0E7C7B] to-[#12232E] text-white flex items-center justify-center font-heading font-black text-3xl shrink-0 shadow-lg">
            EWD
          </div>

          <div className="space-y-2 text-center md:text-left flex-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#0E7C7B] bg-[#0E7C7B]/10 px-2.5 py-0.5 rounded-full">
              Lead Architect & Course Mentor
            </span>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900">
              Evolutionary Web Dude Mentor Team
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
              Led by veteran Distributed Systems Architects with 12+ years designing cloud microservices for global product companies. Passionate about empowering Telugu engineers with world-class engineering standards.
            </p>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 text-center shrink-0 space-y-1">
            <div className="text-2xl font-black text-[#0E7C7B]">15,000+</div>
            <div className="text-xs font-semibold text-slate-500">Students Mentored</div>
          </div>
        </section>

        {/* SECTION 8: FREQUENTLY ASKED QUESTIONS */}
        <section id="section-faq" className="space-y-6 scroll-mt-24">
          <div className="space-y-1 text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-wider text-[#0E7C7B]">
              GOT QUESTIONS?
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#12232E]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {courseFaqs.map((faq, idx) => {
              const isOpen = activeFaqAccordion === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaqAccordion(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                      {faq.question}
                    </span>
                    <div className="p-1 rounded-lg text-slate-400">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* BOTTOM FINAL CTA BANNER */}
        <div className="bg-gradient-to-r from-[#12232E] via-[#0E7C7B] to-[#12232E] rounded-3xl p-8 sm:p-12 text-center text-white space-y-4 shadow-xl relative overflow-hidden">
          <h3 className="font-heading font-black text-2xl sm:text-4xl text-white">
            Take Your Tech Career to the Next Level
          </h3>
          <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto">
            Seats for the upcoming cohort are limited to maintain 1:1 mentorship quality. Lock in your Early Bird fee today!
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollToCheckout}
              className="px-8 py-3.5 bg-[#F2A93B] hover:bg-[#D98E20] text-[#12232E] font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
            >
              <span>Enroll Now for {currentCourse.fee}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDemoModalOpen(true)}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all cursor-pointer backdrop-blur-xs"
            >
              Book Free Demo
            </button>
          </div>
        </div>

      </div>

      {/* 5. STICKY MOBILE BOTTOM BAR */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex items-center justify-between shadow-2xl">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-[#12232E]">{currentCourse.fee}</span>
            {currentCourse.originalFee && (
              <span className="text-xs text-slate-400 line-through font-semibold">{currentCourse.originalFee}</span>
            )}
          </div>
          <span className="text-[10px] text-emerald-600 font-bold block">Save ₹30,000 • Live Telugu</span>
        </div>

        <button
          type="button"
          onClick={scrollToCheckout}
          className="px-5 py-2.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F2A93B]" />
          <span>Enroll Now</span>
        </button>
      </div>

      {/* 6. BOOK FREE DEMO MODAL */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 relative">
            <button
              type="button"
              onClick={() => {
                setDemoModalOpen(false);
                setDemoSuccess(false);
              }}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {demoSuccess ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-black text-xl text-slate-900">
                  Demo Session Booked!
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you, <strong>{demoName}</strong>! We have sent the upcoming Live Telugu Demo class Zoom link and preliminary study notes to your WhatsApp/Email.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setDemoModalOpen(false);
                    setDemoSuccess(false);
                  }}
                  className="w-full py-3 bg-[#0E7C7B] text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookDemoSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0E7C7B] block">
                    FREE SAMPLE CLASS
                  </span>
                  <h3 className="font-heading font-black text-xl text-slate-900">
                    Book a Free Live Demo
                  </h3>
                  <p className="text-xs text-slate-500">
                    Experience our native Telugu teaching style, live architecture breakdown, and interactive Q&A before you enroll.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value)}
                    placeholder="e.g. Karthik"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#0E7C7B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={demoPhone}
                    onChange={(e) => setDemoPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#0E7C7B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    placeholder="e.g. karthik@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#0E7C7B]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={demoSubmitting}
                  className="w-full py-3.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {demoSubmitting ? (
                    <span>Confirming Demo Pass...</span>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Get Free Demo Class Access</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
