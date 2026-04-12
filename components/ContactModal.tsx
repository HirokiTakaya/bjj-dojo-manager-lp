"use client";

import React, { useState, useEffect, useRef } from "react";

// ============================================================
// ⚠️  Web3Forms アクセスキーを設定してください！
//     https://web3forms.com にアクセスして、
//     hirokitakaya00@gmail.com を入力 → 無料キーが届きます。
//     届いたキーを下の YOUR_ACCESS_KEY_HERE に貼り付けてください。
// ============================================================
const WEB3FORMS_ACCESS_KEY = "ce1afedc-01c5-423c-880b-0fbc6338c083";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dojoName: "",
    dojoSize: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `🥋 Demo Request from ${formData.name} — ${formData.dojoName || "Unknown Dojo"}`,
          from_name: "BJJ Dojo Manager LP",
          name: formData.name,
          email: formData.email,
          dojo_name: formData.dojoName,
          dojo_size: formData.dojoSize,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", dojoName: "", dojoSize: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="contact-modal-overlay" onClick={handleBackdropClick}>
      <div className="contact-modal" ref={modalRef}>
        {/* Close button */}
        <button className="contact-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {status === "success" ? (
          <div className="contact-modal-success">
            <div className="success-icon">✓</div>
            <h3>Thank you!</h3>
            <p>We&apos;ll get back to you shortly.</p>
            <button className="contact-modal-btn" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="contact-modal-title">Request a Demo</h2>
            <p className="contact-modal-subtitle">
              Tell us about your dojo and we&apos;ll set up a walkthrough.
            </p>

            <form onSubmit={handleSubmit} className="contact-modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dojoName">Dojo Name</label>
                  <input
                    id="dojoName"
                    name="dojoName"
                    type="text"
                    placeholder="Your dojo name"
                    value={formData.dojoName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dojoSize">Dojo Size</label>
                  <select
                    id="dojoSize"
                    name="dojoSize"
                    value={formData.dojoSize}
                    onChange={handleChange}
                  >
                    <option value="">Select...</option>
                    <option value="1-30">1–30 members</option>
                    <option value="31-80">31–80 members</option>
                    <option value="81-150">81–150 members</option>
                    <option value="150+">150+ members</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Current Workflow / Questions</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="How do you currently manage attendance, payments, etc.?"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {status === "error" && (
                <p className="form-error">
                  Something went wrong. Please try again or email us directly at{" "}
                  <a href="mailto:hirokitakaya00@gmail.com">hirokitakaya00@gmail.com</a>.
                </p>
              )}

              <button
                type="submit"
                className="contact-modal-btn"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Request"}
              </button>
            </form>
          </>
        )}
      </div>

      {/* ===== Scoped Styles ===== */}
      <style jsx>{`
        .contact-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          animation: fadeIn 0.2s ease;
          padding: 1rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .contact-modal {
          position: relative;
          background: #1a1a1a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 2.5rem 2rem 2rem;
          animation: slideUp 0.3s ease;
          color: #f0f0f0;
        }

        .contact-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: #999;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          transition: color 0.2s;
        }
        .contact-modal-close:hover {
          color: #fff;
        }

        .contact-modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.25rem;
          letter-spacing: 0.02em;
        }

        .contact-modal-subtitle {
          color: #999;
          font-size: 0.9rem;
          margin: 0 0 1.5rem;
        }

        .contact-modal-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        @media (max-width: 500px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          .contact-modal {
            padding: 2rem 1.25rem 1.5rem;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .form-group label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #bbb;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          background: #111;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 6px;
          padding: 0.65rem 0.75rem;
          color: #f0f0f0;
          font-size: 0.95rem;
          font-family: inherit;
          transition: border-color 0.2s;
          outline: none;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #555;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: rgba(255, 255, 255, 0.35);
        }

        .form-group select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23999' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          padding-right: 2rem;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-error {
          color: #ff6b6b;
          font-size: 0.85rem;
          margin: 0;
        }
        .form-error a {
          color: #ff6b6b;
          text-decoration: underline;
        }

        .contact-modal-btn {
          width: 100%;
          padding: 0.75rem;
          border: none;
          border-radius: 6px;
          background: #fff;
          color: #000;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
          margin-top: 0.5rem;
          letter-spacing: 0.02em;
        }
        .contact-modal-btn:hover {
          opacity: 0.85;
        }
        .contact-modal-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Success state */
        .contact-modal-success {
          text-align: center;
          padding: 2rem 0;
        }
        .success-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #22c55e;
          color: #fff;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }
        .contact-modal-success h3 {
          font-size: 1.3rem;
          margin: 0 0 0.5rem;
        }
        .contact-modal-success p {
          color: #999;
          margin: 0 0 1.5rem;
        }
      `}</style>
    </div>
  );
}