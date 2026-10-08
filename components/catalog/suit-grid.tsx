"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Eye,
  Check,
} from "lucide-react";
import { SUITS, Suit } from "@/lib/suits-data";
import { Character3DCanvas } from "./character-3d-canvas";
import { SuitQuickViewModal } from "./suit-quick-view-modal";
import { useBriefcaseStore } from "@/lib/briefcase-store";

interface SuitGridProps {
  limit?: number;
  showFilters?: boolean;
}

export function SuitGrid({ showFilters = true }: SuitGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const total = SUITS.length; // 7

  const { addItem, openBriefcase } = useBriefcaseStore();

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSwatchIndex, setSelectedSwatchIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [quickViewSuit, setQuickViewSuit] = useState<Suit | null>(null);

  const scrollProgressRef = useRef(0);
  const isScrollingFromClick = useRef(false);

  // Track scroll progress across the 3D revolving showcase stage
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (isScrollingFromClick.current) return;
      scrollProgressRef.current = latest;
      const index = Math.min(
        total - 1,
        Math.max(0, Math.round(latest * (total - 1)))
      );
      setActiveIndex((prev) => {
        if (prev !== index) {
          setSelectedSwatchIndex(0);
          return index;
        }
        return prev;
      });
    });
    return () => unsubscribe();
  }, [scrollYProgress, total]);

  // Smoothly rotate 3D orbit to any suit index
  const selectSuitIndex = useCallback(
    (step: number, scrollPage = false) => {
      const normalized = ((step % total) + total) % total;
      setActiveIndex(normalized);
      setSelectedSwatchIndex(0);
      const targetProgress = normalized / (total - 1);
      scrollProgressRef.current = targetProgress;

      if (scrollPage && containerRef.current) {
        isScrollingFromClick.current = true;
        const rect = containerRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const containerTop = scrollTop + rect.top;
        const containerHeight = containerRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollableHeight = Math.max(1, containerHeight - windowHeight);
        const targetY = containerTop + targetProgress * scrollableHeight;

        if (window.__lenis) {
          window.__lenis.scrollTo(targetY, { duration: 0.85 });
        } else {
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }

        setTimeout(() => {
          isScrollingFromClick.current = false;
        }, 900);
      } else {
        isScrollingFromClick.current = true;
        setTimeout(() => {
          isScrollingFromClick.current = false;
        }, 600);
      }
    },
    [total]
  );

  // Toni Lee Interactive AI Event Hooks
  useEffect(() => {
    const handleToniFilter = (e: Event) => {
      const { category, query } =
        (e as CustomEvent<{ category?: string; query?: string }>).detail || {};
      if (query) {
        const q = String(query).toLowerCase();
        const idx = SUITS.findIndex(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.character.toLowerCase().includes(q) ||
            s.alias.toLowerCase().includes(q) ||
            s.fabrics.some((f) => f.name.toLowerCase().includes(q))
        );
        if (idx !== -1) selectSuitIndex(idx);
      } else if (category) {
        const categoryMap: Record<string, string> = {
          "double-breasted": "the-don",
          "three-piece": "the-boss",
          "velvet-gala": "the-enforcer",
          tactical: "the-underboss",
          "summer-linen": "the-consigliere",
        };
        const targetId = categoryMap[category];
        if (targetId) {
          const idx = SUITS.findIndex((s) => s.id === targetId);
          if (idx !== -1) selectSuitIndex(idx);
        }
      }
    };

    const handleToniQuickView = (e: Event) => {
      const { suitId } =
        (e as CustomEvent<{ suitId?: string }>).detail || {};
      const idx = SUITS.findIndex((s) => s.id === suitId);
      if (idx !== -1) {
        selectSuitIndex(idx);
        setQuickViewSuit(SUITS[idx]);
      }
    };

    window.addEventListener("toni-filter-catalog", handleToniFilter);
    window.addEventListener("toni-quick-view", handleToniQuickView);
    return () => {
      window.removeEventListener("toni-filter-catalog", handleToniFilter);
      window.removeEventListener("toni-quick-view", handleToniQuickView);
    };
  }, [selectSuitIndex]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
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
      const isSectionInView =
        rect.top <= window.innerHeight * 0.6 &&
        rect.bottom >= window.innerHeight * 0.3;
      if (!isSectionInView) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        selectSuitIndex(activeIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        selectSuitIndex(activeIndex + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, selectSuitIndex]);

  const activeSuit = SUITS[activeIndex] || SUITS[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const chosenFabric =
      activeSuit.fabrics[selectedSwatchIndex] || activeSuit.fabrics[0];
    addItem({
      suit: activeSuit,
      selectedFabricId: chosenFabric.id,
      selectedLapelId: activeSuit.lapels[0].id,
      selectedLiningId: activeSuit.linings[0].id,
      size: "40R",
      unitPrice: activeSuit.price + (chosenFabric.addedPrice || 0),
      quantity: 1,
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      openBriefcase();
    }, 650);
  };

  return (
    <div className="space-y-6">
      {/* Top Quick-Select Strip for All 7 Bespoke Cuts */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          className="flex items-center justify-between gap-3 flex-wrap bg-[#0B0B0D] border border-white/[0.08] rounded-2xl p-3 sm:p-4 shadow-xl"
        >
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {SUITS.map((suit, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <motion.button
                  key={suit.id}
                  type="button"
                  whileHover={{ y: -1.5 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => selectSuitIndex(idx)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors duration-300 whitespace-nowrap cursor-pointer overflow-hidden ${
                    isSelected
                      ? "text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                      : "bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-white border border-white/[0.08]"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="shop-suit-filter-active-pill"
                      transition={{ type: "spring", stiffness: 340, damping: 26 }}
                      className="absolute inset-0 bg-[#D4AF37] z-0"
                    />
                  )}
                  <span className="relative z-10">{suit.name}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Prev / Next Orbit Controls */}
          <div className="flex items-center gap-2 ml-auto">
            <motion.button
              type="button"
              whileHover={{ scale: 1.06, x: -2 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Previous bespoke suit"
              onClick={() => selectSuitIndex(activeIndex - 1)}
              className="p-2.5 rounded-xl bg-[#121215] hover:bg-[#D4AF37] text-white hover:text-black border border-white/10 hover:border-[#D4AF37] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.06, x: 2 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Next bespoke suit"
              onClick={() => selectSuitIndex(activeIndex + 1)}
              className="p-2.5 rounded-xl bg-[#121215] hover:bg-[#D4AF37] text-white hover:text-black border border-white/10 hover:border-[#D4AF37] transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* 3D Revolving WebGL Orbit Carousel Stage with Real Suit Photography */}
      <div
        ref={containerRef}
        className="relative w-full h-[260vh] rounded-3xl bg-[#070707] border border-[#292826]/80 text-[#E9DFC9] select-none"
      >
        <div className="sticky top-16 h-[calc(100vh-5rem)] min-h-[620px] w-full overflow-hidden rounded-3xl flex flex-col justify-between py-6 px-4 sm:px-8 z-20">
          {/* 1. Top Editorial Header */}
          <div className="relative z-20 text-center pt-2 sm:pt-4 pointer-events-none">
            <span className="font-sans text-[10px] sm:text-xs font-bold text-[#B59454] tracking-[0.25em] uppercase block">
              THE BESPOKE VAULT &bull; THE SYNDICATE SEVEN
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#E9DFC9] leading-tight mt-1 drop-shadow-md">
              SELECT YOUR <span className="text-[#B59454]">BESPOKE CUT</span>
            </h2>
          </div>

          {/* 2. Full-Screen 3D Revolving Carousel with Exact Suit Photos (/images/suits/the-*.jpg) */}
          <div className="absolute inset-0 z-10 w-full h-full pointer-events-auto">
            <Character3DCanvas
              scrollProgress={activeIndex / (total - 1)}
              scrollProgressRef={scrollProgressRef}
              activeIndex={activeIndex}
              onSelectCharacter={(idx) => selectSuitIndex(idx, true)}
              imageSource="suits"
            />
          </div>

          {/* 3. Bottom-Right Card: Bespoke Suit Case File & Shop Actions */}
          <div className="absolute bottom-5 sm:bottom-7 right-4 sm:right-7 z-30 w-[calc(100%-2rem)] sm:w-96 md:w-[410px] pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSuit.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="relative overflow-hidden rounded-xl backdrop-blur-2xl bg-[#0c0c0e]/90 border-t-2 border-t-[#D4AF37] border-x border-b border-[#292826]/80 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-5 sm:p-6 space-y-3.5"
              >
                {/* Top Metadata Row: Rank & Character */}
                <div className="flex items-center justify-between pb-2.5 border-b border-[#292826]/70">
                  <span className="font-sans text-[10px] font-black uppercase tracking-[0.22em] text-[#D4AF37]">
                    {activeSuit.rank} &bull; {activeSuit.alias}
                  </span>
                  <span className="font-mono text-xs font-bold text-white">
                    {activeSuit.priceFormatted}
                  </span>
                </div>

                {/* Suit Title & Tagline */}
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <Link
                      href={`/shop/${activeSuit.id}`}
                      className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#FAF7EE] hover:text-[#D4AF37] transition-colors"
                    >
                      {activeSuit.name}
                    </Link>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#B59454]">
                      {activeSuit.character}
                    </span>
                  </div>
                  <p className="font-serif italic text-xs sm:text-[13px] text-[#C8C2B5]/90 leading-relaxed line-clamp-2">
                    &ldquo;{activeSuit.theSuitFor}&rdquo;
                  </p>
                </div>

                {/* Swatch Selector */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#E9DFC9]/60">
                    COMO FABRICS:
                  </span>
                  <div className="flex items-center gap-2">
                    {activeSuit.fabrics.map((fabric, idx) => {
                      const isSwatchSelected = selectedSwatchIndex === idx;
                      return (
                        <button
                          key={fabric.id}
                          type="button"
                          onClick={() => setSelectedSwatchIndex(idx)}
                          title={fabric.name}
                          className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                            isSwatchSelected
                              ? "ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-[#0c0c0e] scale-115"
                              : "opacity-70 hover:opacity-100 hover:scale-110"
                          }`}
                          style={{ backgroundColor: fabric.colorHex }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Action Row: Quick Inspect, Quick Add, View Cut */}
                <div className="pt-2 border-t border-[#292826]/80 grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setQuickViewSuit(activeSuit)}
                    className="py-2.5 px-2 rounded-lg bg-white/[0.06] hover:bg-white hover:text-black text-white text-[10px] font-mono font-bold uppercase tracking-wider border border-white/10 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#D4AF37]" /> Inspect
                  </button>

                  <button
                    type="button"
                    onClick={handleQuickAdd}
                    disabled={isAdded}
                    className={`py-2.5 px-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      isAdded
                        ? "bg-emerald-700 border-emerald-600 text-white"
                        : "bg-[#B92720] hover:bg-[#991f1a] text-white border-[#B92720]"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added
                      </>
                    ) : (
                      <>
                        <Briefcase className="w-3.5 h-3.5" /> Quick Add
                      </>
                    )}
                  </button>

                  <Link
                    href={`/shop/${activeSuit.id}`}
                    className="py-2.5 px-2 rounded-lg bg-[#D4AF37] hover:bg-[#e3be42] text-[#0B0B0A] text-[10px] font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                  >
                    View Cut <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewSuit && (
        <SuitQuickViewModal
          suit={quickViewSuit}
          onClose={() => setQuickViewSuit(null)}
        />
      )}
    </div>
  );
}