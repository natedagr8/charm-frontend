// eslint-disable-next-line @typescript-eslint/no-unused-vars
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setName(data.name || '');
          setBio(data.bio || '');
        }
      } catch (err) {
        console.error('Failed to fetch user info:', err);
      }
    };

    fetchUserInfo();
  }, []);
  const [trades, setTrades] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push(`/login?redirect=/profile`);
    }
  }, [router]);

  useEffect(() => {
    const fetchCharms = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/charm/my-charms`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setTrades(data.length);
        }
      } catch (err) {
        console.error('Failed to fetch charm count:', err);
      }
    };

    fetchCharms();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  const handleAccountSettings = () => {
    router.push('/profile/settings');
  };

  const handleEditToggle = useCallback(async () => {
    if (isEditing) {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      try {
        const nameRes = await fetch(`${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/user/name`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ value: name }),
        });

        const bioRes = await fetch(`${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/user/bio`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ value: bio }),
        });

        if (!nameRes.ok || !bioRes.ok) {
          console.error('Failed to update user info');
        }
      } catch (err) {
        console.error('Error updating user info:', err);
      }
    }
    setIsEditing(!isEditing);
  }, [isEditing, name, bio]);

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