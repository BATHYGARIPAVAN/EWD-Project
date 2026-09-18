import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  X,
  ExternalLink,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Course, Enrollment, ContactSubmission, BlogPost, User } from '../types';

import { AdminSidebar, AdminTab } from '../components/admin/AdminSidebar';
import { AdminAnalysisView } from '../components/admin/AdminAnalysisView';
import { AdminUsersView } from '../components/admin/AdminUsersView';
import { AdminEnrollmentsView } from '../components/admin/AdminEnrollmentsView';
import { AdminCoursesView } from '../components/admin/AdminCoursesView';
import { AdminContactsView } from '../components/admin/AdminContactsView';
import { AdminBlogsView } from '../components/admin/AdminBlogsView';
import { AdminProfileView } from '../components/admin/AdminProfileView';

interface AdminDashboardProps {
  navigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ navigate }) => {
  const { user, isAdmin, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState<AdminTab>('analysis');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Entities Data
  const [stats, setStats] = useState<any>(null);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        statsData,
        usersData,
        enrollmentsData,
        coursesData,
        contactsData,
        blogsData
      ] = await Promise.all([
        api.getAdminStats(),
        api.getAllUsers(),
        api.getEnrollments(),
        api.getCourses(),
        api.getContacts(),
        api.getBlogs()
      ]);

      setStats(statsData);
      setUsersList(usersData || []);
      setEnrollments(enrollmentsData || []);
      setCourses(coursesData || []);
      setContacts(contactsData || []);
      setBlogs(blogsData || []);
    } catch (err: any) {
      console.error('Failed to load admin data:', err);
      showNotification('error', err.message || 'Failed to sync Excel data store');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }
    loadAllData();
  }, [isAdmin]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const counts = {
    users: usersList.length,
    enrollments: enrollments.length,
    courses: courses.length,
    contacts: contacts.length,
    blogs: blogs.length
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex font-sans antialiased text-gray-800">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold transition-all transform animate-bounce ${
          notification.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{notification.message}</span>
          <button 
            onClick={() => setNotification(null)} 
            className="ml-2 hover:opacity-75"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Admin Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
        counts={counts}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onRefresh={loadAllData}
        loading={loading}
        navigate={navigate}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="font-heading font-extrabold text-base sm:text-lg text-[#12232E] capitalize">
                {activeTab === 'analysis' && 'System Analytics & Insights'}
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'enrollments' && 'Course Enrollments & Candidate Dossiers'}
                {activeTab === 'courses' && 'Add & Manage Courses'}
                {activeTab === 'contacts' && 'Contact Us Inquiries & Leads'}
                {activeTab === 'blogs' && 'Blog Articles & Editorial Engine'}
                {activeTab === 'profile' && 'Administrator Profile & Security'}
              </h1>
              <p className="text-[11px] text-gray-500 hidden sm:block">
                Connected to local Excel data storage &bull; ewd_data_store.xlsx
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={loadAllData}
              disabled={loading}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Refresh and sync data from Excel"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>

            <a
              href={api.getExcelDownloadUrl()}
              download
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
              title="Download full workbook"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export XLSX</span>
            </a>
          </div>
        </header>

        {/* Dynamic View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto custom-scrollbar">
          {loading && !stats ? (
            <div className="h-96 flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-4 border-[#0E7C7B] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Syncing Excel Database...
              </p>
            </div>
          ) : (
            <>
              {activeTab === 'analysis' && (
                <AdminAnalysisView
                  stats={stats}
                  courses={courses}
                  enrollments={enrollments}
                  contacts={contacts}
                  blogs={blogs}
                  users={usersList}
                  onNavigateTab={setActiveTab}
                />
              )}

              {activeTab === 'users' && (
                <AdminUsersView
                  users={usersList}
                  enrollments={enrollments}
                  onRefresh={loadAllData}
                  showNotification={showNotification}
                />
              )}

              {activeTab === 'enrollments' && (
                <AdminEnrollmentsView
                  enrollments={enrollments}
                  courses={courses}
                  users={usersList}
                  onRefresh={loadAllData}
                  showNotification={showNotification}
                />
              )}

              {activeTab === 'courses' && (
                <AdminCoursesView
                  courses={courses}
                  onRefresh={loadAllData}
                  showNotification={showNotification}
                />
              )}

              {activeTab === 'contacts' && (
                <AdminContactsView
                  contacts={contacts}
                  onRefresh={loadAllData}
                  showNotification={showNotification}
                />
              )}

              {activeTab === 'blogs' && (
                <AdminBlogsView
                  blogs={blogs}
                  onRefresh={loadAllData}
                  showNotification={showNotification}
                />
              )}

              {activeTab === 'profile' && (
                <AdminProfileView
                  user={user}
                  onRefresh={loadAllData}
                  onLogout={handleLogout}
                  showNotification={showNotification}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};
