"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Trash2,
  Plus,
  Minus,
  Tag,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Lock,
  Scissors,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useBriefcaseStore } from "@/lib/briefcase-store";
import { SYNDICATE_DISCOUNTS } from "@/lib/suits-data";
import {
  KineticSection,
  KineticWords,
  MagneticWrapper,
} from "@/components/ui/kinetic-scroll";

export default function BriefcaseLedgerPage() {
  const {
    items,
    activeDiscountCode,
    discountPercent,
    discountLabel,
    removeItem,
    updateQuantity,
    applyDiscount,
    removeDiscount,
    clearBriefcase,
    getSubtotal,
    getDiscountAmount,
    getTotal,
    getItemCount,
  } = useBriefcaseStore();

  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [isOrdered, setIsOrdered] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyDiscount(promoInput);
    setPromoMessage(res.message);
    if (res.success) {
      setPromoInput("");
    }
  };

  const handleCheckout = () => {
    setIsOrdered(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#B92720", "#B59454", "#E9DFC9"],
      });
    } catch {}

    setTimeout(() => {
      clearBriefcase();
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0A] text-[#E9DFC9] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#292826] pb-6"
        >
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-mono-label text-xs text-[#B59454] hover:text-[#E9DFC9] transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> CONTINUE BROWSING THE VAULT
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#B92720] text-white flex items-center justify-center border border-[#B92720]">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#E9DFC9]">
                  <KineticWords text="THE BLACK LEDGER" />
                </h1>
                <span className="text-xs font-mono-label text-[#B59454] block">
                  CONFIDENTIAL DISPATCH &bull; {getItemCount()} BESPOKE PIECES
                </span>
              </div>
            </div>
          </div>

          <MagneticWrapper strength={0.18}>
            <Link
              href="/customizer"
              className="px-4 py-2.5 bg-[#131312] border border-[#292826] hover:border-[#B59454] text-[#E9DFC9] font-mono-label text-xs font-bold transition-colors inline-flex items-center gap-2"
            >
              <Scissors className="w-3.5 h-3.5 text-[#B59454]" /> BESPOKE STUDIO
            </Link>
          </MagneticWrapper>
        </motion.div>

        <AnimatePresence mode="wait">
          {isOrdered ? (
            <motion.div
              key="ordered"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="bg-[#131312] border border-[#292826] p-12 text-center space-y-6 shadow-editorial bg-paper-texture"
            >
              <div className="w-16 h-16 mx-auto bg-[#B92720] text-white flex items-center justify-center border border-[#B92720] shadow-editorial">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="font-display text-4xl font-bold text-[#E9DFC9] uppercase">
                DISPATCH CONFIRMED
              </h2>
              <p className="text-sm text-[#E9DFC9]/75 max-w-md mx-auto leading-relaxed font-sans">
                Toni Lee is personally inspecting the reinforced silk weave. Your bespoke commissions are being packed into a combination-locked aluminum briefcase for discreet courier dispatch.
              </p>
              <div className="pt-2">
                <Link
                  href="/shop"
                  onClick={() => setIsOrdered(false)}
                  className="inline-flex items-center gap-2 bg-[#E9DFC9] hover:bg-[#B59454] text-[#0B0B0A] font-mono-label text-xs font-bold px-8 py-4 border border-[#E9DFC9] transition-colors shadow-editorial"
                >
                  RETURN TO THE VAULT <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ) : items.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
              className="bg-[#131312] border border-[#292826] p-12 text-center space-y-5 shadow-editorial bg-paper-texture"
            >
              <div className="w-14 h-14 mx-auto bg-[#171715] border border-[#292826] flex items-center justify-center text-[#B59454]">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#E9DFC9]">
                YOUR BLACK LEDGER IS EMPTY
              </h2>
              <p className="text-xs sm:text-sm text-[#E9DFC9]/60 max-w-md mx-auto font-sans">
                You cannot attend a Five Families sit-down in off-the-rack. Commission a tailored silhouette from the vault or customize your own cut in the studio.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <MagneticWrapper strength={0.18}>
                  <Link
                    href="/shop"
                    className="bg-[#E9DFC9] hover:bg-[#B59454] text-[#0B0B0A] font-mono-label text-xs font-bold px-6 py-3.5 border border-[#E9DFC9] transition-colors inline-flex items-center gap-2 shadow-editorial"
                  >
                    EXPLORE THE VAULT <ArrowRight className="w-4 h-4" />
                  </Link>
                </MagneticWrapper>
                <MagneticWrapper strength={0.18}>
                  <Link
                    href="/customizer"
                    className="bg-[#0B0B0A] hover:bg-[#171715] text-[#E9DFC9] font-mono-label text-xs font-bold px-6 py-3.5 border border-[#292826] transition-colors inline-flex items-center gap-2"
                  >
                    OPEN TAILORING STUDIO <Scissors className="w-4 h-4 text-[#B59454]" />
                  </Link>
                </MagneticWrapper>
              </div>
            </motion.div>
          ) : (
            <KineticSection key="items" intensity={0.5}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Items */}
                <div className="lg:col-span-7 space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, idx) => {
                      const fabric =
                        item.suit.fabrics.find((f) => f.id === item.selectedFabricId) ||
                        item.suit.fabrics[0];
                      const lapel =
                        item.suit.lapels.find((l) => l.id === item.selectedLapelId) ||
                        item.suit.lapels[0];
                      const lining =
                        item.suit.linings.find((ln) => ln.id === item.selectedLiningId) ||
                        item.suit.linings[0];

                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -30, scale: 0.95 }}
                          transition={{
                            delay: idx * 0.06,
                            type: "spring",
                            stiffness: 240,
                            damping: 24,
                          }}
                          className="bg-[#131312] border border-[#292826] p-5 flex flex-col sm:flex-row gap-5 shadow-editorial bg-paper-texture"
                        >
                          <Link
                            href={`/shop/${item.suit.id}`}
                            className="relative w-full sm:w-28 h-36 border border-[#292826] bg-[#0B0B0A] flex-shrink-0 overflow-hidden"
                          >
                            <Image
                              src={item.suit.image}
                              alt={item.suit.name}
                              fill
                              className="object-cover"
                            />
                          </Link>

                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between">
                                <div>
                                  <Link
                                    href={`/shop/${item.suit.id}`}
                                    className="font-display text-2xl font-bold text-[#E9DFC9] hover:text-[#B59454] transition-colors uppercase"
                                  >
                                    {item.suit.name}
                                  </Link>
                                  <span className="font-mono-label text-[10px] text-[#B59454] block">
                                    {item.suit.rank} &bull; {item.suit.alias}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  aria-label={`Remove ${item.suit.name}`}
                                  onClick={() => removeItem(item.id)}
                                  className="text-[#E9DFC9]/40 hover:text-[#B92720] transition-colors p-1 cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono-label text-[#E9DFC9]/70 mt-3">
                                <div>FABRIC: {fabric.name}</div>
                                <div>LAPEL: {lapel.name}</div>
                                <div>LINING: {lining.name}</div>
                                <div>SIZE: {item.size} (WITH TROUSERS)</div>
                                {item.monogram && (
                                  <div className="col-span-2 text-[#B59454]">
                                    MONOGRAM: &ldquo;{item.monogram}&rdquo;
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#292826]">
                              <span className="font-mono text-lg font-bold text-[#E9DFC9]">
                                ₹ {(item.unitPrice * item.quantity).toLocaleString()}
                              </span>

                              <div className="flex items-center gap-2 border border-[#292826] bg-[#0B0B0A] px-2 py-1 text-xs font-mono">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="text-[#E9DFC9]/60 hover:text-white p-0.5 cursor-pointer"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="px-2 font-bold">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="text-[#E9DFC9]/60 hover:text-white p-0.5 cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Right Column: Ledger Summary & Syndicate Passcodes */}
                <div className="lg:col-span-5 bg-[#131312] border border-[#292826] p-6 sm:p-8 shadow-editorial space-y-6 bg-paper-texture">
                  <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[#E9DFC9] border-b border-[#292826] pb-4">
                    LEDGER SETTLEMENT
                  </h2>

                  {/* Syndicate Passcode Input */}
                  <div className="space-y-2">
                    <label className="font-mono-label text-[10px] text-[#B59454] block">
                      FAMILY PASSCODE / TRIBUTE CODE
                    </label>
                    {activeDiscountCode ? (
                      <div className="bg-[#171715] border border-[#B59454] p-3 flex items-center justify-between text-xs font-mono-label">
                        <div className="flex items-center gap-2 text-[#B59454]">
                          <Tag className="w-4 h-4" />
                          <span>
                            {activeDiscountCode} ({discountPercent}% OFF)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            removeDiscount();
                            setPromoMessage(null);
                          }}
                          className="text-[#B92720] hover:underline cursor-pointer"
                        >
                          REMOVE
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Enter Passcode (e.g. TONI_SPECIAL)"
                          className="flex-1 bg-[#0B0B0A] border border-[#292826] px-3 py-2 text-xs text-[#E9DFC9] placeholder:text-[#E9DFC9]/40 focus:outline-none focus:border-[#B59454] font-mono uppercase"
                        />
                        <button
                          type="submit"
                          className="bg-[#292826] hover:bg-[#B59454] hover:text-[#0B0B0A] text-[#E9DFC9] font-mono-label text-xs font-bold px-4 py-2 transition-colors cursor-pointer"
                        >
                          APPLY
                        </button>
                      </form>
                    )}
                    {promoMessage && (
                      <p className="text-[11px] font-mono text-[#B59454]">
                        {promoMessage}
                      </p>
                    )}

                    {/* Quick Passcode Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {Object.keys(SYNDICATE_DISCOUNTS).map((code) => (
                        <button
                          key={code}
                          type="button"
                          onClick={() => {
                            const res = applyDiscount(code);
                            setPromoMessage(res.message);
                          }}
                          className="text-[10px] font-mono px-2 py-0.5 border border-[#292826] bg-[#0B0B0A] text-[#E9DFC9]/60 hover:border-[#B59454] hover:text-[#B59454] transition-colors cursor-pointer"
                        >
                          {code}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="space-y-2.5 border-t border-b border-[#292826] py-4 text-xs font-mono-label">
                    <div className="flex justify-between text-[#E9DFC9]/70">
                      <span>SUBTOTAL</span>
                      <span>₹ {getSubtotal().toLocaleString()}</span>
                    </div>
                    {discountPercent > 0 && (
                      <div className="flex justify-between text-[#B59454]">
                        <span>{discountLabel || "FAMILY TRIBUTE"}</span>
                        <span>- ₹ {getDiscountAmount().toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#E9DFC9]/70">
                      <span>ARMORED BRIEFCASE COURIER</span>
                      <span className="text-[#B59454]">COMPLIMENTARY</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-[#E9DFC9] pt-2 border-t border-[#292826]">
                      <span>TOTAL SETTLEMENT</span>
                      <span>₹ {getTotal().toLocaleString()}</span>
                    </div>
                  </div>

                  <MagneticWrapper strength={0.14} className="w-full">
                    <button
                      type="button"
                      onClick={handleCheckout}
                      className="w-full bg-[#B92720] hover:bg-[#9a1f19] text-white font-mono-label text-xs sm:text-sm font-bold py-4 border border-[#B92720] shadow-editorial transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-4 h-4" />
                      SEAL THE CONTRACT &amp; DISPATCH BRIEFCASE
                    </button>
                  </MagneticWrapper>
                </div>
              </div>
            </KineticSection>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
