import React from 'react';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  PlusCircle, 
  MessageSquare, 
  FileText, 
  UserCheck, 
  LogOut, 
  ShieldCheck, 
  ExternalLink,
  RefreshCw,
  Download,
  X
} from 'lucide-react';
import { User } from '../../types';
import { api } from '../../services/api';

export type AdminTab = 
  | 'analysis' 
  | 'users' 
  | 'enrollments' 
  | 'courses' 
  | 'contacts' 
  | 'blogs' 
  | 'profile';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  user: User | null;
  onLogout: () => void;
  counts: {
    users: number;
    enrollments: number;
    courses: number;
    contacts: number;
    blogs: number;
  };
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onRefresh: () => void;
  loading: boolean;
  navigate: (path: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onLogout,
  counts,
  sidebarOpen,
  setSidebarOpen,
  onRefresh,
  loading,
  navigate
}) => {
  const navItems = [
    { id: 'analysis' as AdminTab, label: 'Analysis', icon: TrendingUp, badge: null },
    { id: 'users' as AdminTab, label: 'User Management', icon: Users, badge: counts.users },
    { id: 'enrollments' as AdminTab, label: 'Enroll Courses', icon: BookOpen, badge: counts.enrollments },
    { id: 'courses' as AdminTab, label: 'Add Course', icon: PlusCircle, badge: counts.courses },
    { id: 'contacts' as AdminTab, label: 'Contact Us', icon: MessageSquare, badge: counts.contacts },
    { id: 'blogs' as AdminTab, label: 'Blog', icon: FileText, badge: counts.blogs },
    { id: 'profile' as AdminTab, label: 'Profile', icon: UserCheck, badge: null }
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
        {/* Top Header / Branding */}
        <div className="p-4 sm:p-5 border-b border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0E7C7B] to-[#17B890] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-4 h-4 text-[#F2A93B]" />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="font-heading font-extrabold text-sm text-white tracking-tight">Admin</span>
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
              <span className="text-[11px] font-semibold text-gray-300">Live Excel Store</span>
            </div>
            <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/50">
              ONLINE
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="p-3.5 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 px-3 block mb-2">
              Dashboard Navigation
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
                    className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-left transition-all ${
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

          {/* Quick Database Actions */}
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 px-3 block mb-2">
              Quick Operations
            </span>
            <div className="space-y-1.5">
              <a
                href={api.getExcelDownloadUrl()}
                download
                className="w-full py-2 px-3 bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export .XLSX Database</span>
              </a>

              <button
                onClick={onRefresh}
                className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Sync Excel Storage</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Footer: Profile & Logout */}
        <div className="p-3.5 border-t border-white/10 space-y-2 bg-[#0A141A]/60">
          <div 
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-[#0E7C7B] flex items-center justify-center text-white font-heading font-extrabold text-xs border border-white/20">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-heading font-bold text-xs text-white truncate">
                {user?.name || 'Administrator'}
              </h4>
              <p className="text-[10px] text-gray-400 truncate">
                {user?.email || 'admin@evolutionarywebdude.com'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <button
              onClick={() => navigate('/')}
              className="flex-1 py-2 px-2 text-[11px] font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-lg flex items-center justify-center gap-1 transition-colors"
              title="Return to Public Site"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>

            <button
              onClick={onLogout}
              className="flex-1 py-2 px-2 text-[11px] font-bold text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              title="Logout from Admin Dashboard"
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
