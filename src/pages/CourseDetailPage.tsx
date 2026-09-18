import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Coins, 
  Sparkles, 
  Rocket, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  Users, 
  Coffee, 
  Globe, 
  Code2, 
  Megaphone, 
  Monitor, 
  Smartphone,
  Check,
  Award
} from 'lucide-react';
import { Course } from '../types';
import { api } from '../services/api';
import { FRONTLINES_COURSES } from '../data/frontlinesCoursesData';
import { CourseThumbnail } from '../components/courses/CourseThumbnail';

interface CourseDetailPageProps {
  courseSlug?: string;
  selectedCourse?: Course | null;
  navigate: (path: string) => void;
  onEnrollCourse: (course: Course) => void;
}

// Course-specific data map for rich content matching the syllabus reference
interface CourseSyllabusData {
  overviewChecklist: string[];
  whoShouldJoin: string[];
  skills: string[];
  curriculum: {
    title: string;
    topics: string[];
  }[];
  projects: {
    title: string;
    tag?: string;
  }[];
}

const COURSE_SPECIFIC_DATA: Record<string, CourseSyllabusData> = {
  'java-full-stack': {
    overviewChecklist: [
      'Hands-on project-based learning',
      'Real-world full-stack architecture',
      'Industry-standard tools and practices',
      'Portfolio-ready projects',
      'Guided mentorship from EWD team'
    ],
    whoShouldJoin: [
      'Students pursuing CS/IT degrees',
      'Freshers looking to start their tech career',
      'Professionals wanting to shift to full-stack development',
      'Anyone passionate about backend + frontend development'
    ],
    skills: [
      'Java Programming',
      'Spring Boot',
      'REST API Design',
      'Database Management',
      'React Development',
      'Git Version Control',
      'Full Stack Architecture'
    ],
    curriculum: [
      {
        title: 'Core Java Fundamentals',
        topics: [
          'Java Syntax & Data Types',
          'Object-Oriented Programming',
          'Collections Framework',
          'Exception Handling',
          'Java 8+ Features (Streams, Lambdas)'
        ]
      },
      {
        title: 'Spring Framework',
        topics: [
          'Spring Boot Architecture & Auto-Configuration',
          'Dependency Injection & Spring IoC Container',
          'Spring MVC & RESTful API Controller Design',
          'Spring Data JPA & Hibernate ORM Mapping',
          'Spring Security & JWT Authentication Tokens',
          'Request Validation & Global Exception Handling'
        ]
      },
      {
        title: 'Database & ORM',
        topics: [
          'Relational Database Design (MySQL / PostgreSQL)',
          'SQL Queries, Joins, Indexes & Transactions',
          'JPA Entities, Relationships & Cascading',
          'Database Migrations & Connection Pooling',
          'Repository Pattern & Custom Query Methods'
        ]
      },
      {
        title: 'Frontend Integration',
        topics: [
          'React 18 Fundamentals & Component Lifecycle',
          'State Management, Props & Custom Hooks',
          'Axios & Fetch API Integration with Spring Boot',
          'Tailwind CSS & Responsive Interface Design',
          'SPA Client-side Routing & Protected Routes'
        ]
      },
      {
        title: 'Tools & Deployment',
        topics: [
          'Git Version Control & GitHub Team Workflows',
          'Maven / Gradle Build & Dependency Management',
          'Postman API Testing, Environments & Collections',
          'Docker Containerization & Production Artifacts',
          'Cloud Run & Live Domain Deployment'
        ]
      }
    ],
    projects: [
      { title: 'Student Management System (Full Stack)', tag: 'Practical project' },
      { title: 'E-commerce Backend with Spring Boot', tag: 'Practical project' },
      { title: 'REST API with JWT Authentication', tag: 'Practical project' },
      { title: 'React + Spring Boot Dashboard App', tag: 'Practical project' },
      { title: 'Portfolio Project with Database Integration', tag: 'Practical project' }
    ]
  },
  'web-dev': {
    overviewChecklist: [
      'Modern frontend foundations to modern React SPA architecture',
      'Mobile-first responsive web design with Tailwind CSS',
      'Asynchronous JavaScript, TypeScript & API integration',
      'Portfolio-grade interactive web projects',
      'Production deployment and SEO best practices'
    ],
    whoShouldJoin: [
      'Beginners wanting to break into frontend and web development',
      'Designers looking to code their own web layouts and apps',
      'Graduates preparing for Frontend Engineer roles',
      'Developers transitioning to modern React & TypeScript'
    ],
    skills: [
      'HTML5 & Semantic Web',
      'CSS3 & Tailwind CSS',
      'Modern JavaScript (ES6+)',
      'TypeScript',
      'React 18 & Hooks',
      'Responsive UI Design',
      'REST APIs & Fetch'
    ],
    curriculum: [
      {
        title: 'HTML5 & Modern CSS3 Mastery',
        topics: [
          'Semantic Structure, Accessibility (WCAG) & SEO',
          'Flexbox & CSS Grid Deep Dive',
          'Responsive Layouts & Media Queries',
          'Modern Tailwind CSS Utility Workflow'
        ]
      },
      {
        title: 'JavaScript & TypeScript Foundations',
        topics: [
          'ES6+ Features: Destructuring, Modules, Promises',
          'DOM Manipulation & Event-driven Architecture',
          'Async / Await & Fetch API',
          'TypeScript Types, Interfaces & Strict Type Safety'
        ]
      },
      {
        title: 'React 18 Component Engineering',
        topics: [
          'JSX, Components, Props & Virtual DOM',
          'React Hooks: useState, useEffect, useMemo, useCallback',
          'Custom Hooks & Context API State Sharing',
          'Form Handling & Input Validation'
        ]
      },
      {
        title: 'State Management & API Integration',
        topics: [
          'RESTful Endpoints Consumption & Error Handling',
          'Client-side Routing & Navigation',
          'Micro-interactions & Smooth Transitions',
          'Performance Profiling & Bundle Optimization'
        ]
      },
      {
        title: 'Build Tools & Production Deployment',
        topics: [
          'Vite Build Tooling & Environment Configuration',
          'Git & GitHub Collaborative Branching',
          'Vercel & Netlify Automated Deployments',
          'Lighthouse Auditing & SEO Meta Optimization'
        ]
      }
    ],
    projects: [
      { title: 'Modern SaaS Landing Page with Animations', tag: 'Practical project' },
      { title: 'E-Commerce Product Catalog with Filtering', tag: 'Practical project' },
      { title: 'Interactive Task & Habit Tracker Dashboard', tag: 'Practical project' },
      { title: 'Weather & Geolocation Web Application', tag: 'Practical project' },
      { title: 'Personal Developer Portfolio Showcase', tag: 'Practical project' }
    ]
  },
  'python-dev': {
    overviewChecklist: [
      'Python programming from syntax to advanced object-oriented design',
      'FastAPI & Django REST framework backend services',
      'SQLAlchemy database modeling & automated migrations',
      'Data manipulation with Pandas and Excel automation pipelines',
      'Containerization and serverless API deployment'
    ],
    whoShouldJoin: [
      'Aspiring backend developers and Python programmers',
      'Data enthusiasts looking to build practical API pipelines',
      'Students wanting strong programming logic foundations',
      'Professionals automating business reporting and Excel workflows'
    ],
    skills: [
      'Python 3 Programming',
      'Object-Oriented Design',
      'FastAPI / Django',
      'SQLAlchemy & PostgreSQL',
      'REST API Architecture',
      'Excel Automation',
      'Docker Containerization'
    ],
    curriculum: [
      {
        title: 'Python Core & Data Structures',
        topics: [
          'Python Syntax, Control Flow & Data Types',
          'Functions, Modules, Packages & Virtual Environments',
          'Object-Oriented Programming (OOP) in Python',
          'File Handling, JSON Parsing & Error Handling'
        ]
      },
      {
        title: 'Backend API Development with FastAPI',
        topics: [
          'Asynchronous Programming with Asyncio',
          'FastAPI Route Handlers, Pydantic Models & Validation',
          'Dependency Injection in FastAPI',
          'Interactive OpenAPI (Swagger) Documentation'
        ]
      },
      {
        title: 'Databases & ORM Modeling',
        topics: [
          'Relational Databases (PostgreSQL / SQLite)',
          'SQLAlchemy ORM & Database Sessions',
          'Alembic Database Migrations',
          'Complex Queries, Aggregations & Relationships'
        ]
      },
      {
        title: 'Data Processing & Excel Pipelines',
        topics: [
          'Automating Excel Workbooks with OpenPyXL / Pandas',
          'CSV / JSON Data Ingestion & Transformation',
          'Background Tasks & Scheduled Workers',
          'Secure Authentication & Token Verification'
        ]
      },
      {
        title: 'Testing & Cloud Deployment',
        topics: [
          'Unit Testing with PyTest',
          'Dockerizing Python Backend Applications',
          'Cloud Run / Render Deployment',
          'Environment Secrets & Production Best Practices'
        ]
      }
    ],
    projects: [
      { title: 'High-Speed REST API with FastAPI & Pydantic', tag: 'Practical project' },
      { title: 'Automated Excel Data Processing Pipeline', tag: 'Practical project' },
      { title: 'User Authentication & JWT Authorization Service', tag: 'Practical project' },
      { title: 'Inventory & Order Management API', tag: 'Practical project' },
      { title: 'Content Management Backend with Database ORM', tag: 'Practical project' }
    ]
  },
  'digital-marketing': {
    overviewChecklist: [
      'Comprehensive on-page, technical and off-page SEO strategy',
      'Paid advertising mastery across Meta, Google and LinkedIn',
      'Conversion rate optimization (CRO) & funnel architecture',
      'Content marketing, copywriting and brand positioning',
      'Data-driven analytics with Google Analytics 4 & Search Console'
    ],
    whoShouldJoin: [
      'Entrepreneurs and business owners growing online traffic',
      'Marketing students and freshers seeking high-demand digital skills',
      'Freelancers looking to offer client growth services',
      'Professionals upskilling in modern performance marketing'
    ],
    skills: [
      'Search Engine Optimization (SEO)',
      'Google Analytics 4 (GA4)',
      'Meta Ads Manager',
      'Content Marketing Strategy',
      'Conversion Rate Optimization',
      'Email Marketing Funnels',
      'Search Console & Audits'
    ],
    curriculum: [
      {
        title: 'Technical & On-Page SEO Mastery',
        topics: [
          'Keyword Research & Search Intent Mapping',
          'On-Page Optimization (Titles, Schema, Hierarchy)',
          'Technical SEO Audits & Core Web Vitals',
          'Google Search Console Setup & Sitemap Indexing'
        ]
      },
      {
        title: 'Content Strategy & Copywriting',
        topics: [
          'High-converting Copywriting Frameworks',
          'Blog Architecture & Organic Lead Magnets',
          'Social Media Content Calendars & Visual Identity',
          'Brand Storytelling & Value Propositions'
        ]
      },
      {
        title: 'Paid Ads & Performance Marketing',
        topics: [
          'Meta Ads Manager (Facebook & Instagram Campaigns)',
          'Audience Targeting, Custom & Lookalike Audiences',
          'Ad Creatives, Copy Testing & A/B Experiments',
          'Budget Optimization & ROAS Tracking'
        ]
      },
      {
        title: 'Conversion Funnels & Email Marketing',
        topics: [
          'Landing Page Wireframing & Conversion Triggers',
          'Lead Capture & Automated Email Nurture Sequences',
          'Retargeting Campaigns & Abandoned Cart Recovery',
          'CRM Integration & Contact Lifecycle Stages'
        ]
      },
      {
        title: 'Analytics, Reporting & Strategy',
        topics: [
          'Google Analytics 4 Custom Events & Conversions',
          'UTM Tracking & Attribution Modeling',
          'Client Performance Reporting Dashboards',
          'Quarterly Growth Strategy Formulation'
        ]
      }
    ],
    projects: [
      { title: 'End-to-End Website SEO Audit & Optimization', tag: 'Practical project' },
      { title: 'Live Meta Ads Lead Generation Campaign', tag: 'Practical project' },
      { title: 'Automated Email Nurture Sequence & Funnel', tag: 'Practical project' },
      { title: 'GA4 Custom Analytics Dashboard & Tracking Plan', tag: 'Practical project' },
      { title: 'B2B Content Marketing & Organic Inbound Plan', tag: 'Practical project' }
    ]
  },
  'software-dev': {
    overviewChecklist: [
      'Full lifecycle software engineering from algorithms to architecture',
      'End-to-end frontend and backend system construction',
      'Relational and NoSQL database architecture and query optimization',
      'System design principles for scalable enterprise services',
      'Automated CI/CD deployment pipelines and testing suites'
    ],
    whoShouldJoin: [
      'Computer science students building comprehensive practical skills',
      'Graduates preparing for top tier software engineering interviews',
      'Engineers looking to master full-stack software architecture',
      'Tech enthusiasts aiming to build complete scalable products'
    ],
    skills: [
      'Software Architecture',
      'Algorithms & Data Structures',
      'REST & GraphQL APIs',
      'Database Modeling',
      'System Design',
      'CI/CD Pipelines',
      'Test-Driven Development'
    ],
    curriculum: [
      {
        title: 'Computer Science & Software Foundations',
        topics: [
          'Algorithms, Complexity (Big-O) & Data Structures',
          'Clean Code Principles & SOLID Design Patterns',
          'Git Branching Strategies & Code Reviews',
          'Linux Command Line & Scripting'
        ]
      },
      {
        title: 'Full Stack Architecture',
        topics: [
          'Decoupled Frontend & Backend Architecture',
          'RESTful API Contracts & Schema Validation',
          'Asynchronous Event Processing & Caching',
          'Security Standards (OWASP, JWT, CORS, CSRF)'
        ]
      },
      {
        title: 'Database Architecture & Scalability',
        topics: [
          'Relational Normalization & High-volume Indexing',
          'ACID Transactions & Concurrency Control',
          'Connection Pooling & Query Optimization',
          'Data Backup, Migrations & Disaster Recovery'
        ]
      },
      {
        title: 'System Design & Distributed Services',
        topics: [
          'Monolith vs Microservices Trade-offs',
          'Load Balancing, Reverse Proxies & CDN Caching',
          'Message Queues & Background Job Processing',
          'API Gateways & Rate Limiting'
        ]
      },
      {
        title: 'DevOps, Testing & Production Release',
        topics: [
          'Unit & Integration Testing Automation',
          'GitHub Actions CI/CD Pipelines',
          'Docker Containerization & Image Optimization',
          'Cloud Infrastructure Monitoring & Telemetry'
        ]
      }
    ],
    projects: [
      { title: 'Scalable Multi-Tenant Enterprise Web Platform', tag: 'Practical project' },
      { title: 'Real-Time Collaborative Document Editor', tag: 'Practical project' },
      { title: 'High-Throughput Distributed Task Processing Queue', tag: 'Practical project' },
      { title: 'Secure API Gateway with Rate Limiting & Auth', tag: 'Practical project' },
      { title: 'Full-Stack Analytics & Reporting Engine', tag: 'Practical project' }
    ]
  },
  'practical-projects': {
    overviewChecklist: [
      '100% project-driven portfolio development with zero fluff',
      'Production-grade full-stack architecture from day one',
      'Live deployment with custom domains and GitHub portfolios',
      'Collaborative sprint planning mirroring modern tech teams',
      'Direct code reviews and mentorship from EWD engineers'
    ],
    whoShouldJoin: [
      'Graduates with theoretical knowledge needing real portfolio proof',
      'Job seekers preparing strong showcase repositories for interviews',
      'Self-taught developers wanting to build complete end-to-end apps',
      'Engineers looking to master production deployment workflows'
    ],
    skills: [
      'Full Stack Architecture',
      'Production Deployment',
      'API Integration',
      'Database Design',
      'Git Portfolio Strategy',
      'Clean Code & Refactoring',
      'Technical Interview Prep'
    ],
    curriculum: [
      {
        title: 'Project Architecture & Scoping',
        topics: [
          'User Stories, System Architecture & ER Diagrams',
          'UI/UX Wireframes & Component Design System',
          'Repository Setup, Linting & Git Standards',
          'API Contract Specification'
        ]
      },
      {
        title: 'Backend & Database Construction',
        topics: [
          'Production Database Setup & Schema Migrations',
          'RESTful API Development & Middleware',
          'Authentication, JWTs & Role-based Access Control',
          'Input Validation & Error Handling Handlers'
        ]
      },
      {
        title: 'Frontend Engineering & State Management',
        topics: [
          'Responsive Component Hierarchy with Tailwind',
          'API Client Layer & Dynamic Data Fetching',
          'Optimistic UI Updates & Loading States',
          'Toast Notifications & Interactive Modals'
        ]
      },
      {
        title: 'Cloud Deployment & Domain Setup',
        topics: [
          'Production Cloud Containerization / Hosting',
          'Environment Variables & Security Hardening',
          'Custom Domain & SSL Certificate Setup',
          'Automated CI/CD Deployment Sprints'
        ]
      },
      {
        title: 'Portfolio Presentation & Interview Preparation',
        topics: [
          'Writing High-Impact GitHub README Documentation',
          'Architecture Diagrams & System Walkthrough Demos',
          'Resume Project Bullet Points & Talking Points',
          'Technical Mock Q&A on Project Decisions'
        ]
      }
    ],
    projects: [
      { title: 'Enterprise Employee & Asset Management Portal', tag: 'Practical project' },
      { title: 'Full-Stack E-Commerce Platform with Payments', tag: 'Practical project' },
      { title: 'Paperless Multi-Role Approval Workflow System', tag: 'Practical project' },
      { title: 'Real-Time Notification & Messaging Center', tag: 'Practical project' },
      { title: 'Automated Excel & Data Analytics Platform', tag: 'Practical project' }
    ]
  }
};

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  courseSlug,
  selectedCourse: propCourse,
  navigate,
  onEnrollCourse
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course | null>(propCourse || null);
  const [loading, setLoading] = useState(!propCourse);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0); // Default open first module

  // Helper to resolve slug
  const getSlugFromCourse = (c: Course): string => {
    if (c.slug) return c.slug;
    if (c.id.includes('flm-')) return c.id.replace('flm-', '');
    if (c.id.includes('java')) return 'java-full-stack';
    if (c.id.includes('web')) return 'web-dev';
    if (c.id.includes('python')) return 'python-dev';
    if (c.id.includes('marketing')) return 'digital-marketing';
    if (c.id.includes('software')) return 'software-dev';
    if (c.id.includes('project')) return 'practical-projects';
    return c.id.replace('crs-', '');
  };

  useEffect(() => {
    api.getCourses()
      .then((data) => {
        const combined = [...data, ...FRONTLINES_COURSES];
        setCourses(combined);
        if (!propCourse) {
          if (courseSlug) {
            const clean = courseSlug.toLowerCase()
              .replace('/courses/', '')
              .replace('/course/', '')
              .replace('courses/', '')
              .replace('course/', '')
              .trim();

            const matched = combined.find(c => {
              const cSlug = getSlugFromCourse(c);
              return cSlug === clean ||
                c.id.toLowerCase() === clean ||
                c.id.toLowerCase().replace('flm-', '') === clean ||
                c.id.toLowerCase().replace('crs-', '') === clean ||
                c.title.toLowerCase().includes(clean) ||
                clean.includes(cSlug);
            });
            setCourse(matched || combined[0]);
          } else {
            setCourse(combined[0]);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading course details:', err);
        setCourses(FRONTLINES_COURSES);
        setCourse(FRONTLINES_COURSES[0]);
        setLoading(false);
      });
  }, [courseSlug, propCourse]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#0E7C7B] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-gray-500">Loading syllabus & curriculum details...</p>
      </div>
    );
  }

  const currentCourse = course || (courses.length > 0 ? courses[0] : FRONTLINES_COURSES[0]);

  const slugKey = getSlugFromCourse(currentCourse);
  const rawSpecificData = COURSE_SPECIFIC_DATA[slugKey];
  const specificData: CourseSyllabusData = rawSpecificData || {
    overviewChecklist: [
      'Comprehensive hands-on curriculum with real-world case studies',
      'Industry-standard best practices, architectures & code repositories',
      'Live interactive mentor-led classes in Telugu & English',
      'Capstone portfolio projects for resume and GitHub profile',
      'Dedicated placement assistance, mock technical rounds & interview prep'
    ],
    whoShouldJoin: (currentCourse.learningOutcomes && currentCourse.learningOutcomes.length > 0)
      ? currentCourse.learningOutcomes
      : [
          'Telugu tech aspirants and freshers seeking IT jobs',
          'Working professionals looking to switch domains',
          'Students from Non-IT / Mechanical / Civil / EEE wanting to learn software',
          'Anyone passionate about hands-on technology mastery'
        ],
    skills: (currentCourse.modules && currentCourse.modules.length > 0)
      ? currentCourse.modules
      : ['Core Concepts', 'Practical Projects', 'Tooling', 'Clean Code', 'Deployment'],
    curriculum: (currentCourse.syllabus && currentCourse.syllabus.length > 0)
      ? currentCourse.syllabus.map((s, idx) => ({
          title: `${s.phase || `Phase ${idx + 1}`}: ${s.title}`,
          topics: (s.topics && s.topics.length > 0) ? s.topics : [s.description || 'Comprehensive conceptual & practical coverage']
        }))
      : [
          { title: 'Phase 1: Foundations & Architecture', topics: ['Core Concepts', 'Setup & Environment', 'Language Syntax'] },
          { title: 'Phase 2: Core Engineering', topics: ['Advanced Patterns', 'Database & API Integration', 'Testing'] },
          { title: 'Phase 3: Real-World Capstone', topics: ['End-to-End Capstone Project', 'Performance & Debugging'] },
          { title: 'Phase 4: Placement Preparation', topics: ['Mock Technical Interviews', 'Resume ATS Review', 'Job Prep'] }
        ],
    projects: [
      { title: `${currentCourse.title} Enterprise Capstone`, tag: 'Capstone Project' },
      { title: 'Production CI/CD & Deployment Pipeline', tag: 'Practical Project' }
    ]
  };

  // Icons matching category
  const renderCategoryIcon = () => {
    switch (currentCourse.category) {
      case 'FULL STACK':
        return <Coffee className="w-3.5 h-3.5 text-[#F2A93B]" />;
      case 'FRONTEND':
        return <Globe className="w-3.5 h-3.5 text-cyan-300" />;
      case 'BACKEND':
        return <Code2 className="w-3.5 h-3.5 text-emerald-300" />;
      case 'MARKETING':
        return <Megaphone className="w-3.5 h-3.5 text-amber-300" />;
      case 'SOFTWARE ENGINEERING':
        return <Monitor className="w-3.5 h-3.5 text-blue-300" />;
      case 'PROJECTS':
        return <Rocket className="w-3.5 h-3.5 text-[#F2A93B]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#F2A93B]" />;
    }
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <motion.div 
      id="course-syllabus-page-root" 
      className="min-h-screen bg-white pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      
      {/* 1. HERO BANNER - Exact dark teal gradient styling matching uploaded image */}
      <section className="bg-gradient-to-b from-[#102A30] via-[#0E252C] to-[#0A1D22] text-white pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle decorative glow orb */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0E7C7B]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Column: Course Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-gray-200 border border-white/10 text-xs font-extrabold uppercase tracking-wider shadow-xs backdrop-blur-xs">
                {renderCategoryIcon()}
                <span>{currentCourse.category}</span>
              </span>
            </motion.div>

            {/* Course Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight"
            >
              {currentCourse.title}
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-3xl"
            >
              {currentCourse.description}
            </motion.p>

            {/* Meta Info Pills */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="flex flex-wrap items-center gap-2.5 pt-2"
            >
              <motion.span 
                whileHover={{ y: -2, scale: 1.02 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 backdrop-blur-xs transition-colors hover:bg-white/15"
              >
                <Layers className="w-3.5 h-3.5 text-teal-300" />
                <span>Level: {currentCourse.level || 'Beginner'}</span>
              </motion.span>

              <motion.span 
                whileHover={{ y: -2, scale: 1.02 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 backdrop-blur-xs transition-colors hover:bg-white/15"
              >
                <Clock className="w-3.5 h-3.5 text-teal-300" />
                <span>Duration: {currentCourse.duration || 'To be announced'}</span>
              </motion.span>

              <motion.span 
                whileHover={{ y: -2, scale: 1.02 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F2A93B]/20 border border-[#F2A93B]/40 text-xs font-bold text-[#F2A93B] backdrop-blur-xs transition-colors hover:bg-[#F2A93B]/25"
              >
                <Coins className="w-3.5 h-3.5" />
                <span>Fee: {currentCourse.fee}</span>
                {currentCourse.originalFee && (
                  <span className="line-through text-white/50 text-[11px] ml-1">{currentCourse.originalFee}</span>
                )}
                {currentCourse.discountPercent && (
                  <span className="ml-1 bg-emerald-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded">
                    {currentCourse.discountPercent}% OFF
                  </span>
                )}
              </motion.span>

              <motion.span 
                whileHover={{ y: -2, scale: 1.02 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 backdrop-blur-xs transition-colors hover:bg-white/15"
              >
                <Smartphone className="w-3.5 h-3.5 text-teal-300" />
                <span>Mode: Live Online & Interactive</span>
              </motion.span>
            </motion.div>

            {/* Hero CTAs with Price Summary Box */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              {/* Pricing Box */}
              <div className="flex items-center gap-3.5 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 shadow-inner">
                <div>
                  <span className="text-[10px] text-gray-300 font-extrabold uppercase tracking-wider block">Special Offer Fee</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-[#F2A93B] tracking-tight">{currentCourse.fee}</span>
                    {currentCourse.originalFee && (
                      <span className="text-xs text-gray-400 line-through font-semibold">{currentCourse.originalFee}</span>
                    )}
                  </div>
                </div>
                {currentCourse.emiStartsAt && (
                  <div className="border-l border-white/20 pl-3 hidden sm:block">
                    <span className="text-[10px] text-gray-300 font-extrabold uppercase tracking-wider block">No-Cost EMI</span>
                    <span className="text-xs font-bold text-teal-300">from {currentCourse.emiStartsAt}</span>
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onEnrollCourse(currentCourse)}
                className="px-6 py-3.5 bg-[#F2A93B] hover:bg-[#D98E20] text-[#12232E] font-extrabold text-sm sm:text-base rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Enroll in This Batch</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/contact')}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-xs"
              >
                <MessageCircle className="w-4 h-4 text-teal-300" />
                <span>Talk to Admissions</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column: Hero Course Thumbnail Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 rounded-3xl overflow-hidden shadow-2xl border border-white/20 ring-1 ring-white/10 bg-[#12232E]"
          >
            <CourseThumbnail course={currentCourse} aspectRatio="16/9" />
          </motion.div>

        </div>
      </section>

      {/* 2. BODY CONTENT CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-16 sm:space-y-20">
        
        {/* SECTION 1: COURSE OVERVIEW */}
        <motion.section 
          id="syllabus-overview" 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-block px-3 py-1 rounded-md bg-[#0E7C7B]/10 text-[#0E7C7B] text-[11px] font-extrabold uppercase tracking-wider">
              COURSE OVERVIEW
            </span>
          </motion.div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1F3B4D]">
            What This Program Covers
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {currentCourse.description}
          </p>

          {/* Checklist with staggered animation */}
          <div className="pt-2 space-y-3">
            {specificData.overviewChecklist.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 p-2 -ml-2 rounded-xl transition-colors hover:bg-teal-50/40"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-emerald-600 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium pt-0.5">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 2: WHO SHOULD JOIN */}
        <motion.section 
          id="syllabus-target-audience" 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFF4E5] text-[#D98E20] text-[11px] font-extrabold uppercase tracking-wider border border-[#F2A93B]/20">
              <Users className="w-3.5 h-3.5" />
              <span>WHO SHOULD JOIN</span>
            </span>
          </motion.div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1F3B4D]">
            Is This Program For You?
          </h2>

          <div className="space-y-3 pt-1">
            {specificData.whoShouldJoin.map((audience, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.09 }}
                whileHover={{ y: -3, scale: 1.01, borderColor: 'rgba(14, 124, 123, 0.4)' }}
                className="p-4 bg-white border border-gray-100 rounded-2xl flex items-center gap-3.5 shadow-xs transition-all cursor-default"
              >
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-6 h-6 rounded-md bg-amber-100/80 text-[#D98E20] font-extrabold text-xs flex items-center justify-center shrink-0"
                >
                  {idx + 1}
                </motion.div>
                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                  {audience}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 3: SKILLS YOU WILL DEVELOP */}
        <motion.section 
          id="syllabus-skills" 
          className="space-y-5 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EAF3F3] text-[#0E7C7B] text-[11px] font-extrabold uppercase tracking-wider border border-[#0E7C7B]/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F2A93B]" />
              <span>SKILLS YOU WILL DEVELOP</span>
            </motion.span>
          </div>

          {/* Centered Pill Grid with Staggered Entrance & Interactive Hover */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto pt-1">
            {specificData.skills.map((skill, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.35, 
                  delay: idx * 0.05,
                  type: 'spring',
                  stiffness: 280,
                  damping: 20
                }}
                whileHover={{ 
                  y: -3, 
                  scale: 1.06, 
                  borderColor: '#0E7C7B',
                  backgroundColor: '#F7FAFA',
                  boxShadow: '0 4px 12px rgba(14, 124, 123, 0.12)' 
                }}
                whileTap={{ scale: 0.96 }}
                className="px-4 py-2 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-bold text-[#1F3B4D] shadow-xs transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* SECTION 4: COURSE CURRICULUM ACCORDION */}
        <motion.section 
          id="syllabus-curriculum" 
          className="space-y-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-md bg-[#0E7C7B]/10 text-[#0E7C7B] text-[11px] font-extrabold uppercase tracking-wider">
              COURSE CURRICULUM
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1F3B4D]">
            What You Will Learn
          </h2>

          <div className="space-y-3 pt-1">
            {specificData.curriculum.map((module, idx) => {
              const isOpen = openAccordion === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className={`bg-white border rounded-2xl overflow-hidden shadow-xs transition-all ${
                    isOpen ? 'border-[#0E7C7B]/40 ring-2 ring-[#0E7C7B]/10' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Module Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-gray-50/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <motion.div 
                        animate={{ scale: isOpen ? 1.08 : 1 }}
                        className={`w-6 h-6 rounded-md font-extrabold text-xs flex items-center justify-center shrink-0 border transition-colors ${
                          isOpen ? 'bg-[#0E7C7B] text-white border-[#0E7C7B]' : 'bg-teal-50 text-[#0E7C7B] border-teal-100'
                        }`}
                      >
                        {idx + 1}
                      </motion.div>
                      <span className={`font-heading font-bold text-sm sm:text-base transition-colors ${
                        isOpen ? 'text-[#0E7C7B]' : 'text-[#1F3B4D]'
                      }`}>
                        {module.title}
                      </span>
                    </div>

                    <motion.div 
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-gray-400 p-1"
                    >
                      <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-[#0E7C7B]' : ''}`} />
                    </motion.div>
                  </button>

                  {/* Module Expanded Details with AnimatePresence */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-2 space-y-2.5 border-t border-gray-100 bg-[#F7FAFA]/70">
                          {module.topics.map((topic, tIdx) => (
                            <motion.div 
                              key={tIdx} 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: tIdx * 0.04 }}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700"
                            >
                              <BookOpen className="w-4 h-4 text-[#0E7C7B] shrink-0 mt-0.5" />
                              <span>{topic}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* SECTION 5: PRACTICAL PROJECTS */}
        <motion.section 
          id="syllabus-projects" 
          className="space-y-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-md bg-[#FFF4E5] text-[#D98E20] text-[11px] font-extrabold uppercase tracking-wider border border-[#F2A93B]/20">
              PRACTICAL PROJECTS
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1F3B4D]">
              Real Projects You Will Build
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Every program includes hands-on projects to build your portfolio and apply what you learn.
            </p>
          </div>

          {/* 2-Column Grid of Project Cards with Motion & Rocket Lift */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {specificData.projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ 
                  y: -4, 
                  scale: 1.015,
                  borderColor: 'rgba(14, 124, 123, 0.45)',
                  boxShadow: '0 8px 24px -6px rgba(14, 124, 123, 0.14)'
                }}
                className="bg-white border border-[#EAF3F3] rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 shadow-2xs transition-all group cursor-default"
              >
                <motion.div 
                  whileHover={{ y: -3, rotate: -8, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/60 shadow-2xs group-hover:bg-emerald-100 transition-colors"
                >
                  <Rocket className="w-5 h-5" />
                </motion.div>
                <div className="space-y-0.5">
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-[#1F3B4D] group-hover:text-[#0E7C7B] transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium">
                    {project.tag || 'Practical project'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 6. BOTTOM CTA BAR */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#12232E] rounded-3xl p-8 sm:p-10 text-center text-white space-y-4 shadow-xl relative overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#F2A93B]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#0E7C7B]/20 rounded-full blur-2xl pointer-events-none" />
          
          <h3 className="font-heading font-extrabold text-2xl text-white relative z-10">
            Ready to Begin Your {currentCourse.title} Journey?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto relative z-10">
            Take the next step in your technology career with hands-on mentoring from Evolutionary Web Dude. Special pricing available now at <strong className="text-[#F2A93B] font-black">{currentCourse.fee}</strong> {currentCourse.originalFee && <span className="line-through text-gray-400">({currentCourse.originalFee})</span>}.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 relative z-10">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onEnrollCourse(currentCourse)}
              className="px-6 py-3 bg-[#F2A93B] hover:bg-[#D98E20] text-[#12232E] font-extrabold text-xs sm:text-sm rounded-xl shadow-md inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Enroll Now for {currentCourse.fee}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all inline-flex items-center gap-2 cursor-pointer backdrop-blur-xs"
            >
              <MessageCircle className="w-4 h-4 text-teal-300" />
              <span>Contact Mentors</span>
            </motion.button>
          </div>
        </motion.div>

      </div>

    </motion.div>
  );
};
