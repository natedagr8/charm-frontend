import React from 'react';

type PageProps = {
  params: {
    charmId: string;
  };
};

export default async function CharmPage({ params }: PageProps) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/charm/${params.charmId}/images`);
  const data = await res.json();

  return (
    <main>
      <h1>Charm ID: {params.charmId}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}