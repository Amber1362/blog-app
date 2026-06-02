import React from "react";
import { FaEnvelope, FaGithub } from "react-icons/fa6";

function ContactSection() {
  return (
    <section className="w-full py-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Main Card */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 sm:p-12 shadow-md border border-gray-200 dark:border-gray-700 text-center">
          
          {/* Heading */}
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            Let's Connect
          </h2>

          {/* Description */}
          <p className="mt-5 text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Have feedback, ideas, or just wanna talk tech?
            <br />
            Feel free to reach out.
          </p>

          {/* Contact Links */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
            
            {/* Email */}
            <a
              href="mailto:ambersingh365@gmail.com"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-lg">
                <FaEnvelope />
              </div>

              <div className="text-left">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Email
                </p>

                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  ambersingh365@gmail.com
                </p>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Amber1362"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-lg">
                <FaGithub />
              </div>

              <div className="text-left">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  GitHub
                </p>

                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  @Amber1362
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
