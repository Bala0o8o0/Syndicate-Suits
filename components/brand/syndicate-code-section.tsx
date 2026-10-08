"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type TargetAndTransition,
} from "framer-motion";
import {
  KineticTiltCard,
  KineticWords,
  ScrollVelocitySkew,
} from "@/components/ui/kinetic-scroll";

interface CodePillar {
  id: string;
  step: string;
  title: string;
  description: string;
  iconSrc: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
  idleAnim: TargetAndTransition;
  hoverAnim: TargetAndTransition;
}

const CODE_PILLARS: CodePillar[] = [
  {
    id: "cut",
    step: "THE CUT",
    title: "BUILT TO FIT.",
    description: "Sharp silhouettes designed to make the right impression.",
    iconSrc: "/images/syndicate-code/icon-cut-scissors.png",
    iconAlt: "Syndicate Cut Tailor Shears",
    iconWidth: 68,
    iconHeight: 68,
    idleAnim: {
      rotate: [-2, 3, -2],
      y: [0, -2, 0],
      transition: {
        duration: 3.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    hoverAnim: {
      rotate: [-14, 10, -8, 4, 0],
      scale: 1.15,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  },
  {
    id: "fabric",
    step: "THE FABRIC",
    title: "NO SHORTCUTS.",
    description: "Premium materials selected for comfort, structure and character.",
    iconSrc: "/images/syndicate-code/icon-fabric-spool.png",
    iconAlt: "Syndicate Fabric Thread Spool",
    iconWidth: 64,
    iconHeight: 68,
    idleAnim: {
      rotate: [-1.5, 1.5, -1.5],
      y: [0, -2.5, 0],
      transition: {
        duration: 3.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4,
      },
    },
    hoverAnim: {
      rotate: [0, -18, 14, -6, 0],
      scale: 1.12,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  {
    id: "detail",
    step: "THE DETAIL",
    title: "LOOK CLOSER.",
    description: "From the lapel to the lining, every detail earns its place.",
    iconSrc: "/images/syndicate-code/icon-detail-loupe.png",
    iconAlt: "Syndicate Detail Magnifying Loupe",
    iconWidth: 54,
    iconHeight: 68,
    idleAnim: {
      y: [0, -3, 0],
      x: [0, 2, 0],
      rotate: [-1.5, 2, -1.5],
      transition: {
        duration: 4.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.8,
      },
    },
    hoverAnim: {
      scale: 1.2,
      rotate: 8,
      transition: { type: "spring", stiffness: 380, damping: 14 },
    },
  },
  {
    id: "attitude",
    step: "THE ATTITUDE",
    title: "WEAR IT LIKE YOU MEAN IT.",
    description:
      "Because a great suit isn't just something you wear. It's how you enter the room.",
    iconSrc: "/images/syndicate-code/icon-attitude-fedora.png",
    iconAlt: "Syndicate Attitude Noir Fedora",
    iconWidth: 68,
    iconHeight: 68,
    idleAnim: {
      y: [0, -2, 0],
      rotate: [0, -1.5, 1.5, 0],
      transition: {
        duration: 3.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.2,
      },
    },
    hoverAnim: {
      y: -8,
      rotate: -10,
      scale: 1.15,
      transition: { type: "spring", stiffness: 420, damping: 13 },
    },
  },
];

export function SyndicateCodeSection() {
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end 10%"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 24,
  });

  const boardY = useTransform(smoothScroll, [0, 0.35, 1], [45, 0, -30]);
  const boardRotateX = useTransform(smoothScroll, [0, 0.35, 1], [8, 0, -4]);
  const boardScale = useTransform(smoothScroll, [0, 0.3, 0.85, 1], [0.94, 1, 1, 0.97]);

  return (
    <section
      ref={sectionRef}
      id="syndicate-code"
      aria-label="The Syndicate Code"
      className="relative w-full pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-32 bg-[#070707] text-[#141210] select-none scroll-mt-24 [perspective:1400px]"
    >
      {/* Generous Atmospheric Noir Background with subtle ambient gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(215,190,154,0.06)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollVelocitySkew intensity={0.65}>
          {/* ========================================================================= */}
          {/* PHYSICAL KRAFT PARCHMENT BOARD / ELEVATED BESPOKE CHARTER                  */}
          {/* ========================================================================= */}
          <motion.div
            style={{
              y: boardY,
              rotateX: boardRotateX,
              scale: boardScale,
              transformStyle: "preserve-3d",
            }}
          >
            <KineticTiltCard
              tiltMax={3.5}
              scaleOnHover={1.008}
              glareColor="rgba(255, 235, 190, 0.16)"
              className="w-full bg-[#D7BE9A] rounded-xl sm:rounded-2xl border-2 sm:border-3 border-[#1A1816] shadow-[8px_8px_0px_0px_#0A0A0A,0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              <div
                className="relative w-full h-full"
                style={{
                  backgroundImage: `url('/images/syndicate-code/kraft-paper-bg.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Subtle Paper Fiber Grid & Mottled Tint Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply bg-paper-texture"
                  style={{ backgroundSize: "32px 32px" }}
                />

                {/* Vignette Rim on Kraft Paper */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(70,50,30,0.25)]" />

                {/* Inner Content Area */}
                <div className="relative z-10 px-5 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 lg:py-12">
                  {/* ======================================================================= */}
                  {/* 1. HEADER: "- THE SYNDICATE CODE -" WITH TEXTURED RED BRUSH MARKS       */}
                  {/* ======================================================================= */}
                  <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 pb-8 sm:pb-10 lg:pb-12 border-b border-[#1E1B18]/15">
                    {/* Left Red Brush Stroke */}
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ type: "spring", stiffness: 200, damping: 18 }}
                      style={{ transformOrigin: "right" }}
                      className="relative w-8 sm:w-12 md:w-16 h-3 sm:h-3.5 shrink-0 select-none pointer-events-none"
                    >
                      <Image
                        src="/images/syndicate-code/brush-stroke-left.png"
                        alt="Crimson Brush Mark"
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>

                    {/* Title */}
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black uppercase tracking-tight text-[#141210] leading-none text-center">
                      <KineticWords
                        text="THE SYNDICATE CODE"
                        highlightWords={["SYNDICATE"]}
                        highlightClassName="text-[#8B1E19]"
                        staggerDelay={0.07}
                      />
                    </h2>

                    {/* Right Red Brush Stroke */}
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ type: "spring", stiffness: 200, damping: 18 }}
                      style={{ transformOrigin: "left" }}
                      className="relative w-10 sm:w-14 md:w-18 h-2.5 sm:h-3 shrink-0 select-none pointer-events-none"
                    >
                      <Image
                        src="/images/syndicate-code/brush-stroke-right.png"
                        alt="Crimson Brush Mark"
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </div>

                  {/* ======================================================================= */}
                  {/* 2. FOUR PILLARS GRID WITH INDIVIDUAL ANIMATED ICONS & TALL DIVIDERS     */}
                  {/* ======================================================================= */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.25 }}
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.11,
                        },
                      },
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 pt-8 sm:pt-10"
                  >
                    {CODE_PILLARS.map((pillar, index) => {
                      const isLast = index === CODE_PILLARS.length - 1;
                      const isHovered = hoveredPillar === pillar.id;

                      return (
                        <motion.div
                          key={pillar.id}
                          variants={{
                            hidden: {
                              opacity: 0,
                              y: 28,
                              rotateX: -20,
                              scale: 0.94,
                            },
                            visible: {
                              opacity: 1,
                              y: 0,
                              rotateX: 0,
                              scale: 1,
                              transition: {
                                type: "spring",
                                stiffness: 210,
                                damping: 20,
                              },
                            },
                          }}
                          onMouseEnter={() => setHoveredPillar(pillar.id)}
                          onMouseLeave={() => setHoveredPillar(null)}
                          whileHover={{ y: -5, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 350, damping: 20 }}
                          className={`group relative flex items-start gap-4 sm:gap-4.5 lg:px-5 xl:px-6 cursor-default transition-colors duration-200 ${
                            !isLast
                              ? "lg:border-r lg:border-[#1E1B18]/25"
                              : ""
                          }`}
                        >
                          {/* Animated Vintage Hand-Drawn Ink Icon */}
                          <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center">
                            <motion.div
                              animate={isHovered ? pillar.hoverAnim : pillar.idleAnim}
                              className="relative w-full h-full flex items-center justify-center select-none"
                            >
                              <Image
                                src={pillar.iconSrc}
                                alt={pillar.iconAlt}
                                width={pillar.iconWidth}
                                height={pillar.iconHeight}
                                className="object-contain max-h-14 sm:max-h-16 drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
                                priority
                              />

                              {/* Interactive Lens Gleam for Loupe */}
                              {pillar.id === "detail" && (
                                <motion.div
                                  animate={{
                                    x: ["-120%", "160%"],
                                    opacity: [0, 0.7, 0],
                                  }}
                                  transition={{
                                    duration: 1.4,
                                    repeat: Infinity,
                                    repeatDelay: 2.8,
                                    ease: "easeInOut" as const,
                                  }}
                                  className="absolute top-1 left-1 w-6 h-6 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none rotate-45"
                                />
                              )}

                              {/* Scissor Snip Spark Trail on Hover */}
                              {pillar.id === "cut" && isHovered && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: [0, 1.2, 0], opacity: [0, 0.9, 0] }}
                                  transition={{ duration: 0.4 }}
                                  className="absolute top-0 right-1 w-2.5 h-2.5 bg-[#B92720] rounded-full blur-[1px] pointer-events-none"
                                />
                              )}

                              {/* Hat Tip Halo for Fedora on Hover */}
                              {pillar.id === "attitude" && isHovered && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 0.25, scale: 1.15 }}
                                  transition={{ duration: 0.25 }}
                                  className="absolute -inset-1 bg-[#141210] rounded-full blur-md pointer-events-none"
                                />
                              )}
                            </motion.div>
                          </div>

                          {/* Column Editorial Typography */}
                          <div className="flex flex-col justify-start min-w-0 pt-0.5">
                            {/* Step Subtitle */}
                            <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#26221E] transition-colors duration-200 group-hover:text-[#8B1E19]">
                              {pillar.step}
                            </span>

                            {/* Pillar Title */}
                            <h3 className="font-display text-base sm:text-lg lg:text-[19px] font-black uppercase tracking-tight text-[#141210] leading-snug mt-0.5 transition-colors duration-200 group-hover:text-black">
                              {pillar.title}
                            </h3>

                            {/* Description Copy */}
                            <p className="font-sans text-xs sm:text-[13px] text-[#2C2722]/90 leading-relaxed mt-1 font-medium">
                              {pillar.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </KineticTiltCard>
          </motion.div>
        </ScrollVelocitySkew>
      </div>
    </section>
  );
}

