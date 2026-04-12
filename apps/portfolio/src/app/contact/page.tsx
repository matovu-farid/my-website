"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Send } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import { sendEmail } from "@/actions/send-email";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await sendEmail(formData);
    setFormStatus(result);

    if (result.success) {
      (event.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 pt-24 pb-12 max-w-md">
        <PageTransition>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-center">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-center mb-10">
            Have a project in mind? Let&apos;s talk.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3.5 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3.5 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-3.5 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow resize-none"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 px-4 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Send size={16} />
              Send Message
            </motion.button>
          </form>

          {formStatus && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-lg text-sm ${
                formStatus.success
                  ? "bg-primary/10 text-primary"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {formStatus.message}
            </motion.div>
          )}
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
