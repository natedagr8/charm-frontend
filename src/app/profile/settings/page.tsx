

'use client';

import React, { useState } from 'react';

export default function SettingsPage() {
  const [usernameModal, setUsernameModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const handleUsernameChange = () => {
    // Call API to update username
    setUsernameModal(false);
  };

  const handleEmailChange = () => {
    // Call API to update email
    setEmailModal(false);
  };

  const handlePasswordChange = () => {
    // Call API to update password
    setPasswordModal(false);
  };

  const handleDeleteAccount = () => {
    // Call API to delete account
    setDeleteModal(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Account Settings</h1>

      <div className="mb-6">
        <button onClick={() => setUsernameModal(true)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Update Username
        </button>
        {usernameModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-lg font-semibold mb-4">Update Username</h2>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="New Username"
                className="border p-2 w-full mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button onClick={() => setUsernameModal(false)} className="px-4 py-2">Cancel</button>
                <button onClick={handleUsernameChange} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <button onClick={() => setEmailModal(true)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Update Email
        </button>
        {emailModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-lg font-semibold mb-4">Update Email</h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="New Email"
                className="border p-2 w-full mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button onClick={() => setEmailModal(false)} className="px-4 py-2">Cancel</button>
                <button onClick={handleEmailChange} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <button onClick={() => setPasswordModal(true)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Update Password
        </button>
        {passwordModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-lg font-semibold mb-4">Update Password</h2>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Old Password"
                className="border p-2 w-full mb-4"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                className="border p-2 w-full mb-4"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="border p-2 w-full mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button onClick={() => setPasswordModal(false)} className="px-4 py-2">Cancel</button>
                <button onClick={handlePasswordChange} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-red-600 font-semibold mb-2">Delete Account</h2>
        <button onClick={() => setDeleteModal(true)} className="bg-red-500 text-white px-4 py-2 rounded">
          Delete My Account
        </button>
        {deleteModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-lg font-semibold text-red-600 mb-4">Are you sure?</h2>
              <div className="flex justify-end space-x-2">
                <button onClick={() => setDeleteModal(false)} className="px-4 py-2">Cancel</button>
                <button onClick={handleDeleteAccount} className="bg-red-600 text-white px-4 py-2 rounded">Confirm Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}