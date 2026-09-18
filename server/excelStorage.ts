import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { User, Course, Enrollment, ContactSubmission, AppointmentBooking, ShopOrder, Testimonial, NewsletterSubscriber, BlogPost } from '../src/types.js';

const EXCEL_FILE_PATH = path.join(process.cwd(), 'ewd_data_store.xlsx');

// Initial Seed Data for EWD
const INITIAL_ADMIN: User = {
  id: 'usr-admin-01',
  name: 'EWD Chief Administrator',
  email: 'Evolutionarywebdude@gmail.com',
  password: 'Evolutionarywebdude@ewd523',
  role: 'ADMIN',
  phone: '+91 98765 43210',
  organization: 'Evolutionary Web Dude Start-up',
  bio: 'Lead system administrator for Evolutionary Web Dude platform.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  createdAt: '2026-01-01 10:00:00'
};

const INITIAL_USER: User = {
  id: 'usr-demo-02',
  name: 'Pavan Bathygari',
  email: 'pavanbathygari@gmail.com',
  password: 'user12345',
  role: 'USER',
  phone: '+91 91234 56789',
  organization: 'Hyderabad Tech Scholar',
  bio: 'Software engineer passionate about scalable full-stack web applications.',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  createdAt: '2026-02-15 14:30:00'
};

const INITIAL_COURSES: Course[] = [
  {
    id: 'crs-java-fullstack',
    title: 'Java Full Stack Development',
    category: 'FULL STACK',
    description: 'Build modern full-stack applications with Java, Spring Boot, React and databases through practical project-based learning.',
    icon: 'Coffee',
    modules: ['Core Java', 'OOP', 'Collections', 'Java 8+', 'Spring Boot', 'Spring MVC', 'Spring Data JPA', 'REST APIs', 'React + Vite', 'Tailwind CSS', 'PostgreSQL / MySQL', 'JWT Auth'],
    level: 'Beginner to Pro',
    duration: '16 Weeks (Practical)',
    fee: 'Contact EWD',
    status: 'Open for Enrollment',
    isPopular: true,
    syllabus: [
      { week: 'Weeks 1-4', topic: 'Core Java & OOP Masterclass', details: 'Language fundamentals, OOP paradigms, Memory model, Collections Framework, Streams API & Lambdas.' },
      { week: 'Weeks 5-8', topic: 'Spring Boot 3 & Microservices', details: 'Spring Core, Spring MVC, REST APIs, JPA/Hibernate, Spring Security with JWT tokens, Validation.' },
      { week: 'Weeks 9-12', topic: 'Modern Frontend with React', details: 'React 18+, TypeScript, Hooks, State management, Tailwind CSS, Framer Motion animations.' },
      { week: 'Weeks 13-16', topic: 'Full Stack Capstone Deployment', details: 'End-to-end integration, Docker, CI/CD pipelines, Cloud Run deployment, performance tuning.' }
    ],
    learningOutcomes: [
      'Architect robust enterprise Java Spring Boot backend services',
      'Design fluid, high-performance React user interfaces with TypeScript',
      'Integrate production-grade JWT security, relational databases & Excel reporting',
      'Deploy full-stack cloud applications with automated pipelines'
    ]
  },
  {
    id: 'crs-web-dev',
    title: 'Web Development',
    category: 'FRONTEND',
    description: 'From HTML basics to React & TypeScript — build responsive, modern web applications with real-world projects.',
    icon: 'Globe',
    modules: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Git', 'GitHub', 'TypeScript', 'React 18', 'Tailwind CSS', 'Framer Motion'],
    level: 'Beginner',
    duration: '12 Weeks',
    fee: 'Contact EWD',
    status: 'Open for Enrollment',
    isPopular: true,
    syllabus: [
      { week: 'Weeks 1-3', topic: 'Semantic HTML5 & Modern CSS3', details: 'Flexbox, Grid, CSS Variables, Responsive design principles, WCAG accessibility.' },
      { week: 'Weeks 4-7', topic: 'JavaScript & TypeScript Mastery', details: 'ES6+, DOM Manipulation, Async/Await, Fetch API, TypeScript types and interfaces.' },
      { week: 'Weeks 8-12', topic: 'React, Tailwind & Component Architecture', details: 'Component lifecycle, hooks, routing, animations with Framer Motion, production builds.' }
    ],
    learningOutcomes: [
      'Master responsive web engineering without framework lock-in',
      'Build rich single-page applications with React and TypeScript',
      'Implement micro-animations, glassmorphism, and modern SaaS design patterns'
    ]
  },
  {
    id: 'crs-python-dev',
    title: 'Python Development',
    category: 'BACKEND',
    description: 'From Python basics to backend APIs — learn practical Python for development, automation, and data handling.',
    icon: 'Code2',
    modules: ['Python', 'OOP', 'File Handling', 'Exception Handling', 'Libraries', 'API Development', 'FastAPI / Django', 'Data Structures'],
    level: 'Beginner to Intermediate',
    duration: '10 Weeks',
    fee: 'Contact EWD',
    status: 'Open for Enrollment',
    syllabus: [
      { week: 'Weeks 1-3', topic: 'Python Fundamentals & Data Structures', details: 'Syntax, OOP principles, data manipulation, file handling, error handling.' },
      { week: 'Weeks 4-7', topic: 'Web APIs & Automation', details: 'Building RESTful APIs with FastAPI, database modeling with SQLAlchemy, web scraping.' },
      { week: 'Weeks 8-10', topic: 'Production Deployments & Excel Integrations', details: 'Excel data pipeline processing, async task workers, API containerization.' }
    ],
    learningOutcomes: [
      'Write clean, modular Python programs with standard libraries',
      'Create high-throughput backend APIs with automated documentation',
      'Build automated Excel file transformation pipelines'
    ]
  },
  {
    id: 'crs-digital-marketing',
    title: 'Digital Marketing',
    category: 'MARKETING',
    description: 'Master SEO, social media marketing, content strategy, and analytics through practical campaign projects.',
    icon: 'Megaphone',
    modules: ['SEO', 'Social Media Marketing', 'Instagram Marketing', 'Facebook Marketing', 'Content Marketing', 'Google Business Profile', 'Analytics', 'Conversion Optimization'],
    level: 'Beginner',
    duration: '8 Weeks',
    fee: 'Contact EWD',
    status: 'Open for Enrollment',
    syllabus: [
      { week: 'Weeks 1-2', topic: 'Search Engine Optimization (SEO)', details: 'Keyword research, on-page SEO, technical audits, backlink strategy, Google Search Console.' },
      { week: 'Weeks 3-5', topic: 'Social Media & Paid Ads', details: 'Meta Ads Manager, LinkedIn B2B growth, Instagram engagement funnels, creative strategy.' },
      { week: 'Weeks 6-8', topic: 'Analytics, Conversion & Lead Generation', details: 'Google Analytics 4, conversion rate optimization, email nurturing, ROI tracking.' }
    ],
    learningOutcomes: [
      'Rank web pages on page 1 of Google with technical & on-page SEO',
      'Run profitable social media advertising campaigns',
      'Build automated lead generation funnels for businesses'
    ]
  },
  {
    id: 'crs-software-dev',
    title: 'Software Development',
    category: 'SOFTWARE ENGINEERING',
    description: 'A complete software development journey — from programming fundamentals to building and deploying real applications.',
    icon: 'Monitor',
    modules: ['Programming Fundamentals', 'Software Engineering', 'Frontend Development', 'Backend Development', 'Databases', 'REST APIs', 'System Design', 'Testing & CI/CD'],
    level: 'Beginner',
    duration: '20 Weeks (Intensive)',
    fee: 'Contact EWD',
    status: 'Open for Enrollment',
    syllabus: [
      { week: 'Weeks 1-5', topic: 'Computer Science & Software Foundations', details: 'Algorithms, data structures, clean code principles, version control with Git.' },
      { week: 'Weeks 6-10', topic: 'Full Stack Web Architecture', details: 'Frontend components, backend servers, SQL/NoSQL databases, RESTful contract design.' },
      { week: 'Weeks 11-15', topic: 'System Design & Scalability', details: 'Caching strategies, database indexing, microservices communication, auth mechanisms.' },
      { week: 'Weeks 16-20', topic: 'Production Capstone & Interview Preparation', details: 'Live production app deployment, automated unit/E2E testing, technical mock interviews.' }
    ],
    learningOutcomes: [
      'Think like a senior software architect with strong CS foundations',
      'Design reliable software systems with clean modular architecture',
      'Ship production code with comprehensive test coverage'
    ]
  },
  {
    id: 'crs-practical-projects',
    title: 'Career-Oriented Practical Projects',
    category: 'PROJECTS',
    description: 'Build complete, portfolio-ready projects from planning to deployment with full guidance from EWD team.',
    icon: 'Rocket',
    modules: ['Project Planning', 'Requirement Analysis', 'UI Design', 'Frontend Development', 'Backend Development', 'Database Design', 'Cloud Deployment', 'Live Demo Hosting'],
    level: 'All Levels',
    duration: '6 Weeks / Modular',
    fee: 'Contact EWD',
    status: 'Open for Enrollment',
    isPopular: true,
    syllabus: [
      { week: 'Weeks 1-2', topic: 'Requirement Engineering & Architecture Plan', details: 'Defining scope, user stories, database ER diagrams, wireframes and Figma designs.' },
      { week: 'Weeks 3-4', topic: 'Agile Development Sprints', details: 'Building core modules, connecting APIs, state management, role-based authentication.' },
      { week: 'Weeks 5-6', topic: 'Deployment, Code Review & Portfolio Showcase', details: 'Production cloud hosting, custom domain setup, resume project bullet points, demo video.' }
    ],
    learningOutcomes: [
      'Create 3+ standalone production-grade portfolio projects',
      'Gain real industry-standard collaborative development experience',
      'Prepare live URLs and GitHub repositories that impress recruiters'
    ]
  }
];

