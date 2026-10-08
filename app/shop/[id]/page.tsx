"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Briefcase,
  Sparkles,
  Award,
  Volume2,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";
import { SUITS } from "@/lib/suits-data";
import { useBriefcaseStore } from "@/lib/briefcase-store";
import { useToniStore } from "@/lib/toni-store";
import {
  KineticSection,
  KineticTiltCard,
  KineticWords,
  MagneticWrapper,
} from "@/components/ui/kinetic-scroll";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SuitDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const suit = SUITS.find((s) => s.id === id);

  if (!suit) {
    notFound();
  }

  const { addItem } = useBriefcaseStore();
  const { setWidgetOpen } = useToniStore();

  const [selectedFabric, setSelectedFabric] = useState(suit.fabrics[0]);
  const [selectedLapel, setSelectedLapel] = useState(suit.lapels[0]);
  const [selectedLining, setSelectedLining] = useState(suit.linings[0]);
  const [selectedSize, setSelectedSize] = useState("40R");
  const [monogram, setMonogram] = useState("");

  const sizes = ["38R", "40R", "42R", "44R", "46L", "48L", "50L", "52L"];
  const totalPrice = suit.price + selectedFabric.addedPrice + (monogram.trim() ? 8500 : 0);

  const handleAddSuit = () => {
    addItem({
      suit,
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

    if (typeof window !== "undefined" && window.__sendToniMessage) {
      window.__sendToniMessage(`I just added ${suit.name} to my briefcase!`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-20 space-y-12 bg-[#0B0B0A] text-[#E9DFC9]">
      {/* Top Back Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex items-center justify-between border-b border-[#292826] pb-4"
      >
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 font-mono-label text-xs text-[#B59454] hover:text-[#E9DFC9] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO THE VAULT
        </Link>
        <span className="font-mono-label text-xs text-[#E9DFC9]/60">
          RANK: <strong className="text-[#B92720]">{suit.rank}</strong>
        </span>
      </motion.div>

      {/* Main Showcase Grid */}
      <KineticSection intensity={0.55}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Big 90s Noir Illustrated View */}
          <div className="lg:col-span-6 space-y-6">
            <KineticTiltCard tiltMax={4.5}>
              <div className="relative h-[480px] sm:h-[600px] w-full border border-[#292826] bg-[#050505] shadow-editorial overflow-hidden">
                <Image
                  src={suit.image}
                  alt={suit.name}
                  fill
                  priority
                  className="object-cover opacity-90"
                />
                {/* Dynamic Fabric Sheen Overlay */}
                <div
                  className="absolute inset-0 mix-blend-overlay opacity-30 transition-colors duration-500"
                  style={{ backgroundColor: selectedFabric.colorHex }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-halftone-charcoal opacity-30 pointer-events-none" />

                {/* Top Rank Stamp Badge */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                  <span className="font-mono-label text-xs bg-[#B92720] text-white px-3 py-1 border border-[#B92720] shadow-editorial font-bold">
                    {suit.rank} &bull; {suit.alias}
                  </span>
                </div>

                {/* Bottom Spec Sheet Box */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0B0B0A]/90 backdrop-blur-md p-4 border border-[#292826] text-xs text-[#E9DFC9] space-y-1 shadow-editorial">
                  <div className="font-mono-label text-[10px] text-[#B59454] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B92720]" /> ATELIER SPECIFICATION:
                  </div>
                  <p className="text-xs text-[#E9DFC9]/80 font-sans leading-relaxed">
                    {suit.bulletproofDetail}
                  </p>
                </div>
              </div>
            </KineticTiltCard>

            {/* Toni Lee's Spoken Review */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
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
                  &ldquo;{suit.toniQuote}&rdquo;
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Customization, Sizing & Checkout Form */}
          <div className="lg:col-span-6 bg-[#131312] border border-[#292826] p-6 sm:p-8 shadow-editorial space-y-8 bg-paper-texture">
            {/* Header */}
            <div className="border-b border-[#292826] pb-6 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#E9DFC9]">
                    <KineticWords text={suit.name} />
                  </h1>
                  <span className="font-mono-label text-xs text-[#B59454] block mt-1">
                    &bull; &ldquo;{suit.alias}&rdquo;
                  </span>
                </div>
                <span className="font-mono text-3xl font-bold text-[#E9DFC9]">
                  ₹ {totalPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#E9DFC9]/70 leading-relaxed font-sans pt-2">
                {suit.description}
              </p>
            </div>

            {/* Fabric Selection */}
            <div className="space-y-3">
              <label className="font-mono-label text-xs text-[#B59454] block">
                FABRIC &amp; TEXTURE
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {suit.fabrics.map((f) => {
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
                        <div className="font-mono-label text-xs text-[#E9DFC9] truncate font-bold">{f.name}</div>
                        <div className="font-mono text-[10px] text-[#B59454]">
                          {f.addedPrice > 0 ? `+₹ ${f.addedPrice.toLocaleString()}` : "STANDARD"}
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
                LAPEL SILHOUETTE
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {suit.lapels.map((l) => {
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
                      <div className="font-mono-label text-xs text-[#E9DFC9] mb-0.5 font-bold">{l.name}</div>
                      <div className="font-sans text-[11px] text-[#E9DFC9]/60">{l.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Silk Lining & Monogram */}
            <div className="space-y-3">
              <label className="font-mono-label text-xs text-[#B59454] block">
                SILK LINING &amp; MONOGRAM
              </label>
              <div className="flex flex-wrap gap-2">
                {suit.linings.map((lining) => {
                  const isSelected = lining.id === selectedLining.id;
                  return (
                    <button
                      key={lining.id}
                      type="button"
                      onClick={() => setSelectedLining(lining)}
                      className={`px-3 py-1.5 border flex items-center gap-2 text-xs font-mono-label transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#171715] border-[#B59454] text-[#E9DFC9]"
                          : "bg-[#0B0B0A] border-[#292826] text-[#E9DFC9]/60 hover:text-[#E9DFC9]"
                      }`}
                    >
                      <div
                        className="w-3 h-3 border border-[#292826]"
                        style={{ backgroundColor: lining.colorHex }}
                      />
                      {lining.name}
                    </button>
                  );
                })}
              </div>
              <input
                type="text"
                maxLength={4}
                value={monogram}
                onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                placeholder="GOLD MONOGRAM (e.g. T.L.) +₹ 8,500"
                className="w-full bg-[#0B0B0A] border border-[#292826] px-3.5 py-2.5 text-xs text-[#E9DFC9] uppercase placeholder-[#E9DFC9]/40 font-mono focus:outline-none focus:border-[#B59454]"
              />
            </div>

            {/* Sizing */}
            <div className="space-y-2">
              <label className="font-mono-label text-xs text-[#B59454] block">
                CHEST SIZE
              </label>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 text-xs font-mono border transition-all cursor-pointer ${
                      selectedSize === s
                        ? "bg-[#E9DFC9] text-[#0B0B0A] border-[#E9DFC9] font-bold shadow-editorial"
                        : "bg-[#0B0B0A] text-[#E9DFC9]/60 border-[#292826] hover:text-[#E9DFC9]"
                    }`}
                  >
                    {s}
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
                  className="w-full bg-[#B92720] hover:bg-[#991f1a] text-white font-mono-label text-xs font-bold py-4 border border-[#B92720] shadow-editorial transition-all flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  ADD {suit.name} TO LEDGER &bull; ₹ {totalPrice.toLocaleString()}
                </button>
              </MagneticWrapper>

              <button
                type="button"
                onClick={() => setWidgetOpen(true)}
                className="w-full bg-[#171715] hover:bg-[#292826] text-[#B59454] font-mono-label text-xs py-3.5 border border-[#292826] text-center transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Ask Toni Lee for Advice on This Cut
              </button>
            </div>
          </div>
        </div>
      </KineticSection>

      {/* Special Syndicate Features Bullet Grid */}
      <KineticSection intensity={0.6}>
        <div className="bg-[#131312] border border-[#292826] p-8 shadow-editorial space-y-6 bg-paper-texture">
          <h3 className="font-display text-2xl font-bold uppercase text-[#E9DFC9] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#B59454]" />
            SYNDICATE STANDARDS &amp; CONCEALED COMPARTMENTS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {suit.features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.08,
                  type: "spring",
                  stiffness: 180,
                  damping: 20,
                }}
                whileHover={{ y: -3 }}
                className="bg-[#0B0B0A] border border-[#292826] hover:border-[#B59454]/60 p-4 shadow-sm flex items-start gap-3 transition-colors"
              >
                <div className="w-6 h-6 bg-[#B59454] text-[#0B0B0A] flex items-center justify-center font-bold text-xs font-mono flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-xs text-[#E9DFC9]/80 font-sans leading-relaxed">
                  {feat}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </KineticSection>
    </div>
  );
}