import { use } from 'react';

export default function CharmHistoryPage({ params }: { params: { charmId: string } }) {
  return <div>Charm ID: {params.charmId}</div>;
}