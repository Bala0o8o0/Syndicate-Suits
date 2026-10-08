"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { KineticTiltCard } from "@/components/ui/kinetic-scroll";

export function ShopCampaignHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
  });

  const bgY = useTransform(smoothScroll, [0, 1], ["0%", "14%"]);
  const bgScale = useTransform(smoothScroll, [0, 1], [1.02, 1.12]);

  return (
    <div ref={heroRef}>
      <KineticTiltCard
        tiltMax={3}
        scaleOnHover={1.008}
        glareColor="rgba(212, 175, 55, 0.14)"
        className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl min-h-[400px] sm:min-h-[480px] lg:min-h-[540px] flex flex-col items-center justify-end text-center p-8 sm:p-12 lg:p-16"
      >
        <div id="shop-campaign-hero" className="absolute inset-0 pointer-events-none" />

        {/* 90s Cartoon Noir Background Artwork - Top Aligned with Kinetic Scroll Parallax */}
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <Image
            src="/images/syndicate-brand-story.jpg"
            alt="Syndicate Bespoke Conclave - 90s Cartoon Noir"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-top filter contrast-105"
          />
        </motion.div>

        {/* Atmospheric Symmetrical Vignette & Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/75 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(7,7,9,0.85)_0%,rgba(7,7,9,0.35)_55%,transparent_85%)] pointer-events-none" />

        {/* Subtle Halftone Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        {/* Centered Editorial Content with Kinetic Staggered Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 28, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
          className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center space-y-3 sm:space-y-4 [perspective:900px]"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-semibold drop-shadow"
          >
            THE 1990S NOIR BESPOKE ATELIER &bull; EST. 1928
          </motion.p>

          {/* Primary Display Headline */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20, delay: 0.18 }}
              className="font-luxury text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.05] drop-shadow-xl"
            >
              DRESS LIKE A <span className="font-serif italic text-[#D4AF37]">BOSS.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="font-serif italic text-base sm:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md"
            >
              &ldquo;Seven bespoke silhouettes crafted for the underworld&apos;s finest.&rdquo;
            </motion.p>
          </div>
        </motion.div>
      </KineticTiltCard>
    </div>
  );
}

