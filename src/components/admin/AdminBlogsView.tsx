import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  Heart, 
  X, 
  Sparkles,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { BlogPost } from '../../types';
import { api } from '../../services/api';

interface AdminBlogsViewProps {
  blogs: BlogPost[];
  onRefresh: () => void;
  showNotification: (type: 'success' | 'error', message: string) => void;
}

export const AdminBlogsView: React.FC<AdminBlogsViewProps> = ({
  blogs,
  onRefresh,
  showNotification
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [deleteConfirmBlog, setDeleteConfirmBlog] = useState<BlogPost | null>(null);
  const [previewBlog, setPreviewBlog] = useState<BlogPost | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form State
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    category: 'Paperless Architecture',
    excerpt: '',
    content: '',
    author: 'Pavan Bathygari',
    authorRole: 'Founder & Lead Architect',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    tags: 'Paperless, Architecture, ExcelJS, React',
    likes: 0
  });

  const categories = [
    'Paperless Architecture',
    'System Design',
    'Engineering Guide',
    'Tech Article',
    'Career Insights',
    'Web Systems'
  ];

  const handleOpenAddBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      slug: '',
      category: 'Paperless Architecture',
      excerpt: '',
      content: '',
      author: 'Pavan Bathygari',
      authorRole: 'Founder & Lead Architect',
      readTime: '5 min read',
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
      tags: 'Paperless, Full Stack, Modern Web',
      likes: 0
    });
    setIsModalOpen(true);
  };

  const handleOpenEditBlog = (b: BlogPost) => {
    setEditingBlog(b);
    setBlogForm({
      title: b.title,
      slug: b.slug,
      category: b.category || 'Paperless Architecture',
      excerpt: b.excerpt,
      content: b.content,
      author: b.author,
      authorRole: b.authorRole || 'Author',
      readTime: b.readTime || '5 min read',
      coverImage: b.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
      tags: (b.tags || []).join(', '),
      likes: b.likes || 0
    });
    setIsModalOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) {
      showNotification('error', 'Please provide an article title and content.');
      return;
    }

    setFormLoading(true);
    try {
      const payload: Partial<BlogPost> = {
        title: blogForm.title,
        slug: blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        category: blogForm.category,
        excerpt: blogForm.excerpt,
        content: blogForm.content,
        author: blogForm.author,
        authorRole: blogForm.authorRole,
        readTime: blogForm.readTime,
        coverImage: blogForm.coverImage,
        tags: blogForm.tags.split(',').map(s => s.trim()).filter(Boolean),
        likes: Number(blogForm.likes) || 0
      };

      if (editingBlog) {
        await api.updateBlog(editingBlog.id, payload);
        showNotification('success', `Blog article "${blogForm.title}" updated in Excel Blogs sheet!`);
      } else {
        await api.createBlog(payload);
        showNotification('success', `New Blog article "${blogForm.title}" published and saved to Excel!`);
      }

      setIsModalOpen(false);
      onRefresh();
    } catch (err: any) {
      showNotification('error', err.message || 'Blog save failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteBlog = async () => {
    if (!deleteConfirmBlog) return;
    try {
      await api.deleteBlog(deleteConfirmBlog.id);
      showNotification('success', `Article "${deleteConfirmBlog.title}" removed from Excel store.`);
      setDeleteConfirmBlog(null);
      if (previewBlog?.id === deleteConfirmBlog.id) {
        setPreviewBlog(null);
      }
      onRefresh();
    } catch (err: any) {
      showNotification('error', err.message || 'Delete failed');
    }
  };

  // Filter Blogs
  const filteredBlogs = blogs.filter((b) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      (b.title?.toLowerCase().includes(term) ?? false) ||
      (b.excerpt?.toLowerCase().includes(term) ?? false) ||
      (b.author?.toLowerCase().includes(term) ?? false) ||
      (b.category?.toLowerCase().includes(term) ?? false) ||
      ((b.tags || []).some(t => t.toLowerCase().includes(term)));

    const matchesCategory = categoryFilter === 'ALL' || b.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles by title, tags, or author..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0E7C7B] focus:bg-white transition-all"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#0E7C7B]"
          >
            <option value="ALL">All Categories ({blogs.length})</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleOpenAddBlog}
          className="px-4 py-2.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Blog Post</span>
        </button>
      </div>

      {/* Blogs Count Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-gray-400 text-xs font-semibold uppercase">Total Articles</span>
          <p className="text-2xl font-bold text-gray-900 mt-1">{blogs.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-gray-400 text-xs font-semibold uppercase">Categories</span>
          <p className="text-2xl font-bold text-[#0E7C7B] mt-1">{new Set(blogs.map(b => b.category)).size}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-gray-400 text-xs font-semibold uppercase">Total Likes</span>
          <p className="text-2xl font-bold text-pink-600 mt-1">
            {blogs.reduce((acc, b) => acc + (b.likes || 0), 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-gray-400 text-xs font-semibold uppercase">Persistence</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">Blogs Sheet</p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBlogs.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-gray-100">
            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <h3 className="font-heading font-bold text-gray-700 text-sm">No Blog Articles Found</h3>
            <p className="text-xs text-gray-400">Click "Add New Blog Post" to publish your first article.</p>
          </div>
        ) : (
          filteredBlogs.map((b) => (
            <div 
              key={b.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Cover Image Thumbnail */}
              {b.coverImage && (
                <div className="h-40 w-full overflow-hidden relative bg-gray-100">
                  <img 
                    src={b.coverImage} 
                    alt={b.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#12232E]/80 backdrop-blur-xs text-white">
                    {b.category}
                  </span>
                </div>
              )}

              {/* Content Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {!b.coverImage && (
                    <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#0E7C7B]/10 text-[#0E7C7B]">
                      {b.category}
                    </span>
                  )}

                  <h3 className="font-heading font-bold text-base text-gray-900 line-clamp-2 group-hover:text-[#0E7C7B] transition-colors">
                    {b.title}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {b.excerpt || b.content}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="font-medium text-gray-700">{b.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      {b.readTime || '5 min'}
                    </span>
                  </div>

                  {/* Tags */}
                  {b.tags && b.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {b.tags.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded text-[10px] font-medium border border-gray-100">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions Footer */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setPreviewBlog(b)}
                      className="text-xs font-bold text-[#0E7C7B] hover:text-[#0A5E5D] flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditBlog(b)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-[#0E7C7B] hover:bg-gray-100 transition-colors"
                        title="Edit Article"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmBlog(b)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ========================================================= */}
      {/* ADD / EDIT BLOG MODAL */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-5 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-heading font-bold text-lg text-gray-900">
                {editingBlog ? `Edit Article: ${editingBlog.title}` : 'Publish New Blog Post'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Article Title *</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="e.g. Zero-Paper Academic Architecture in Telangana"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Category *</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Read Time</label>
                  <input
                    type="text"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    placeholder="e.g. 6 min read"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Author Name</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    placeholder="e.g. Pavan Bathygari"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Cover Image URL</label>
                <input
                  type="text"
                  value={blogForm.coverImage}
                  onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Article Excerpt / Abstract</label>
                <textarea
                  rows={2}
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="Short engaging summary displayed in previews..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Full Article Content (Markdown / Formatted) *</label>
                <textarea
                  rows={8}
                  required
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Write the full article content here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B] font-mono text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={blogForm.tags}
                  onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                  placeholder="Paperless, React, Spring Boot, Architecture"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-5 py-2 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  {formLoading ? 'Saving...' : editingBlog ? 'Update Article' : 'Publish to Excel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PREVIEW ARTICLE MODAL */}
      {/* ========================================================= */}
      {previewBlog && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#0E7C7B]/10 text-[#0E7C7B]">
                  {previewBlog.category}
                </span>
                <h2 className="font-heading font-bold text-xl text-gray-900 mt-2">
                  {previewBlog.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span>By {previewBlog.author}</span>
                  <span>&bull;</span>
                  <span>{previewBlog.readTime || '5 min read'}</span>
                  <span>&bull;</span>
                  <span>{previewBlog.publishedAt || 'Published'}</span>
                </div>
              </div>

              <button 
                onClick={() => setPreviewBlog(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {previewBlog.coverImage && (
              <img 
                src={previewBlog.coverImage} 
                alt={previewBlog.title} 
                className="w-full h-56 object-cover rounded-xl"
              />
            )}

            <div className="prose prose-sm max-w-none text-gray-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
              {previewBlog.content}
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => { setPreviewBlog(null); handleOpenEditBlog(previewBlog); }}
                className="px-4 py-2 bg-[#0E7C7B] text-white font-bold text-xs rounded-xl hover:bg-[#0A5E5D]"
              >
                Edit This Article
              </button>
              <button
                onClick={() => setPreviewBlog(null)}
                className="px-4 py-2 bg-[#12232E] text-white font-bold text-xs rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmBlog && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div>
              <h3 className="font-heading font-bold text-base text-gray-900">
                Delete Article: {deleteConfirmBlog.title}?
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                This will delete the publication from the Excel Blogs worksheet.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmBlog(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteBlog}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
