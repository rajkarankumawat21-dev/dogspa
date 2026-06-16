"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Scissors, Heart, Bath } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const serviceFeatures = [
  {
    id: "grooming",
    name: "Full Grooming",
    description: "Breed-standard styling, premium bath, nail clipping, and a luxury finishing spritz.",
    icon: <Scissors size={32} strokeWidth={2.5} />,
    gradient: "linear-gradient(137deg, #9E8033 0%, #C8A951 45%, #F4E4DC 100%)",
  },
  {
    id: "spa",
    name: "Spa Treatments",
    description: "Aromatherapy, mud baths, and blueberry facials for the ultimate pampering session.",
    icon: <Sparkles size={32} strokeWidth={2.5} />,
    gradient: "linear-gradient(137deg, #C8A951 0%, #E8B4B4 45%, #D4C5E2 100%)",
  },
  {
    id: "puppy",
    name: "Puppy First Visit",
    description: "A gentle, positive introduction to grooming to build confidence for life.",
    icon: <Heart size={32} strokeWidth={2.5} />,
    gradient: "linear-gradient(137deg, #B5C4B1 0%, #9E8033 45%, #C8A951 100%)",
  },
  {
    id: "bath",
    name: "Wash & Fluff",
    description: "Deep cleansing bath, professional blow-dry, and thorough brush out between grooms.",
    icon: <Bath size={32} strokeWidth={2.5} />,
    gradient: "linear-gradient(137deg, #D4C5E2 0%, #7DD3FC 45%, #06B6D4 100%)",
  },
];

function FeatureCard({
  title,
  description,
  icon,
  gradient,
  delay,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
}) {
  const { theme } = useTheme();
  
  // Dynamic background for the foreground card based on theme
  const cardBgColor = theme === "dark" ? "#272730" : "#FFFFFF";
  const textColor = theme === "dark" ? "text-white" : "text-navy";
  const descColor = theme === "dark" ? "text-gray-400" : "text-charcoal/70";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className="relative flex flex-col justify-start items-start w-full max-w-[260px] md:max-w-[300px] group mx-auto"
    >
      {/* Glow Background */}
      <div
        className="absolute top-0 left-0 w-full h-[260px] md:h-[300px] opacity-60 rounded-[40px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: gradient,
          filter: "blur(45px)",
        }}
      />

      {/* Foreground Card */}
      <div
        className="relative self-stretch w-full h-[260px] md:h-[300px] rounded-[40px] z-10 overflow-hidden glowing-card-border"
        style={{
          background: `linear-gradient(${cardBgColor}, ${cardBgColor}) padding-box, ${gradient} border-box`,
        }}
      >
        <div className="w-full h-full p-7 flex flex-col justify-between">
          <div className="text-gold dark:text-white/90">
            {icon}
          </div>
          <div>
            <h3 className={`font-medium text-xl mb-3 tracking-tight ${textColor} font-serif`}>
              {title}
            </h3>
            <p className={`text-[14px] leading-[1.6] font-normal selection:bg-gold/20 ${descColor}`}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesPreview() {
  const { theme } = useTheme();
  
  return (
    <section className={`py-20 sm:py-28 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#16161A]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-sm font-semibold uppercase tracking-widest"
          >
            Our Offerings
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`section-title mt-3 font-serif ${theme === 'dark' ? 'text-white' : 'text-navy'}`}
          >
            Grooming &amp; Spa Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`section-subtitle ${theme === 'dark' ? 'text-gray-400' : 'text-charcoal/70'}`}
          >
            Tailored treatments designed to keep your pet looking, feeling, and
            smelling their absolute best.
          </motion.p>
        </div>

        {/* Services Grid using Glowing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 w-full max-w-[1200px] mx-auto mb-16">
          {serviceFeatures.map((service, index) => (
            <FeatureCard
              key={service.id}
              title={service.name}
              description={service.description}
              icon={service.icon}
              gradient={service.gradient}
              delay={0.1 * (index + 1)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/services"
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 ${
              theme === 'dark' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-navy text-white hover:bg-navy-light'
            }`}
          >
            View Full Service Menu
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
