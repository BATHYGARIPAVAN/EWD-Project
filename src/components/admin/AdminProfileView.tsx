import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Building2, 
  KeyRound, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  Database,
  Lock,
  LogOut
} from 'lucide-react';
import { User } from '../../types';
import { api } from '../../services/api';

interface AdminProfileViewProps {
  user: User | null;
  onRefresh: () => void;
  onLogout: () => void;
  showNotification: (type: 'success' | 'error', message: string) => void;
}

export const AdminProfileView: React.FC<AdminProfileViewProps> = ({
  user,
  onRefresh,
  onLogout,
  showNotification
}) => {
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Administrator',
    email: user?.email || 'admin@evolutionarywebdude.com',
    phone: user?.phone || '+91 98765 43210',
    organization: user?.organization || 'Evolutionary Web Dude Admin Hub',
    bio: user?.bio || 'Head Administrator overseeing course curriculums, candidate enrollments, and paperless web initiatives.',
    avatar: user?.avatar || '',
    newPassword: '',
    confirmPassword: ''
  });

  const [saving, setSaving] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (profileForm.newPassword && profileForm.newPassword !== profileForm.confirmPassword) {
      showNotification('error', 'New passwords do not match!');
      return;
    }

    setSaving(true);
    try {
      await api.updateProfile(user.id, {
        name: profileForm.name,
        phone: profileForm.phone,
        organization: profileForm.organization,
        bio: profileForm.bio,
        avatar: profileForm.avatar,
        ...(profileForm.newPassword ? { password: profileForm.newPassword } : {})
      });
      showNotification('success', 'Admin profile successfully updated in Excel Users worksheet.');
      setProfileForm(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
      onRefresh();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to update admin profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0E7C7B] to-[#12232E] text-white flex items-center justify-center font-heading font-extrabold text-3xl shadow-md border-2 border-white">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-2xl object-cover" />
          ) : (
            user?.name?.charAt(0) || 'A'
          )}
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
            <div>
              <h2 className="font-heading font-extrabold text-xl text-gray-900">{user?.name || 'System Administrator'}</h2>
              <p className="text-xs text-gray-500 font-mono">{user?.email || 'admin@evolutionarywebdude.com'}</p>
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#F2A93B]/20 text-[#D98E20] border border-[#F2A93B]/30 self-center sm:self-auto">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Administrator</span>
            </span>
          </div>

          <p className="text-xs text-gray-600 pt-1 leading-relaxed">
            {profileForm.bio}
          </p>
        </div>
      </div>

      {/* Profile Edit Form */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="font-heading font-bold text-base text-gray-900">
            Edit Account & Security Settings
          </h3>
          <p className="text-xs text-gray-500">
            Manage your administrator credentials stored in the Excel user database.
          </p>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-gray-700">Administrator Full Name *</label>
              <input
                type="text"
                required
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Email Address (Read Only)</label>
              <input
                type="email"
                disabled
                value={profileForm.email}
                className="w-full px-3 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-xl cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-gray-700">Phone Number</label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Organization / Department</label>
              <input
                type="text"
                value={profileForm.organization}
                onChange={(e) => setProfileForm({ ...profileForm, organization: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700">Administrator Bio / Remarks</label>
            <textarea
              rows={2}
              value={profileForm.bio}
              onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0E7C7B]"
            />
          </div>

          {/* Password Reset Section */}
          <div className="p-4 bg-gray-50 rounded-xl space-y-3 pt-3 border border-gray-200/60">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-gray-500" />
              <span className="font-heading font-bold text-xs text-gray-800">
                Update Admin Password
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-gray-600">New Password</label>
                <input
                  type="password"
                  value={profileForm.newPassword}
                  onChange={(e) => setProfileForm({ ...profileForm, newPassword: e.target.value })}
                  placeholder="Leave empty to keep current password"
                  className="w-full px-3 py-2 border border-gray-300 bg-white rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-600">Confirm New Password</label>
                <input
                  type="password"
                  value={profileForm.confirmPassword}
                  onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                  placeholder="Repeat new password"
                  className="w-full px-3 py-2 border border-gray-300 bg-white rounded-xl focus:outline-none focus:border-[#0E7C7B]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onLogout}
              className="px-4 py-2 text-red-600 hover:bg-red-50 font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-[#0E7C7B] hover:bg-[#0A5E5D] text-white font-bold rounded-xl flex items-center gap-2 shadow-xs transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving to Excel...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
