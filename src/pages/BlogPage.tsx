import React from 'react';
import { BookOpen, Sparkles, Clock, ArrowRight, FileSpreadsheet, Cpu, ShieldCheck } from 'lucide-react';

interface BlogPageProps {
  navigate: (path: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ navigate }) => {
  const articles = [
    {
      id: 'art-1',
      title: 'Architecting Zero-Paper Academic Thesis Submissions in Hyderabad',
      category: 'Paperless Architecture',
      readTime: '6 min read',
      date: 'Feb 2026',
      excerpt: 'How our proprietary digital verification pipeline eradicated 40,000+ paper forms and reduced thesis approval cycles from 21 days to 4 hours.',
      author: 'Pavan Bathygari',
      tags: ['Paperless', 'ExcelJS', 'React 18', 'Academic Tech']
    },
    {
      id: 'art-2',
      title: 'Evolutionary Optimization: Why Static Web Development Is Obsolete',
      category: 'System Design',
      readTime: '8 min read',
      date: 'Jan 2026',
      excerpt: 'Biological evolution provides the ultimate blueprint for web engineering. Discover how telemetry-driven self-optimizing UI engines function.',
      author: 'EWD Research Lab',
      tags: ['Evolutionary Alg', 'Telemetry', 'Performance', 'A/B Testing']
    },
    {
      id: 'art-3',
      title: 'Spring Boot 3 + React 18: Microservices Masterclass for Indian Tech Careers',
      category: 'Engineering Guide',
      readTime: '10 min read',
      date: 'Jan 2026',
      excerpt: 'A comprehensive roadmap for engineering students and aspiring developers looking to bridge the gap between academic theory and enterprise scale.',
      author: 'Academic Mentor Team',
      tags: ['Java', 'Spring Boot', 'Full Stack', 'Careers']
    }
  ];

  return (
    <div id="blog-page-root" className="space-y-12 sm:space-y-16 pb-20">
      
      {/* Header */}
      <section className="pt-12 pb-6 bg-gradient-to-b from-[#F7FAFA] to-[#EAF3F3]/30 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0E7C7B]/10 text-[#0E7C7B] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#F2A93B]" />
            Knowledge Base & Publications
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#1F3B4D] tracking-tight">
            Evolutionary Tech Articles & Insights
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            In-depth guides on paperless workflow automation, microservices engineering, and evolutionary web systems published by the Hyderabad engineering team.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="card-feel-good p-7 sm:p-8 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-[#0E7C7B]/10 text-[#0E7C7B] border border-[#0E7C7B]/20">
                    {art.category}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#0E7C7B]" /> {art.readTime}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg sm:text-xl text-[#1F3B4D] leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {art.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {art.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 bg-[#F7FAFA] border border-[#EAF3F3] text-gray-600 rounded-md font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-gray-100 flex items-center justify-between mt-6">
                <div>
                  <span className="text-xs font-bold text-[#1F3B4D] block">{art.author}</span>
                  <span className="text-[10px] text-gray-400">{art.date}</span>
                </div>

                <button
                  onClick={() => navigate('/services')}
                  className="px-3 py-1.5 rounded-lg bg-[#0E7C7B]/10 hover:bg-[#0E7C7B] text-[#0E7C7B] hover:text-white text-xs font-bold flex items-center gap-1 transition-all group"
                >
                  <span>Explore Topic</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
};
