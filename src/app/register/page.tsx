'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function RegisterPage() {
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promotionalOptIn, setPromotionalOptIn] = useState(true);

  // Validation constraints
  const MAX_NAME_LENGTH = 32;
  const MAX_USERNAME_LENGTH = 32;
  const MAX_EMAIL_LENGTH = 254;
  const MAX_PASSWORD_LENGTH = 128;
  const MIN_NAME_LENGTH = 3;
  const MIN_USERNAME_LENGTH = 5;

  useEffect(() => {
    const errors: string[] = [];

    if (name.length > MAX_NAME_LENGTH) errors.push('Name is too long');
    if (name.length > 0 && name.length < MIN_NAME_LENGTH) errors.push('Name is too short');
    if (username.length > MAX_USERNAME_LENGTH) errors.push('Username is too long');
    if (username.length > 0 && username.length < MIN_USERNAME_LENGTH) errors.push('Username is too short');
    if (email.length > MAX_EMAIL_LENGTH) errors.push('Email is too long');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length > 0 && !emailRegex.test(email)) errors.push('Invalid email format');
    if (password.length > MAX_PASSWORD_LENGTH) errors.push('Password is too long');
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (password.length > 0 && !passwordRegex.test(password)) errors.push('Password must be at least 8 characters long and include at least one letter and one number');

    setError(errors.join(', '));
  }, [name, username, email, password]);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (error) {
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, username, password, promotionalEmailOptIn: promotionalOptIn }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await res.json();
      localStorage.setItem('accessToken', data.accessToken);
      const redirectTo = searchParams.get('redirect') || '/profile';
      window.location.href = redirectTo;
      setIsSubmitting(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="bubble bubble-fade-edges">
        <h1 className="text-xl font-bold mb-4">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, MAX_NAME_LENGTH))}
            maxLength={MAX_NAME_LENGTH}
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value.slice(0, MAX_USERNAME_LENGTH))}
            maxLength={MAX_USERNAME_LENGTH}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value.slice(0, MAX_EMAIL_LENGTH))}
            maxLength={MAX_EMAIL_LENGTH}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value.slice(0, MAX_PASSWORD_LENGTH))}
            maxLength={MAX_PASSWORD_LENGTH}
          />
          {error && <p className="text-red-600">{error}</p>}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={promotionalOptIn}
              onChange={(e) => setPromotionalOptIn(e.target.checked)}
            />
            <span className="text-sm">I want to receive promotional emails</span>
          </label>
          <button
            type="submit"
            className={`w-full py-2 rounded text-white ${isSubmitting ? 'bg-blue-300' : 'bg-blue-600'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function RegisterPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterPage />
    </Suspense>
  );
}