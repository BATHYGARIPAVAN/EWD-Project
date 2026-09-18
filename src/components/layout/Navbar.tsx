import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  User as UserIcon, 
  ShieldCheck, 
  Sparkles, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  onEnrollClick?: () => void;
  onRequestQuoteClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Welcome', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Courses', path: '/courses' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Blog', path: '/blog' },
    { name: 'Testimonials', path: '/testimonials' }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      id="main-navbar"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-[#EAF3F3]' 
          : 'bg-[#F7FAFA]/90 backdrop-blur-sm py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo matching screenshot */}
        <div 
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#12232E] flex items-center justify-center shadow-md border border-[#0E7C7B]/30 group-hover:scale-105 transition-transform duration-200">
            <span className="font-heading font-extrabold text-xs tracking-wider text-white">
              EWD
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-heading font-bold text-xl text-[#1F3B4D] tracking-tight">
              Evolutionary
            </span>
            <span className="font-heading font-bold text-xl text-[#0E7C7B] ml-1.5">
              Web Dude
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleNavClick(link.path)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all relative ${
                  isActive 
                    ? 'text-[#0E7C7B] font-semibold bg-[#0E7C7B]/10' 
                    : 'text-[#1F3B4D]/80 hover:text-[#0E7C7B] hover:bg-white/60'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#0E7C7B] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* User / Admin Authentication State */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                id="nav-user-dropdown-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#0E7C7B]/30 bg-white hover:border-[#0E7C7B] transition-all text-sm font-medium text-[#1F3B4D] shadow-sm"
              >
                {isAdmin ? (
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#0E7C7B]/15 flex items-center justify-center text-[#0E7C7B]">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
                <span className="max-w-[100px] truncate font-semibold text-xs sm:text-sm">
                  {user?.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                    <p className="text-sm font-bold text-[#1F3B4D] truncate">{user?.name}</p>
                    <span className="inline-block mt-0.5 px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-[#0E7C7B]/10 text-[#0E7C7B]">
                      {user?.role} Account
                    </span>
                  </div>

                  {isAdmin ? (
                    <button
                      id="dropdown-admin-dashboard"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleNavClick('/admin/dashboard');
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-semibold text-[#1F3B4D] hover:bg-[#0E7C7B]/10 hover:text-[#0E7C7B] flex items-center gap-2.5"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#0E7C7B]" />
                      Admin Control Center
                    </button>
                  ) : (
                    <button
                      id="dropdown-user-dashboard"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleNavClick('/user/dashboard');
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-semibold text-[#1F3B4D] hover:bg-[#0E7C7B]/10 hover:text-[#0E7C7B] flex items-center gap-2.5"
                    >
                      <UserIcon className="w-4 h-4 text-[#0E7C7B]" />
                      User Portal
                    </button>
                  )}

                  <button
                    id="dropdown-logout"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                      navigate('/');
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 border-t border-gray-100 mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="nav-login-btn"
                onClick={() => handleNavClick('/user/login')}
                className="px-4 py-2 rounded-xl bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white transition-all text-xs sm:text-sm font-semibold shadow-xs"
              >
                Sign In
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#1F3B4D] hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Navigation</span>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavClick(link.path)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentPath === link.path
                  ? 'bg-[#0E7C7B]/10 text-[#0E7C7B] font-bold'
                  : 'text-[#1F3B4D] hover:bg-gray-50'
              }`}
            >
              {link.name}
            </button>
          ))}

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            {!isAuthenticated ? (
              <button
                onClick={() => handleNavClick('/user/login')}
                className="w-full py-2.5 text-center bg-[#0E7C7B] text-white rounded-xl font-semibold text-sm shadow-sm"
              >
                Sign In / Register
              </button>
            ) : (
              <button
                onClick={() => {
                  if (isAdmin) handleNavClick('/admin/dashboard');
                  else handleNavClick('/user/dashboard');
                }}
                className="w-full py-2.5 text-center bg-[#0E7C7B] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
              >
                {isAdmin ? <ShieldCheck className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
                Go to {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