const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    id: 'enr-101',
    courseId: 'crs-java-fullstack',
    courseTitle: 'Java Full Stack Development',
    courseCategory: 'FULL STACK',
    userId: 'usr-demo-02',
    userName: 'Pavan Bathygari',
    userEmail: 'pavanbathygari@gmail.com',
    userPhone: '+91 91234 56789',
    educationOrJob: 'B.Tech Graduate / Software Engineer',
    experienceLevel: '1-2 Years',
    mode: 'Hybrid',
    preferredBatch: 'Weekend',
    notes: 'Interested in Spring Boot 3 and cloud deployment modules.',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    enrolledAt: '2026-02-18 11:20:00'
  },
  {
    id: 'enr-102',
    courseId: 'crs-web-dev',
    courseTitle: 'Web Development',
    courseCategory: 'FRONTEND',
    userName: 'Kavitha Reddy',
    userEmail: 'kavitha.reddy@example.com',
    userPhone: '+91 98480 22334',
    educationOrJob: 'Final Year MCA Student',
    experienceLevel: 'Beginner',
    mode: 'Online Live',
    preferredBatch: 'Morning',
    notes: 'Excited for React and TypeScript training.',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    enrolledAt: '2026-02-20 09:45:00'
  },
  {
    id: 'enr-103',
    courseId: 'crs-practical-projects',
    courseTitle: 'Career-Oriented Practical Projects',
    courseCategory: 'PROJECTS',
    userName: 'Suresh Kumar',
    userEmail: 'suresh.kumar@techmail.com',
    userPhone: '+91 97001 88990',
    educationOrJob: 'Junior Developer',
    experienceLevel: '6 Months',
    mode: 'Hybrid',
    preferredBatch: 'Evening',
    notes: 'Need assistance with enterprise project portfolio.',
    status: 'Under Review',
    paymentStatus: 'Pending',
    enrolledAt: '2026-02-22 16:15:00'
  }
];

const INITIAL_CONTACTS: ContactSubmission[] = [
  {
    id: 'cnt-201',
    name: 'Dr. Ramesh Sharma',
    email: 'ramesh.sharma@osmania.ac.in',
    phone: '+91 98490 11223',
    subject: 'Academic Paperless Portal Inquiry',
    serviceInterest: 'Paperless Academic Solutions',
    message: 'We are seeking an adaptive digital submission portal for our university thesis and evaluation process in Hyderabad.',
    status: 'New',
    submittedAt: '2026-02-21 14:10:00'
  },
  {
    id: 'cnt-202',
    name: 'Ananya Verma',
    email: 'ananya@v-enterprises.com',
    phone: '+91 99887 66554',
    subject: 'Enterprise Web Application Rebuild',
    serviceInterest: 'Adaptive Web Development',
    message: 'Looking to modernize our legacy office internal workflows into paperless zero-clutter web systems.',
    status: 'In Progress',
    submittedAt: '2026-02-22 10:30:00'
  }
];

const INITIAL_APPOINTMENTS: AppointmentBooking[] = [
  {
    id: 'apt-301',
    name: 'Vikram Joshi',
    email: 'vikram.j@fintechsys.io',
    phone: '+91 94401 55667',
    serviceType: 'Enterprise Office Automation',
    date: '2026-08-28',
    timeSlot: '11:00 AM - 12:00 PM IST',
    topic: 'Transitioning academic evaluation records to paperless digital signatures.',
    meetingType: 'Google Meet',
    status: 'Confirmed',
    createdAt: '2026-08-23 09:00:00'
  }
];

const INITIAL_ORDERS: ShopOrder[] = [
  {
    id: 'ord-401',
    userId: 'usr-demo-02',
    customerName: 'Pavan Bathygari',
    customerEmail: 'pavanbathygari@gmail.com',
    customerPhone: '+91 91234 56789',
    companyName: 'Academic Tech Hub',
    items: [
      { productId: 'prod-paperless-suite', productTitle: 'EWD Paperless Office Starter Kit', price: 499, quantity: 1 }
    ],
    subtotal: 499,
    tax: 44.91,
    total: 543.91,
    paymentMethod: 'Razorpay / Stripe',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    createdAt: '2026-02-19 15:20:00'
  }
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'tst-501',
    name: 'Prof. K. Ramaswamy',
    role: 'Dean of Academic Affairs',
    companyOrCollege: 'Telangana Higher Education Consortium',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    serviceOrCourse: 'Paperless Academic Solutions',
    comment: 'Evolutionary Web Dude replaced 40,000 physical verification paper forms across our university departments with their adaptive digital portal. Remarkable turn-around and 100% paperless efficiency!',
    isApproved: true,
    featured: true,
    date: '2026-02-10'
  },
  {
    id: 'tst-502',
    name: 'Sneha Patel',
    role: 'Full Stack Java Engineer',
    companyOrCollege: 'Global Software Labs',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    serviceOrCourse: 'Java Full Stack Development Program',
    comment: 'The project-based curriculum at EWD was career-transforming. Working with real Spring Boot microservices, React, and Excel pipeline integrations landed me a Senior Developer role within 2 months of graduation.',
    isApproved: true,
    featured: true,
    date: '2026-02-14'
  },
  {
    id: 'tst-503',
    name: 'Rajesh Goud',
    role: 'Operations Director',
    companyOrCollege: 'Apex Logistics Hub',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    serviceOrCourse: 'Adaptive Web Architecture',
    comment: 'Their self-optimizing web systems drastically reduced our document cycle times. The team in Hyderabad was responsive, agile, and truly lived up to the name Evolutionary Web Dude.',
    isApproved: true,
    featured: true,
    date: '2026-02-18'
  }
];

