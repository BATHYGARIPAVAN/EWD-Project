import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  Sparkles, 
  Calendar, 
  Clock, 
  Layers, 
  GraduationCap, 
  SlidersHorizontal,
  Flame,
  CheckCircle2,
  BookOpen,
  Zap,
  LayoutGrid,
  List,
  ArrowUpDown,
  Users,
  Award,
  Briefcase,
  Laptop
} from 'lucide-react';
import { Course } from '../../types';
import { FRONTLINES_COURSES } from '../../data/frontlinesCoursesData';
import { CourseCard } from './CourseCard';
import { CourseQuickModal } from './CourseQuickModal';
import { CourseCurriculumModal } from '../common/CourseCurriculumModal';
import { EnrollModal } from '../common/EnrollModal';

interface FrontlinesCoursesSectionProps {
  onEnrollCourse?: (course: Course) => void;
  onViewCurriculum?: (course: Course) => void;
  navigate?: (path: string) => void;
  showAllInitially?: boolean;
}

export const FrontlinesCoursesSection: React.FC<FrontlinesCoursesSectionProps> = ({
  onEnrollCourse,
  onViewCurriculum,
  navigate,
  showAllInitially = true
}) => {
  const [courses] = useState<Course[]>(FRONTLINES_COURSES);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'LIVE' | 'SELF_PACED' | 'UPCOMING'>('ALL');
  const [domainFilter, setDomainFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'date' | 'title' | 'duration'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Modal states
  const [quickPreviewCourse, setQuickPreviewCourse] = useState<Course | null>(null);
  const [curriculumCourse, setCurriculumCourse] = useState<Course | null>(null);
  const [enrollCourse, setEnrollCourse] = useState<Course | null>(null);

  // Available domain categories
  const domainCategories = [
    { id: 'All', label: 'All Domains' },
    { id: 'JAVA & SPRING', label: 'Java & Spring' },
    { id: 'CLOUD & TOOLS', label: 'Cloud & DevOps' },
    { id: 'DATA & AI', label: 'Data & AI' },
    { id: 'TESTING', label: 'Testing & QA' },
    { id: 'FULL STACK', label: 'Full Stack' },
    { id: 'DESIGN & MEDIA', label: 'Design & Media' },
    { id: 'ERP & TOOLS', label: 'Enterprise ERP' },
    { id: 'CAREER & CORE', label: 'Career & Core' }
  ];

  // Calculate status counts
  const liveCount = useMemo(() => {
    return courses.filter(c => 
      c.status === 'Open for Enrollment' || 
      (c.status !== 'Self-Paced' && Boolean(c.buttonText && c.buttonText.toLowerCase().includes('enroll')))
    ).length;
  }, [courses]);

  const selfPacedCount = useMemo(() => {
    return courses.filter(c => c.status === 'Self-Paced').length;
  }, [courses]);

  const upcomingCount = courses.length - liveCount - selfPacedCount;

  // Filter and sort logic
  const filteredCourses = useMemo(() => {
    const list = courses.filter((course) => {
      const isSelfPaced = course.status === 'Self-Paced';
      const isLive = course.status === 'Open for Enrollment' || 
        (!isSelfPaced && Boolean(course.buttonText && course.buttonText.toLowerCase().includes('enroll')));
      const isUpcoming = !isLive && !isSelfPaced;

      // Status filter
      if (statusFilter === 'LIVE' && !isLive) return false;
      if (statusFilter === 'SELF_PACED' && !isSelfPaced) return false;
      if (statusFilter === 'UPCOMING' && !isUpcoming) return false;

      // Domain category filter
      if (domainFilter !== 'All') {
        const cCat = (course.category || '').toUpperCase();
        if (!cCat.includes(domainFilter.toUpperCase())) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesDesc = course.description.toLowerCase().includes(query);
        const matchesModules = course.modules?.some(m => m.toLowerCase().includes(query));
        const matchesDate = (course.startDate || '').toLowerCase().includes(query);
        const matchesCategory = (course.category || '').toLowerCase().includes(query);
        const matchesTimings = (course.timings || '').toLowerCase().includes(query);

        if (!matchesTitle && !matchesDesc && !matchesModules && !matchesDate && !matchesCategory && !matchesTimings) {
          return false;
        }
      }

      return true;
    });

    // Sort order
    return list.sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return 0;
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'duration') {
        return (a.duration || '').localeCompare(b.duration || '');
      }
      if (sortBy === 'date') {
        const aDate = a.startDate || '';
        const bDate = b.startDate || '';
        if (aDate.includes('SEP') && !bDate.includes('SEP')) return -1;
        if (!aDate.includes('SEP') && bDate.includes('SEP')) return 1;
        return aDate.localeCompare(bDate);
      }
      return 0;
    });
  }, [courses, statusFilter, domainFilter, searchQuery, sortBy]);

  // Handler for enroll click
  const handleEnroll = (course: Course) => {
    if (onEnrollCourse) {
      onEnrollCourse(course);
    } else {
      setEnrollCourse(course);
    }
  };

  // Handler for curriculum click
  const handleViewCurriculum = (course: Course) => {
    if (onViewCurriculum) {
      onViewCurriculum(course);
    } else {
      setCurriculumCourse(course);
    }
  };

  return (
    <section id="courses-section" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. Header of the Courses Section (Strictly matching Frontlines EduTech content in our color theme) */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-12">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E7C7B]/10 text-[#0E7C7B] text-xs font-extrabold uppercase tracking-wider border border-[#0E7C7B]/20 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#F2A93B]" />
          <span>Industry Mentorship • Practical Labs • Placement Ready</span>
        </div>

        {/* Section Main Title (Frontlines EduTech Heading) */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#1F3B4D] tracking-tight leading-tight">
          Current Live IT Courses in Telugu
        </h1>

        {/* Section Subtitle (Exact Frontlines EduTech wording) */}
        <div className="text-gray-600 text-sm sm:text-base leading-relaxed space-y-1 font-normal max-w-2xl mx-auto">
          <p>
            Our courses offer practical skills and real-time projects, designed specially for telugu students.
          </p>
          <p className="text-[#1F3B4D]">
            <strong className="font-extrabold text-[#12232E]">As a result</strong>, thousands have launched successful IT careers with us. Courses are led by industry experts.
          </p>
        </div>

        {/* Frontlines EduTech Trust Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 max-w-4xl mx-auto text-left">
          <div className="p-3.5 rounded-2xl bg-white border border-[#EAF3F3] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0E7C7B]/10 text-[#0E7C7B] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-base text-[#1F3B4D]">15,000+</div>
              <div className="text-[11px] text-gray-500 font-medium">Students Mentored</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#EAF3F3] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F2A93B]/15 text-[#D98E20] flex items-center justify-center shrink-0">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-base text-[#1F3B4D]">100% Practical</div>
              <div className="text-[11px] text-gray-500 font-medium">Telugu & Labs</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#EAF3F3] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0E7C7B]/10 text-[#0E7C7B] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-base text-[#1F3B4D]">50+ Projects</div>
              <div className="text-[11px] text-gray-500 font-medium">Capstone Portfolios</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#EAF3F3] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1F3B4D]/10 text-[#1F3B4D] flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-base text-[#1F3B4D]">Placement Ready</div>
              <div className="text-[11px] text-gray-500 font-medium">Resume & Mocks</div>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Interactive Navigation Controls (Status tabs, search bar, domain filter, view switcher) */}
      <div className="space-y-4 mb-8 sm:mb-10">
        
        {/* Row A: Status Filter Switcher + Search Box + View Mode Toggle */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-[#EAF3F3] shadow-xs">
          
          {/* Status Tabs: All, Live Batches, Self-Paced, Upcoming */}
          <div className="flex items-center p-1 bg-[#F7FAFA] rounded-xl border border-[#EAF3F3] w-full lg:w-auto overflow-x-auto">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === 'ALL'
                  ? 'bg-white text-[#1F3B4D] shadow-xs border border-gray-200/60'
                  : 'text-gray-500 hover:text-[#1F3B4D]'
              }`}
            >
              All Courses ({courses.length})
            </button>

            <button
              onClick={() => setStatusFilter('LIVE')}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === 'LIVE'
                  ? 'bg-[#0E7C7B] text-white shadow-xs'
                  : 'text-gray-500 hover:text-[#0E7C7B]'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>Live Batches ({liveCount})</span>
            </button>

            <button
              onClick={() => setStatusFilter('SELF_PACED')}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === 'SELF_PACED'
                  ? 'bg-[#F2A93B] text-[#12232E] shadow-xs'
                  : 'text-gray-500 hover:text-[#D98E20]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Self-Paced ({selfPacedCount})</span>
            </button>

            <button
              onClick={() => setStatusFilter('UPCOMING')}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === 'UPCOMING'
                  ? 'bg-[#1F3B4D] text-white shadow-xs'
                  : 'text-gray-500 hover:text-[#1F3B4D]'
              }`}
            >
              Upcoming ({upcomingCount})
            </button>
          </div>

          {/* Search Box + Sort + View Mode */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto">
            {/* Search Box */}
            <div className="relative flex-1 lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search course, skills, or timings..."
                className="w-full pl-10 pr-9 py-2 bg-[#F7FAFA] border border-[#EAF3F3] focus:border-[#0E7C7B] rounded-xl text-xs sm:text-sm text-[#1F3B4D] placeholder-gray-400 focus:outline-none focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0 hidden sm:block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-[#F7FAFA] border border-[#EAF3F3] text-xs font-semibold text-[#1F3B4D] rounded-xl focus:outline-none focus:border-[#0E7C7B] cursor-pointer"
              >
                <option value="featured">Featured / Popular</option>
                <option value="date">Start Date (Soonest)</option>
                <option value="title">Course Name (A-Z)</option>
                <option value="duration">Duration</option>
              </select>
            </div>

            {/* Grid vs List View Toggle */}
            <div className="flex items-center p-1 bg-[#F7FAFA] rounded-xl border border-[#EAF3F3] shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                title="Grid View"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#0E7C7B] shadow-xs'
                    : 'text-gray-400 hover:text-[#1F3B4D]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                title="List View"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-[#0E7C7B] shadow-xs'
                    : 'text-gray-400 hover:text-[#1F3B4D]'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Row B: Domain Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider shrink-0 flex items-center gap-1 pl-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Domain:</span>
          </span>
          {domainCategories.map((cat) => {
            const isSelected = domainFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setDomainFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1F3B4D] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-[#EAF3F3] hover:border-[#0E7C7B]/40 hover:text-[#0E7C7B]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Active Results Summary Strip */}
        <div className="flex items-center justify-between text-xs text-gray-500 px-1 pt-1">
          <div>
            Showing <strong className="text-[#1F3B4D] font-bold">{filteredCourses.length}</strong> of {courses.length} courses
            {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
            {domainFilter !== 'All' && <span> in {domainFilter}</span>}
          </div>
          {(searchQuery || domainFilter !== 'All' || statusFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setDomainFilter('All');
                setStatusFilter('ALL');
              }}
              className="text-[#0E7C7B] hover:underline font-bold cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

      </div>

      {/* 3. The Courses Grid or List Display */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#EAF3F3] space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#EAF3F3] text-[#0E7C7B] flex items-center justify-center mx-auto">
            <Search className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-lg text-[#1F3B4D]">
              No matching courses found
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              We couldn&apos;t find any batch matching your current search or filters. Try resetting filters or searching for Java, Python, AWS, or Testing.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setDomainFilter('All');
              setStatusFilter('ALL');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#0E7C7B] text-white text-xs font-bold shadow-xs hover:bg-[#0A5E5D] transition-colors cursor-pointer"
          >
            Show All Courses
          </button>
        </div>
      ) : viewMode === 'list' ? (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
                viewMode="list"
                onEnroll={handleEnroll}
                onViewCurriculum={handleViewCurriculum}
                onQuickView={(c) => setQuickPreviewCourse(c)}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
                viewMode="grid"
                onEnroll={handleEnroll}
                onViewCurriculum={handleViewCurriculum}
                onQuickView={(c) => setQuickPreviewCourse(c)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* 4. Quick Details Modal */}
      <CourseQuickModal
        course={quickPreviewCourse}
        onClose={() => setQuickPreviewCourse(null)}
        onEnroll={handleEnroll}
      />

      {/* 5. Curriculum Breakdown Modal */}
      <CourseCurriculumModal
        course={curriculumCourse}
        isOpen={Boolean(curriculumCourse)}
        onClose={() => setCurriculumCourse(null)}
        onEnroll={handleEnroll}
      />

      {/* 6. Quick Enrollment Modal */}
      <EnrollModal
        course={enrollCourse}
        isOpen={Boolean(enrollCourse)}
        onClose={() => setEnrollCourse(null)}
        onSuccess={() => setEnrollCourse(null)}
      />

    </section>
  );
};

