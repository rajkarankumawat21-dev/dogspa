"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    petName: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormState({ name: "", email: "", phone: "", petName: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 bg-gradient-navy text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Get in <span className="text-gradient-gold">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg"
          >
            We&apos;d love to hear from you. Reach out by phone, WhatsApp, or the
            form below.
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-navy mb-8"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Contact Information
              </h2>

              <div className="space-y-6 mb-10">
                {[
                  {
                    icon: <MapPin className="w-6 h-6" />,
                    title: "Location",
                    text: "Harrow, London, United Kingdom",
                  },
                  {
                    icon: <Phone className="w-6 h-6" />,
                    title: "Phone",
                    text: "+44 7000 000 000",
                    href: "tel:+447000000000",
                  },
                  {
                    icon: <Mail className="w-6 h-6" />,
                    title: "Email",
                    text: "hello@dogspa.co.uk",
                    href: "mailto:hello@dogspa.co.uk",
                  },
                  {
                    icon: <Clock className="w-6 h-6" />,
                    title: "Hours",
                    text: "Mon – Sat: 9:00 AM – 6:00 PM | Sunday: Closed",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blush flex items-center justify-center text-gold shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy">{item.title}</h3>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-charcoal/60 hover:text-gold transition-colors"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <p className="text-charcoal/60">{item.text}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Contact */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/447000000000?text=Hi%20DOGSPA!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !text-sm"
                >
                  <span>💬 WhatsApp Us</span>
                </a>
                <a href="tel:+447000000000" className="btn-secondary !text-sm">
                  <Phone className="w-4 h-4" />
                  <span>Call Us</span>
                </a>
              </div>

              {/* Map */}
              <div className="mt-10 rounded-2xl overflow-hidden shadow-card h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19800.0!2d-0.3416!3d51.5802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487611e0e5c8e6e1%3A0x46d54c4c5a44e76e!2sHarrow!5e0!3m2!1sen!2suk!4v1!"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DOGSPA Harrow Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-navy mb-8"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Send Us a Message
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                >
                  <span className="text-5xl mb-4 block">✅</span>
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-green-700">
                    Thank you for reaching out. We&apos;ll get back to you within 24
                    hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-navy mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-cream focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                      placeholder="John Smith"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-navy mb-1.5"
                      >
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-cream focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-navy mb-1.5"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({ ...formState, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-cream focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                        placeholder="+44 7000 000 000"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="petName"
                      className="block text-sm font-medium text-navy mb-1.5"
                    >
                      Pet&apos;s Name &amp; Breed
                    </label>
                    <input
                      id="petName"
                      type="text"
                      value={formState.petName}
                      onChange={(e) =>
                        setFormState({ ...formState, petName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-cream focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                      placeholder="Biscuit - Cockapoo"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-navy mb-1.5"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-cream focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all resize-none"
                      placeholder="Tell us about your pet and how we can help..."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center !py-3.5">
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
