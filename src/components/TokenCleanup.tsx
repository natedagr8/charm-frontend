'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TokenCleanup() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        try {
          const { exp } = JSON.parse(atob(token.split('.')[1]));
          const isExpired = Date.now() >= exp * 1000;

          if (isExpired) {
            localStorage.removeItem('accessToken');
            router.push('/login'); // redirect after token removal
          }
        } catch (e) {
          console.error('Failed to parse token:', e);
          localStorage.removeItem('accessToken');
        }
      }
    };

    checkToken(); // initial check on mount
    const interval = setInterval(checkToken, 60 * 1000); // check every 60 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [router]);

  return null;
}