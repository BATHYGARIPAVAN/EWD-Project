import React, { useState, useEffect } from 'react';
import { 
  User as UserIcon, 
  BookOpen, 
  Calendar, 
  ShoppingBag, 
  FileSpreadsheet, 
  Edit3, 
  Save, 
  CheckCircle2, 
  Clock, 
  Award, 
  ExternalLink, 
  Lock, 
  Phone, 
  Building, 
  Mail, 
  Sparkles, 
  ArrowRight, 
  LogOut, 
  Menu, 
  X, 
  Compass, 
  Briefcase, 
  ChevronRight, 
  ShieldCheck, 
  Home,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Enrollment, AppointmentBooking, ShopOrder } from '../types';
import { CandidateSidebar, CandidateTab } from '../components/user/CandidateSidebar';

interface UserDashboardProps {
  navigate: (path: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ navigate }) => {
  const { user, updateProfile, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState<CandidateTab>('enrollments');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [appointments, setAppointments] = useState<AppointmentBooking[]>([]);
  const [orders, setOrders] = useState<ShopOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Profile Edit Form State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    organization: user?.organization || '',
    bio: user?.bio || '',
    password: ''
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSavedMsg, setProfileSavedMsg] = useState('');
  const [profileError, setProfileError] = useState('');

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadUserData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [enr, appt, ord] = await Promise.all([
        api.getEnrollments(user.email),
        api.getAppointments(),
        api.getOrders(user.email)
      ]);

      setEnrollments(enr || []);
      setAppointments((appt || []).filter(a => ((a.userEmail || a.email || '').toLowerCase() === user.email.toLowerCase())));
      setOrders(ord || []);
    } catch (err: any) {
      console.error(err);
      showNotification('error', err.message || 'Failed to refresh candidate records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/user/login');
      return;
    }

    setProfileForm({
      name: user.name || '',
      phone: user.phone || '',
      organization: user.organization || '',
      bio: user.bio || '',
      password: ''
    });

    loadUserData();
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileSavedMsg('');
    setProfileError('');

    try {
      const updates: any = {
        name: profileForm.name,
        phone: profileForm.phone,
        organization: profileForm.organization,
        bio: profileForm.bio
      };
      if (profileForm.password) {
        updates.password = profileForm.password;
      }

      await updateProfile(updates);
      setProfileSavedMsg('Profile successfully updated!');
      showNotification('success', 'Profile updated successfully!');
      setTimeout(() => setProfileSavedMsg(''), 4000);
    } catch (err: any) {
      setProfileError(err.message || 'Profile update failed');
      showNotification('error', err.message || 'Profile update failed');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  const counts = {
    enrollments: enrollments.length,
    appointments: appointments.length,
    orders: orders.length
  };

  return (
    <div id="user-dashboard-root" className="min-h-screen bg-[#F7FAFC] flex font-sans antialiased text-gray-800">
      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold transition-all transform animate-bounce ${
          notification.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{notification.message}</span>
          <button 
            onClick={() => setNotification(null)} 
            className="ml-2 hover:opacity-75 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* CANDIDATE DASHBOARD SIDE NAVBAR (MATCHING ADMIN DASHBOARD) */}
      {/* ========================================================= */}
      <CandidateSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
        counts={counts}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onRefresh={loadUserData}
        loading={loading}
        navigate={navigate}
      />

      {/* ========================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Sticky Header */}
        <header className="bg-white border-b border-gray-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden cursor-pointer"
              aria-label="Toggle navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="font-heading font-extrabold text-base sm:text-lg text-[#12232E] capitalize">
                {activeTab === 'enrollments' && 'My Courses'}
                {activeTab === 'appointments' && 'Consultations'}
                {activeTab === 'orders' && 'Orders'}
                {activeTab === 'profile' && 'Profile'}
              </h1>
              <p className="text-[11px] text-gray-500 hidden sm:block">
                Logged in as <span className="font-semibold text-gray-700">{user.name}</span> ({user.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={loadUserData}
              disabled={loading}
              className="p-2 rounded-xl text-gray-600 hover:text-[#0E7C7B] hover:bg-gray-100 transition-colors border border-gray-200/80 shadow-2xs cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#0E7C7B]' : ''}`} />
            </button>

            <button
              onClick={() => navigate('/courses')}
              className="px-3.5 py-2 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F2A93B]" />
              <span className="hidden sm:inline">Browse Catalog</span>
            </button>

            <button
              onClick={() => navigate('/book-a-consultation')}
              className="px-3.5 py-2 bg-white border border-[#0E7C7B]/30 text-[#0E7C7B] hover:bg-[#0E7C7B]/10 font-bold text-xs rounded-xl transition-colors hidden md:flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Slot</span>
            </button>
          </div>
        </header>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            <div 
              onClick={() => setActiveTab('enrollments')}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'enrollments'
                  ? 'bg-white border-[#0E7C7B] shadow-md ring-2 ring-[#0E7C7B]/10'
                  : 'bg-white border-[#EAF3F3] shadow-xs hover:border-[#0E7C7B]/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-1">
                <span>Courses</span>
                <BookOpen className="w-4 h-4 text-[#0E7C7B]" />
              </div>
              <span className="font-heading font-extrabold text-2xl text-[#1F3B4D]">
                {enrollments.length}
              </span>
              <span className="text-[10px] text-emerald-600 block mt-1">
                Active Programs
              </span>
            </div>

            <div 
              onClick={() => setActiveTab('appointments')}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'appointments'
                  ? 'bg-white border-[#0E7C7B] shadow-md ring-2 ring-[#0E7C7B]/10'
                  : 'bg-white border-[#EAF3F3] shadow-xs hover:border-[#0E7C7B]/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-1">
                <span>Meetings</span>
                <Calendar className="w-4 h-4 text-[#F2A93B]" />
              </div>
              <span className="font-heading font-extrabold text-2xl text-[#1F3B4D]">
                {appointments.length}
              </span>
              <span className="text-[10px] text-gray-500 block mt-1">
                Consultation Slots
              </span>
            </div>

            <div 
              onClick={() => setActiveTab('orders')}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-white border-[#0E7C7B] shadow-md ring-2 ring-[#0E7C7B]/10'
                  : 'bg-white border-[#EAF3F3] shadow-xs hover:border-[#0E7C7B]/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-1">
                <span>Orders</span>
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="font-heading font-extrabold text-2xl text-[#1F3B4D]">
                {orders.length}
              </span>
              <span className="text-[10px] text-emerald-600 block mt-1">
                Licenses & Software
              </span>
            </div>
          </div>

          {/* TAB 1: ENROLLED COURSES */}
          {activeTab === 'enrollments' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-[#1F3B4D]">
                  Enrolled Tech Programs ({enrollments.length})
                </h3>
                <button
                  onClick={() => navigate('/courses')}
                  className="text-xs font-bold text-[#0E7C7B] hover:underline flex items-center gap-1"
                >
                  Explore more courses <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {loading ? (
                <div className="py-12 text-center text-xs text-gray-400">
                  <div className="w-8 h-8 border-2 border-[#0E7C7B] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  Loading enrollment data...
                </div>
              ) : enrollments.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-[#EAF3F3] space-y-4 shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-[#0E7C7B]/10 text-[#0E7C7B] flex items-center justify-center mx-auto">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#1F3B4D]">
                    No Enrolled Courses Yet
                  </h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Join our practical technology training programs in Full-Stack Java, Python, React, or Spring Boot.
                  </p>
                  <button
                    onClick={() => navigate('/courses')}
                    className="px-6 py-2.5 bg-[#0E7C7B] text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Browse Tech Courses
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrollments.map((enr) => (
                    <div
                      key={enr.id}
                      className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAF3F3] shadow-md space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#0E7C7B]/10 text-[#0E7C7B]">
                            {enr.courseCategory || 'Technology Program'}
                          </span>
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                            ● {enr.status || 'Active'}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-lg sm:text-xl text-[#1F3B4D]">
                          {enr.courseTitle}
                        </h3>

                        <div className="p-3.5 bg-[#F7FAFA] rounded-xl text-xs space-y-1 text-gray-600 border border-[#EAF3F3]">
                          <p><strong>Batch:</strong> {enr.preferredBatch || 'Morning Batch'}</p>
                          <p><strong>Mode:</strong> {enr.mode || 'Hybrid (Hyderabad)'}</p>
                          <p><strong>Payment:</strong> <span className="text-emerald-700 font-bold">{enr.paymentStatus || 'Verified'}</span></p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[11px] text-gray-400 font-mono">
                          Enrolled: {enr.enrolledAt?.split('T')[0]}
                        </span>

                        <div className="flex items-center gap-1.5 text-xs text-[#0E7C7B] font-bold">
                          <Award className="w-4 h-4 text-[#F2A93B]" />
                          <span>Curriculum Active</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CONSULTATIONS */}
          {activeTab === 'appointments' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-[#1F3B4D]">
                  Strategy Consultations ({appointments.length})
                </h3>
                <button
                  onClick={() => navigate('/book-a-consultation')}
                  className="text-xs font-bold text-[#0E7C7B] hover:underline flex items-center gap-1"
                >
                  Book new consultation <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {appointments.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-[#EAF3F3] space-y-4 shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-[#0E7C7B]/10 text-[#0E7C7B] flex items-center justify-center mx-auto">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#1F3B4D]">
                    No Scheduled Consultations
                  </h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Book a 1-on-1 strategy meeting with the Evolutionary Web Dude team in Hyderabad.
                  </p>
                  <button
                    onClick={() => navigate('/book-a-consultation')}
                    className="px-6 py-2.5 bg-[#0E7C7B] text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Book Consultation Slot
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {appointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="bg-white rounded-3xl p-6 border border-[#EAF3F3] shadow-md space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F2A93B]/20 text-[#D98E20]">
                          {appt.meetingType}
                        </span>
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {appt.status}
                        </span>
                      </div>

                      <h4 className="font-heading font-bold text-base text-[#1F3B4D]">
                        {appt.serviceInterest}
                      </h4>

                      <div className="p-3 bg-[#F7FAFA] rounded-xl text-xs space-y-1 text-gray-600 border border-[#EAF3F3]">
                        <p><strong>Date:</strong> {appt.appointmentDate}</p>
                        <p><strong>Time Slot:</strong> {appt.timeSlot}</p>
                        {appt.agenda && <p><strong>Agenda:</strong> {appt.agenda}</p>}
                      </div>

                      <div className="pt-2 text-[11px] text-gray-400 font-mono">
                        Booking ID: {appt.id}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SOFTWARE ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-[#1F3B4D]">
                  Digital Store Orders ({orders.length})
                </h3>
                <button
                  onClick={() => navigate('/shop')}
                  className="text-xs font-bold text-[#0E7C7B] hover:underline flex items-center gap-1"
                >
                  Browse digital store <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-[#EAF3F3] space-y-4 shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-[#0E7C7B]/10 text-[#0E7C7B] flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#1F3B4D]">
                    No Digital Store Orders
                  </h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Explore our digital store to license enterprise software suites and SaaS boilerplates.
                  </p>
                  <button
                    onClick={() => navigate('/shop')}
                    className="px-6 py-2.5 bg-[#0E7C7B] text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Visit Digital Store
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white rounded-3xl p-6 border border-[#EAF3F3] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-base text-[#1F3B4D]">
                            Order #{ord.id}
                          </span>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            {ord.paymentStatus}
                          </span>
                        </div>

                        <div className="text-xs text-gray-600 space-y-0.5">
                          {ord.items.map((item, i) => (
                            <p key={i}>• {item.productTitle} × {item.quantity} (${item.price})</p>
                          ))}
                        </div>

                        <span className="text-[11px] text-gray-400 block font-mono">
                          Date: {ord.createdAt?.split('T')[0]} • Method: {ord.paymentMethod}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="font-heading font-extrabold text-xl text-[#0E7C7B] block">
                          ${ord.total.toFixed(2)} USD
                        </span>
                        <span className="text-xs text-emerald-600 font-semibold">
                          ✓ License Key Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl p-8 border border-[#EAF3F3] shadow-md max-w-2xl animate-in fade-in duration-200">
              <h3 className="font-heading font-bold text-xl text-[#1F3B4D] mb-1">
                Account Profile & Settings
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                Update your personal information and account credentials.
              </p>

              {profileSavedMsg && (
                <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-xl border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{profileSavedMsg}</span>
                </div>
              )}

              {profileError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-200">
                  {profileError}
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                      Phone / WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                      College / Organization
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={profileForm.organization}
                        onChange={e => setProfileForm({ ...profileForm, organization: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                    Change Password (Leave blank to keep current)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      value={profileForm.password}
                      onChange={e => setProfileForm({ ...profileForm, password: e.target.value })}
                      placeholder="New password..."
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F3B4D] mb-1">
                    Bio / Professional Headline
                  </label>
                  <textarea
                    rows={3}
                    value={profileForm.bio}
                    onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                    placeholder="e.g. Aspiring Full-Stack Developer passionate about modern digital systems..."
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="px-6 py-2.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    {savingProfile ? 'Saving...' : 'Save Profile Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
