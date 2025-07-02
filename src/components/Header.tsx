'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white shadow-md">
      {/* Hamburger Menu */}
      <button onClick={() => console.log('Open nav menu')} aria-label="Menu">
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2"
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      {/* Logo */}
      <div onClick={() => router.push('/')} className="text-lg font-bold cursor-pointer">
        CharmTracker
      </div>

      {/* Profile Icon */}
      <button
        onClick={() => {
          const currentPath = window.location.pathname;
          router.push(isLoggedIn ? '/profile' : `/login?redirect=${currentPath}`);
        }}
        aria-label="Profile"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2"
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M5.121 17.804A10.954 10.954 0 0112 15c2.5 0 4.847.816 6.879 2.193M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      </button>
    </header>
  );
}