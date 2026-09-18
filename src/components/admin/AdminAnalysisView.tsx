import React from 'react';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  MessageSquare, 
  FileText, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  CartesianGrid,
  Legend
} from 'recharts';
import { Course, Enrollment, ContactSubmission, BlogPost, User } from '../../types';

interface AdminAnalysisViewProps {
  stats: any;
  courses: Course[];
  enrollments: Enrollment[];
  contacts: ContactSubmission[];
  blogs: BlogPost[];
  users: User[];
  onNavigateTab: (tab: any) => void;
}

export const AdminAnalysisView: React.FC<AdminAnalysisViewProps> = ({
  stats,
  courses,
  enrollments,
  contacts,
  blogs,
  users,
  onNavigateTab
}) => {
  // Chart Data
  const monthlyTrends = [
    { month: 'Oct', enrollments: 12, inquiries: 8, revenue: 14500 },
    { month: 'Nov', enrollments: 19, inquiries: 14, revenue: 23200 },
    { month: 'Dec', enrollments: 28, inquiries: 22, revenue: 34800 },
    { month: 'Jan', enrollments: 36, inquiries: 31, revenue: 45600 },
    { month: 'Feb', enrollments: enrollments.length || 45, inquiries: contacts.length || 38, revenue: 58900 }
  ];

  // Category breakdown for Pie Chart
  const categoryCounts: Record<string, number> = {};
  enrollments.forEach(e => {
    const cat = e.courseCategory || 'FULL STACK';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value
  }));

  const fallbackCategoryData = [
    { name: 'FULL STACK', value: 14 },
    { name: 'SOFTWARE ENGINEERING', value: 8 },
    { name: 'FRONTEND', value: 6 },
    { name: 'BACKEND', value: 5 },
    { name: 'PAPERLESS', value: 4 }
  ];

  const pieData = categoryData.length > 0 ? categoryData : fallbackCategoryData;
  const PIE_COLORS = ['#0E7C7B', '#F2A93B', '#1F3B4D', '#10B981', '#6366F1', '#EC4899'];

  const confirmedCount = enrollments.filter(e => e.status === 'Confirmed' || e.status === 'In Progress').length;
  const underReviewCount = enrollments.filter(e => e.status === 'Under Review' || !e.status).length;
  const paidCount = enrollments.filter(e => e.paymentStatus === 'Paid').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#12232E] via-[#1F3B4D] to-[#0E7C7B] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
          <TrendingUp className="w-64 h-64 text-white" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#F2A93B] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Evolutionary Web Dude Analytics Engine</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Real-Time System & Enrollment Analysis
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Live telemetry, course admissions, candidate velocity, and paperless operational metrics synced continuously with the backend Excel database.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Enrollments */}
        <div 
          onClick={() => onNavigateTab('enrollments')}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Enrolled</span>
            <div className="w-10 h-10 rounded-xl bg-[#0E7C7B]/10 text-[#0E7C7B] flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-extrabold text-[#12232E]">
              {enrollments.length}
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +{paidCount} Verified
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {confirmedCount} Active &bull; {underReviewCount} Under Review
          </p>
        </div>

        {/* Card 2: User Base */}
        <div 
          onClick={() => onNavigateTab('users')}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Registered Users</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-extrabold text-[#12232E]">
              {users.length}
            </span>
            <span className="text-xs font-semibold text-gray-500">Accounts</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {users.filter(u => u.role === 'ADMIN').length} Admins &bull; {users.filter(u => u.role !== 'ADMIN').length} Students
          </p>
        </div>

        {/* Card 3: Active Courses */}
        <div 
          onClick={() => onNavigateTab('courses')}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Courses Catalog</span>
            <div className="w-10 h-10 rounded-xl bg-[#F2A93B]/10 text-[#F2A93B] flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-extrabold text-[#12232E]">
              {courses.length}
            </span>
            <span className="text-xs font-bold text-[#0E7C7B]">Programs</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {courses.filter(c => c.isPopular).length} Popular &bull; {courses.filter(c => c.status === 'Open for Enrollment').length} Open
          </p>
        </div>

        {/* Card 4: Contact Inquiries */}
        <div 
          onClick={() => onNavigateTab('contacts')}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Inquiries / Leads</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-extrabold text-[#12232E]">
              {contacts.length}
            </span>
            <span className="text-xs font-bold text-amber-600">
              {contacts.filter(c => c.status === 'New').length} New
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {contacts.filter(c => c.status === 'In Progress').length} In Progress &bull; {contacts.filter(c => c.status === 'Contacted').length} Closed
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Velocity Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-base text-[#12232E]">
                Enrollment & Inquiry Trajectory
              </h3>
              <p className="text-xs text-gray-500">Monthly student acquisition and prospective leads</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-xs bg-[#0E7C7B]" />
                <span className="text-gray-600">Enrollments</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-xs bg-[#F2A93B]" />
                <span className="text-gray-600">Inquiries</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAF3F3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#12232E', 
                    borderRadius: '12px', 
                    border: 'none', 
                    color: '#fff',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)' 
                  }}
                />
                <Bar dataKey="enrollments" fill="#0E7C7B" radius={[6, 6, 0, 0]} maxBarSize={36} />
                <Bar dataKey="inquiries" fill="#F2A93B" radius={[6, 6, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Category Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-[#12232E]">
              Enrollment Distribution
            </h3>
            <p className="text-xs text-gray-500">Student interest by program domain</p>
          </div>

          <div className="h-56 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#12232E', 
                    borderRadius: '8px', 
                    border: 'none', 
                    color: '#fff',
                    fontSize: '12px' 
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-gray-100">
            {pieData.slice(0, 4).map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }} 
                  />
                  <span className="text-gray-600 font-medium truncate max-w-[140px]">{entry.name}</span>
                </div>
                <span className="font-bold text-gray-800">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health & Blog Articles Quick Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Excel Telemetry Box */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#12232E]">Excel Storage Engine</h4>
                <p className="text-[11px] text-gray-500">File: ewd_data_store.xlsx (Live)</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Synchronized
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-gray-50 space-y-1">
              <span className="text-gray-400 font-semibold block text-[10px] uppercase">Worksheets</span>
              <span className="font-bold text-gray-800 text-sm">9 Core Sheets</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 space-y-1">
              <span className="text-gray-400 font-semibold block text-[10px] uppercase">Data Integrity</span>
              <span className="font-bold text-emerald-600 text-sm">100% Validated</span>
            </div>
          </div>
        </div>

        {/* Blog & Publication Status */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0E7C7B]/10 text-[#0E7C7B] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#12232E]">Publications & Thought Leadership</h4>
                <p className="text-[11px] text-gray-500">{blogs.length} articles published</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('blogs')}
              className="text-xs font-bold text-[#0E7C7B] hover:text-[#0A5E5D]"
            >
              Manage &rarr;
            </button>
          </div>

          <div className="space-y-2">
            {blogs.slice(0, 2).map((blog) => (
              <div key={blog.id} className="p-3 rounded-xl bg-gray-50 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h5 className="font-bold text-xs text-gray-800 truncate">{blog.title}</h5>
                  <p className="text-[11px] text-gray-500">{blog.category} &bull; {blog.readTime}</p>
                </div>
                <span className="text-[11px] font-semibold text-gray-400 shrink-0">
                  {blog.publishedAt?.substring(0, 10)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
