"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Calendar, ArrowRight } from "lucide-react";
import { services, servicePackages } from "@/data/services";

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 bg-gradient-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="absolute text-8xl"
              style={{
                left: `${(i * 13) % 100}%`,
                top: `${(i * 20) % 100}%`,
                transform: `rotate(${i * 45}deg)`,
              }}
            >
              🐾
            </span>
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Our <span className="text-gradient-gold">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            Premium grooming and spa treatments tailored to every breed, size,
            and personality. Your pet deserves the best.
          </motion.p>
        </div>
      </section>

      {/* Individual Services */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card !p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{service.icon}</span>
                    <h2
                      className="text-2xl font-bold text-navy"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {service.name}
                    </h2>
                    {service.popular && (
                      <span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-charcoal/70 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-charcoal/60"
                      >
                        <Check className="w-4 h-4 text-gold shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-center justify-center text-center md:min-w-[160px] md:border-l md:border-gold/10 md:pl-6">
                  <span className="text-3xl font-bold text-gold mb-1">
                    {service.price}
                  </span>
                  <span className="text-sm text-charcoal/50 mb-4">
                    {service.duration}
                  </span>
                  <Link
                    href="/booking"
                    className="btn-primary !py-2.5 !px-5 !text-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-padding bg-gradient-blush">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Value Packages
            </span>
            <h2 className="section-title mt-3">Spa Packages</h2>
            <p className="section-subtitle">
              Save with our curated packages — everything your pet needs in one
              visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {servicePackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative rounded-2xl p-7 transition-all duration-300 ${
                  pkg.highlighted
                    ? "bg-white border-2 border-gold shadow-elevated md:scale-105"
                    : "bg-white border border-gold/10 shadow-card"
                }`}
              >
                {pkg.badge && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                      pkg.highlighted
                        ? "bg-gold text-white"
                        : "bg-navy text-white"
                    }`}
                  >
                    {pkg.badge}
                  </div>
                )}

                <h3
                  className="text-2xl font-bold text-navy mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {pkg.name}
                </h3>
                <p className="text-charcoal/50 text-sm mb-5">{pkg.tagline}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-navy">
                    {pkg.priceLabel}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span className="text-sm text-charcoal/70">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/booking"
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all ${
                    pkg.highlighted
                      ? "btn-primary !rounded-xl"
                      : "btn-secondary !rounded-xl"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book {pkg.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center px-4">
        <h2
          className="text-2xl sm:text-3xl font-bold text-navy mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Not Sure What Your Pet Needs?
        </h2>
        <p className="text-charcoal/60 mb-6 max-w-lg mx-auto">
          Get in touch and we&apos;ll recommend the perfect treatment for your
          furry friend.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/447000000000?text=Hi!%20I%20need%20help%20choosing%20a%20service%20for%20my%20pet."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <span>💬 Chat on WhatsApp</span>
          </a>
          <Link href="/contact" className="btn-secondary">
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
