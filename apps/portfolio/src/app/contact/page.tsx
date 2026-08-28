"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import { sendEmail } from "@/actions/send-email";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await sendEmail(formData);
    setFormStatus(result);
    if (result.success) (event.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="page-hero"><div className="site-shell"><p className="eyebrow eyebrow-light">04 / Contact</p><h1>Let&apos;s make<br />the useful part.</h1><p>Tell me what you are trying to make, what is hard, and what good looks like. I&apos;ll bring the questions, structure, and a clear next step.</p></div></section>
        <section className="site-shell page-content"><PageTransition><div className="detail-layout"><div><p className="eyebrow">A good first message</p><h2 style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-.09em", lineHeight: .9, marginTop: ".8rem" }}>The brief can be rough.</h2><p style={{ color: "var(--slate)", maxWidth: "26rem", lineHeight: 1.6, marginTop: "1.5rem" }}>A product idea, a system that is slowing the team down, or a question about the right technical path is enough to start.</p></div><form className="contact-form" onSubmit={handleSubmit}><div className="form-grid"><div className="form-field"><label htmlFor="name">Name</label><input type="text" id="name" name="name" required /></div><div className="form-field"><label htmlFor="email">Email</label><input type="email" id="email" name="email" required /></div><div className="form-field form-field-wide"><label htmlFor="message">What are you building?</label><textarea id="message" name="message" required /></div></div><button type="submit" className="button-primary form-submit"><Send size={14} /> Send message</button>{formStatus && <p className="form-status" role="status">{formStatus.message}</p>}</form></div></PageTransition></section>
      </main>
      <Footer />
    </div>
  );
}
