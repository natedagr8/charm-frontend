'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await res.json();
      localStorage.setItem('accessToken', data.accessToken); // adjust key if needed
      const redirectTo = searchParams.get('redirect') || '/profile';
      router.push(redirectTo);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  }

  const redirect = searchParams.get('redirect');

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Log In
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Don&apos;t have an account?{' '}
        <Link
          href={`/register${redirect ? `?redirect=${redirect}` : ''}`}
          className="text-blue-600 hover:underline"
        >
          Register here
        </Link>
      </p>
    </div>
  );
}