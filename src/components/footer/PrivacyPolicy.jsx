import React from "react";
import Container from "../container/Container";

function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      icon: "📊",
      content: (
        <>
          {" "}
          <p className="mb-3">
            When you use Vella, we may collect the following information:{" "}
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Name and email address</li>
            <li>Username and profile information</li>
            <li>Profile photos and content you publish</li>
            <li>Device, browser, and usage information</li>
            <li>IP address and analytics data</li>
          </ul>
        </>
      ),
    },

    {
      title: "How We Use Your Information",
      icon: "⚙️",
      content: (
        <>
          <p className="mb-3">We use the information we collect to:</p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Create and manage your account</li>
            <li>Provide access to platform features</li>
            <li>Improve platform performance and user experience</li>
            <li>Maintain security and prevent abuse</li>
            <li>Respond to support requests and feedback</li>
          </ul>
        </>
      ),
    },

    {
      title: "AI Features",
      icon: "🤖",
      content: (
        <>
          <p>Vella includes AI-powered content generation features.</p>

          <p className="mt-3">
            When you use the "Generate with AI" feature, information such as the
            title you provide may be processed by third-party AI services to
            generate content suggestions.
          </p>

          <p className="mt-3">
            AI-generated content should always be reviewed before publishing.
          </p>
        </>
      ),
    },

    {
      title: "Cookies & Tracking",
      icon: "🍪",
      content: (
        <>
          <p className="mb-3">
            Vella may use cookies and similar technologies to:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Keep users signed in</li>
            <li>Remember preferences</li>
            <li>Improve website performance</li>
            <li>Analyze usage patterns</li>
          </ul>

          <p className="mt-3">
            You can control cookies through your browser settings.
          </p>
        </>
      ),
    },

    {
      title: "Data Storage & Security",
      icon: "🔐",
      content: (
        <>
          <p>
            We take reasonable steps to protect your information and maintain
            platform security.
          </p>

          <p className="mt-3">
            However, no method of internet transmission or electronic storage is
            completely secure, and we cannot guarantee absolute security.
          </p>
        </>
      ),
    },

    {
      title: "Your Rights",
      icon: "👤",
      content: (
        <>
          <p className="mb-3">You may have the right to:</p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Access your personal information</li>
            <li>Update profile information</li>
            <li>Delete your account</li>
            <li>Request removal of personal data</li>
          </ul>
        </>
      ),
    },

    {
      title: "Third-Party Services",
      icon: "🔗",
      content: (
        <>
          <p className="mb-3">
            Vella may rely on third-party services including:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Appwrite</li>
            <li>Vercel</li>
            <li>Google Gemini AI</li>
          </ul>

          <p className="mt-3">
            These services may process information according to their own
            privacy policies.
          </p>
        </>
      ),
    },

    {
      title: "Policy Updates",
      icon: "📝",
      content: (
        <>
          <p>We may update this Privacy Policy from time to time.</p>

          <p className="mt-3">
            Changes will be reflected on this page along with an updated
            revision date.
          </p>
        </>
      ),
    },

    {
      title: "Contact Us",
      icon: "📬",
      content: (
        <>
          <p>
            If you have questions regarding this Privacy Policy, feel free to
            contact us.
          </p>

          <p className="mt-4 font-medium"><a href='mailto:ambersingh365@gmail.com'>ambersingh365@gmail.com</a></p>
        </>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-200 dark:bg-gray-800 py-10">
      {" "}
      <Container>
        {" "}
        <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md border border-gray-100 dark:border-gray-600 p-8 mb-8">
          {" "}
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
            Privacy Policy{" "}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Last Updated: May 30, 2026
          </p>
          <p className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
            We value your privacy and are committed to protecting your personal
            information. This page explains what information Vella collects, how
            it is used, and the choices available to you.
          </p>
        </div>
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-md border border-gray-100 dark:border-gray-600 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                {section.icon} {section.title}
              </h2>

              <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default PrivacyPolicy;
