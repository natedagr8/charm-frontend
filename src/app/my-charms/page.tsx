'use client';

import { useEffect, useState } from 'react';

interface Charm {
  charmId: string;
  name: string;
  uploadedAt: string;
}

export default function MyCharmsPage() {
  const [charms, setCharms] = useState<Charm[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasToken, setHasToken] = useState(true);

  useEffect(() => {
    const fetchCharms = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setHasToken(false);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/charm/my-charms`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setCharms(data);
        }
      } catch (err) {
        console.error('Failed to fetch charms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharms();
  }, []);

  return (
    <div className="flex flex-col items-center pt-12 min-h-screen px-4 text-center gap-6 pb-12">
      <div className="bubble bubble-fade-edges p-4 w-full max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">My Charms</h1>
      {loading ? (
        <p>Loading...</p>
      ) : !hasToken ? (
        <p>
          You need an account to view your charms.{' '}
          <a href="/register" className="text-blue-400 underline">Register</a> or{' '}
          <a href="/login" className="text-blue-400 underline">Log in</a>.
        </p>
      ) : charms.length === 0 ? (
        <p>You haven’t uploaded to any charms yet.</p>
      ) : (
        <div role="list" className="space-y-4">
          {charms.map((charm) => (
            <a
              key={charm.charmId}
              href={`/charm/${charm.charmId}`}
              className="block bg-white bg-opacity-10 p-4 rounded-lg shadow transition hover:bg-opacity-20"
            >
              <h2 className="text-lg font-semibold">{charm.name}</h2>
              {charm.uploadedAt && (
                <p className="text-sm text-gray-400">
                  Uploaded on {new Date(charm.uploadedAt).toLocaleDateString()}
                </p>
              )}
            </a>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}