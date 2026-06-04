import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create a post?",
      answer:
        "Navigate to the Create Post page, enter your title, content, featured image, and publish your post.",
    },
    {
      question: "How do I edit a post?",
      answer:
        "Open your profile, locate the post you want to modify, click the edit option, make your changes, and save them.",
    },
    {
      question: "Can I upload images?",
      answer:
        "Yes. You can upload featured images for your posts and profile photos for your account.",
    },
    {
      question: "How do I update my profile?",
      answer:
        "Open your profile page and click the Edit Profile button. From there, you can update your username, bio, and profile photo.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Use the Forgot Password option on the login page. Follow the instructions sent to your email to create a new password.",
    },
    {
      question: "Can I delete a post?",
      answer:
        "Yes. Open your profile, find the post you want to remove, click the menu option on the post card, and select Delete.",
    },
    {
      question: "Do I need to complete my profile before posting?",
      answer:
        "Yes. Completing your profile helps personalize your account and unlocks the full publishing experience.",
    },
    {
      question: "How does the Generate with AI feature work?",
      answer:
        "Enter a title for your post and click the Generate with AI button. Vella uses the title as context and generates a draft that you can review, edit, and personalize before publishing.",
    },
    {
      question: "Why was Vella created?",
      answer:
        "Vella was built as a full-stack blogging platform focused on delivering a smooth publishing experience while exploring modern web development concepts and best practices.",
    },
    {
      question: "Is Vella open source?",
      answer:
        "Currently, Vella is an actively evolving project. Future plans regarding open-source availability may be announced as the platform grows.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 bg-gray-200 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            Frequently Asked Questions
          </h1>

          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about Vella and its features.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                rounded-2xl
                shadow-sm
                hover:shadow-md hover:-translate-y-1 transition duration-300
                overflow-hidden
              "
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  p-5
                  text-left
                  cursor-pointer
                "
              >
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  {faq.question}
                </span>

                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`
                  grid transition-all duration-300 ease-in-out
                  ${openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                `}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Still have questions? Visit the Contact section and reach out.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
