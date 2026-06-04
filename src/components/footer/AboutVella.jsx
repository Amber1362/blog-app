import React from "react";
import { FaRocket, FaCode, FaLightbulb, FaRoad } from "react-icons/fa6";

function AboutVella() {
  return (
    <section className="w-full py-16 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 sm:p-12 shadow-md border border-gray-200 dark:border-gray-700">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
              About Vella
            </h2>

            <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              A modern publishing platform built with simplicity, performance,
              and user experience at its core.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What is Vella */}
            <div
              className="bg-white dark:bg-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-md hover:-translate-y-1 transition duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaRocket className="text-indigo-600 text-xl" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  What is Vella?
                </h3>
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Vella is a blogging platform designed to make publishing content
                simple, enjoyable, and distraction-free.
              </p>
            </div>

            {/* Why Build */}
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-md hover:-translate-y-1 transition duration-300">
              <div className="flex items-center gap-3 mb-4">
                <FaLightbulb className="text-indigo-600 text-xl" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Why Vella?
                </h3>
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Vella was created to explore how a complete content platform
                works in the real world—from authentication and profiles to
                publishing, media management, and user experience.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-md hover:-translate-y-1 transition duration-300">
              <div className="flex items-center gap-3 mb-4">
                <FaCode className="text-indigo-600 text-xl" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Tech Stack
                </h3>
              </div>

              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• React</li>
                <li>• Redux Toolkit</li>
                <li>• Tailwind CSS</li>
                <li>• Appwrite</li>
                <li>• React Hook Form</li>
                <li>• Framer Motion</li>
              </ul>
            </div>

            {/* Roadmap */}
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-md hover:-translate-y-1 transition duration-300">
              <div className="flex items-center gap-3 mb-4">
                <FaRoad className="text-indigo-600 text-xl" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Roadmap
                </h3>
              </div>

              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>✓ Authentication & Profiles</li>
                <li>✓ Publishing & Media Uploads</li>
                <li>⏳ Comments</li>
                <li>⏳ Bookmarks</li>
                <li>⏳ Search & Discovery</li>
                <li>⏳ Enhanced Writing Experience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutVella;
