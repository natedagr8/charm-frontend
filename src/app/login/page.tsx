'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setIsSubmitting(false);
        throw new Error('Invalid credentials');
      }

      const data = await res.json();
      localStorage.setItem('accessToken', data.accessToken);
      const redirectTo = searchParams.get('redirect') || '/profile';
      router.push(redirectTo);
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
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
        <button
          type="submit"
          className={`w-full text-white py-2 rounded ${isSubmitting ? 'bg-blue-300' : 'bg-blue-600'}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Log In'}
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}