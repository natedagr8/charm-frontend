

import React from 'react';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

        <p className="mb-4">
          Welcome to Charmski. By accessing or using our website and services, you agree to be bound by the following terms and conditions.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of the Service</h2>
        <p className="mb-4">
          You agree to use Charmski in compliance with all applicable laws and regulations. You are responsible for all content you upload or interact with through our service.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Intellectual Property</h2>
        <p className="mb-4">
          All content, trademarks, and data on this site, including but not limited to software, databases, text, graphics, icons, and hyperlinks are the property of Charmski or its licensors.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Limitation of Liability</h2>
        <p className="mb-4">
          Charmski will not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or the inability to use the service.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Changes to These Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these terms at any time. We will notify users of any changes by updating this page.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms and Conditions, you can contact us at support@charmski.com.
        </p>
      </div>
    </div>
  );
}