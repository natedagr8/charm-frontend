

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-black px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          At Charmski, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
        <p className="mb-4">
          We collect personal information you provide directly to us, such as your name, email address, and account details. We may also collect usage data for analytics and improvement purposes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
        <p className="mb-4">
          We use your information to provide and improve our services, personalize your experience, communicate with you, and ensure the security of our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Data Sharing and Security</h2>
        <p className="mb-4">
          We do not sell your personal information. Your data is protected with appropriate technical and organizational measures. We may share information with trusted third-party services as needed to operate Charmski.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal data. Contact us at support@charmski.com with any questions or requests.
        </p>

        <p className="mt-8 text-sm text-gray-600">
          This policy may be updated from time to time. Please review it periodically for changes.
        </p>
      </div>
    </div>
  );
}