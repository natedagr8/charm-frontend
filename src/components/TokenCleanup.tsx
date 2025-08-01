'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TokenCleanup() {
  const router = useRouter();

  const checkToken = () => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      try {
        const parts = token.split('.');
        if (parts.length !== 3) throw new Error('Invalid token structure');
        const payload = JSON.parse(atob(parts[1]));
        const isExpired = !payload.exp || Date.now() >= payload.exp * 1000;

        if (isExpired) {
          localStorage.removeItem('accessToken');
          router.push('/login');
        }
      } catch (e) {
        console.error('Invalid or expired token:', e);
        localStorage.removeItem('accessToken');
        router.push('/login');
      }
    }
  };

  useEffect(() => {
    checkToken(); // initial check on mount
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken') {
        checkToken();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(checkToken, 60 * 1000); // check every 60 seconds

    return () => {
      clearInterval(interval); // cleanup on unmount
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [router]);

  return null;
}