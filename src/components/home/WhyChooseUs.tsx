"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Shield,
  Sparkles,
  Clock,
  Leaf,
  Award,
  Truck,
  Camera,
} from "lucide-react";

const features = [
  {
    icon: <Heart className="w-7 h-7" />,
    title: "One-to-One Care",
    description:
      "Your pet is the only one in the studio. No cages, no distractions — just dedicated, personal attention.",
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Calm & Anxiety-Free",
    description:
      "Our mindfulness-inspired approach creates a safe, soothing environment — perfect for nervous or anxious pets.",
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: "Expert Groomers",
    description:
      "Professionally trained and passionate about pets. Years of experience with all breeds and temperaments.",
  },
  {
    icon: <Leaf className="w-7 h-7" />,
    title: "Premium Products",
    description:
      "We use only hypoallergenic, cruelty-free, and eco-friendly grooming products that are gentle on skin.",
  },
  {
    icon: <Truck className="w-7 h-7" />,
    title: "Pickup & Drop-off",
    description:
      "Door-to-door service across Harrow. We'll collect your pet and return them looking fabulous.",
  },
  {
    icon: <Sparkles className="w-7 h-7" />,
    title: "Spa Treatments",
    description:
      "Beyond grooming — aromatherapy, massage, deep conditioning, and de-shedding for total wellness.",
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: "No Rushing",
    description:
      "We never rush a groom. Your pet's comfort and the quality of their treatment always comes first.",
  },
  {
    icon: <Camera className="w-7 h-7" />,
    title: "Photo Updates",
    description:
      "We send you adorable before-and-after photos so you can see the transformation in real time.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-white dark:bg-[#1E1E24]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-sm font-semibold uppercase tracking-widest"
          >
            The DOGSPA Difference
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mt-3 dark:text-white"
          >
            Why Choose DOGSPA?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle dark:text-gray-400"
          >
            We&apos;re not just groomers — we&apos;re pet wellness specialists dedicated
            to making every visit a positive experience.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group text-center p-6 rounded-2xl hover:bg-blush-light dark:hover:bg-[#272730] transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-blush dark:bg-[#383842] flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3
                className="text-lg font-bold text-navy dark:text-white mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {feature.title}
              </h3>
              <p className="text-charcoal/60 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
