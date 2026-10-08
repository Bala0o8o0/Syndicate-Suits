"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  KineticTiltCard,
  MagneticWrapper,
  ScrollVelocitySkew,
} from "@/components/ui/kinetic-scroll";

export function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.5,
  });

  // Kinetic opposing horizontal drift for headline rows
  const line1X = useTransform(smoothScroll, [0, 0.5, 1], [-45, 0, 25]);
  const line2X = useTransform(smoothScroll, [0, 0.5, 1], [45, 0, -25]);

  // Deep window parallax for the 7-bosses lineup illustration
  const imageParallaxY = useTransform(smoothScroll, [0, 1], ["-7%", "7%"]);
  const frameScale = useTransform(smoothScroll, [0.1, 0.5, 0.9], [0.93, 1, 0.97]);

  const handleScrollToSelector = (e: React.MouseEvent) => {
    const el =
      document.getElementById("character-selector") ||
      document.getElementById("syndicate-seven");
    if (el) {
      e.preventDefault();
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -20, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      className="relative w-full bg-[#050505] text-[#E9DFC9] border-t border-[#22211F] overflow-hidden py-24 sm:py-32 lg:py-40 select-none"
    >
      {/* Atmospheric Background Layers: Vignette & Ambient Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0A] via-[#050505] to-[#020202] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#B59454]/[0.05] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#B92720]/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* ========================================================================= */}
        {/* 1. TOP TYPOGRAPHY: SEVEN SUITS. ONE SYNDICATE. (Kinetic Opposing Glide) */}
        {/* ========================================================================= */}
        <ScrollVelocitySkew intensity={0.85} className="w-full max-w-5xl mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 35, rotateX: -18 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="text-center w-full [perspective:1000px]"
          >
            <span className="font-sans text-xs sm:text-sm font-bold text-[#B59454] tracking-[0.3em] uppercase block mb-3 sm:mb-4">
              THE COMPLETE UNDERWORLD ATELIER
            </span>
            <h2 className="font-display font-black uppercase tracking-tight leading-[0.88] drop-shadow-2xl">
              <motion.span
                style={{ x: line1X }}
                className="block text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[124px] text-[#E9DFC9] will-change-transform"
              >
                SEVEN SUITS.
              </motion.span>
              <motion.span
                style={{ x: line2X }}
                className="block text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[124px] text-[#B59454] mt-1 sm:mt-2 will-change-transform"
              >
                ONE SYNDICATE.
              </motion.span>
            </h2>
          </motion.div>
        </ScrollVelocitySkew>

        {/* ========================================================================= */}
        {/* 2. THE ILLUSTRATION: ALL 7 SYNDICATE CHARACTERS STANDING TOGETHER        */}
        {/* ========================================================================= */}
        <motion.div
          style={{ scale: frameScale }}
          className="w-full max-w-6xl"
        >
          <KineticTiltCard
            tiltMax={4.5}
            scaleOnHover={1.015}
            glareColor="rgba(212, 175, 55, 0.16)"
            className="relative w-full aspect-[16/9] border-2 sm:border-3 border-[#2A2926] shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden bg-[#0a0a0c] group"
          >
            {/* Parallax Inner Image Container */}
            <motion.div
              style={{ y: imageParallaxY, scale: 1.12 }}
              className="absolute inset-0 w-full h-full will-change-transform"
            >
              <Image
                src="/images/syndicate-seven-lineup.jpg"
                alt="The Seven Syndicate Bosses standing together in 1990s cartoon noir style"
                fill
                priority
                className="object-cover object-center filter contrast-[1.04] brightness-[0.98] transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              />
            </motion.div>

            {/* Cinematic Edge Vignette Fades */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-[#050505]/40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 via-transparent to-[#050505]/40 pointer-events-none" />

            {/* Hard Comic Drop Shadows Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#B59454]/60 pointer-events-none transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-[#D4AF37]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#B59454]/60 pointer-events-none transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-[#D4AF37]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#B59454]/60 pointer-events-none transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-[#D4AF37]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#B59454]/60 pointer-events-none transition-all duration-300 group-hover:w-12 group-hover:h-12 group-hover:border-[#D4AF37]" />
          </KineticTiltCard>
        </motion.div>

        {/* ========================================================================= */}
        {/* 3. BOTTOM TYPOGRAPHY & CALL TO ACTION: WHICH ONE ARE YOU?                */}
        {/* ========================================================================= */}
        <ScrollVelocitySkew intensity={0.8} className="w-full max-w-4xl mt-14 sm:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 35, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.1 }}
            className="text-center w-full flex flex-col items-center [perspective:900px]"
          >
            <h3 className="font-display font-black uppercase tracking-tight leading-[0.92] text-center mb-8 sm:mb-12">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                className="block text-4xl sm:text-6xl md:text-7xl lg:text-[90px] xl:text-[100px] text-[#E9DFC9]"
              >
                WHICH ONE
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.12 }}
                className="block text-4xl sm:text-6xl md:text-7xl lg:text-[90px] xl:text-[100px] text-[#B92720] drop-shadow-[0_10px_35px_rgba(185,39,32,0.4)] mt-1"
              >
                ARE YOU?
              </motion.span>
            </h3>

            {/* Action Button: [ FIND YOUR SUIT → ] with Magnetic Spring Pull */}
            <MagneticWrapper strength={0.3}>
              <Link
                href="#syndicate-seven"
                onClick={handleScrollToSelector}
                className="group relative inline-flex items-center justify-center gap-3.5 px-10 sm:px-14 py-5 sm:py-6 bg-[#E9DFC9] hover:bg-[#B59454] text-[#0B0B0A] font-mono-label text-sm sm:text-base font-bold tracking-[0.25em] border-2 border-[#E9DFC9] shadow-editorial hover:shadow-[6px_6px_0px_0px_#B92720] transition-all transform hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1 text-center"
              >
                <span>FIND YOUR SUIT</span>
                <ArrowRight className="w-5 h-5 text-[#0B0B0A] transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </MagneticWrapper>
          </motion.div>
        </ScrollVelocitySkew>

      </div>
    </section>
  );
}

