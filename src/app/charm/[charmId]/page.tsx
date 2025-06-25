import React from 'react';

type Props = {
  params: {
    charmId: string;
  };
};

export default function CharmPage({ params }: Props) {
  return (
    <div>
      <h1>Charm ID: {params.charmId}</h1>
    </div>
  );
}