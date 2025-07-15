
import { Metadata } from 'next';

type Props = {
  params: {
    username: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = await params;
  const username = awaitedParams.username;
  return {
    title: `${username}'s Profile`,
    description: `View the profile and charms of ${username}`,
  };
}


export default function UserProfilePage() {

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">[User Name Placeholder]</h1>
      <p className="text-gray-600 mb-6">[Bio Placeholder]</p>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Charms</h2>
        <p>[User&#39;s charms will be displayed here]</p>
      </section>
    </main>
  );
}