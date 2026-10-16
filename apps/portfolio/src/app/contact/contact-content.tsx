"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import { sendEmail } from "@/actions/send-email";
import { site } from "@/data/site";

const deliveryError = "Your message couldn’t be sent. Please try again, or use the email link on this page.";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const successDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!isSuccessOpen) return;

    const dialog = successDialogRef.current;
    // Native modal focus containment, Escape dismissal, and focus restoration.
    dialog?.showModal();
    return () => dialog?.close();
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
        setFormStatus({ success: false, message: deliveryError });
      }
    } catch {
      setFormStatus({ success: false, message: deliveryError });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="page-hero">
          <div className="site-shell">
            <h1>Let&apos;s talk about<br />your next hire.</h1>
            <p>I&apos;m open to senior remote product and full-stack engineering roles. If your team needs someone who can take a product from domain modelling to delivery, I&apos;d like to hear from you.</p>
          </div>
        </section>
        <section className="site-shell page-content">
          <PageTransition>
            <div className="detail-layout contact-layout">
              <div className="contact-intro">
                <h2>Start a conversation.</h2>
                <p>Based in {site.location} ({site.timezone}). {site.availability}.</p>
                <p>Hiring? Share the role, what the team is building, and any location or time-zone requirements. Product and consulting inquiries are welcome too.</p>
                <ul className="contact-links" aria-label="Direct contact and profile">
                  <li><a href={`mailto:${site.email}`}>Email {site.email}</a></li>
                  <li><a href={site.linkedin}>Connect on LinkedIn</a></li>
                  <li><a href={site.resumePath} download>Download résumé (PDF)</a></li>
                </ul>
              </div>
              <form className="contact-form" onSubmit={handleSubmit} aria-labelledby="contact-form-title">
                <h2 id="contact-form-title">Send a message</h2>
                <p className="form-help" id="contact-form-help">All fields are required. A short introduction is enough.</p>
                <div className="form-grid">
                  <div className="form-field"><label htmlFor="name">Name</label><input type="text" id="name" name="name" autoComplete="name" disabled={isSubmitting} required /></div>
                  <div className="form-field"><label htmlFor="email">Email</label><input type="email" id="email" name="email" autoComplete="email" disabled={isSubmitting} required /></div>
                  <div className="form-field form-field-wide"><label htmlFor="message">Role or project details</label><textarea id="message" name="message" aria-describedby="contact-form-help" disabled={isSubmitting} required /></div>
                </div>
                <button type="submit" className="button-primary form-submit" disabled={isSubmitting} aria-busy={isSubmitting}><Send size={14} aria-hidden="true" /> {isSubmitting ? "Sending…" : "Send message"}</button>
                {formStatus && <p className="form-status" role="alert">{formStatus.message}</p>}
              </form>
            </div>
          </PageTransition>
        </section>
      </main>
      <Footer />
      {isSuccessOpen && (
        <dialog ref={successDialogRef} className="contact-success-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-success-title" aria-describedby="contact-success-description" onCancel={() => setIsSuccessOpen(false)}>
          <div className="contact-success-modal">
            <h2 id="contact-success-title">Thanks for reaching out.</h2>
            <p id="contact-success-description">Your message has been sent. I&apos;ll reply to the email address you provided.</p>
            <button type="button" className="button-primary contact-success-close" onClick={() => setIsSuccessOpen(false)}>Close</button>
          </div>
        </dialog>
      )}
    </div>
  );
}
