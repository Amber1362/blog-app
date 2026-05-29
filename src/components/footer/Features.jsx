import React from "react";
import { Link } from "react-router-dom";
import {
  FaPenNib,
  FaRobot,
  FaBolt,
  FaUserShield,
  FaMoon,
  FaImages,
} from "react-icons/fa6";

function Features() {
  const features = [
    {
      icon: <FaPenNib />,
      title: "Rich Blog Editor",
      description:
        "Create beautifully formatted blogs with an advanced writing experience.",
    },
    {
      icon: <FaRobot />,
      title: "AI Assistance",
      description:
        "Generate ideas, improve content, and write faster using AI tools.",
    },
    {
      icon: <FaBolt />,
      title: "Fast Performance",
      description:
        "Optimized loading and smooth navigation for the best reading experience.",
    },
    {
      icon: <FaUserShield />,
      title: "Secure Authentication",
      description:
        "Protected user accounts with secure authentication and authorization.",
    },
    {
      icon: <FaMoon />,
      title: "Dark Mode",
      description:
        "Switch between light and dark themes for comfortable reading anytime.",
    },
    {
      icon: <FaImages />,
      title: "Media Uploads",
      description:
        "Upload featured images and personalize your posts visually.",
    },
  ];

  return (
    <section className="w-full py-16 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            Powerful Features
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to create, manage, and share modern blog
            content.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-600"
            >
              <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            to="/signup"
            className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
          >
            Start Writing Today
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Features;
