import React, { useState } from "react";

// Step 1: Define the type for each FAQ item
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// Step 2: Sample FAQ data
const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces.",
  },
  {
    id: 2,
    question: "What is a component?",
    answer: "A component is a reusable piece of UI in a React app.",
  },
  {
    id: 3,
    question: "What is useState?",
    answer: "useState is a Hook that lets you add state to functional components.",
  },
];

// Step 3: The FAQ component
const FAQList: React.FC = () => {
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const toggleAnswer = (id: number) => {
    setOpenQuestionId(prev => (prev === id ? null : id));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>FAQ</h2>
      {faqData.map((faq) => (
        <div
          key={faq.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <div
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => toggleAnswer(faq.id)}
          >
            {faq.question}
          </div>
          {openQuestionId === faq.id && (
            <p style={{ marginTop: "8px", color: "#555" }}>{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQList;
