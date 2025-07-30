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
          We collect personal information you provide directly to us, such as your name, email address, and account details. We also collect content you submit, including images and messages associated with charms. We may collect usage data for analytics and improvement purposes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
        <p className="mb-4">
          We use your information to provide and improve our services, personalize your experience, communicate with you, and ensure the security of our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">User-Generated Content</h2>
        <p className="mb-4">
          When you upload images and messages, we store and display them publicly as part of the charm’s history. Please avoid uploading sensitive or private content.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Data Sharing and Security</h2>
        <p className="mb-4">
          We do not sell your personal information. Your data is protected with appropriate technical and organizational measures. We may share information with trusted third-party services as needed to operate Charmski.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal data. Contact us at <a href="mailto:support@charmski.com" className="text-blue-600 hover:underline">support@charmski.com</a> with any questions or requests.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies and Analytics</h2>
        <p className="mb-4">
          We may use cookies or analytics tools to collect aggregated, non-personally identifiable information to help us understand platform usage and improve performance.
        </p>

        <p className="mt-8 text-sm text-gray-600">
          This policy may be updated from time to time. Please review it periodically for changes.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          This policy is governed by the laws of the United States.
        </p>
      </div>
    </div>
  );
}