const INITIAL_NEWSLETTER: NewsletterSubscriber[] = [
  { id: 'nl-601', email: 'director@academics-telangana.org', status: 'Active', subscribedAt: '2026-01-15 08:30:00' },
  { id: 'nl-602', email: 'techlead@cloudventures.in', status: 'Active', subscribedAt: '2026-02-01 12:00:00' }
];

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'architecting-zero-paper-academic-thesis',
    title: 'Architecting Zero-Paper Academic Thesis Submissions in Hyderabad',
    excerpt: 'How our proprietary digital verification pipeline eradicated 40,000+ paper forms and reduced thesis approval cycles from 21 days to 4 hours.',
    content: 'Academic institutions in Telangana and Andhra Pradesh have historically grappled with massive logistical bottlenecks during annual thesis review cycles. Physical copies, ink-signed approvals, and ledger archiving cost millions of rupees annually.\n\nAt Evolutionary Web Dude, we deployed an end-to-end digital verification platform that eliminated 40,000+ physical forms, accelerated approvals to under 4 hours, and ensured 100% digital audit compliance.',
    category: 'Paperless Architecture',
    author: 'Pavan Bathygari',
    authorRole: 'Founder & Lead Architect',
    readTime: '6 min read',
    publishedAt: '2026-02-15 10:00:00',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    tags: ['Paperless', 'ExcelJS', 'React 18', 'Academic Tech'],
    likes: 42
  },
  {
    id: 'blog-2',
    slug: 'evolutionary-optimization-web-development',
    title: 'Evolutionary Optimization: Why Static Web Development Is Obsolete',
    excerpt: 'Biological evolution provides the ultimate blueprint for web engineering. Discover how telemetry-driven self-optimizing UI engines function.',
    content: 'Modern users demand interfaces that dynamically anticipate intent. Rigid, static websites designed once and never adapted suffer from high drop-off rates.\n\nBy tracking client-side micro-interactions—such as focus retention, reading speed, and viewport scaling—our evolutionary web engine modifies layout spacing and typography contrast in real-time.',
    category: 'System Design',
    author: 'EWD Research Lab',
    authorRole: 'Systems & Algorithms Team',
    readTime: '8 min read',
    publishedAt: '2026-01-28 14:30:00',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    tags: ['Evolutionary Alg', 'Telemetry', 'Performance', 'A/B Testing'],
    likes: 38
  },
  {
    id: 'blog-3',
    slug: 'spring-boot-react-microservices-masterclass',
    title: 'Spring Boot 3 + React 18: Microservices Masterclass for Indian Tech Careers',
    excerpt: 'A comprehensive roadmap for engineering students and aspiring developers looking to bridge the gap between academic theory and enterprise scale.',
    content: 'The contemporary software market demands engineers who can not only write clean code, but architect distributed systems with security and data persistence in mind.\n\nKey pillars include Spring Boot 3 with JWT token rotation, modern React with TypeScript and Framer Motion, and high-performance Excel/database pipelines.',
    category: 'Engineering Guide',
    author: 'Academic Mentor Team',
    authorRole: 'Technical Instructors',
    readTime: '10 min read',
    publishedAt: '2026-01-10 09:15:00',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    tags: ['Java', 'Spring Boot', 'Full Stack', 'Careers'],
    likes: 56
  }
];

export class ExcelStorageEngine {
  private static instance: ExcelStorageEngine;

  private constructor() {
    this.ensureWorkbookExists();
  }

  public static getInstance(): ExcelStorageEngine {
    if (!ExcelStorageEngine.instance) {
      ExcelStorageEngine.instance = new ExcelStorageEngine();
    }
    return ExcelStorageEngine.instance;
  }

