"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Sparkles } from "lucide-react";

export function StickyBookButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  // Hide on booking page
  const isBookingPage = pathname === "/booking";

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isBookingPage) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 sm:hidden"
        >
          <div className="bg-white/95 backdrop-blur-xl border-t border-gold/20 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
            <Link
              href="/booking"
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-gold-dark to-gold text-white rounded-xl font-semibold text-base shadow-gold"
            >
              <Sparkles className="w-5 h-5" />
              Book Your Spa Day
              <Calendar className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
