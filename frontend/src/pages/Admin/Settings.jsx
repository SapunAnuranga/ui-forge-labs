import React, { useState } from 'react';
import { changeCredentials, clearToken } from '../../api';
import { useToast } from '../../components/Toast';

const Settings = ({ onLogout }) => {
  const toast = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword.trim()) {
      toast('Please enter your current password.', 'error');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      toast('New password and confirm password do not match.', 'error');
      return;
    }

    if (!newUsername.trim() && !newPassword.trim()) {
      toast('Enter a new username or new password to update.', 'error');
      return;
    }

    setLoading(true);
    try {
      await changeCredentials(currentPassword, newUsername, newPassword);
      toast('Admin credentials updated successfully! Please login again.', 'success');
      setCurrentPassword('');
      setNewUsername('');
      setNewPassword('');
      setConfirmPassword('');
      // Force re-login since username/password changed
      setTimeout(() => {
        clearToken();
        onLogout();
      }, 1200);
    } catch (err) {
      toast(err.message || 'Failed to update credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center max-w-2xl mx-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">Admin Settings</h2>
        <p className="text-xs text-gray-500">Update your admin login username and password</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900/30 border border-gray-800 rounded-2xl p-5 space-y-4 backdrop-blur-md">
        <div>
          <label className="block text-[11px] text-gray-400 font-medium uppercase mb-1.5">
            Current Password *
          </label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter your current password to confirm changes"
            className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-xl text-white text-sm focus:outline-none transition"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-800/50">
          <div>
            <label className="block text-[11px] text-gray-400 font-medium uppercase mb-1.5">
              New Username (optional)
            </label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Leave blank to keep current"
              className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-xl text-white text-sm focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-[11px] text-gray-400 font-medium uppercase mb-1.5">
              New Password (optional)
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Leave blank to keep current"
              className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-xl text-white text-sm focus:outline-none transition"
            />
          </div>
        </div>

        {newPassword && (
          <div>
            <label className="block text-[11px] text-gray-400 font-medium uppercase mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-xl text-white text-sm focus:outline-none transition"
            />
          </div>
        )}

        <div className="flex justify-end pt-2 border-t border-gray-800/50">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-medium rounded-xl transition shadow-lg shadow-blue-600/10"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
