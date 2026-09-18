import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  ShoppingBag, 
  UserCheck, 
  LogOut, 
  ExternalLink,
  RefreshCw,
  Compass,
  GraduationCap,
  Sparkles,
  X
} from 'lucide-react';
import { User } from '../../types';

export type CandidateTab = 'enrollments' | 'appointments' | 'orders' | 'profile';

interface CandidateSidebarProps {
  activeTab: CandidateTab;
  setActiveTab: (tab: CandidateTab) => void;
  user: User | null;
  onLogout: () => void;
  counts: {
    enrollments: number;
    appointments: number;
    orders: number;
  };
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onRefresh?: () => void;
  loading?: boolean;
  navigate: (path: string) => void;
}

export const CandidateSidebar: React.FC<CandidateSidebarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onLogout,
  counts,
  sidebarOpen,
  setSidebarOpen,
  onRefresh,
  loading = false,
  navigate
}) => {
  const navItems = [
    { id: 'enrollments' as CandidateTab, label: 'Courses', icon: BookOpen, badge: counts.enrollments },
    { id: 'appointments' as CandidateTab, label: 'Consultations', icon: Calendar, badge: counts.appointments },
    { id: 'orders' as CandidateTab, label: 'Orders', icon: ShoppingBag, badge: counts.orders },
    { id: 'profile' as CandidateTab, label: 'Profile', icon: UserCheck, badge: null }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-64 sm:w-72 bg-[#12232E] text-white z-50
        flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Header / Candidate Branding */}
        <div className="p-4 sm:p-5 border-b border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0E7C7B] to-[#17B890] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <GraduationCap className="w-4 h-4 text-[#F2A93B]" />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="font-heading font-extrabold text-sm text-white tracking-tight">Candidate</span>
                  <span className="font-heading font-extrabold text-sm text-[#F2A93B] ml-1">Portal</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Evolutionary Web Dude</p>
              </div>
            </div>

            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-gray-300">Candidate Portal</span>
            </div>
            <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/50">
              ACTIVE
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="p-3.5 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 px-3 block mb-2">
              Navigation
            </span>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0E7C7B] text-white shadow-md font-bold'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#F2A93B]'}`} />
                      <span className="text-xs">{item.label}</span>
                    </div>

                    {item.badge !== null && item.badge !== undefined && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-white/25 text-white' : 'bg-white/10 text-gray-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Operations / Actions */}
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 px-3 block mb-2">
              Quick Actions
            </span>
            <div className="space-y-1.5">
              <button
                onClick={() => {
                  navigate('/courses');
                  setSidebarOpen(false);
                }}
                className="w-full py-2 px-3 bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Browse Courses</span>
              </button>

              <button
                onClick={() => {
                  navigate('/book-a-consultation');
                  setSidebarOpen(false);
                }}
                className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F2A93B]" />
                <span>Book Mentorship</span>
              </button>

              {onRefresh && (
                <button
                  onClick={onRefresh}
                  className="w-full py-2 px-3 bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#0E7C7B]' : ''}`} />
                  <span>Refresh Data</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Footer: Profile & Logout */}
        <div className="p-3.5 border-t border-white/10 space-y-2 bg-[#0A141A]/60">
          <div 
            onClick={() => {
              setActiveTab('profile');
              setSidebarOpen(false);
            }}
            className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-[#0E7C7B] flex items-center justify-center text-white font-heading font-extrabold text-xs border border-white/20">
              {user?.name?.charAt(0).toUpperCase() || 'C'}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-heading font-bold text-xs text-white truncate">
                {user?.name || 'Candidate Member'}
              </h4>
              <p className="text-[10px] text-gray-400 truncate">
                {user?.email || 'candidate@student.com'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <button
              onClick={() => navigate('/')}
              className="flex-1 py-2 px-2 text-[11px] font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
              title="Return to Public Site"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>

            <button
              onClick={onLogout}
              className="flex-1 py-2 px-2 text-[11px] font-bold text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Logout from Candidate Dashboard"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
