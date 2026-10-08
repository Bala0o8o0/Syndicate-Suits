"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mic, Sparkles, ArrowRight, Scissors } from "lucide-react";
import { useToniStore } from "@/lib/toni-store";
import {
  KineticSection,
  KineticTiltCard,
  MagneticWrapper,
} from "@/components/ui/kinetic-scroll";

const COMIC_PROMPTS = [
  { label: "FIT ME FOR A SIT-DOWN", prompt: "Toni, fit me for a high-stakes family sit-down." },
  { label: "GODFATHER'S WEDDING CUT", prompt: "Which bespoke cut commands the most respect at a wedding?" },
  { label: "SHOW SPEAKEASY VELVET", prompt: "Show me The Enforcer in Royale Burgundy velvet." },
];

export function BespokeConsultationBanner() {
  const setWidgetOpen = useToniStore((s) => s.setWidgetOpen);

  const handleAskToni = (promptText?: string) => {
    setWidgetOpen(true);
    if (promptText && typeof window !== "undefined") {
      setTimeout(() => {
        window.__sendToniMessage?.(promptText);
      }, 250);
    }
  };

  return (
    <KineticSection>
      <KineticTiltCard
        tiltMax={2.5}
        scaleOnHover={1.006}
        glareColor="rgba(212, 175, 55, 0.12)"
        className="relative bg-[#121214] border-3 border-black shadow-[8px_8px_0px_0px_#8B0000,12px_12px_0px_0px_#000000] overflow-hidden select-none"
      >
        {/* 90s Comic Book Halftone Dot Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(#D4AF37 1.25px, transparent 1.25px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Diagonal Noir Comic Action Speed-Lines Accent */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #8B0000 0px, #8B0000 2px, transparent 2px, transparent 18px)",
          }}
        />

        {/* Top Yellow/Gold Comic Strip Caption Header */}
        <div className="relative z-20 bg-[#D4AF37] text-[#0A0A0C] border-b-3 border-black px-5 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-[#8B0000] stroke-[2.5]" />
            <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-[0.2em]">
              MEANWHILE, IN THE LITTLE ITALY FITTING ROOM...
            </span>
          </div>
          <span className="font-mono text-[11px] font-black uppercase tracking-widest bg-[#8B0000] text-[#FAF7EE] px-2.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000000]">
            BESPOKE CONSIGLIERE ON DUTY
          </span>
        </div>

        {/* Main 90s Comic Two-Panel Split Layout */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT COMIC PANEL: TONI LEE 90S CARTOON NOIR ARTWORK */}
          <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[380px] bg-[#1A1111] border-b-3 lg:border-b-0 lg:border-r-3 border-black overflow-hidden group">
            {/* Crimson Radial Comic Spotlight Behind Toni */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.35)_0%,rgba(10,10,12,0.92)_80%)]" />

            <Image
              src="/images/toni-lee.jpg"
              alt="Toni Lee - 1990s Cartoon Noir Master Tailor & Consigliere"
              fill
              sizes="(max-width: 1024px) 100vw, 450px"
              className="object-cover object-top filter contrast-110 transition-transform duration-500 group-hover:scale-105"
            />

            {/* Cel-Shaded Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

            {/* Bottom Comic Nameplate Box inside Artwork Panel */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="absolute bottom-4 left-4 right-4 z-20 bg-[#F7EFE4] text-[#0A0A0C] border-3 border-black p-3 shadow-[5px_5px_0px_0px_#000000]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#8B0000] block">
                    THE FIVE FAMILIES&apos; TAILOR
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0A0A0C] leading-none">
                    TONI LEE
                  </h4>
                </div>
                <span className="font-display text-xs font-black uppercase bg-[#D4AF37] text-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  EST. 1928
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COMIC PANEL: SPEECH BALLOON & INTERACTIVE CONTROLS */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6 bg-[#141417]/95">
            {/* Editorial Comic Headline */}
            <div className="space-y-2">
              <span className="font-mono text-xs font-black uppercase tracking-[0.25em] text-[#D4AF37] block">
                LIVE VOICE &amp; BESPOKE FITTING STUDIO
              </span>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#FAF7EE] leading-[0.95] drop-shadow-[3px_3px_0px_#000000]">
                STEP INTO TONI&apos;S <span className="text-[#DC2626]">ATELIER.</span>
              </h3>
            </div>

            {/* Authentic 90s Comic Speech Balloon with Spring Pop-In */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.08 }}
              className="relative bg-[#F7EFE4] text-[#121214] border-3 border-black p-5 sm:p-6 shadow-[6px_6px_0px_0px_#D4AF37]"
            >
              {/* Speech Bubble Pointer Triangle (Points toward Toni on desktop) */}
              <div
                className="hidden lg:block absolute -left-4 top-8 w-0 h-0"
                style={{
                  borderTop: "12px solid transparent",
                  borderBottom: "12px solid transparent",
                  borderRight: "16px solid #000000",
                }}
              />
              <div
                className="hidden lg:block absolute -left-[11px] top-[35px] w-0 h-0"
                style={{
                  borderTop: "9px solid transparent",
                  borderBottom: "9px solid transparent",
                  borderRight: "13px solid #F7EFE4",
                }}
              />

              <p className="font-serif italic text-base sm:text-lg lg:text-xl font-bold text-[#121214] leading-snug">
                &ldquo;Fuggedaboutit! Look at you walking around in off-the-rack like a
                two-bit street punk. Tell Toni what kind of heat you&apos;re stepping
                into, and I&apos;ll get you fitted in pure syndicate gold!&rdquo;
              </p>
            </motion.div>

            {/* Quick-Fire Comic Dialogue Prompts */}
            <div className="space-y-2.5">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#E9DFC9]/70 block">
                ASK THE CONSIGLIERE DIRECTLY:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {COMIC_PROMPTS.map((item, idx) => (
                  <motion.button
                    key={item.label}
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.12 + idx * 0.06 }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAskToni(item.prompt)}
                    className="px-3.5 py-2 bg-[#1E1E24] hover:bg-[#D4AF37] text-[#FAF7EE] hover:text-black font-mono text-[11px] font-black uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_0px_#000000] hover:shadow-[4px_4px_0px_0px_#8B0000] transition-colors cursor-pointer"
                  >
                    &ldquo;{item.label}&rdquo;
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Primary Cel-Shaded Comic Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <MagneticWrapper strength={0.22}>
                <button
                  type="button"
                  onClick={() => handleAskToni()}
                  className="px-8 py-4 bg-[#DC2626] hover:bg-[#D4AF37] text-white hover:text-black font-display text-lg sm:text-xl font-black uppercase tracking-wider border-3 border-black shadow-[5px_5px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#FAF7EE] transition-all transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Mic className="w-5 h-5 stroke-[2.5]" />
                  <span>TALK TO TONI LEE NOW</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </MagneticWrapper>

              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                VOICE LIP-SYNC &amp; LIVE BESPOKE FITTING
              </span>
            </div>
          </div>
        </div>
      </KineticTiltCard>
    </KineticSection>
  );
}

