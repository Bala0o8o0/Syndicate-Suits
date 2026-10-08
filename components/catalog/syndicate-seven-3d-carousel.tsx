"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Play,
  Pause,
} from "lucide-react";
import { SUITS, Suit } from "@/lib/suits-data";
import { useBriefcaseStore } from "@/lib/briefcase-store";

export function SyndicateSeven3DCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  // Trigger deal animation once when scrolled into view
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  const { addItem } = useBriefcaseStore();

  const totalSuits = SUITS.length; // Exactly 7
  const currentSuit = SUITS[activeIndex];

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSuits) % totalSuits);
  }, [totalSuits]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSuits);
  }, [totalSuits]);

  // Keyboard navigation (ArrowLeft / ArrowRight) — only when carousel is visible & not typing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isVisibleInViewport = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
      if (!isVisibleInViewport) return;

      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlay, handleNext]);

  // Quick Add handler
  const handleQuickAdd = (suit: Suit, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      suit,
      selectedFabricId: suit.fabrics[0].id,
      selectedLapelId: suit.lapels[0].id,
      selectedLiningId: suit.linings[0].id,
      size: "40R",
      unitPrice: suit.price + (suit.fabrics[0]?.addedPrice || 0),
      quantity: 1,
    });
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden select-none space-y-10">
      


      {/* 2. 3D CAROUSEL PERSPECTIVE STAGE */}
      <div className="relative h-[600px] sm:h-[660px] w-full flex items-center justify-center [perspective:1400px] overflow-visible py-4">
        
        {/* Ambient Warm Golden Spotlight */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[580px] h-[580px] bg-[radial-gradient(circle,rgba(181,148,84,0.18)_0%,transparent_70%)] blur-3xl" />
        </div>

        {/* 3D Carousel Stage */}
        <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[530px] sm:h-[570px] flex items-center justify-center [transform-style:preserve-3d]">
          {SUITS.map((suit, index) => {
            // Calculate relative offset from active card (-3, -2, -1, 0, 1, 2, 3)
            let offset = index - activeIndex;
            if (offset > totalSuits / 2) offset -= totalSuits;
            if (offset < -totalSuits / 2) offset += totalSuits;

            const isCurrent = offset === 0;
            const isVisible = Math.abs(offset) <= 2; // Active center + 2 left + 2 right

            if (!isVisible) return null;

            // Target 3D Carousel Cylindrical Coordinates
            const targetX = offset * 270;
            const targetZ = -Math.abs(offset) * 160;
            const targetRotateY = offset * -28;
            const targetRotateZ = offset * 2.5; // Natural subtle playing card tilt
            const targetScale = 1 - Math.abs(offset) * 0.12;
            const targetOpacity = 1 - Math.abs(offset) * 0.22;
            const zIndex = 30 - Math.abs(offset) * 6;

            // Initial Stacked Playing Card Deck State (Cards start tightly stacked in center)
            const initialStackedX = offset * 8;
            const initialStackedY = -Math.abs(offset) * 6;
            const initialStackedZ = -Math.abs(offset) * 20;
            const initialStackedRotateZ = offset * 6; // Stacked card fan angle

            return (
              <motion.div
                key={suit.id}
                initial={{
                  x: initialStackedX,
                  y: initialStackedY,
                  z: initialStackedZ,
                  rotateY: 0,
                  rotateZ: initialStackedRotateZ,
                  scale: 0.85,
                  opacity: 0,
                }}
                animate={
                  isInView
                    ? {
                        x: targetX,
                        y: 0,
                        z: targetZ,
                        rotateY: targetRotateY,
                        rotateZ: targetRotateZ,
                        scale: targetScale,
                        opacity: targetOpacity,
                      }
                    : {
                        x: initialStackedX,
                        y: initialStackedY,
                        z: initialStackedZ,
                        rotateY: 0,
                        rotateZ: initialStackedRotateZ,
                        scale: 0.85,
                        opacity: 0,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 20,
                  mass: 0.85,
                  delay: Math.abs(offset) * 0.08, // Deals smoothly from central stack out to positions
                }}
                onClick={() => {
                  if (!isCurrent) setActiveIndex(index);
                }}
                drag={isCurrent ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 50 || info.velocity.x > 300) {
                    handlePrev();
                  } else if (info.offset.x < -50 || info.velocity.x < -300) {
                    handleNext();
                  }
                }}
                style={{
                  zIndex: zIndex,
                  position: "absolute",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  willChange: "transform, opacity",
                }}
                className={`w-full h-full ${
                  isCurrent
                    ? "cursor-grab active:cursor-grabbing"
                    : "cursor-pointer"
                } group/card`}
              >
                {/* ========================================================================= */}
                {/* AUTHENTIC TACTILE PARCHMENT / PAPER CASE FILE CARD */}
                {/* ========================================================================= */}
                <div
                  className={`relative w-full h-full bg-[#EADBCE] text-[#191816] border-2 ${
                    isCurrent
                      ? "border-[#B59454] ring-2 ring-[#B59454]/50 shadow-[0_22px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(181,148,84,0.3)]"
                      : "border-[#C5B89E] shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
                  } flex flex-col justify-between overflow-hidden`}
                >
                  {/* Real Paper Texture & Fiber Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply z-10"
                    style={{
                      backgroundImage: `radial-gradient(#191816 0.75px, transparent 0.75px)`,
                      backgroundSize: "6px 6px",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#F2E8DA] via-[#EADBCE] to-[#DFD0BC] pointer-events-none" />

                  {/* Corner Brass Notary Brackets */}
                  <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#8A6D3B] z-30 pointer-events-none" />
                  <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#8A6D3B] z-30 pointer-events-none" />
                  <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#8A6D3B] z-30 pointer-events-none" />
                  <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#8A6D3B] z-30 pointer-events-none" />

                  {/* Top Case File Header Strip */}
                  <div className="p-3.5 border-b border-[#C5B89E] bg-[#E1D4BD] flex items-center justify-between z-20 relative shadow-sm">
                    <span className="font-mono text-xs font-bold text-[#191816] tracking-wider uppercase">
                      {suit.rank}
                    </span>

                    <span className="text-[10px] font-mono font-bold text-[#B92720] bg-[#F7EFE4] px-2 py-0.5 border border-[#B92720]/40 uppercase">
                      {suit.alias}
                    </span>
                  </div>

                  {/* Framed Photo Viewport */}
                  <div className="relative flex-1 w-full bg-[#191816] overflow-hidden m-2 border-2 border-[#C5B89E] shadow-inner">
                    <Image
                      src={suit.image}
                      alt={`${suit.name} - ${suit.character}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      priority={isCurrent}
                      className="object-cover object-top opacity-95 group-hover/card:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Atmospheric Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12110F]/90 via-transparent to-black/20 pointer-events-none" />

                    {/* Normal Card Bottom Label */}
                    <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between group-hover/card:opacity-0 transition-opacity duration-200">
                      <div>
                        <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-[#EADBCE] drop-shadow-md">
                          {suit.name}
                        </h3>
                        <span className="font-mono text-xs text-[#B59454] font-bold block">
                          {suit.character}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-black text-[#191816] bg-[#EADBCE] px-2.5 py-1 border border-[#C5B89E] shadow-sm">
                        {suit.priceFormatted}
                      </span>
                    </div>

                    {/* HOVER STATE: PAPER BESPOKE SPEC SHEET */}
                    <div className="absolute inset-0 bg-[#EADBCE]/98 text-[#191816] opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-5 z-30">
                      
                      {/* Hover Header */}
                      <div className="space-y-0.5 border-b border-[#C5B89E] pb-2">
                        <span className="font-mono text-[10px] font-bold text-[#8A6D3B] tracking-widest block uppercase">
                          {suit.rank} &bull; {suit.alias}
                        </span>
                        <div className="flex items-center justify-between">
                          <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-[#191816]">
                            {suit.name}
                          </h3>
                          <span className="font-mono text-xs font-black text-[#B92720]">
                            {suit.priceFormatted}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#5A554C] block uppercase">
                          {suit.character}
                        </span>
                      </div>

                      {/* THE SUIT FOR Statement */}
                      <div className="py-2 space-y-1">
                        <span className="font-mono text-[10px] font-bold text-[#B92720] tracking-wider uppercase block">
                          THE SUIT FOR:
                        </span>
                        <p className="font-editorial-italic text-base text-[#191816] leading-snug font-medium">
                          &ldquo;{suit.theSuitFor}&rdquo;
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2 pt-1">
                        <Link
                          href={`/shop/${suit.id}`}
                          className="w-full py-2.5 bg-[#191816] hover:bg-[#B92720] text-[#EADBCE] font-mono text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-md"
                        >
                          VIEW SUIT <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(suit, e)}
                          className="w-full py-2 bg-[#B92720] hover:bg-[#991f1a] text-white font-mono text-[10px] font-bold text-center transition-colors flex items-center justify-center gap-1 shadow-sm"
                        >
                          <Briefcase className="w-3 h-3" /> Quick Add To Ledger
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Bottom Notary Footer */}
                  <div className="p-3 bg-[#E1D4BD] border-t border-[#C5B89E] flex items-center justify-between text-[10px] font-mono text-[#5A554C] z-20">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#191816]">SWATCHES:</span>
                      <div className="flex -space-x-1">
                        {suit.fabrics.map((f) => (
                          <div
                            key={f.id}
                            className="w-3 h-3 border border-[#8A6D3B]"
                            style={{ backgroundColor: f.colorHex }}
                            title={f.name}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-[#8A6D3B] font-bold uppercase truncate max-w-[130px]">
                      {suit.occasions[0]}
                    </span>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. CAROUSEL NAVIGATION CONTROLS DOCK */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="flex flex-wrap items-center justify-between gap-4 bg-[#080808] border border-[#22201D] p-4 sm:p-5 shadow-[0_12px_40px_rgba(0,0,0,0.9)]"
      >
        
        {/* Left: Active Archetype Stamp */}
        <motion.div
          key={currentSuit.id}
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="flex items-center gap-3"
        >
          <div
            className="w-3.5 h-9 border border-[#2D2A24] shadow-sm flex-shrink-0 transition-colors duration-300"
            style={{ backgroundColor: currentSuit.colorHex }}
          />
          <div>
            <span className="font-mono-label text-[10px] text-[#B59454] font-bold block uppercase tracking-widest">
              {currentSuit.rank} &bull; {currentSuit.alias}
            </span>
            <h4 className="font-display text-lg sm:text-xl font-bold uppercase text-[#FAF7EE] tracking-tight">
              {currentSuit.name} <span className="text-[#FAF7EE]/30 mx-1">&bull;</span> <span className="text-[#B92720]">{currentSuit.character}</span>
            </h4>
          </div>
        </motion.div>

        {/* Center: Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {SUITS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to suit ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              className={`h-2 transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "w-8 bg-[#B59454] shadow-[0_0_8px_rgba(181,148,84,0.4)]"
                  : "w-2 bg-[#1F1E1B] hover:bg-[#FAF7EE]/40"
              }`}
            />
          ))}
        </div>

        {/* Right: Arrow Controls & Autoplay Button */}
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-3.5 py-2 border font-mono-label text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isAutoPlay
                ? "bg-[#B92720] text-white border-[#B92720] shadow-[0_0_12px_rgba(185,39,32,0.35)]"
                : "bg-[#111110] text-[#FAF7EE]/70 border-[#262420] hover:text-[#FAF7EE] hover:border-[#B59454]"
            }`}
          >
            {isAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
            {isAutoPlay ? "AUTO ON" : "AUTO 3D"}
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.06, x: -2 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Previous suit"
            onClick={handlePrev}
            className="p-2.5 bg-[#111110] hover:bg-[#FAF7EE] hover:text-[#0A0A09] text-[#FAF7EE] border border-[#262420] hover:border-[#FAF7EE] shadow-editorial transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.06, x: 2 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Next suit"
            onClick={handleNext}
            className="p-2.5 bg-[#111110] hover:bg-[#FAF7EE] hover:text-[#0A0A09] text-[#FAF7EE] border border-[#262420] hover:border-[#FAF7EE] shadow-editorial transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

      </motion.div>

    </div>
  );
}