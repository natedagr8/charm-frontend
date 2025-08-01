'use client';

import React, { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [usernameModal, setUsernameModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('accessToken');
      setToken(storedToken);
    }
  }, []);

  const handleUsernameChange = async () => {
    if (!username) {
      alert('Please enter a new username.');
      return;
    }
    if (username.length < 5 || username.length > 32) {
      alert('Username must be between 5 and 32 characters.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/user/username`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value: username }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || 'Username update failed.');
        return;
      }

      alert('Username updated successfully!');
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error updating username:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleEmailChange = async () => {
    if (!email) {
      alert('Please enter a new email.');
      return;
    }
    if (email.length > 254) {
      alert('Email is too long.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/user/email`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value: email }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || 'Email update failed.');
        return;
      }

      alert('Email updated successfully!');
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      setEmailModal(false);
      setEmail('');
    } catch (error) {
      console.error('Error updating email:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !password) {
      alert('Please fill out both old and new password fields.');
      return;
    }
    
    if (password.length > 128) {
      alert('Password is too long.');
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long and include at least one letter and one number.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/auth/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: oldPassword,
          newPassword: password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || 'Password update failed.');
        return;
      }

      alert('Password updated successfully!');
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Something went wrong. Please try again.');
    }
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
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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