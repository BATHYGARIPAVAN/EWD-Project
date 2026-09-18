export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  organization?: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
}

export type CourseCategory = 
  | 'FULL STACK' 
  | 'FRONTEND' 
  | 'BACKEND' 
  | 'MARKETING' 
  | 'SOFTWARE ENGINEERING' 
  | 'PROJECTS';

export interface Course {
  id: string;
  title: string;
  category: CourseCategory | string;
  description: string;
  icon: string;
  modules: string[];
  level: string;
  duration: string;
  fee: string;
  originalFee?: string;
  discountPercent?: number;
  emiStartsAt?: string;
  status: 'Open for Enrollment' | 'Upcoming' | 'Filling Fast' | 'Closed' | string;
  isPopular?: boolean;
  syllabus: { week: string; topic: string; details: string }[];
  learningOutcomes: string[];
  startDate?: string;
  timings?: string;
  posterImage?: string;
  language?: string;
  buttonText?: 'Enroll Now' | 'Click to Know More' | string;
  slug?: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  courseTitle: string;
  courseCategory: string;
  userId?: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  collegeName?: string;
  qualification?: string;
  yearOfPassout?: string;
  educationOrJob?: string;
  experienceLevel?: string;
  mode?: 'Online Live' | 'Hybrid' | 'Self-Paced' | 'Online' | 'Offline' | string;
  preferredMode?: 'Online' | 'Offline';
  preferredBatch?: 'Morning' | 'Evening' | 'Weekend';
  notes?: string;
  status: 'Under Review' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled' | string;
  paymentStatus: 'Pending' | 'Verified' | 'Paid' | string;
  enrolledAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  serviceInterest: string;
  message: string;
  status: 'New' | 'In Progress' | 'Contacted' | 'Closed';
  submittedAt: string;
}

export interface AppointmentBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType?: string;
  date?: string;
  timeSlot: string;
  topic?: string;
  meetingType: 'Google Meet' | 'Zoom' | 'Phone Call' | 'In-Person (Hyderabad)';
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  organization?: string;
  serviceInterest?: string;
  appointmentDate?: string;
  agenda?: string;
}

export interface ShopProduct {
  id: string;
  title: string;
  category: 'Starter Kit' | 'Enterprise Solution' | 'SaaS Template' | 'Course Bundle' | 'Security Suite';
  description: string;
  price: number;
  originalPrice: number;
  features: string[];
  badge?: string;
  rating: number;
  reviewsCount: number;
  techStack: string[];
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  price: number;
  quantity: number;
}

export interface ShopOrder {
  id: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'Credit Card' | 'UPI / NetBanking' | 'Razorpay / Stripe' | 'Wire Transfer';
  paymentStatus: 'Paid' | 'Processing' | 'Pending';
  orderStatus: 'Delivered' | 'In Progress' | 'Pending Setup';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  companyOrCollege: string;
  avatar: string;
  rating: number;
  serviceOrCourse?: string;
  comment: string;
  isApproved?: boolean;
  featured?: boolean;
  date?: string;
  createdAt?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'Active' | 'Unsubscribed';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  readTime: string;
  publishedAt: string;
  coverImage?: string;
  tags: string[];
  likes: number;
}

export interface ExcelSheetOverview {
  name: string;
  rowCount: number;
  columns: string[];
  data: Record<string, any>[];
}

export interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  startingPrice: string;
  timeline: string;
  techStack: string[];
}
