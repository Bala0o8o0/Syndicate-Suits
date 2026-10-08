"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Scissors,
  ArrowUpRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Briefcase,
  MessageSquare,
} from "lucide-react";
import { useBriefcaseStore } from "@/lib/briefcase-store";
import { useToniStore } from "@/lib/toni-store";

export function SyndicateFooter() {
  const { openBriefcase } = useBriefcaseStore();
  const setWidgetOpen = useToniStore((s) => s.setWidgetOpen);

  const footerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
  });

  const videoY = useTransform(smoothScroll, [0, 1], ["-10%", "0%"]);
  const videoScale = useTransform(smoothScroll, [0, 1], [1.1, 1.0]);

  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#0B0B0A] border-t border-[#292826] text-[#FAF7EE] overflow-hidden select-none"
    >
      {/* ======================================================================= */}
      {/* 1. FULL-BLEED VIDEO BACKGROUND (HERO.MP4) WITH KINETIC PARALLAX         */}
      {/* ======================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.video
          ref={videoRef}
          src="/hero.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          style={{ y: videoY, scale: videoScale }}
          className="w-full h-full object-cover filter contrast-[1.08] brightness-[0.88] will-change-transform"
        />

        {/* Subtle Comic Halftone Print Texture */}
        <div className="absolute inset-0 bg-halftone-charcoal opacity-15 mix-blend-overlay pointer-events-none" />

        {/* Directional Gradient: Dark on the left for maximum text contrast, clear on the right so mobsters shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 via-50% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* ======================================================================= */}
      {/* 2. FOREGROUND: ALL CONTENT ON LEFT, RIGHT 100% UNOBSTRUCTED             */}
      {/* ======================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 pb-8 flex flex-col justify-between min-h-[500px]">
        
        {/* TOP ROW: BRAND & IMPORTANT COLUMNS (ALL STRICTLY ON THE LEFT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT CONTAINER (MAX-W-XL ON DESKTOP, LEAVING RIGHT SIDE COMPLETELY CLEAR) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="lg:col-span-7 xl:col-span-6 space-y-7 max-w-xl"
          >
            
            {/* BRAND HEADER & LOGO */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 180, damping: 20 },
                },
              }}
              className="space-y-3"
            >
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="w-10 h-10 bg-[#FAF7EE] text-[#0B0B0A] flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_0px_#B59454] group-hover:bg-[#B59454] transition-all duration-300">
                  <Scissors className="w-5 h-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                </div>
                <span className="font-display text-2xl sm:text-3xl font-black tracking-tight text-[#FAF7EE] uppercase drop-shadow-[2px_2px_0px_#000]">
                  SYNDICATE<span className="text-[#B92720]">.</span>SUITS
                </span>
              </Link>

              {/* Comic Noir Address & Location Stamps */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-block bg-[#161618]/90 backdrop-blur-xs border border-white/20 px-3 py-1 font-mono-label text-[10px] text-[#B59454] font-bold shadow-[2px_2px_0px_0px_#000]">
                  444 MULBERRY ST &bull; SPEAKEASY ATELIER NO. 7
                </span>
                <span className="inline-block bg-[#B92720] text-white px-2 py-0.5 font-display text-[11px] font-black uppercase tracking-wider border border-black shadow-[2px_2px_0px_0px_#000]">
                  LITTLE ITALY
                </span>
              </div>
            </motion.div>

            {/* ONLY ESSENTIAL COLUMNS (2 COMPACT COLUMNS ON THE LEFT) */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 180, damping: 20 },
                },
              }}
              className="grid grid-cols-2 gap-8 pt-3 border-t border-white/15"
            >
              
              {/* COLUMN 1: THE ATELIER */}
              <div className="space-y-3">
                <h4 className="font-display text-xs sm:text-sm font-black text-[#B59454] uppercase tracking-wider drop-shadow-[1px_1px_0px_#000]">
                  THE ATELIER
                </h4>
                <ul className="space-y-2.5 text-xs font-mono-label text-[#FAF7EE]/80">
                  <li>
                    <Link href="/shop" className="hover:text-[#B59454] hover:translate-x-1 transition-all flex items-center gap-1 group">
                      <span>The Bespoke Collection</span>
                      <ArrowUpRight className="w-3 h-3 text-[#B59454] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/customizer" className="hover:text-[#B59454] hover:translate-x-1 transition-all flex items-center gap-1 group">
                      <span>3D Bespoke Studio</span>
                      <ArrowUpRight className="w-3 h-3 text-[#B59454] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/#syndicate-seven" className="hover:text-[#B59454] hover:translate-x-1 inline-block transition-all">
                      The Seven Silhouettes
                    </Link>
                  </li>
                </ul>
              </div>

              {/* COLUMN 2: DISPATCH & LEDGER */}
              <div className="space-y-3">
                <h4 className="font-display text-xs sm:text-sm font-black text-[#B59454] uppercase tracking-wider drop-shadow-[1px_1px_0px_#000]">
                  DISPATCH
                </h4>
                <ul className="space-y-2.5 text-xs font-mono-label text-[#FAF7EE]/80">
                  <li>
                    <button
                      type="button"
                      onClick={openBriefcase}
                      className="hover:text-[#B59454] hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-[#B59454]" />
                      <span>Black Ledger Briefcase</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setWidgetOpen(true)}
                      className="hover:text-[#B59454] hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#B59454]" />
                      <span>Toni Lee Private Sit-Down</span>
                    </button>
                  </li>
                  <li>
                    <span className="text-[#FAF7EE]/50">
                      Discreet Armored Courier
                    </span>
                  </li>
                </ul>
              </div>

            </motion.div>

            {/* FIVE FAMILIES SEAL & VIDEO CONTROLS ON LEFT */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 180, damping: 20 },
                },
              }}
              className="pt-2 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#B92720] text-white flex items-center justify-center font-display font-black text-[9px] border border-black shadow-[1px_1px_0px_0px_#000]">
                  5F
                </div>
                <span className="font-mono-label text-[10px] text-[#FAF7EE]/70 font-bold uppercase tracking-wider">
                  APPROVED BY THE FIVE FAMILIES &bull; EST. 1928
                </span>
              </div>

              {/* Video Play & Mute Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleSound}
                  aria-label={isMuted ? "Unmute background video" : "Mute background video"}
                  title={isMuted ? "Unmute audio" : "Mute audio"}
                  className="p-1.5 bg-black/60 hover:bg-[#B59454] text-[#FAF7EE] hover:text-black border border-white/20 transition-all cursor-pointer rounded-xs"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause background video" : "Play background video"}
                  title={isPlaying ? "Pause video" : "Play video"}
                  className="p-1.5 bg-black/60 hover:bg-[#B92720] text-[#FAF7EE] hover:text-white border border-white/20 transition-all cursor-pointer rounded-xs"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>
            </motion.div>

          </motion.div>

          {/* RIGHT SIDE: 100% EMPTY & UNOBSTRUCTED SO MOBSTERS SHINE */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 pointer-events-none" />

        </div>

        {/* =================================================================== */}
        {/* CENTERED ALL RIGHTS RESERVED LINE                                   */}
        {/* =================================================================== */}
        <div className="w-full pt-8 pb-2 border-t border-white/10 mt-10 text-center">
          <p className="font-mono-label text-[11px] sm:text-xs text-[#FAF7EE]/60 tracking-wider">
            &copy; 1928–{new Date().getFullYear()} SYNDICATE SUITS ATELIER. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
}