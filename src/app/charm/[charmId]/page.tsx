import React from 'react';

type PageProps = {
  params: {
    charmId: string;
  };
};

export default async function CharmPage({ params }: PageProps) {
  // TODO: Replace this with your actual fetch call
  // const res = await fetch(`https://api.example.com/charm/${params.charmId}`);
  // const data = await res.json();

  return (
    <main>
      <h1>Charm ID: {params.charmId}</h1>
    </main>
  );
}