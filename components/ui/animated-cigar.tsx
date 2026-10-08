"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function AnimatedCigar({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      
      {/* Animated Smoke Particles / Plumes Rising */}
      <div className="absolute -top-6 -left-3 pointer-events-none z-20 overflow-visible">
        {/* Smoke Particle 1 */}
        <motion.div
          animate={{
            y: [-4, -28, -50],
            x: [0, -8, -4],
            scale: [0.6, 1.2, 1.8],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute w-6 h-6 rounded-full bg-white/20 blur-md"
        />

        {/* Smoke Particle 2 */}
        <motion.div
          animate={{
            y: [-2, -32, -60],
            x: [0, 6, 12],
            scale: [0.4, 1.4, 2.2],
            opacity: [0, 0.45, 0],
          }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            delay: 0.9,
            ease: "easeOut",
          }}
          className="absolute w-8 h-8 rounded-full bg-[#E9DFC9]/25 blur-lg"
        />

        {/* Smoke Particle 3 */}
        <motion.div
          animate={{
            y: [0, -22, -45],
            x: [0, -4, -10],
            scale: [0.5, 1.0, 1.5],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: 1.6,
            ease: "easeOut",
          }}
          className="absolute w-5 h-5 rounded-full bg-white/30 blur-sm"
        />
      </div>

      {/* Burning Ember Glow Core */}
      <div className="absolute top-1/2 left-2 -translate-y-1/2 w-4 h-4 rounded-full bg-orange-500/40 blur-md pointer-events-none z-10" />

      {/* Main Stylized Cigar Artwork */}
      <div className="relative w-full h-full rounded-lg overflow-hidden border border-[#B59454]/40 shadow-[0_4px_20px_rgba(0,0,0,0.8)] bg-[#0B0B0A]">
        <Image
          src="/images/smoking-cigar.jpg"
          alt="Mobster Burning Cigar"
          fill
          className="object-cover object-center"
        />
        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Red/Orange Ember Spark */}
      <span className="absolute -top-1 left-2 w-1.5 h-1.5 rounded-full bg-[#FF4500] shadow-[0_0_8px_#FF4500] pointer-events-none" />
    </div>
  );
}