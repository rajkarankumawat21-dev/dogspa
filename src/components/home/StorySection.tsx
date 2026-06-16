"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar } from "lucide-react";

const storyScenes = [
  {
    id: 1,
    image: "/images/story/scene-1-arrival-v2.png",
    title: "A Happy Arrival",
    description:
      "Your furry friend is excited — it's spa day! Every visit begins with a warm, tail-wagging welcome.",
    align: "left" as const,
  },
  {
    id: 2,
    image: "/images/story/scene-2-pickup-v2.png",
    title: "Door-to-Door Luxury",
    description:
      "No need to drive — our premium pickup service brings the spa experience right to your doorstep.",
    align: "right" as const,
  },
  {
    id: 3,
    image: "/images/story/scene-3-entering-v2.png",
    title: "Welcome to DOGSPA",
    description:
      "Step into our calming, one-to-one studio. Soft lighting, soothing music, and premium aromatherapy set the mood.",
    align: "left" as const,
  },
  {
    id: 4,
    image: "/images/story/scene-4-bath-v2.png",
    title: "The Luxury Bath",
    description:
      "A warm, bubbly spa bath with premium hypoallergenic products. Pure bliss for sensitive skin and silky coats.",
    align: "right" as const,
  },
  {
    id: 5,
    image: "/images/story/scene-5-styling.png",
    title: "Expert Styling",
    description:
      "Our skilled groomers craft the perfect look — from breed-standard cuts to custom styles your pet will love.",
    align: "left" as const,
  },
  {
    id: 6,
    image: "/images/story/scene-6-massage-v2.png",
    title: "Relaxation Massage",
    description:
      "Gentle aromatherapy massage to soothe muscles, reduce anxiety, and leave your pet feeling utterly pampered.",
    align: "right" as const,
  },
  {
    id: 7,
    image: "/images/story/scene-7-celebration-v2.png",
    title: "Happy & Glowing",
    description:
      "Dogs, cats — everyone leaves DOGSPA looking fabulous, feeling fantastic, and smelling divine!",
    align: "left" as const,
  },
  {
    id: 8,
    image: "/images/story/scene-8-reveal.png",
    title: "The Big Reveal",
    description:
      "The moment you've been waiting for — witness the stunning transformation. Prepare to be amazed! ✨",
    align: "right" as const,
  },
];

function StoryScene({
  scene,
  index,
}: {
  scene: (typeof storyScenes)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 0.95]
  );

  const isLeft = scene.align === "left";

  return (
    <div ref={ref} className="py-12 sm:py-16 md:py-20">
      <motion.div
        style={{ opacity, scale }}
        className={`flex flex-col ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
          } items-center gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto px-4`}
      >
        {/* Image */}
        <motion.div style={{ y }} className="w-full md:w-1/2">
          {/* Outer wrapper handles the 3D scaling and provides stacking context */}
          <div className="relative aspect-square max-w-md mx-auto transition-transform duration-500 hover:scale-[1.03] group isolate">
            
            {/* Smooth hardware-accelerated golden glow that fades in on hover */}
            <div className="absolute -inset-4 bg-gold/20 dark:bg-gold/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[3rem] -z-10" />
            
            {/* Inner container handles the base shadow and clips the image */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-navy/10 dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] ring-1 ring-black/5 dark:ring-white/10">
              <Image
              src={scene.image}
              alt={scene.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Scene Number Badge */}
            <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center text-sm font-bold shadow-lg">
              {scene.id}
            </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className={`w-full md:w-1/2 ${isLeft ? "md:text-left" : "md:text-right"} text-center`}
          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">
            Step {scene.id}
          </span>
          <h3
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mt-2 mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {scene.title}
          </h3>
          <p className="text-charcoal/70 text-base sm:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            {scene.description}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function StorySection() {
  return (
    <section className="relative bg-cream py-16 sm:py-20 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12 px-4">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold text-sm font-semibold uppercase tracking-widest"
        >
          The DOGSPA Journey
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-title mt-3"
        >
          A Day at the Spa
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-subtitle"
        >
          Follow along as your pet experiences the ultimate luxury grooming
          journey from start to finish.
        </motion.p>
      </div>

      {/* Story Scenes */}
      <div className="relative">
        {/* Connecting Line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

        {storyScenes.map((scene, index) => (
          <StoryScene key={scene.id} scene={scene} index={index} />
        ))}
      </div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12 px-4"
      >
        <p
          className="text-2xl sm:text-3xl font-bold text-navy mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Ready for Your Pet&apos;s Transformation?
        </p>
        <Link href="/booking" className="btn-primary !py-4 !px-8 !text-base">
          <Calendar className="w-5 h-5" />
          <span>Book Their Spa Day</span>
        </Link>
      </motion.div>
    </section>
  );
}
