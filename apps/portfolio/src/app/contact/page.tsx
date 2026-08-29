"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import { sendEmail } from "@/actions/send-email";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isSuccessOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSuccessOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isSuccessOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);

    setIsSubmitting(true);
    setFormStatus(null);

    try {
      const result = await sendEmail(formData);

      if (result.success) {
        form.reset();
        setIsSuccessOpen(true);
      } else {
        setFormStatus(result);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="page-hero"><div className="site-shell"><p className="eyebrow eyebrow-light">04 / Contact</p><h1>Let&apos;s make<br />the useful part.</h1><p>Tell me what you are trying to make, what is hard, and what good looks like. I&apos;ll bring the questions, structure, and a clear next step.</p></div></section>
        <section className="site-shell page-content"><PageTransition><div className="detail-layout"><div><p className="eyebrow">A good first message</p><h2 style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-.09em", lineHeight: .9, marginTop: ".8rem" }}>The brief can be rough.</h2><p style={{ color: "var(--slate)", maxWidth: "26rem", lineHeight: 1.6, marginTop: "1.5rem" }}>A product idea, a system that is slowing the team down, or a question about the right technical path is enough to start.</p></div><form className="contact-form" onSubmit={handleSubmit}><div className="form-grid"><div className="form-field"><label htmlFor="name">Name</label><input type="text" id="name" name="name" required /></div><div className="form-field"><label htmlFor="email">Email</label><input type="email" id="email" name="email" required /></div><div className="form-field form-field-wide"><label htmlFor="message">What are you building?</label><textarea id="message" name="message" required /></div></div><button type="submit" className="button-primary form-submit" disabled={isSubmitting} aria-busy={isSubmitting}><Send size={14} /> {isSubmitting ? "Sending…" : "Send message"}</button>{formStatus && <p className="form-status" role="status">{formStatus.message}</p>}</form></div></PageTransition></section>
      </main>
      <Footer />
      {isSuccessOpen && <div className="contact-success-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsSuccessOpen(false); }}><div className="contact-success-modal" role="dialog" aria-modal="true" aria-labelledby="contact-success-title" aria-describedby="contact-success-description"><div className="contact-success-icon" aria-hidden="true">✓</div><p className="eyebrow contact-success-eyebrow">Message received</p><h2 id="contact-success-title">Thanks for reaching out.</h2><p id="contact-success-description">Thanks for your business. I&apos;ve received your note and will reach out soon.</p><button ref={closeButtonRef} type="button" className="button-primary contact-success-close" onClick={() => setIsSuccessOpen(false)}>Close</button></div></div>}
    </div>
  );
}
