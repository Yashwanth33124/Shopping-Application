import React, { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import "./HelpModal.css";

const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      category: "REGISTRATION",
      q: "Why is my password invalid?",
      a: "For security, passwords must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character (e.g., ! @ # $ % & *)."
    },
    {
      category: "REGISTRATION",
      q: "How should I enter my phone number?",
      a: "Enter your 10-digit mobile number without the prefix. The country code (+91) is automatically configured. An SMS verification will be triggered."
    },
    {
      category: "REGISTRATION",
      q: "Email is already registered error?",
      a: "This means an account already exists with this email address. Please click 'ALREADY HAVE AN ACCOUNT? LOG IN' to access your account."
    },
    {
      category: "LOGIN",
      q: "I forgot my password. What should I do?",
      a: "Please click on customer support below to request a password reset link. Currently password resets are processed securely via email."
    },
    {
      category: "LOGIN",
      q: "What is Vogue Prime?",
      a: "Vogue Prime is an exclusive membership that grants you access to special limited-edition products. Look for the 'PRIME MEMBER' badge on items."
    },
    {
      category: "SUPPORT",
      q: "How do I contact customer care?",
      a: "You can email our customer relations team at support@voguecart.com. Response times are usually within 24 hours."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="help-modal-overlay" onClick={onClose}>
      <div className="help-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="help-modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="help-modal-header">
          <h2>HELP CENTER</h2>
          <p>GUIDANCE & TROUBLESHOOTING</p>
        </div>

        <div className="help-modal-body">
          <div className="help-section-title">FREQUENTLY ASKED QUESTIONS</div>
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <button className="faq-question-btn" onClick={() => toggleFaq(idx)}>
                  <span className="faq-cat-tag">[{faq.category}]</span>
                  <span className="faq-question-text">{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openFaq === idx && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="help-support-footer">
            <h3>STILL NEED ASSISTANCE?</h3>
            <p>Email: support@voguecart.com</p>
            <p>Hours: Mon - Fri | 09:00 - 18:00 IST</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
