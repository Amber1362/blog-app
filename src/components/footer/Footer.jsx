import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { FaGithub, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div>
      <section className="relative overflow-hidden py-10 bg-white dark:bg-gray-900">
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="-m-6 flex flex-wrap">
            <div className="w-full p-6 md:w-1/2 lg:w-5/12">
              <div className="flex h-full flex-col justify-between">
                <div className="mb-4 inline-flex items-center">
                  <Logo width="100px" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    © 2026 Vella. All rights reserved.
                  </p>
                  <div className="flex gap-4 mt-3">
                    <a
                      href="https://github.com/Amber1362"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-indigo-600 dark:hover:text-gray-700 text-sm"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a
                      href="https://www.instagram.com/amberr_singh/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-indigo-600 dark:hover:text-gray-700 text-sm"
                    >
                      <FaInstagram size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-2/12">
              <div className="h-full">
                <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500 dark:text-gray-500">
                  Company
                </h3>
                <ul>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-900 dark:text-gray-400 dark:hover:text-gray-500 hover:text-indigo-600"
                      to="/about-vella"
                    >
                      About Vella
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-900 dark:text-gray-400 dark:hover:text-gray-500 hover:text-indigo-600"
                      to="/features"
                    >
                      Features
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-900 dark:text-gray-400 dark:hover:text-gray-500 hover:text-indigo-600"
                      to="/contact"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-2/12">
              <div className="h-full">
                <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500 dark:text-gray-500">
                  Support
                </h3>
                <ul>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-900 dark:text-gray-400 dark:hover:text-gray-500 hover:text-indigo-600"
                      to="/faq"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://github.com/Amber1362/blog-app/issues/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-gray-900 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-gray-500"
                    >
                      Report a Bug
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-3/12">
              <div className="h-full">
                <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500 dark:text-gray-500">
                  Legals
                </h3>
                <ul>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-900 dark:text-gray-400 dark:hover:text-gray-500 hover:text-indigo-600"
                      to="/terms-and-conditions"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-900 dark:text-gray-400 dark:hover:text-gray-500 hover:text-indigo-600"
                      to="/privacy-policy"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
