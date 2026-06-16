"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Crown, Calendar } from "lucide-react";
import { servicePackages } from "@/data/services";
import { useTheme } from "@/components/ThemeProvider";

const packageIcons: Record<string, React.ReactNode> = {
  essential: <Sparkles size={32} strokeWidth={2.5} />,
  premium: <Crown size={32} strokeWidth={2.5} />,
  royal: <Crown size={32} strokeWidth={2.5} />,
};

// Luxury gradients adapted for packages
const packageGradients: Record<string, string> = {
  essential: "linear-gradient(137deg, #9E8033 0%, #C8A951 45%, #F4E4DC 100%)",
  premium: "linear-gradient(137deg, #C8A951 0%, #E8B4B4 45%, #D4C5E2 100%)",
  royal: "linear-gradient(137deg, #B5C4B1 0%, #9E8033 45%, #C8A951 100%)",
};

function FeatureCard({
  pkg,
  delay,
}: {
  pkg: typeof servicePackages[0];
  delay: number;
}) {
  const { theme } = useTheme();
  
  // Dynamic background for the foreground card based on theme
  const cardBgColor = theme === "dark" ? "#272730" : "#FFFFFF";
  const textColor = theme === "dark" ? "text-white" : "text-navy";
  const descColor = theme === "dark" ? "text-gray-400" : "text-charcoal/70";
  const gradient = packageGradients[pkg.id] || packageGradients.essential;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={`relative flex flex-col w-full h-full min-h-[420px] max-w-[340px] md:max-w-[380px] group mx-auto ${pkg.highlighted ? 'md:scale-105 z-10' : ''}`}
    >
      {/* Glow Background */}
      <div
        className="absolute inset-0 w-full h-full opacity-60 rounded-[40px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: gradient,
          filter: "blur(45px)",
        }}
      />

      {/* Foreground Card */}
      <div
        className="relative flex flex-col w-full h-full rounded-[40px] z-10 overflow-hidden glowing-card-border"
        style={{
          background: `linear-gradient(${cardBgColor}, ${cardBgColor}) padding-box, ${gradient} border-box`,
        }}
      >
        {/* Badge overlay on top of foreground */}
        {pkg.badge && (
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold z-20 ${
              pkg.highlighted
                ? "bg-gold text-navy"
                : "bg-navy text-white"
            }`}
          >
            {pkg.badge}
          </div>
        )}

        <div className="w-full flex-1 p-8 flex flex-col justify-between">
          <div className="mb-6">
            <div className={`mb-6 ${theme === 'dark' ? 'text-white/90' : 'text-gold'}`}>
              {packageIcons[pkg.id]}
            </div>
            
            <h3 className={`font-medium text-2xl mb-2 tracking-tight ${textColor} font-serif`}>
              {pkg.name}
            </h3>
            <p className={`text-[14px] leading-[1.6] font-normal selection:bg-gold/20 mb-4 ${descColor}`}>
              {pkg.tagline}
            </p>

            <div className={`text-3xl font-bold mb-6 ${textColor}`}>
              {pkg.priceLabel}
            </div>

            <ul className="space-y-2 mb-6">
              {pkg.features.slice(0, 3).map((feature, i) => (
                <li key={i} className={`text-[13px] ${descColor} flex items-center gap-2`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/booking"
            className={`relative overflow-hidden flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold transition-all duration-300 mt-auto transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 active:translate-y-1 ${
              pkg.highlighted
                ? "bg-gold text-white hover:bg-gold-light hover:shadow-[0_15px_30px_-5px_rgba(200,169,81,0.4)]"
                : theme === "dark" 
                  ? "bg-white text-navy hover:bg-gray-50 hover:shadow-[0_15px_30px_-5px_rgba(255,255,255,0.25)]" 
                  : "bg-blush text-gold hover:bg-blush-light hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.15)]"
            }`}
          >
            {/* Glossy overlay for 3D effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
            <Calendar className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Book {pkg.name}</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function PackagesSection() {
  const { theme } = useTheme();

  return (
    <section className={`py-24 sm:py-32 transition-colors duration-500 relative overflow-hidden ${theme === 'dark' ? 'bg-[#16161A]' : 'bg-gradient-blush'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-sm font-semibold uppercase tracking-widest"
          >
            Choose Your Package
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`section-title mt-3 font-serif ${theme === 'dark' ? 'text-white' : 'text-navy'}`}
          >
            Spa Packages
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`section-subtitle ${theme === 'dark' ? 'text-gray-400' : 'text-charcoal/70'}`}
          >
            From essential grooming to the ultimate luxury experience — find the
            perfect package for your pet.
          </motion.p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8 w-full max-w-[1100px] mx-auto items-stretch">
          {servicePackages.map((pkg, index) => (
            <FeatureCard
              key={pkg.id}
              pkg={pkg}
              delay={0.1 * (index + 1)}
            />
          ))}
        </div>

        {/* Deposit Info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`text-center text-sm mt-16 ${theme === 'dark' ? 'text-gray-500' : 'text-charcoal/50'}`}
        >
          💡 Pay in full online and save 5% — or secure your slot with just a
          20% deposit.
        </motion.p>
      </div>
    </section>
  );
}
