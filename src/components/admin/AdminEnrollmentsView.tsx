import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Mail, 
  Phone, 
  GraduationCap, 
  Calendar, 
  DollarSign, 
  FileText, 
  Trash2, 
  X, 
  Printer, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Enrollment, Course, User } from '../../types';
import { api } from '../../services/api';

interface AdminEnrollmentsViewProps {
  enrollments: Enrollment[];
  courses: Course[];
  users: User[];
  onRefresh: () => void;
  showNotification: (type: 'success' | 'error', message: string) => void;
}

export const AdminEnrollmentsView: React.FC<AdminEnrollmentsViewProps> = ({
  enrollments,
  courses,
  users,
  onRefresh,
  showNotification
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [paymentFilter, setPaymentFilter] = useState<string>('ALL');
  
  // Selected enrollment for Complete Candidate Dossier Modal
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Status updates
  const handleUpdateStatus = async (id: string, status: string, paymentStatus?: string) => {
    try {
      await api.updateEnrollment(id, { 
        status: status as any, 
        ...(paymentStatus ? { paymentStatus: paymentStatus as any } : {}) 
      });
      showNotification('success', 'Enrollment candidate status updated in Excel database.');
      if (selectedEnrollment && selectedEnrollment.id === id) {
        setSelectedEnrollment(prev => prev ? { 
          ...prev, 
          status: status as any, 
          ...(paymentStatus ? { paymentStatus: paymentStatus as any } : {}) 
        } : null);
      }
      onRefresh();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to update status');
    }
  };

  const handleDeleteEnrollment = async (id: string) => {
    try {
      await api.deleteEnrollment(id);
      showNotification('success', 'Enrollment record deleted from Excel store.');
      setDeleteConfirmId(null);
      if (selectedEnrollment?.id === id) {
        setSelectedEnrollment(null);
      }
      onRefresh();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete enrollment');
    }
  };

  // Filter enrollments
  const filteredEnrollments = enrollments.filter((e) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      (e.userName?.toLowerCase().includes(term) ?? false) ||
      (e.userEmail?.toLowerCase().includes(term) ?? false) ||
      (e.userPhone?.toLowerCase().includes(term) ?? false) ||
      (e.courseTitle?.toLowerCase().includes(term) ?? false) ||
      (e.educationOrJob?.toLowerCase().includes(term) ?? false) ||
      (e.id?.toLowerCase().includes(term) ?? false);

    const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter;
    const matchesPayment = paymentFilter === 'ALL' || e.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const paidCount = enrollments.filter(e => e.paymentStatus === 'Paid').length;
  const pendingPaymentCount = enrollments.filter(e => e.paymentStatus !== 'Paid').length;
  const confirmedCount = enrollments.filter(e => e.status === 'Confirmed' || e.status === 'In Progress').length;
  const underReviewCount = enrollments.filter(e => e.status === 'Under Review' || !e.status).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-bold text-[#12232E]">
              Course Admissions & Enrolled User Dossiers
            </h2>
            <p className="text-xs text-gray-500">
              Manage complete candidate profiles, verify qualifications, process batch timings, and sync student records.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-[#0E7C7B]/10 text-[#0E7C7B] font-bold text-xs">
              {enrollments.length} Total Enrolled
            </span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 pt-2 border-t border-gray-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name, email, college, course title, or ID..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0E7C7B] focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#0E7C7B]"
            >
              <option value="ALL">All Admission Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Under Review">Under Review</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#0E7C7B]"
            >
              <option value="ALL">All Payments</option>
              <option value="Paid">Verified (Paid)</option>
              <option value="Pending">Payment Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-gray-400 text-xs font-semibold uppercase">Total Applications</span>
          <p className="text-2xl font-bold text-gray-900 mt-1">{enrollments.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-gray-400 text-xs font-semibold uppercase">Active / Confirmed</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{confirmedCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-gray-400 text-xs font-semibold uppercase">Under Review</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">{underReviewCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-gray-400 text-xs font-semibold uppercase">Fee Paid</span>
          <p className="text-2xl font-bold text-[#0E7C7B] mt-1">{paidCount}</p>
        </div>
      </div>

      {/* Enrollments Main Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#12232E] text-white uppercase text-[10px] tracking-wider font-extrabold">
              <tr>
                <th className="px-5 py-3.5">Student Candidate</th>
                <th className="px-5 py-3.5">Enrolled Course</th>
                <th className="px-5 py-3.5">Academic / Professional</th>
                <th className="px-5 py-3.5">Batch & Mode</th>
                <th className="px-5 py-3.5">Status & Fee</th>
                <th className="px-5 py-3.5 text-right">Candidate Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredEnrollments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-gray-400">
                    No student enrollments found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredEnrollments.map((enr) => {
                  return (
                    <tr key={enr.id} className="hover:bg-gray-50/80 transition-colors">
                      {/* Candidate Name & Contact */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#0E7C7B]/10 text-[#0E7C7B] flex items-center justify-center font-bold text-xs">
                            {enr.userName?.charAt(0) || 'S'}
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 block">{enr.userName}</span>
                            <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                              <Mail className="w-3 h-3 text-gray-400" />
                              <span>{enr.userEmail}</span>
                            </div>
                            {enr.userPhone && (
                              <div className="flex items-center gap-1.5 text-gray-400 text-[10px]">
                                <Phone className="w-2.5 h-2.5" />
                                <span>{enr.userPhone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Course */}
                      <td className="px-5 py-4">
                        <div>
                          <span className="font-bold text-gray-800 block text-xs">{enr.courseTitle}</span>
                          <span className="text-[10px] font-semibold text-[#0E7C7B] uppercase tracking-wider">
                            {enr.courseCategory || 'FULL STACK'}
                          </span>
                        </div>
                      </td>

                      {/* Education / Job & Exp */}
                      <td className="px-5 py-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1 text-gray-800 font-medium text-xs">
                            <GraduationCap className="w-3 h-3 text-gray-400" />
                            <span>{enr.educationOrJob || 'Graduate / Student'}</span>
                          </div>
                          <span className="text-[11px] text-gray-500 block">
                            Level: {enr.experienceLevel || 'Beginner'}
                          </span>
                        </div>
                      </td>

                      {/* Batch & Mode */}
                      <td className="px-5 py-4">
                        <div className="space-y-0.5">
                          <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-bold">
                            {enr.mode || 'Hybrid'}
                          </span>
                          <span className="text-[11px] text-gray-600 block">
                            {enr.preferredBatch || 'Morning'} Batch
                          </span>
                        </div>
                      </td>

                      {/* Status & Fee */}
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <select
                            value={enr.status || 'Under Review'}
                            onChange={(e) => handleUpdateStatus(enr.id, e.target.value)}
                            className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-[11px] font-bold text-gray-700 focus:outline-none focus:border-[#0E7C7B]"
                          >
                            <option value="Under Review">Under Review</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <div className="flex items-center gap-1.5">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              enr.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {enr.paymentStatus === 'Paid' ? 'Fee Paid' : 'Fee Pending'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Action: Open Complete Details */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedEnrollment(enr)}
                            className="px-3 py-1.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Complete Details</span>
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(enr.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Enrollment"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================= */}
      {/* COMPLETE ENROLLED USER DETAILS MODAL (DOSSIER) */}
      {/* ========================================================= */}
      {selectedEnrollment && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0E7C7B] to-[#12232E] text-white flex items-center justify-center font-heading font-extrabold text-lg shadow-xs">
                  {selectedEnrollment.userName?.charAt(0) || 'S'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-lg text-gray-900">
                      {selectedEnrollment.userName}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      selectedEnrollment.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {selectedEnrollment.paymentStatus}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-mono">
                    Enrollment ID: <span className="font-bold text-[#0E7C7B]">{selectedEnrollment.id}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                  title="Print Admission Dossier"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setSelectedEnrollment(null)}
                  className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Contact & Action Bar */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <a
                href={`mailto:${selectedEnrollment.userEmail}?subject=Regarding Your Evolutionary Web Dude Course Enrollment: ${encodeURIComponent(selectedEnrollment.courseTitle)}`}
                className="px-3 py-1.5 bg-[#0E7C7B] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 hover:bg-[#0A5E5D] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>

              {selectedEnrollment.userPhone && (
                <a
                  href={`tel:${selectedEnrollment.userPhone}`}
                  className="px-3 py-1.5 bg-[#12232E] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 hover:bg-black transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Candidate ({selectedEnrollment.userPhone})</span>
                </a>
              )}
            </div>

            {/* Comprehensive Detail Sections */}
            <div className="space-y-4 text-xs">
              {/* Section 1: Candidate Profile & Background */}
              <div className="space-y-2">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400">
                  1. Candidate Academic & Professional Profile
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-400 font-semibold text-[10px] uppercase block">Full Name</span>
                    <span className="font-bold text-gray-900 text-sm">{selectedEnrollment.userName}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-400 font-semibold text-[10px] uppercase block">Email Address</span>
                    <span className="font-bold text-gray-900 text-sm break-all">{selectedEnrollment.userEmail}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-400 font-semibold text-[10px] uppercase block">Phone / WhatsApp</span>
                    <span className="font-bold text-gray-900">{selectedEnrollment.userPhone || 'Not provided'}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-400 font-semibold text-[10px] uppercase block">College / University / Employer</span>
                    <span className="font-bold text-gray-900">{selectedEnrollment.educationOrJob || 'Graduate / Student'}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-400 font-semibold text-[10px] uppercase block">Technical Experience Level</span>
                    <span className="font-bold text-[#0E7C7B]">{selectedEnrollment.experienceLevel || 'Beginner to Intermediate'}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-400 font-semibold text-[10px] uppercase block">Application Timestamp</span>
                    <span className="font-bold text-gray-900">{selectedEnrollment.enrolledAt || 'Recent'}</span>
                  </div>
                </div>
              </div>

              {/* Section 2: Program Enrollment Specifications */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400">
                  2. Selected Course Program & Learning Track
                </h4>
                <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-heading font-bold text-sm text-[#12232E]">
                        {selectedEnrollment.courseTitle}
                      </h5>
                      <span className="text-[11px] font-bold text-[#0E7C7B] uppercase">
                        Track: {selectedEnrollment.courseCategory || 'FULL STACK DEVELOPMENT'}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px]">
                      Active Curriculum
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs border-t border-emerald-100/80">
                    <div>
                      <span className="text-gray-500 font-semibold text-[10px] block">Instruction Mode</span>
                      <span className="font-bold text-gray-900">{selectedEnrollment.mode || 'Hybrid'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 font-semibold text-[10px] block">Preferred Batch</span>
                      <span className="font-bold text-gray-900">{selectedEnrollment.preferredBatch || 'Morning Batch'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 font-semibold text-[10px] block">Fee Status</span>
                      <span className="font-bold text-emerald-800">{selectedEnrollment.paymentStatus}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Candidate Notes / Learning Goals */}
              {selectedEnrollment.notes && (
                <div className="space-y-1 pt-2 border-t border-gray-100">
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400">
                    3. Candidate Remarks & Career Goals
                  </h4>
                  <div className="p-3 bg-gray-50 rounded-xl text-gray-700 leading-relaxed italic">
                    "{selectedEnrollment.notes}"
                  </div>
                </div>
              )}

              {/* Section 4: Admission Status Control */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400">
                  4. Manage Admission Status
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Under Review', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedEnrollment.id, status)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                        selectedEnrollment.status === status
                          ? 'bg-[#0E7C7B] text-white shadow-xs'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {status}
                    </button>
                  ))}

                  <button
                    onClick={() => handleUpdateStatus(
                      selectedEnrollment.id, 
                      selectedEnrollment.status, 
                      selectedEnrollment.paymentStatus === 'Paid' ? 'Pending' : 'Paid'
                    )}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                      selectedEnrollment.paymentStatus === 'Paid'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    Toggle Payment: {selectedEnrollment.paymentStatus === 'Paid' ? 'Mark Pending' : 'Mark Paid'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedEnrollment(null)}
                className="px-5 py-2 bg-[#12232E] hover:bg-black text-white font-bold text-xs rounded-xl"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-gray-900">
                Delete Enrollment Record?
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                This will delete the student application from the Excel Enrollments worksheet.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEnrollment(deleteConfirmId)}
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
