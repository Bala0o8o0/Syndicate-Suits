"use client";

import React, { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Scissors,
  Briefcase,
  Volume2,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { SUITS, SuitProduct } from "@/lib/suits-data";
import { useBriefcaseStore } from "@/lib/briefcase-store";
import { useToniStore } from "@/lib/toni-store";
import {
  KineticSection,
  KineticTiltCard,
  KineticWords,
  MagneticWrapper,
} from "@/components/ui/kinetic-scroll";

function CustomizerStudioInner({ initialSuit }: { initialSuit: SuitProduct }) {
  const { addItem, openBriefcase } = useBriefcaseStore();
  const { setWidgetOpen } = useToniStore();

  const [selectedSuit, setSelectedSuit] = useState<SuitProduct>(initialSuit);
  const [selectedFabric, setSelectedFabric] = useState(initialSuit.fabrics[0]);
  const [selectedLapel, setSelectedLapel] = useState(initialSuit.lapels[0]);
  const [selectedLining, setSelectedLining] = useState(initialSuit.linings[0]);
  const [selectedSize, setSelectedSize] = useState("40R");
  const [monogram, setMonogram] = useState("");

  const sizes = ["38R", "40R", "42R", "44R", "46L", "48L", "50L", "52L"];

  const handleSelectSuit = (suit: SuitProduct) => {
    setSelectedSuit(suit);
    setSelectedFabric(suit.fabrics[0]);
    setSelectedLapel(suit.lapels[0]);
    setSelectedLining(suit.linings[0]);
  };

  const totalPrice =
    selectedSuit.price +
    selectedFabric.addedPrice +
    (monogram.trim() ? 8500 : 0);

  const handleAddSuit = () => {
    addItem({
      suit: selectedSuit,
      selectedFabricId: selectedFabric.id,
      selectedLapelId: selectedLapel.id,
      selectedLiningId: selectedLining.id,
      size: selectedSize,
      monogram: monogram.trim() || undefined,
      unitPrice: totalPrice,
      quantity: 1,
    });

    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#B92720", "#B59454", "#E9DFC9"],
      });
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#0B0B0A] text-[#E9DFC9] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Studio Bar */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#292826] pb-6"
        >
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-mono-label text-xs text-[#B59454] hover:text-[#E9DFC9] transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> BACK TO THE BESPOKE VAULT
            </Link>
            <h1 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#E9DFC9]">
              <KineticWords text="BESPOKE TAILORING" />{" "}
              <span className="text-[#B59454]">
                <KineticWords text="STUDIO" delay={0.14} />
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <MagneticWrapper strength={0.18}>
              <button
                type="button"
                onClick={() => setWidgetOpen(true)}
                className="px-4 py-2.5 bg-[#131312] border border-[#B59454]/50 text-[#B59454] hover:bg-[#B59454] hover:text-[#0B0B0A] font-mono-label text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" /> CONSULT TONI LEE
              </button>
            </MagneticWrapper>
            <MagneticWrapper strength={0.18}>
              <button
                type="button"
                onClick={openBriefcase}
                className="px-4 py-2.5 bg-[#B92720] text-white font-mono-label text-xs font-bold hover:bg-[#9a1f19] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5" /> OPEN LEDGER
              </button>
            </MagneticWrapper>
          </div>
        </motion.div>

        {/* Silhouette Selector Bar (The Syndicate Seven) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="space-y-3"
        >
          <div className="font-mono-label text-xs text-[#B59454]">
            SELECT ARCHETYPE SILHOUETTE
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {SUITS.map((s) => {
              const isSelected = s.id === selectedSuit.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectSuit(s)}
                  className={`relative p-3 border text-left transition-all cursor-pointer overflow-hidden ${
                    isSelected
                      ? "border-[#B59454] text-[#0B0B0A] shadow-editorial"
                      : "bg-[#131312] border-[#292826] text-[#E9DFC9]/80 hover:border-[#B59454]/60"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="customizer-suit-active"
                      className="absolute inset-0 bg-[#B59454] z-0"
                      transition={{
                        type: "spring",
                        stiffness: 340,
                        damping: 28,
                      }}
                    />
                  )}
                  <div className="relative z-10">
                    <div
                      className={`font-mono-label text-[9px] truncate ${
                        isSelected ? "text-[#0B0B0A]/80 font-bold" : "text-[#B59454]"
                      }`}
                    >
                      {s.rank}
                    </div>
                    <div className="font-display text-sm font-bold uppercase truncate mt-0.5">
                      {s.name}
                    </div>
                    <div
                      className={`font-mono text-[10px] mt-1 ${
                        isSelected ? "text-[#0B0B0A] font-bold" : "text-[#E9DFC9]/50"
                      }`}
                    >
                      {s.priceFormatted}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Main Studio Grid */}
        <KineticSection intensity={0.55}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Live Visual Preview */}
            <div className="lg:col-span-6 space-y-6">
              <KineticTiltCard tiltMax={4.5}>
                <div className="relative h-[480px] sm:h-[600px] w-full border border-[#292826] bg-[#050505] shadow-editorial overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedSuit.id}
                      initial={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={selectedSuit.image}
                        alt={selectedSuit.name}
                        fill
                        priority
                        className="object-cover opacity-90"
                      />
                    </motion.div>
                  </AnimatePresence>
                  {/* Dynamic Fabric Sheen Overlay */}
                  <div
                    className="absolute inset-0 mix-blend-overlay opacity-35 transition-colors duration-500"
                    style={{ backgroundColor: selectedFabric.colorHex }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-halftone-charcoal opacity-30 pointer-events-none" />

                  {/* Top Rank & Spec Stamp */}
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={selectedSuit.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.25 }}
                        className="font-mono-label text-xs bg-[#B92720] text-white px-3 py-1 border border-[#B92720] shadow-editorial font-bold"
                      >
                        {selectedSuit.rank} &bull; {selectedSuit.alias}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  {/* Bottom Spec Sheet Box */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0B0B0A]/90 backdrop-blur-md p-4 border border-[#292826] text-xs text-[#E9DFC9] space-y-1.5 shadow-editorial">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-label text-[10px] text-[#B59454] flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#B92720]" /> ATELIER SPECIFICATION:
                      </span>
                      <span className="font-mono text-[10px] text-[#E9DFC9]/70">
                        {selectedFabric.name} &bull; {selectedLapel.name}
                      </span>
                    </div>
                    <p className="text-xs text-[#E9DFC9]/80 font-sans leading-relaxed">
                      {selectedSuit.bulletproofDetail}
                    </p>
                  </div>
                </div>
              </KineticTiltCard>

              {/* Toni Lee's Spoken Review */}
              <motion.div
                key={`quote-${selectedSuit.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="bg-[#131312] border border-[#292826] p-5 shadow-editorial flex items-start gap-4 bg-paper-texture"
              >
                <div className="w-9 h-9 bg-[#E9DFC9] text-[#0B0B0A] font-bold flex items-center justify-center flex-shrink-0">
                  TL
                </div>
                <div className="space-y-1">
                  <div className="font-mono-label text-[10px] text-[#B59454] flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" /> TONI LEE ATELIER ADVICE:
                  </div>
                  <p className="text-xs text-[#E9DFC9]/90 italic font-sans leading-relaxed">
                    &ldquo;{selectedSuit.toniQuote}&rdquo;
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Bespoke Configuration Controls */}
            <div className="lg:col-span-6 bg-[#131312] border border-[#292826] p-6 sm:p-8 shadow-editorial space-y-8 bg-paper-texture">
            {/* Header */}
            <div className="border-b border-[#292826] pb-6 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#E9DFC9]">
                    {selectedSuit.name}
                  </h2>
                  <span className="font-mono-label text-xs text-[#B59454] block mt-1">
                    {selectedSuit.tagline}
                  </span>
                </div>
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#E9DFC9]">
                  ₹ {totalPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#E9DFC9]/70 leading-relaxed font-sans pt-2">
                {selectedSuit.description}
              </p>
            </div>

            {/* Fabric Selection */}
            <div className="space-y-3">
              <label className="font-mono-label text-xs text-[#B59454] block">
                COMO FABRIC &amp; WEAVE
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedSuit.fabrics.map((f) => {
                  const isSelected = f.id === selectedFabric.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFabric(f)}
                      className={`p-3 border text-left transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-[#171715] border-[#B59454] shadow-editorial"
                          : "bg-[#0B0B0A] border-[#292826] text-[#E9DFC9]/70 hover:border-[#E9DFC9]/40"
                      }`}
                    >
                      <div
                        className="w-5 h-5 border border-[#292826] flex-shrink-0 flex items-center justify-center text-white"
                        style={{ backgroundColor: f.colorHex }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-mono-label text-xs text-[#E9DFC9] truncate font-bold">
                          {f.name}
                        </div>
                        <div className="font-mono text-[10px] text-[#B59454]">
                          {f.addedPrice > 0
                            ? `+₹ ${f.addedPrice.toLocaleString()}`
                            : "INCLUDED"}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lapel Selection */}
            <div className="space-y-3">
              <label className="font-mono-label text-xs text-[#B59454] block">
                LAPEL ARCHITECTURE
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedSuit.lapels.map((l) => {
                  const isSelected = l.id === selectedLapel.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setSelectedLapel(l)}
                      className={`p-3 border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#171715] border-[#B59454] shadow-editorial"
                          : "bg-[#0B0B0A] border-[#292826] text-[#E9DFC9]/70 hover:border-[#E9DFC9]/40"
                      }`}
                    >
                      <div className="font-mono-label text-xs text-[#E9DFC9] mb-0.5 font-bold">
                        {l.name}
                      </div>
                      <div className="font-sans text-[11px] text-[#E9DFC9]/60">
                        {l.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Silk Lining & Monogram */}
            <div className="space-y-3">
              <label className="font-mono-label text-xs text-[#B59454] block">
                INTERIOR SILK LINING &amp; MONOGRAM
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedSuit.linings.map((lining) => {
                  const isSelected = lining.id === selectedLining.id;
                  return (
                    <button
                      key={lining.id}
                      type="button"
                      onClick={() => setSelectedLining(lining)}
                      className={`px-3 py-1.5 border flex items-center gap-2 text-xs font-mono-label transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#E9DFC9] text-[#0B0B0A] border-[#E9DFC9] font-bold"
                          : "bg-[#0B0B0A] text-[#E9DFC9]/70 border-[#292826]"
                      }`}
                    >
                      <span
                        className="w-3 h-3 border border-black"
                        style={{ backgroundColor: lining.colorHex }}
                      />
                      {lining.name}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <input
                  type="text"
                  maxLength={18}
                  value={monogram}
                  onChange={(e) => setMonogram(e.target.value)}
                  placeholder="Optional Gold Thread Monogram (+₹8,500) — e.g. DON CORLEONE"
                  className="w-full bg-[#0B0B0A] border border-[#292826] px-3.5 py-2.5 text-xs text-[#E9DFC9] placeholder:text-[#E9DFC9]/40 focus:outline-none focus:border-[#B59454] font-mono"
                />
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="font-mono-label text-xs text-[#B59454] block">
                CHEST &amp; SHOULDER FIT (INCLUDES MATCHING TROUSERS)
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 text-xs font-mono font-bold border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? "bg-[#B92720] text-white border-[#B92720]"
                        : "bg-[#0B0B0A] text-[#E9DFC9]/60 border-[#292826] hover:text-[#E9DFC9]"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 space-y-3">
              <MagneticWrapper strength={0.14} className="w-full">
                <button
                  type="button"
                  onClick={handleAddSuit}
                  className="w-full bg-[#E9DFC9] hover:bg-[#B59454] text-[#0B0B0A] font-mono-label text-sm font-bold py-4 border border-[#E9DFC9] shadow-editorial transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  COMMISSION TO BLACK LEDGER — ₹ {totalPrice.toLocaleString()}
                </button>
              </MagneticWrapper>

              <div className="flex items-center justify-between pt-2">
                <Link
                  href={`/shop/${selectedSuit.id}`}
                  className="font-mono-label text-[11px] text-[#B59454] hover:text-[#E9DFC9] flex items-center gap-1.5 transition-colors"
                >
                  <Scissors className="w-3.5 h-3.5" /> VIEW FULL CUT SPECIFICATIONS
                </Link>
                <Link
                  href="/briefcase"
                  className="font-mono-label text-[11px] text-[#E9DFC9]/70 hover:text-[#E9DFC9] flex items-center gap-1.5 transition-colors"
                >
                  PROCEED TO LEDGER CHECKOUT <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        </KineticSection>
      </div>
    </div>
  );
}

function CustomizerStudioRouter() {
  const searchParams = useSearchParams();
  const suitId = searchParams.get("suit");
  const initialSuit =
    (suitId ? SUITS.find((s) => s.id === suitId) : undefined) || SUITS[0];

  return <CustomizerStudioInner key={initialSuit.id} initialSuit={initialSuit} />;
}

export default function CustomizerStudioPage() {
  return (
    <Suspense fallback={<CustomizerStudioInner initialSuit={SUITS[0]} />}>
      <CustomizerStudioRouter />
    </Suspense>
  );
}