  private async ensureWorkbookExists() {
    if (!fs.existsSync(EXCEL_FILE_PATH)) {
      console.log(`[ExcelStorageEngine] Initializing fresh Excel data store at: ${EXCEL_FILE_PATH}`);
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Evolutionary Web Dude Storage System';
      workbook.lastModifiedBy = 'EWD Storage Engine';
      workbook.created = new Date();
      workbook.modified = new Date();

      // 1. Users Sheet
      const usersSheet = workbook.addWorksheet('Users', { views: [{ state: 'frozen', ySplit: 1 }] });
      usersSheet.columns = [
        { header: 'ID', key: 'id', width: 18 },
        { header: 'Name', key: 'name', width: 25 },
        { header: 'Email', key: 'email', width: 32 },
        { header: 'Password', key: 'password', width: 30 },
        { header: 'Role', key: 'role', width: 14 },
        { header: 'Phone', key: 'phone', width: 20 },
        { header: 'Organization', key: 'organization', width: 30 },
        { header: 'Bio', key: 'bio', width: 40 },
        { header: 'Avatar', key: 'avatar', width: 45 },
        { header: 'CreatedAt', key: 'createdAt', width: 22 }
      ];
      usersSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      usersSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0E7C7B' } };
      [INITIAL_ADMIN, INITIAL_USER].forEach(u => usersSheet.addRow(u));

      // 2. Courses Sheet
      const coursesSheet = workbook.addWorksheet('Courses', { views: [{ state: 'frozen', ySplit: 1 }] });
      coursesSheet.columns = [
        { header: 'ID', key: 'id', width: 24 },
        { header: 'Title', key: 'title', width: 35 },
        { header: 'Category', key: 'category', width: 24 },
        { header: 'Description', key: 'description', width: 60 },
        { header: 'Modules', key: 'modules', width: 50 },
        { header: 'Level', key: 'level', width: 20 },
        { header: 'Duration', key: 'duration', width: 20 },
        { header: 'Fee', key: 'fee', width: 18 },
        { header: 'Status', key: 'status', width: 22 },
        { header: 'IsPopular', key: 'isPopular', width: 14 },
        { header: 'SyllabusJSON', key: 'syllabusJSON', width: 60 },
        { header: 'OutcomesJSON', key: 'outcomesJSON', width: 60 }
      ];
      coursesSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      coursesSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3B4D' } };
      INITIAL_COURSES.forEach(c => {
        coursesSheet.addRow({
          ...c,
          modules: c.modules.join(', '),
          syllabusJSON: JSON.stringify(c.syllabus),
          outcomesJSON: JSON.stringify(c.learningOutcomes)
        });
      });

      // 3. Enrollments Sheet
      const enrollSheet = workbook.addWorksheet('Enrollments', { views: [{ state: 'frozen', ySplit: 1 }] });
      enrollSheet.columns = [
        { header: 'ID', key: 'id', width: 16 },
        { header: 'CourseID', key: 'courseId', width: 24 },
        { header: 'CourseTitle', key: 'courseTitle', width: 32 },
        { header: 'CourseCategory', key: 'courseCategory', width: 22 },
        { header: 'UserID', key: 'userId', width: 18 },
        { header: 'UserName', key: 'userName', width: 25 },
        { header: 'UserEmail', key: 'userEmail', width: 30 },
        { header: 'UserPhone', key: 'userPhone', width: 18 },
        { header: 'EducationOrJob', key: 'educationOrJob', width: 30 },
        { header: 'ExperienceLevel', key: 'experienceLevel', width: 18 },
        { header: 'Mode', key: 'mode', width: 16 },
        { header: 'PreferredBatch', key: 'preferredBatch', width: 18 },
        { header: 'Notes', key: 'notes', width: 35 },
        { header: 'Status', key: 'status', width: 18 },
        { header: 'PaymentStatus', key: 'paymentStatus', width: 18 },
        { header: 'EnrolledAt', key: 'enrolledAt', width: 22 }
      ];
      enrollSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      enrollSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0E7C7B' } };
      INITIAL_ENROLLMENTS.forEach(e => enrollSheet.addRow(e));

      // 4. Contacts Sheet
      const contactsSheet = workbook.addWorksheet('Contacts', { views: [{ state: 'frozen', ySplit: 1 }] });
      contactsSheet.columns = [
        { header: 'ID', key: 'id', width: 16 },
        { header: 'Name', key: 'name', width: 25 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Phone', key: 'phone', width: 20 },
        { header: 'Subject', key: 'subject', width: 30 },
        { header: 'ServiceInterest', key: 'serviceInterest', width: 28 },
        { header: 'Message', key: 'message', width: 50 },
        { header: 'Status', key: 'status', width: 16 },
        { header: 'SubmittedAt', key: 'submittedAt', width: 22 }
      ];
      contactsSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      contactsSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3B4D' } };
      INITIAL_CONTACTS.forEach(c => contactsSheet.addRow(c));

      // 5. Appointments Sheet
      const apptSheet = workbook.addWorksheet('Appointments', { views: [{ state: 'frozen', ySplit: 1 }] });
      apptSheet.columns = [
        { header: 'ID', key: 'id', width: 16 },
        { header: 'Name', key: 'name', width: 25 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Phone', key: 'phone', width: 20 },
        { header: 'ServiceType', key: 'serviceType', width: 28 },
        { header: 'Date', key: 'date', width: 16 },
        { header: 'TimeSlot', key: 'timeSlot', width: 25 },
        { header: 'Topic', key: 'topic', width: 40 },
        { header: 'MeetingType', key: 'meetingType', width: 18 },
        { header: 'Status', key: 'status', width: 16 },
        { header: 'CreatedAt', key: 'createdAt', width: 22 }
      ];
      apptSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      apptSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0E7C7B' } };
      INITIAL_APPOINTMENTS.forEach(a => apptSheet.addRow(a));

      // 6. Orders Sheet
      const ordersSheet = workbook.addWorksheet('Orders', { views: [{ state: 'frozen', ySplit: 1 }] });
      ordersSheet.columns = [
        { header: 'ID', key: 'id', width: 16 },
        { header: 'UserID', key: 'userId', width: 18 },
        { header: 'CustomerName', key: 'customerName', width: 25 },
        { header: 'CustomerEmail', key: 'customerEmail', width: 30 },
        { header: 'CustomerPhone', key: 'customerPhone', width: 20 },
        { header: 'CompanyName', key: 'companyName', width: 25 },
        { header: 'ItemsJSON', key: 'itemsJSON', width: 50 },
        { header: 'Subtotal', key: 'subtotal', width: 14 },
        { header: 'Tax', key: 'tax', width: 12 },
        { header: 'Total', key: 'total', width: 14 },
        { header: 'PaymentMethod', key: 'paymentMethod', width: 22 },
        { header: 'PaymentStatus', key: 'paymentStatus', width: 16 },
        { header: 'OrderStatus', key: 'orderStatus', width: 18 },
        { header: 'CreatedAt', key: 'createdAt', width: 22 }
      ];
      ordersSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      ordersSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3B4D' } };
      INITIAL_ORDERS.forEach(o => {
        ordersSheet.addRow({
          ...o,
          itemsJSON: JSON.stringify(o.items)
        });
      });

      // 7. Testimonials Sheet
      const testSheet = workbook.addWorksheet('Testimonials', { views: [{ state: 'frozen', ySplit: 1 }] });
      testSheet.columns = [
        { header: 'ID', key: 'id', width: 16 },
        { header: 'Name', key: 'name', width: 25 },
        { header: 'Role', key: 'role', width: 25 },
        { header: 'CompanyOrCollege', key: 'companyOrCollege', width: 32 },
        { header: 'Rating', key: 'rating', width: 12 },
        { header: 'ServiceOrCourse', key: 'serviceOrCourse', width: 30 },
        { header: 'Comment', key: 'comment', width: 60 },
        { header: 'IsApproved', key: 'isApproved', width: 14 },
        { header: 'Featured', key: 'featured', width: 14 },
        { header: 'Date', key: 'date', width: 16 }
      ];
      testSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      testSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0E7C7B' } };
      INITIAL_TESTIMONIALS.forEach(t => testSheet.addRow(t));

      // 8. Newsletter Sheet
      const newsSheet = workbook.addWorksheet('Newsletter', { views: [{ state: 'frozen', ySplit: 1 }] });
      newsSheet.columns = [
        { header: 'ID', key: 'id', width: 16 },
        { header: 'Email', key: 'email', width: 35 },
        { header: 'Status', key: 'status', width: 16 },
        { header: 'SubscribedAt', key: 'subscribedAt', width: 22 }
      ];
      newsSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      newsSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3B4D' } };
      INITIAL_NEWSLETTER.forEach(n => newsSheet.addRow(n));

      // 9. Blogs Sheet
      const blogsSheet = workbook.addWorksheet('Blogs', { views: [{ state: 'frozen', ySplit: 1 }] });
      blogsSheet.columns = [
        { header: 'ID', key: 'id', width: 16 },
        { header: 'Slug', key: 'slug', width: 32 },
        { header: 'Title', key: 'title', width: 45 },
        { header: 'Excerpt', key: 'excerpt', width: 50 },
        { header: 'Content', key: 'content', width: 60 },
        { header: 'Category', key: 'category', width: 24 },
        { header: 'Author', key: 'author', width: 24 },
        { header: 'AuthorRole', key: 'authorRole', width: 24 },
        { header: 'ReadTime', key: 'readTime', width: 16 },
        { header: 'PublishedAt', key: 'publishedAt', width: 22 },
        { header: 'CoverImage', key: 'coverImage', width: 40 },
        { header: 'Tags', key: 'tags', width: 35 },
        { header: 'Likes', key: 'likes', width: 12 }
      ];
      blogsSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      blogsSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0E7C7B' } };
      INITIAL_BLOGS.forEach(b => {
        blogsSheet.addRow([
          b.id,
          b.slug,
          b.title,
          b.excerpt,
          b.content,
          b.category,
          b.author,
          b.authorRole,
          b.readTime,
          b.publishedAt,
          b.coverImage || '',
          b.tags.join(', '),
          b.likes || 0
        ]);
      });

      await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
      console.log(`[ExcelStorageEngine] Successfully generated initial Excel workbook with 9 sheets at: ${EXCEL_FILE_PATH}`);
    }
  }

  private async getWorkbook(): Promise<ExcelJS.Workbook> {
    await this.ensureWorkbookExists();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(EXCEL_FILE_PATH);

    // If Blogs sheet missing in existing Excel file, add it
    let blogsSheet = workbook.getWorksheet('Blogs');
    if (!blogsSheet) {
      blogsSheet = workbook.addWorksheet('Blogs', { views: [{ state: 'frozen', ySplit: 1 }] });
      blogsSheet.columns = [
        { header: 'ID', key: 'id', width: 16 },
        { header: 'Slug', key: 'slug', width: 32 },
        { header: 'Title', key: 'title', width: 45 },
        { header: 'Excerpt', key: 'excerpt', width: 50 },
        { header: 'Content', key: 'content', width: 60 },
        { header: 'Category', key: 'category', width: 24 },
        { header: 'Author', key: 'author', width: 24 },
        { header: 'AuthorRole', key: 'authorRole', width: 24 },
        { header: 'ReadTime', key: 'readTime', width: 16 },
        { header: 'PublishedAt', key: 'publishedAt', width: 22 },
        { header: 'CoverImage', key: 'coverImage', width: 40 },
        { header: 'Tags', key: 'tags', width: 35 },
        { header: 'Likes', key: 'likes', width: 12 }
      ];
      blogsSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      blogsSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0E7C7B' } };
      INITIAL_BLOGS.forEach(b => {
        blogsSheet!.addRow([
          b.id,
          b.slug,
          b.title,
          b.excerpt,
          b.content,
          b.category,
          b.author,
          b.authorRole,
          b.readTime,
          b.publishedAt,
          b.coverImage || '',
          b.tags.join(', '),
          b.likes || 0
        ]);
      });
      await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
    }

    return workbook;
  }

  private async saveWorkbook(workbook: ExcelJS.Workbook): Promise<void> {
    await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
  }

  // --- USERS OPERATIONS ---
  public async getAllUsers(): Promise<User[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Users');
    if (!sheet) return [INITIAL_ADMIN, INITIAL_USER];

    const users: User[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Header
      const values = row.values as any[];
      if (values[1]) {
        users.push({
          id: String(values[1] || ''),
          name: String(values[2] || ''),
          email: String(values[3] || '').trim(),
          password: String(values[4] || ''),
          role: (String(values[5] || 'USER').toUpperCase() === 'ADMIN' ? 'ADMIN' : 'USER'),
          phone: String(values[6] || ''),
          organization: String(values[7] || ''),
          bio: String(values[8] || ''),
          avatar: String(values[9] || ''),
          createdAt: String(values[10] || '')
        });
      }
    });
    return users;
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const users = await this.getAllUsers();
    return users.find(u => u.email.toLowerCase() === email.trim().toLowerCase()) || null;
  }

  public async createUser(user: Partial<User>): Promise<User> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Users');
    if (!sheet) throw new Error('Users worksheet missing');

    const newUser: User = {
      id: `usr-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      name: user.name || 'Anonymous User',
      email: user.email!.trim(),
      password: user.password || '',
      role: user.role || 'USER',
      phone: user.phone || '',
      organization: user.organization || '',
      bio: user.bio || '',
      avatar: user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name || 'User')}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    sheet.addRow([
      newUser.id,
      newUser.name,
      newUser.email,
      newUser.password,
      newUser.role,
      newUser.phone,
      newUser.organization,
      newUser.bio,
      newUser.avatar,
      newUser.createdAt
    ]);

    await this.saveWorkbook(workbook);
    return newUser;
  }

  public async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Users');
    if (!sheet) return null;

    let updatedUser: User | null = null;

    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) {
        const user: User = {
          id: values[1],
          name: updates.name ?? values[2],
          email: updates.email ?? values[3],
          password: updates.password ?? values[4],
          role: updates.role ?? values[5],
          phone: updates.phone ?? values[6],
          organization: updates.organization ?? values[7],
          bio: updates.bio ?? values[8],
          avatar: updates.avatar ?? values[9],
          createdAt: values[10]
        };
        row.getCell(2).value = user.name;
        row.getCell(3).value = user.email;
        if (updates.password) row.getCell(4).value = user.password;
        if (updates.role) row.getCell(5).value = user.role;
        row.getCell(6).value = user.phone;
        row.getCell(7).value = user.organization;
        row.getCell(8).value = user.bio;
        row.getCell(9).value = user.avatar;
        updatedUser = user;
      }
    });

    if (updatedUser) {
      await this.saveWorkbook(workbook);
    }
    return updatedUser;
  }

  public async deleteUser(id: string): Promise<boolean> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Users');
    if (!sheet) return false;

    let targetRow = -1;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) {
        targetRow = rowNumber;
      }
    });

    if (targetRow > 0) {
      sheet.spliceRows(targetRow, 1);
      await this.saveWorkbook(workbook);
      return true;
    }
    return false;
  }

  // --- COURSES OPERATIONS ---
  public async getAllCourses(): Promise<Course[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Courses');
    if (!sheet) return INITIAL_COURSES;

    const courses: Course[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1]) {
        let syllabus = [];
        let learningOutcomes = [];
        try {
          syllabus = values[11] ? JSON.parse(values[11]) : [];
        } catch {
          syllabus = [];
        }
        try {
          learningOutcomes = values[12] ? JSON.parse(values[12]) : [];
        } catch {
          learningOutcomes = [];
        }

        courses.push({
          id: String(values[1] || ''),
          title: String(values[2] || ''),
          category: values[3] as any,
          description: String(values[4] || ''),
          icon: 'BookOpen',
          modules: values[5] ? String(values[5]).split(',').map(s => s.trim()) : [],
          level: String(values[6] || 'Beginner'),
          duration: String(values[7] || '12 Weeks'),
          fee: String(values[8] || 'Contact EWD'),
          status: values[9] as any || 'Open for Enrollment',
          isPopular: values[10] === true || String(values[10]).toLowerCase() === 'true',
          syllabus,
          learningOutcomes
        });
      }
    });
    return courses.length ? courses : INITIAL_COURSES;
  }

  public async createCourse(course: Partial<Course>): Promise<Course> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Courses');
    if (!sheet) throw new Error('Courses sheet missing');

    const newCourse: Course = {
      id: course.id || `crs-${Date.now().toString(36)}`,
      title: course.title || 'New Technology Program',
      category: course.category || 'FULL STACK',
      description: course.description || 'Hands-on training program.',
      icon: course.icon || 'BookOpen',
      modules: course.modules || ['Basics', 'Intermediate', 'Advanced Project'],
      level: course.level || 'Beginner to Pro',
      duration: course.duration || '12 Weeks',
      fee: course.fee || 'Contact EWD',
      status: course.status || 'Open for Enrollment',
      isPopular: !!course.isPopular,
      syllabus: course.syllabus || [
        { week: 'Weeks 1-4', topic: 'Fundamentals', details: 'Core concepts, architecture, and foundational tooling.' },
        { week: 'Weeks 5-8', topic: 'Advanced Implementation', details: 'Hands-on practical development with real-world scenarios.' },
        { week: 'Weeks 9-12', topic: 'Capstone & Deployment', details: 'Live deployment and portfolio building.' }
      ],
      learningOutcomes: course.learningOutcomes || [
        'Gain career-ready industry skills through real project development',
        'Learn scalable architecture and clean code standards',
        'Receive EWD course completion certification & portfolio showcase'
      ]
    };

    sheet.addRow([
      newCourse.id,
      newCourse.title,
      newCourse.category,
      newCourse.description,
      newCourse.modules.join(', '),
      newCourse.level,
      newCourse.duration,
      newCourse.fee,
      newCourse.status,
      newCourse.isPopular,
      JSON.stringify(newCourse.syllabus),
      JSON.stringify(newCourse.learningOutcomes)
    ]);

    await this.saveWorkbook(workbook);
    return newCourse;
  }

  public async updateCourse(id: string, updates: Partial<Course>): Promise<Course | null> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Courses');
    if (!sheet) return null;

    let updated: Course | null = null;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) {
        if (updates.title) row.getCell(2).value = updates.title;
        if (updates.category) row.getCell(3).value = updates.category;
        if (updates.description) row.getCell(4).value = updates.description;
        if (updates.modules) row.getCell(5).value = updates.modules.join(', ');
        if (updates.level) row.getCell(6).value = updates.level;
        if (updates.duration) row.getCell(7).value = updates.duration;
        if (updates.fee) row.getCell(8).value = updates.fee;
        if (updates.status) row.getCell(9).value = updates.status;
        if (updates.isPopular !== undefined) row.getCell(10).value = updates.isPopular;
        if (updates.syllabus) row.getCell(11).value = JSON.stringify(updates.syllabus);
        if (updates.learningOutcomes) row.getCell(12).value = JSON.stringify(updates.learningOutcomes);

        updated = {
          id,
          title: updates.title ?? values[2],
          category: updates.category ?? values[3],
          description: updates.description ?? values[4],
          icon: 'BookOpen',
          modules: updates.modules ?? (values[5] ? String(values[5]).split(',').map(s => s.trim()) : []),
          level: updates.level ?? values[6],
          duration: updates.duration ?? values[7],
          fee: updates.fee ?? values[8],
          status: updates.status ?? values[9],
          isPopular: updates.isPopular ?? values[10],
          syllabus: updates.syllabus ?? (values[11] ? JSON.parse(values[11]) : []),
          learningOutcomes: updates.learningOutcomes ?? (values[12] ? JSON.parse(values[12]) : [])
        };
      }
    });

    if (updated) {
      await this.saveWorkbook(workbook);
    }
    return updated;
  }

  public async deleteCourse(id: string): Promise<boolean> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Courses');
    if (!sheet) return false;

    let targetRow = -1;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) targetRow = rowNumber;
    });

    if (targetRow > 0) {
      sheet.spliceRows(targetRow, 1);
      await this.saveWorkbook(workbook);
      return true;
    }
    return false;
  }

  // --- ENROLLMENTS OPERATIONS ---
  public async getAllEnrollments(): Promise<Enrollment[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Enrollments');
    if (!sheet) return INITIAL_ENROLLMENTS;

    const enrollments: Enrollment[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1]) {
        enrollments.push({
          id: String(values[1] || ''),
          courseId: String(values[2] || ''),
          courseTitle: String(values[3] || ''),
          courseCategory: String(values[4] || ''),
          userId: String(values[5] || ''),
          userName: String(values[6] || ''),
          userEmail: String(values[7] || ''),
          userPhone: String(values[8] || ''),
          educationOrJob: String(values[9] || ''),
          experienceLevel: String(values[10] || ''),
          mode: (values[11] || 'Online Live') as any,
          preferredBatch: (values[12] || 'Morning') as any,
          notes: String(values[13] || ''),
          status: (values[14] || 'Under Review') as any,
          paymentStatus: (values[15] || 'Pending') as any,
          enrolledAt: String(values[16] || '')
        });
      }
    });
    return enrollments;
  }

  public async createEnrollment(enrollment: Partial<Enrollment>): Promise<Enrollment> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Enrollments');
    if (!sheet) throw new Error('Enrollments sheet missing');

    const newEnrollment: Enrollment = {
      id: `enr-${Date.now().toString(36)}`,
      courseId: enrollment.courseId || 'crs-general',
      courseTitle: enrollment.courseTitle || 'EWD Technology Program',
      courseCategory: enrollment.courseCategory || 'FULL STACK',
      userId: enrollment.userId || '',
      userName: enrollment.userName || 'Anonymous Student',
      userEmail: enrollment.userEmail || '',
      userPhone: enrollment.userPhone || '',
      educationOrJob: enrollment.educationOrJob || 'Graduate / Professional',
      experienceLevel: enrollment.experienceLevel || 'Beginner',
      mode: enrollment.mode || 'Hybrid',
      preferredBatch: enrollment.preferredBatch || 'Morning',
      notes: enrollment.notes || '',
      status: 'Confirmed',
      paymentStatus: enrollment.paymentStatus || 'Paid',
      enrolledAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    sheet.addRow([
      newEnrollment.id,
      newEnrollment.courseId,
      newEnrollment.courseTitle,
      newEnrollment.courseCategory,
      newEnrollment.userId,
      newEnrollment.userName,
      newEnrollment.userEmail,
      newEnrollment.userPhone,
      newEnrollment.educationOrJob,
      newEnrollment.experienceLevel,
      newEnrollment.mode,
      newEnrollment.preferredBatch,
      newEnrollment.notes,
      newEnrollment.status,
      newEnrollment.paymentStatus,
      newEnrollment.enrolledAt
    ]);

    await this.saveWorkbook(workbook);
    return newEnrollment;
  }

  public async updateEnrollment(id: string, updates: Partial<Enrollment>): Promise<Enrollment | null> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Enrollments');
    if (!sheet) return null;

    let updated: Enrollment | null = null;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) {
        if (updates.status) row.getCell(14).value = updates.status;
        if (updates.paymentStatus) row.getCell(15).value = updates.paymentStatus;
        if (updates.notes) row.getCell(13).value = updates.notes;

        updated = {
          id,
          courseId: values[2],
          courseTitle: values[3],
          courseCategory: values[4],
          userId: values[5],
          userName: values[6],
          userEmail: values[7],
          userPhone: values[8],
          educationOrJob: values[9],
          experienceLevel: values[10],
          mode: values[11],
          preferredBatch: values[12],
          notes: updates.notes ?? values[13],
          status: updates.status ?? values[14],
          paymentStatus: updates.paymentStatus ?? values[15],
          enrolledAt: values[16]
        };
      }
    });

    if (updated) {
      await this.saveWorkbook(workbook);
    }
    return updated;
  }

  public async deleteEnrollment(id: string): Promise<boolean> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Enrollments');
    if (!sheet) return false;

    let targetRow = -1;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) targetRow = rowNumber;
    });

    if (targetRow > 0) {
      sheet.spliceRows(targetRow, 1);
      await this.saveWorkbook(workbook);
      return true;
    }
    return false;
  }

  // --- CONTACTS OPERATIONS ---
  public async getAllContacts(): Promise<ContactSubmission[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Contacts');
    if (!sheet) return INITIAL_CONTACTS;

    const contacts: ContactSubmission[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1]) {
        contacts.push({
          id: String(values[1] || ''),
          name: String(values[2] || ''),
          email: String(values[3] || ''),
          phone: String(values[4] || ''),
          subject: String(values[5] || ''),
          serviceInterest: String(values[6] || ''),
          message: String(values[7] || ''),
          status: (values[8] || 'New') as any,
          submittedAt: String(values[9] || '')
        });
      }
    });
    return contacts;
  }

  public async createContact(contact: Partial<ContactSubmission>): Promise<ContactSubmission> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Contacts');
    if (!sheet) throw new Error('Contacts sheet missing');

    const newContact: ContactSubmission = {
      id: `cnt-${Date.now().toString(36)}`,
      name: contact.name || '',
      email: contact.email || '',
      phone: contact.phone || '',
      subject: contact.subject || 'General Inquiry',
      serviceInterest: contact.serviceInterest || 'Web Engineering',
      message: contact.message || '',
      status: 'New',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    sheet.addRow([
      newContact.id,
      newContact.name,
      newContact.email,
      newContact.phone,
      newContact.subject,
      newContact.serviceInterest,
      newContact.message,
      newContact.status,
      newContact.submittedAt
    ]);

    await this.saveWorkbook(workbook);
    return newContact;
  }

  public async updateContact(id: string, updates: Partial<ContactSubmission>): Promise<ContactSubmission | null> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Contacts');
    if (!sheet) return null;

    let updated: ContactSubmission | null = null;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) {
        if (updates.status) row.getCell(8).value = updates.status;

        updated = {
          id,
          name: values[2],
          email: values[3],
          phone: values[4],
          subject: values[5],
          serviceInterest: values[6],
          message: values[7],
          status: updates.status ?? values[8],
          submittedAt: values[9]
        };
      }
    });

    if (updated) {
      await this.saveWorkbook(workbook);
    }
    return updated;
  }

  public async deleteContact(id: string): Promise<boolean> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Contacts');
    if (!sheet) return false;

    let targetRow = -1;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) targetRow = rowNumber;
    });

    if (targetRow > 0) {
      sheet.spliceRows(targetRow, 1);
      await this.saveWorkbook(workbook);
      return true;
    }
    return false;
  }

  // --- APPOINTMENTS OPERATIONS ---
  public async getAllAppointments(): Promise<AppointmentBooking[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Appointments');
    if (!sheet) return INITIAL_APPOINTMENTS;

    const appointments: AppointmentBooking[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1]) {
        appointments.push({
          id: String(values[1] || ''),
          name: String(values[2] || ''),
          email: String(values[3] || ''),
          phone: String(values[4] || ''),
          serviceType: String(values[5] || ''),
          date: String(values[6] || ''),
          timeSlot: String(values[7] || ''),
          topic: String(values[8] || ''),
          meetingType: (values[9] || 'Google Meet') as any,
          status: (values[10] || 'Confirmed') as any,
          createdAt: String(values[11] || '')
        });
      }
    });
    return appointments;
  }

  public async createAppointment(appointment: Partial<AppointmentBooking>): Promise<AppointmentBooking> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Appointments');
    if (!sheet) throw new Error('Appointments sheet missing');

    const newAppt: AppointmentBooking = {
      id: `apt-${Date.now().toString(36)}`,
      name: appointment.name || '',
      email: appointment.email || '',
      phone: appointment.phone || '',
      serviceType: appointment.serviceType || 'General Consultation',
      date: appointment.date || new Date().toISOString().substring(0, 10),
      timeSlot: appointment.timeSlot || '10:00 AM - 11:00 AM IST',
      topic: appointment.topic || 'Consultation Discussion',
      meetingType: appointment.meetingType || 'Google Meet',
      status: 'Confirmed',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    sheet.addRow([
      newAppt.id,
      newAppt.name,
      newAppt.email,
      newAppt.phone,
      newAppt.serviceType,
      newAppt.date,
      newAppt.timeSlot,
      newAppt.topic,
      newAppt.meetingType,
      newAppt.status,
      newAppt.createdAt
    ]);

    await this.saveWorkbook(workbook);
    return newAppt;
  }

  public async updateAppointment(id: string, updates: Partial<AppointmentBooking>): Promise<AppointmentBooking | null> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Appointments');
    if (!sheet) return null;

    let updated: AppointmentBooking | null = null;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) {
        if (updates.status) row.getCell(10).value = updates.status;

        updated = {
          id,
          name: values[2],
          email: values[3],
          phone: values[4],
          serviceType: values[5],
          date: values[6],
          timeSlot: values[7],
          topic: values[8],
          meetingType: values[9],
          status: updates.status ?? values[10],
          createdAt: values[11]
        };
      }
    });

    if (updated) {
      await this.saveWorkbook(workbook);
    }
    return updated;
  }

  public async deleteAppointment(id: string): Promise<boolean> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Appointments');
    if (!sheet) return false;

    let targetRow = -1;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) targetRow = rowNumber;
    });

    if (targetRow > 0) {
      sheet.spliceRows(targetRow, 1);
      await this.saveWorkbook(workbook);
      return true;
    }
    return false;
  }

  // --- ORDERS OPERATIONS ---
  public async getAllOrders(): Promise<ShopOrder[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Orders');
    if (!sheet) return INITIAL_ORDERS;

    const orders: ShopOrder[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1]) {
        let items = [];
        try {
          items = values[7] ? JSON.parse(values[7]) : [];
        } catch {
          items = [];
        }

        orders.push({
          id: String(values[1] || ''),
          userId: String(values[2] || ''),
          customerName: String(values[3] || ''),
          customerEmail: String(values[4] || ''),
          customerPhone: String(values[5] || ''),
          companyName: String(values[6] || ''),
          items,
          subtotal: Number(values[8] || 0),
          tax: Number(values[9] || 0),
          total: Number(values[10] || 0),
          paymentMethod: (values[11] || 'Razorpay / Stripe') as any,
          paymentStatus: (values[12] || 'Paid') as any,
          orderStatus: (values[13] || 'Delivered') as any,
          createdAt: String(values[14] || '')
        });
      }
    });
    return orders;
  }

  public async createOrder(order: Partial<ShopOrder>): Promise<ShopOrder> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Orders');
    if (!sheet) throw new Error('Orders sheet missing');

    const newOrder: ShopOrder = {
      id: `ord-${Date.now().toString(36)}`,
      userId: order.userId || '',
      customerName: order.customerName || 'Customer',
      customerEmail: order.customerEmail || '',
      customerPhone: order.customerPhone || '',
      companyName: order.companyName || '',
      items: order.items || [],
      subtotal: order.subtotal || 0,
      tax: order.tax || 0,
      total: order.total || 0,
      paymentMethod: order.paymentMethod || 'Razorpay / Stripe',
      paymentStatus: 'Paid',
      orderStatus: 'Delivered',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    sheet.addRow([
      newOrder.id,
      newOrder.userId,
      newOrder.customerName,
      newOrder.customerEmail,
      newOrder.customerPhone,
      newOrder.companyName,
      JSON.stringify(newOrder.items),
      newOrder.subtotal,
      newOrder.tax,
      newOrder.total,
      newOrder.paymentMethod,
      newOrder.paymentStatus,
      newOrder.orderStatus,
      newOrder.createdAt
    ]);

    await this.saveWorkbook(workbook);
    return newOrder;
  }

  // --- TESTIMONIALS OPERATIONS ---
  public async getAllTestimonials(): Promise<Testimonial[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Testimonials');
    if (!sheet) return INITIAL_TESTIMONIALS;

    const testimonials: Testimonial[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1]) {
        testimonials.push({
          id: String(values[1] || ''),
          name: String(values[2] || ''),
          role: String(values[3] || ''),
          companyOrCollege: String(values[4] || ''),
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          rating: Number(values[5] || 5),
          serviceOrCourse: String(values[6] || ''),
          comment: String(values[7] || ''),
          isApproved: values[8] === true || String(values[8]).toLowerCase() === 'true',
          featured: values[9] === true || String(values[9]).toLowerCase() === 'true',
          date: String(values[10] || '')
        });
      }
    });
    return testimonials;
  }

  public async createTestimonial(t: Partial<Testimonial>): Promise<Testimonial> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Testimonials');
    if (!sheet) throw new Error('Testimonials sheet missing');

    const newTestimonial: Testimonial = {
      id: `tst-${Date.now().toString(36)}`,
      name: t.name || 'Anonymous Reviewer',
      role: t.role || 'Client / Student',
      companyOrCollege: t.companyOrCollege || 'Tech Enterprise',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: t.rating || 5,
      serviceOrCourse: t.serviceOrCourse || 'General Service',
      comment: t.comment || '',
      isApproved: true, // Default active for immediate display, admin can moderate
      featured: false,
      date: new Date().toISOString().substring(0, 10)
    };

    sheet.addRow([
      newTestimonial.id,
      newTestimonial.name,
      newTestimonial.role,
      newTestimonial.companyOrCollege,
      newTestimonial.rating,
      newTestimonial.serviceOrCourse,
      newTestimonial.comment,
      newTestimonial.isApproved,
      newTestimonial.featured,
      newTestimonial.date
    ]);

    await this.saveWorkbook(workbook);
    return newTestimonial;
  }

  public async updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Testimonials');
    if (!sheet) return null;

    let updated: Testimonial | null = null;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) {
        if (updates.isApproved !== undefined) row.getCell(8).value = updates.isApproved;
        if (updates.featured !== undefined) row.getCell(9).value = updates.featured;

        updated = {
          id,
          name: values[2],
          role: values[3],
          companyOrCollege: values[4],
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          rating: Number(values[5] || 5),
          serviceOrCourse: values[6],
          comment: values[7],
          isApproved: updates.isApproved ?? values[8],
          featured: updates.featured ?? values[9],
          date: values[10]
        };
      }
    });

    if (updated) {
      await this.saveWorkbook(workbook);
    }
    return updated;
  }

  public async deleteTestimonial(id: string): Promise<boolean> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Testimonials');
    if (!sheet) return false;

    let targetRow = -1;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) targetRow = rowNumber;
    });

    if (targetRow > 0) {
      sheet.spliceRows(targetRow, 1);
      await this.saveWorkbook(workbook);
      return true;
    }
    return false;
  }

  // --- NEWSLETTER OPERATIONS ---
  public async getAllSubscribers(): Promise<NewsletterSubscriber[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Newsletter');
    if (!sheet) return INITIAL_NEWSLETTER;

    const subscribers: NewsletterSubscriber[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1]) {
        subscribers.push({
          id: String(values[1] || ''),
          email: String(values[2] || ''),
          status: (values[3] || 'Active') as any,
          subscribedAt: String(values[4] || '')
        });
      }
    });
    return subscribers;
  }

  public async subscribeNewsletter(email: string): Promise<NewsletterSubscriber> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Newsletter');
    if (!sheet) throw new Error('Newsletter sheet missing');

    const cleanEmail = email.trim().toLowerCase();
    const all = await this.getAllSubscribers();
    const existing = all.find(s => s.email.toLowerCase() === cleanEmail);
    if (existing) {
      return existing;
    }

    const newSub: NewsletterSubscriber = {
      id: `nl-${Date.now().toString(36)}`,
      email: cleanEmail,
      status: 'Active',
      subscribedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    sheet.addRow([
      newSub.id,
      newSub.email,
      newSub.status,
      newSub.subscribedAt
    ]);

    await this.saveWorkbook(workbook);
    return newSub;
  }

  // --- BLOGS OPERATIONS ---
  public async getAllBlogs(): Promise<BlogPost[]> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Blogs');
    if (!sheet) return INITIAL_BLOGS;

    const blogs: BlogPost[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1]) {
        blogs.push({
          id: String(values[1] || ''),
          slug: String(values[2] || ''),
          title: String(values[3] || ''),
          excerpt: String(values[4] || ''),
          content: String(values[5] || ''),
          category: String(values[6] || 'Technology'),
          author: String(values[7] || 'EWD Team'),
          authorRole: String(values[8] || 'Editor'),
          readTime: String(values[9] || '5 min read'),
          publishedAt: String(values[10] || ''),
          coverImage: String(values[11] || ''),
          tags: values[12] ? String(values[12]).split(',').map(s => s.trim()).filter(Boolean) : [],
          likes: Number(values[13] || 0)
        });
      }
    });
    return blogs.length ? blogs : INITIAL_BLOGS;
  }

  public async createBlog(blog: Partial<BlogPost>): Promise<BlogPost> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Blogs');
    if (!sheet) throw new Error('Blogs sheet missing');

    const newBlog: BlogPost = {
      id: blog.id || `blog-${Date.now().toString(36)}`,
      slug: blog.slug || (blog.title ? blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `post-${Date.now()}`),
      title: blog.title || 'Untitled Article',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      category: blog.category || 'Tech Article',
      author: blog.author || 'Pavan Bathygari',
      authorRole: blog.authorRole || 'Author & Tech Lead',
      readTime: blog.readTime || '5 min read',
      publishedAt: blog.publishedAt || new Date().toISOString().replace('T', ' ').substring(0, 19),
      coverImage: blog.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
      tags: blog.tags || ['Technology', 'EWD'],
      likes: blog.likes || 0
    };

    sheet.addRow([
      newBlog.id,
      newBlog.slug,
      newBlog.title,
      newBlog.excerpt,
      newBlog.content,
      newBlog.category,
      newBlog.author,
      newBlog.authorRole,
      newBlog.readTime,
      newBlog.publishedAt,
      newBlog.coverImage,
      newBlog.tags.join(', '),
      newBlog.likes
    ]);

    await this.saveWorkbook(workbook);
    return newBlog;
  }

  public async updateBlog(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Blogs');
    if (!sheet) return null;

    let updated: BlogPost | null = null;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) {
        const currentTags = values[12] ? String(values[12]).split(',').map(s => s.trim()).filter(Boolean) : [];
        const nextTags = updates.tags ? updates.tags : currentTags;

        if (updates.slug) row.getCell(2).value = updates.slug;
        if (updates.title) row.getCell(3).value = updates.title;
        if (updates.excerpt) row.getCell(4).value = updates.excerpt;
        if (updates.content) row.getCell(5).value = updates.content;
        if (updates.category) row.getCell(6).value = updates.category;
        if (updates.author) row.getCell(7).value = updates.author;
        if (updates.authorRole) row.getCell(8).value = updates.authorRole;
        if (updates.readTime) row.getCell(9).value = updates.readTime;
        if (updates.coverImage !== undefined) row.getCell(11).value = updates.coverImage;
        if (updates.tags) row.getCell(12).value = nextTags.join(', ');
        if (updates.likes !== undefined) row.getCell(13).value = updates.likes;

        updated = {
          id,
          slug: updates.slug ?? values[2],
          title: updates.title ?? values[3],
          excerpt: updates.excerpt ?? values[4],
          content: updates.content ?? values[5],
          category: updates.category ?? values[6],
          author: updates.author ?? values[7],
          authorRole: updates.authorRole ?? values[8],
          readTime: updates.readTime ?? values[9],
          publishedAt: values[10],
          coverImage: updates.coverImage ?? values[11],
          tags: nextTags,
          likes: updates.likes ?? Number(values[13] || 0)
        };
      }
    });

    if (updated) {
      await this.saveWorkbook(workbook);
    }
    return updated;
  }

  public async deleteBlog(id: string): Promise<boolean> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet('Blogs');
    if (!sheet) return false;

    let targetRow = -1;
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values as any[];
      if (values[1] === id) targetRow = rowNumber;
    });

    if (targetRow > 0) {
      sheet.spliceRows(targetRow, 1);
      await this.saveWorkbook(workbook);
      return true;
    }
    return false;
  }

  // --- RAW SPREADSHEET MANAGER API (For Admin Dashboard Live Excel Grid) ---
  public async getRawSheetsOverview(): Promise<{ name: string; rowCount: number; headers: string[]; rows: any[] }[]> {
    const workbook = await this.getWorkbook();
    const result: { name: string; rowCount: number; headers: string[]; rows: any[] }[] = [];

    workbook.eachSheet(sheet => {
      const headers: string[] = [];
      const rows: any[] = [];

      sheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) {
          row.eachCell({ includeEmpty: true }, (cell) => {
            headers.push(String(cell.value || ''));
          });
        } else {
          const rowObj: Record<string, any> = { _rowNumber: rowNumber };
          row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            const header = headers[colNumber - 1] || `Col_${colNumber}`;
            rowObj[header] = cell.value;
          });
          rows.push(rowObj);
        }
      });

      result.push({
        name: sheet.name,
        rowCount: rows.length,
        headers,
        rows
      });
    });

    return result;
  }

  public async updateCellInSheet(sheetName: string, rowNumber: number, columnKey: string, newValue: any): Promise<boolean> {
    const workbook = await this.getWorkbook();
    const sheet = workbook.getWorksheet(sheetName);
    if (!sheet) return false;

    const row = sheet.getRow(rowNumber);
    if (!row) return false;

    // Find column index by matching header in row 1
    const headerRow = sheet.getRow(1);
    let targetCol = -1;
    headerRow.eachCell((cell, colIndex) => {
      if (String(cell.value).toLowerCase() === columnKey.toLowerCase()) {
        targetCol = colIndex;
      }
    });

    if (targetCol > 0) {
      row.getCell(targetCol).value = newValue;
      await this.saveWorkbook(workbook);
      return true;
    }

    return false;
  }

  public getFilePath(): string {
    return EXCEL_FILE_PATH;
  }
}
