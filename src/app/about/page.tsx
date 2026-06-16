"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Shield, Sparkles, Leaf, Calendar } from "lucide-react";

const values = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Compassion First",
    text: "Every decision we make starts with what's best for your pet. Their comfort, safety, and happiness are non-negotiable.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Trust & Transparency",
    text: "We send photo updates, explain every step, and never cut corners. You'll always know exactly what's happening.",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Excellence",
    text: "We continuously train, use premium products, and perfect our craft. Your pet gets nothing less than the best.",
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Mindful Care",
    text: "Our approach is inspired by mindfulness — creating a calm, stress-free experience that pets actually enjoy.",
  },
];

export default function AboutPage() {
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
            About <span className="text-gradient-gold">DOGSPA</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg"
          >
            A sanctuary of calm for pets who deserve the luxury treatment.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                Our Story
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-navy mt-3 mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Born from a Love of Pets
              </h2>
              <div className="space-y-4 text-charcoal/70 leading-relaxed">
                <p>
                  DOGSPA was born from a simple belief: every pet deserves to
                  feel safe, loved, and pampered during their grooming
                  experience. Too often, grooming can be stressful for pets —
                  loud environments, crowded spaces, and rushed appointments.
                </p>
                <p>
                  We created something different. A one-to-one studio in
                  Harrow where your pet is the only focus. No cages. No
                  distractions. Just dedicated, personal attention from a
                  groomer who genuinely cares.
                </p>
                <p>
                  Our approach is inspired by mindfulness and calm. We
                  believe that when pets feel safe and relaxed, they not only
                  look better — they feel better too. That&apos;s the DOGSPA
                  difference.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-elevated"
            >
              <Image
                src="/images/story/scene-3-entering.png"
                alt="Inside DOGSPA studio"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              What Drives Us
            </span>
            <h2 className="section-title mt-3">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card flex gap-5"
              >
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-blush flex items-center justify-center text-gold">
                  {value.icon}
                </div>
                <div>
                  <h3
                    className="text-lg font-bold text-navy mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">
                    {value.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-blush text-center px-4">
        <h2
          className="text-2xl sm:text-3xl font-bold text-navy mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Come Experience the DOGSPA Difference
        </h2>
        <p className="text-charcoal/60 mb-6 max-w-lg mx-auto">
          Your pet&apos;s first spa day is just a booking away.
        </p>
        <Link href="/booking" className="btn-primary">
          <Calendar className="w-5 h-5" />
          <span>Book a Visit</span>
        </Link>
      </section>
    </>
  );
}
