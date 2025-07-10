'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState('Nate');
  const [bio, setBio] = useState('This is your bio.');
  const [trades, setTrades] = useState(1000);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push(`/login?redirect=/profile`);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  const handleAccountSettings = () => {
    router.push('/profile/settings');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bubble bubble-fade-edges text-center mb-6">
        {isEditing ? (
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <input
              className="text-2xl font-bold border rounded px-2 py-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="text-xl text-gray-500">- {trades} trades!</span>
          </div>
        ) : (
          <h1 className="text-2xl font-bold">
            {name} - {trades} trades!
          </h1>
        )}
      </div>

      <div className="bubble bubble-fade-edges text-black mb-6 p-4">
        <h2 className="text-lg font-semibold mb-2">Bio</h2>
        {isEditing ? (
          <textarea
            className="w-full border rounded px-2 py-1"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        ) : (
          <p>{bio}</p>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleEditToggle}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded"
          onClick={handleAccountSettings}
        >
          Account Settings
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}