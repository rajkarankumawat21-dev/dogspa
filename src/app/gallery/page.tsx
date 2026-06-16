"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export default function GalleryPage() {
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
            Our <span className="text-gradient-gold">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg"
          >
            See the stunning transformations our groomers achieve every day.
          </motion.p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: "/images/gallery/before-after-1.png",
                alt: "Before and after grooming transformation",
                label: "Poodle Mix Transformation",
              },
              {
                src: "/images/story/scene-4-bath.png",
                alt: "Luxury spa bath",
                label: "Luxury Spa Bath",
              },
              {
                src: "/images/story/scene-5-styling.png",
                alt: "Expert styling session",
                label: "Expert Styling",
              },
              {
                src: "/images/story/scene-6-massage.png",
                alt: "Relaxation massage",
                label: "Relaxation Massage",
              },
              {
                src: "/images/story/scene-8-reveal.png",
                alt: "The big reveal",
                label: "The Big Reveal",
              },
              {
                src: "/images/story/scene-7-celebration.png",
                alt: "Happy pets",
                label: "Happy Pets",
              },
            ].map((img, index) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-card cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white font-semibold">{img.label}</span>
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
          Want Your Pet to Look This Good?
        </h2>
        <p className="text-charcoal/60 mb-6 max-w-lg mx-auto">
          Book a grooming session today and see the transformation for yourself.
        </p>
        <Link href="/booking" className="btn-primary">
          <Calendar className="w-5 h-5" />
          <span>Book Now</span>
        </Link>
      </section>
    </>
  );
}
