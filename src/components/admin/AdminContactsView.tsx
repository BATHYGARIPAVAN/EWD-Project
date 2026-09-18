import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Eye, 
  X, 
  AlertCircle,
  ExternalLink,
  Reply
} from 'lucide-react';
import { ContactSubmission } from '../../types';
import { api } from '../../services/api';

interface AdminContactsViewProps {
  contacts: ContactSubmission[];
  onRefresh: () => void;
  showNotification: (type: 'success' | 'error', message: string) => void;
}

export const AdminContactsView: React.FC<AdminContactsViewProps> = ({
  contacts,
  onRefresh,
  showNotification
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  
  // Selected Inquiry for Details Modal
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.updateContact(id, { status: status as any });
      showNotification('success', `Contact inquiry status updated to "${status}".`);
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact(prev => prev ? { ...prev, status: status as any } : null);
      }
      onRefresh();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to update status');
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await api.deleteContact(id);
      showNotification('success', 'Contact inquiry removed from Excel store.');
      setDeleteConfirmId(null);
      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }
      onRefresh();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete contact');
    }
  };

  // Filter Contacts
  const filteredContacts = contacts.filter((c) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      (c.name?.toLowerCase().includes(term) ?? false) ||
      (c.email?.toLowerCase().includes(term) ?? false) ||
      (c.phone?.toLowerCase().includes(term) ?? false) ||
      (c.subject?.toLowerCase().includes(term) ?? false) ||
      (c.serviceInterest?.toLowerCase().includes(term) ?? false) ||
      (c.message?.toLowerCase().includes(term) ?? false);

    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const newCount = contacts.filter(c => c.status === 'New' || !c.status).length;
  const inProgressCount = contacts.filter(c => c.status === 'In Progress').length;
  const contactedCount = contacts.filter(c => c.status === 'Contacted').length;

  return (
    <div className="space-y-6">
      {/* Header with Search & Filter */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-lg font-bold text-[#12232E]">
              Client Inquiries & Contact Us Submissions
            </h2>
            <p className="text-xs text-gray-500">
              Review message details, respond directly to leads, update ticket progress, and archive requests.
            </p>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 font-bold text-xs">
            {contacts.length} Total Messages
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 border-t border-gray-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by sender name, email, phone, service of interest, or message content..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0E7C7B] focus:bg-white transition-all"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#0E7C7B]"
          >
            <option value="ALL">All Inquiry Statuses ({contacts.length})</option>
            <option value="New">New Leads ({newCount})</option>
            <option value="In Progress">In Progress ({inProgressCount})</option>
            <option value="Contacted">Contacted / Resolved ({contactedCount})</option>
          </select>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-gray-400 text-xs font-semibold uppercase">Total Inquiries</span>
          <p className="text-2xl font-bold text-gray-900 mt-1">{contacts.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-gray-400 text-xs font-semibold uppercase">New Messages</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">{newCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-gray-400 text-xs font-semibold uppercase">In Progress</span>
          <p className="text-2xl font-bold text-blue-600 mt-1">{inProgressCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-gray-400 text-xs font-semibold uppercase">Contacted</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{contactedCount}</p>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#12232E] text-white uppercase text-[10px] tracking-wider font-extrabold">
              <tr>
                <th className="px-5 py-3.5">Sender Info</th>
                <th className="px-5 py-3.5">Subject & Service</th>
                <th className="px-5 py-3.5">Message Preview</th>
                <th className="px-5 py-3.5">Received Date</th>
                <th className="px-5 py-3.5">Ticket Status</th>
                <th className="px-5 py-3.5 text-right">Details Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-gray-400">
                    No contact submissions matching your search.
                  </td>
                </tr>
              ) : (
                filteredContacts.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Sender */}
                    <td className="px-5 py-4">
                      <div>
                        <span className="font-bold text-gray-900 block">{c.name}</span>
                        <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span>{c.email}</span>
                        </div>
                        {c.phone && (
                          <div className="flex items-center gap-1.5 text-gray-400 text-[10px]">
                            <Phone className="w-2.5 h-2.5" />
                            <span>{c.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Subject & Service */}
                    <td className="px-5 py-4">
                      <div>
                        <span className="font-bold text-gray-800 block text-xs">{c.subject}</span>
                        <span className="text-[10px] font-semibold text-[#0E7C7B] uppercase tracking-wider">
                          {c.serviceInterest || 'General Inquiry'}
                        </span>
                      </div>
                    </td>

                    {/* Message Preview */}
                    <td className="px-5 py-4 max-w-xs">
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {c.message}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 whitespace-nowrap text-xs text-gray-500">
                      {c.submittedAt || 'Recent'}
                    </td>

                    {/* Status dropdown */}
                    <td className="px-5 py-4">
                      <select
                        value={c.status || 'New'}
                        onChange={(e) => handleUpdateStatus(c.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none ${
                          c.status === 'New' 
                            ? 'bg-amber-50 text-amber-800 border-amber-200' 
                            : c.status === 'In Progress'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedContact(c)}
                          className="px-3 py-1.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(c.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Contact Inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CONTACT INQUIRY DETAILS MODAL */}
      {/* ========================================================= */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-lg text-gray-900">
                    {selectedContact.subject}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    selectedContact.status === 'New' 
                      ? 'bg-amber-100 text-amber-800' 
                      : selectedContact.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {selectedContact.status || 'New'}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Service Domain: <span className="font-bold text-[#0E7C7B]">{selectedContact.serviceInterest || 'General Inquiry'}</span>
                </p>
              </div>

              <button 
                onClick={() => setSelectedContact(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sender Info Card */}
            <div className="p-4 bg-gray-50 rounded-xl space-y-3 text-xs">
              <span className="text-gray-400 font-bold uppercase text-[10px] block">Sender Contact Card</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-gray-400 text-[10px] block">Full Name</span>
                  <span className="font-bold text-gray-900 text-sm">{selectedContact.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] block">Email Address</span>
                  <span className="font-bold text-gray-900 break-all">{selectedContact.email}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] block">Phone / Mobile</span>
                  <span className="font-bold text-gray-900">{selectedContact.phone || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] block">Submission Date</span>
                  <span className="font-bold text-gray-900">{selectedContact.submittedAt || 'Recent'}</span>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-2 text-xs">
              <span className="text-gray-400 font-bold uppercase text-[10px] block">Full Inquiry Message</span>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-800 leading-relaxed whitespace-pre-wrap">
                {selectedContact.message}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${encodeURIComponent(selectedContact.subject)}`}
                  className="px-4 py-2 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>

                {selectedContact.phone && (
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="px-4 py-2 bg-[#12232E] hover:bg-black text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Sender</span>
                  </a>
                )}
              </div>

              {/* Status Change Toggles */}
              <div className="flex items-center gap-1">
                {['New', 'In Progress', 'Contacted'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedContact.id, st)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                      selectedContact.status === st 
                        ? 'bg-gray-800 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div>
              <h3 className="font-heading font-bold text-base text-gray-900">
                Delete Contact Inquiry?
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                This will delete the message from the Excel Contacts worksheet.
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
                onClick={() => handleDeleteContact(deleteConfirmId)}
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
