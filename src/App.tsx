import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { BlogPage } from './pages/BlogPage';
import { CoursesPage } from './pages/CoursesPage';
import { UserAuthPage } from './pages/UserAuthPage';
import { AdminAuthPage } from './pages/AdminAuthPage';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { EnrollPage } from './pages/EnrollPage';
import { CourseDetailPage } from './pages/CourseDetailPage';

// Modals
import { EnrollModal } from './components/common/EnrollModal';
import { CourseCurriculumModal } from './components/common/CourseCurriculumModal';
import { QuoteModal } from './components/common/QuoteModal';

import { Course } from './types';
import { api } from './services/api';

const AppContent: React.FC = () => {
  const { user, isAdmin } = useAuth();

  // Navigation State
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname !== '/' ? window.location.pathname : window.location.hash.replace('#', '') || '/';
  });

  // Modal States
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | undefined>();
  const [selectedCourseForSyllabus, setSelectedCourseForSyllabus] = useState<Course | undefined>();
  const [curriculumModalCourse, setCurriculumModalCourse] = useState<Course | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [excelStatus, setExcelStatus] = useState<{ status: string; sheetsCount: number } | null>(null);

  // Synchronize browser history and hash
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname !== '/' ? window.location.pathname : window.location.hash.replace('#', '') || '/';
      setCurrentPath(path);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    // Initial excel status check
    api.getExcelSheets()
      .then(res => setExcelStatus({ status: 'Online', sheetsCount: res.sheets?.length || 8 }))
      .catch(console.error);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPath(path);
    window.history.pushState({}, '', path);
  };

  // Helper to get route slug for a course
  const getCourseSlug = (course: Course): string => {
    if (course.id.includes('java')) return 'java-full-stack';
    if (course.id.includes('web')) return 'web-dev';
    if (course.id.includes('python')) return 'python-dev';
    if (course.id.includes('marketing')) return 'digital-marketing';
    if (course.id.includes('software')) return 'software-dev';
    if (course.id.includes('project')) return 'practical-projects';
    return course.id.replace('crs-', '');
  };

  // Handlers for Navigation & Modals
  const handleEnrollCourse = (course?: Course) => {
    setSelectedCourseForEnroll(course);
    if (course) {
      const slug = getCourseSlug(course);
      navigate(`/enroll/${slug}`);
    } else {
      navigate('/enroll/java-full-stack');
    }
  };

  const handleViewCurriculum = (course: Course) => {
    setSelectedCourseForSyllabus(course);
    const slug = getCourseSlug(course);
    navigate(`/courses/${slug}`);
  };

  const handleRequestQuote = () => {
    setQuoteModalOpen(true);
  };

  // Routing View Dispatcher
  const renderCurrentView = () => {
    const cleanPath = currentPath.toLowerCase();

    // Specific Course Syllabus Detail View e.g. /courses/java-full-stack or /course/java-full-stack
    if (
      (cleanPath.startsWith('/courses/') && cleanPath !== '/courses') ||
      (cleanPath.startsWith('/course/') && cleanPath !== '/course')
    ) {
      return (
        <CourseDetailPage
          courseSlug={currentPath}
          selectedCourse={selectedCourseForSyllabus}
          navigate={navigate}
          onEnrollCourse={handleEnrollCourse}
        />
      );
    }

    if (cleanPath.startsWith('/enroll')) {
      return (
        <EnrollPage
          courseSlug={currentPath}
          selectedCourse={selectedCourseForEnroll}
          navigate={navigate}
          onViewCurriculum={handleViewCurriculum}
        />
      );
    }

    if (cleanPath === '/about') {
      return <AboutPage navigate={navigate} onRequestQuote={handleRequestQuote} />;
    }

    if (cleanPath === '/courses' || cleanPath === '/training' || cleanPath === '/curriculum') {
      return (
        <CoursesPage
          navigate={navigate}
          onEnrollCourse={handleEnrollCourse}
          onViewCurriculum={handleViewCurriculum}
        />
      );
    }

    if (cleanPath === '/services' || cleanPath === '/programs') {
      return (
        <ServicesPage
          onEnrollCourse={handleEnrollCourse}
          onViewCurriculum={handleViewCurriculum}
          onRequestQuote={handleRequestQuote}
          navigate={navigate}
        />
      );
    }

    if (cleanPath === '/contact' || cleanPath === '/contact-us') {
      return <ContactPage />;
    }

    if (cleanPath === '/testimonials' || cleanPath === '/reviews') {
      return <TestimonialsPage />;
    }

    if (cleanPath === '/blog' || cleanPath === '/insights' || cleanPath === '/articles') {
      return <BlogPage navigate={navigate} />;
    }

    if (cleanPath === '/user/login' || cleanPath === '/login') {
      return <UserAuthPage initialMode="login" navigate={navigate} />;
    }

    if (cleanPath === '/user/register' || cleanPath === '/register' || cleanPath === '/signup') {
      return <UserAuthPage initialMode="register" navigate={navigate} />;
    }

    if (cleanPath === '/admin/login' || cleanPath === '/admin') {
      if (isAdmin) {
        return <AdminDashboard navigate={navigate} />;
      }
      return <AdminAuthPage navigate={navigate} />;
    }

    if (cleanPath === '/user/dashboard') {
      if (!user) {
        return <UserAuthPage initialMode="login" navigate={navigate} />;
      }
      return <UserDashboard navigate={navigate} />;
    }

    if (cleanPath === '/admin/dashboard') {
      if (!isAdmin) {
        return <AdminAuthPage navigate={navigate} />;
      }
      return <AdminDashboard navigate={navigate} />;
    }

    // Default: Home Page
    return (
      <HomePage
        onEnrollCourse={handleEnrollCourse}
        onViewCurriculum={handleViewCurriculum}
        onRequestQuote={handleRequestQuote}
        navigate={navigate}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFA] text-[#12232E] selection:bg-[#0E7C7B]/20 selection:text-[#0E7C7B]">
      
      {/* Navigation Header */}
      <Navbar
        currentPath={currentPath}
        navigate={navigate}
        onEnrollClick={() => handleEnrollCourse()}
        onRequestQuoteClick={handleRequestQuote}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <Footer
        navigate={navigate}
        onRequestQuote={handleRequestQuote}
      />

      {/* MODALS & DRAWERS */}
      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        selectedCourse={selectedCourseForEnroll}
        course={selectedCourseForEnroll}
        navigate={navigate}
      />

      <CourseCurriculumModal
        isOpen={!!curriculumModalCourse}
        onClose={() => setCurriculumModalCourse(null)}
        course={curriculumModalCourse}
        onEnroll={handleEnrollCourse}
        onEnrollClick={handleEnrollCourse}
      />

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
