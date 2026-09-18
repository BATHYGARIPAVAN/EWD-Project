import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  ShieldCheck, 
  User as UserIcon, 
  Trash2, 
  Edit3, 
  Eye, 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  X, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { User, Enrollment } from '../../types';
import { api } from '../../services/api';

interface AdminUsersViewProps {
  users: User[];
  enrollments: Enrollment[];
  onRefresh: () => void;
  showNotification: (type: 'success' | 'error', message: string) => void;
}

export const AdminUsersView: React.FC<AdminUsersViewProps> = ({
  users,
  enrollments,
  onRefresh,
  showNotification
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'ADMIN' | 'USER'>('ALL');
  
  // Modals
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<User | null>(null);

  // Add/Edit Form State
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER' as 'ADMIN' | 'USER',
    phone: '',
    organization: '',
    bio: '',
    avatar: ''
  });

  const [formLoading, setFormLoading] = useState(false);

  // Filter Users
  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      (u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (u.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (u.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleOpenAddUser = () => {
    setUserForm({
      name: '',
      email: '',
      password: 'password123',
      role: 'USER',
      phone: '+91 ',
      organization: '',
      bio: '',
      avatar: ''
    });
    setIsAddUserOpen(true);
  };

  const handleOpenEditUser = (u: User) => {
    setEditingUser(u);
    setUserForm({
      name: u.name,
      email: u.email,
      password: '',
      role: u.role,
      phone: u.phone || '',
      organization: u.organization || '',
      bio: u.bio || '',
      avatar: u.avatar || ''
    });
    setIsEditUserOpen(true);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email || !userForm.password) {
      showNotification('error', 'Please fill in required fields (Name, Email, Password).');
      return;
    }

    setFormLoading(true);
    try {
      await api.register(userForm.name, userForm.email, userForm.password, userForm.role, {
        phone: userForm.phone,
        organization: userForm.organization,
        bio: userForm.bio,
        avatar: userForm.avatar
      });
      showNotification('success', `User "${userForm.name}" created and synced to Excel.`);
      setIsAddUserOpen(false);
      onRefresh();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to create user');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setFormLoading(true);
    try {
      await api.updateProfile(editingUser.id, {
        name: userForm.name,
        phone: userForm.phone,
        organization: userForm.organization,
        bio: userForm.bio,
        avatar: userForm.avatar,
        role: userForm.role,
        ...(userForm.password ? { password: userForm.password } : {})
      });
      showNotification('success', `User record updated in Excel Users worksheet.`);
      setIsEditUserOpen(false);
      onRefresh();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to update user');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteConfirmUser) return;

    try {
      await api.deleteUser(deleteConfirmUser.id);
      showNotification('success', `User "${deleteConfirmUser.name}" deleted from Excel Users store.`);
      setDeleteConfirmUser(null);
      if (selectedUser?.id === deleteConfirmUser.id) {
        setIsDossierOpen(false);
      }
      onRefresh();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete user');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action & Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users by name, email, college, phone..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0E7C7B] focus:bg-white transition-all"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#0E7C7B]"
          >
            <option value="ALL">All Roles ({users.length})</option>
            <option value="ADMIN">Admins Only ({users.filter(u => u.role === 'ADMIN').length})</option>
            <option value="USER">Students Only ({users.filter(u => u.role !== 'ADMIN').length})</option>
          </select>
        </div>

        <button
          onClick={handleOpenAddUser}
          className="px-4 py-2.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Users Count Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-gray-400 text-xs font-semibold uppercase">Total Users</span>
          <p className="text-2xl font-bold text-gray-900 mt-1">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-gray-400 text-xs font-semibold uppercase">Students</span>
          <p className="text-2xl font-bold text-[#0E7C7B] mt-1">{users.filter(u => u.role !== 'ADMIN').length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-gray-400 text-xs font-semibold uppercase">Administrators</span>
          <p className="text-2xl font-bold text-[#F2A93B] mt-1">{users.filter(u => u.role === 'ADMIN').length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <span className="text-gray-400 text-xs font-semibold uppercase">Excel Store</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">Users Sheet</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#12232E] text-white uppercase text-[10px] tracking-wider font-extrabold">
              <tr>
                <th className="px-5 py-3.5">User Candidate</th>
                <th className="px-5 py-3.5">Contact Details</th>
                <th className="px-5 py-3.5">Organization / College</th>
                <th className="px-5 py-3.5">Role</th>
                <th className="px-5 py-3.5">Enrolled Programs</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-gray-400">
                    No users matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const userEnrollments = enrollments.filter(e => e.userId === u.id || e.userEmail?.toLowerCase() === u.email?.toLowerCase());
                  const isAdmin = u.role === 'ADMIN';

                  return (
                    <tr key={u.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                            isAdmin ? 'bg-[#F2A93B]/20 text-[#D98E20] border border-[#F2A93B]/40' : 'bg-[#0E7C7B]/10 text-[#0E7C7B]'
                          }`}>
                            {u.avatar ? (
                              <img src={u.avatar} alt={u.name} className="w-full h-full rounded-xl object-cover" />
                            ) : (
                              u.name?.charAt(0) || 'U'
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 block">{u.name}</span>
                            <span className="text-[11px] text-gray-400 font-mono">{u.id}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 text-gray-800">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span className="font-medium text-xs">{u.email}</span>
                          </div>
                          {u.phone && (
                            <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                              <Phone className="w-3 h-3 text-gray-400" />
                              <span>{u.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-xs text-gray-600 font-medium">
                          {u.organization || 'Individual Student'}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          isAdmin 
                            ? 'bg-[#F2A93B]/15 text-[#D98E20] border border-[#F2A93B]/30' 
                            : 'bg-[#0E7C7B]/10 text-[#0E7C7B] border border-[#0E7C7B]/20'
                        }`}>
                          {isAdmin ? <ShieldCheck className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                          {u.role}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-700">
                          {userEnrollments.length} Active {userEnrollments.length === 1 ? 'Course' : 'Courses'}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => { setSelectedUser(u); setIsDossierOpen(true); }}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-[#0E7C7B] hover:bg-[#0E7C7B]/10 transition-colors"
                            title="View Full User Dossier"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEditUser(u)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-[#F2A93B] hover:bg-[#F2A93B]/10 transition-colors"
                            title="Edit User Info / Role"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmUser(u)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete User Record"
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
      {/* MODAL 1: VIEW FULL USER DOSSIER */}
      {/* ========================================================= */}
      {isDossierOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0E7C7B] text-white flex items-center justify-center font-heading font-extrabold text-lg">
                  {selectedUser.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-gray-900">{selectedUser.name}</h3>
                  <p className="text-xs text-gray-500 font-mono">User ID: {selectedUser.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsDossierOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-gray-50 rounded-xl space-y-1">
                <span className="text-gray-400 uppercase font-semibold text-[10px]">Email Address</span>
                <p className="font-bold text-gray-800 break-all">{selectedUser.email}</p>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-xl space-y-1">
                <span className="text-gray-400 uppercase font-semibold text-[10px]">Phone Number</span>
                <p className="font-bold text-gray-800">{selectedUser.phone || 'Not specified'}</p>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-xl space-y-1">
                <span className="text-gray-400 uppercase font-semibold text-[10px]">Organization / College</span>
                <p className="font-bold text-gray-800">{selectedUser.organization || 'Individual'}</p>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-xl space-y-1">
                <span className="text-gray-400 uppercase font-semibold text-[10px]">Account Role</span>
                <p className="font-bold text-[#0E7C7B]">{selectedUser.role}</p>
              </div>
            </div>

            {selectedUser.bio && (
              <div className="p-3.5 bg-gray-50 rounded-xl space-y-1 text-xs">
                <span className="text-gray-400 uppercase font-semibold text-[10px]">Biography / Background</span>
                <p className="text-gray-700 leading-relaxed">{selectedUser.bio}</p>
              </div>
            )}

            {/* Enrolled Courses Section */}
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-sm text-gray-900">
                Enrolled Academic Programs
              </h4>
              {enrollments.filter(e => e.userId === selectedUser.id || e.userEmail?.toLowerCase() === selectedUser.email?.toLowerCase()).length === 0 ? (
                <p className="text-xs text-gray-400 italic">No course enrollments on record for this user.</p>
              ) : (
                <div className="space-y-2">
                  {enrollments.filter(e => e.userId === selectedUser.id || e.userEmail?.toLowerCase() === selectedUser.email?.toLowerCase()).map(e => (
                    <div key={e.id} className="p-3 rounded-xl border border-gray-200 bg-gray-50/50 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-gray-900 block">{e.courseTitle}</span>
                        <span className="text-gray-500 text-[11px]">{e.mode} &bull; {e.preferredBatch} Batch</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        e.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {e.status} ({e.paymentStatus})
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => { setIsDossierOpen(false); handleOpenEditUser(selectedUser); }}
                className="px-4 py-2 bg-[#0E7C7B] text-white font-bold text-xs rounded-xl hover:bg-[#0A5E5D]"
              >
                Edit User Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: ADD / EDIT USER */}
      {/* ========================================================= */}
      {(isAddUserOpen || isEditUserOpen) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-heading font-bold text-lg text-gray-900">
                {isAddUserOpen ? 'Add New User Candidate' : 'Edit User Record'}
              </h3>
              <button 
                onClick={() => { setIsAddUserOpen(false); setIsEditUserOpen(false); }}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={isAddUserOpen ? handleCreateUser : handleUpdateUser} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={userForm.name}
                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    placeholder="e.g. Sravan Reddy"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    disabled={isEditUserOpen}
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    placeholder="e.g. student@college.edu"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B] disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">
                    {isAddUserOpen ? 'Password *' : 'New Password (Leave blank to keep)'}
                  </label>
                  <input
                    type="password"
                    required={isAddUserOpen}
                    value={userForm.password}
                    onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                    placeholder="Enter password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">System Role *</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                  >
                    <option value="USER">Student (Standard User)</option>
                    <option value="ADMIN">System Administrator</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    value={userForm.phone}
                    onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Organization / College</label>
                  <input
                    type="text"
                    value={userForm.organization}
                    onChange={(e) => setUserForm({ ...userForm, organization: e.target.value })}
                    placeholder="e.g. JNTU Hyderabad"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Bio / Notes</label>
                <textarea
                  rows={2}
                  value={userForm.bio}
                  onChange={(e) => setUserForm({ ...userForm, bio: e.target.value })}
                  placeholder="Student academic background or career goals..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => { setIsAddUserOpen(false); setIsEditUserOpen(false); }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-5 py-2 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  {formLoading ? 'Saving to Excel...' : isAddUserOpen ? 'Create User' : 'Update User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: DELETE CONFIRMATION */}
      {/* ========================================================= */}
      {deleteConfirmUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-gray-900">
                Delete User: {deleteConfirmUser.name}?
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                This will permanently delete this user from the Excel Users worksheet. This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmUser(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
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
