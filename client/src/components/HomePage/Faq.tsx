import  { useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What services does the app provide?",
      answer:
        "Our app offers housing rentals, furniture and appliance rentals, and essential lifestyle services, all in one place.",
    },
    {
      question: "How does the app ensure safety and reliability?",
      answer:
        "We verify all listings and provide customer support to ensure a secure experience.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept various payment methods including credit/debit cards, UPI, and net banking.",
    },
  ];

  return (
    <div className="w-[66vw] mx-auto py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg border border-gray-200"
          >
            {/* Header */}
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {faq.question}
              </h3>
              <span className="text-xl text-gray-600">
                {activeIndex === index ? <FiX /> : <FiChevronDown />}
              </span>
            </div>

            {/* Content */}
            {activeIndex === index && (
              <div className="p-4 border-t border-gray-200">
                <p className="text-gray-700 mb-4">{faq.answer}</p>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 transition">
                  Learn more
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
