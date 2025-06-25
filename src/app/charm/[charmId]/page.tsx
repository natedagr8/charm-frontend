'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type CharmImage = {
  id: number;
  imageUrl: string;
  message: string;
  charm: {
    id: number;
    charmId: string;
    name: string;
  };
};

export default function CharmPage() {
  const { charmId } = useParams();
  const [data, setData] = useState<CharmImage[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/charm/${charmId}/images`
        );
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Failed to fetch charm data:', error);
      }
    }

    if (charmId) {
      fetchData();
    }
  }, [charmId]);

  return (
    <main>
      <h1>Charm ID: {charmId}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}