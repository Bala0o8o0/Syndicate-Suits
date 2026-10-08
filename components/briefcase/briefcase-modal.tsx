"use client";

import React, { useState } from "react";
import { X, Briefcase, Trash2, Plus, Minus, Tag, ShieldCheck, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useBriefcaseStore } from "@/lib/briefcase-store";

export function BriefcaseModal() {
  const {
    items,
    isOpen,
    activeDiscountCode,
    discountPercent,
    closeBriefcase,
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
      setIsOrdered(false);
      closeBriefcase();
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBriefcase}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
          />

          {/* Confidential Ledger Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-lg h-full bg-[#0B0B0A] border-l border-[#292826] flex flex-col overflow-hidden text-[#E9DFC9] shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 bg-[#131312] border-b border-[#292826] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#B92720] text-white flex items-center justify-center border border-[#B92720]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[#E9DFC9]">
                    THE BLACK LEDGER
                  </h2>
                  <span className="text-[10px] font-mono-label text-[#B59454] block -mt-1">
                    CONFIDENTIAL &bull; {getItemCount()} PIECES IN BRIEFCASE
                  </span>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close ledger"
                onClick={closeBriefcase}
                className="p-2 text-[#E9DFC9]/60 hover:text-[#E9DFC9] hover:bg-[#292826] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success Checkout View */}
            {isOrdered ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#0B0B0A] space-y-4">
                <div className="w-16 h-16 bg-[#B92720] text-white flex items-center justify-center border border-[#B92720] mb-2 shadow-editorial">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl font-bold text-[#E9DFC9] uppercase">
                  DISPATCH CONFIRMED
                </h3>
                <p className="text-xs text-[#E9DFC9]/70 max-w-sm leading-relaxed font-sans">
                  Toni Lee is personally inspecting the Level III-A Kevlar weave. Your bespoke pieces are being packed into a steel-reinforced discreet briefcase.
                </p>
                <span className="font-mono-label text-[10px] text-[#B59454] border border-[#292826] px-3 py-1 bg-[#171715]">
                  DISCRETION GUARANTEED &bull; ZERO PAPER TRAIL
                </span>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-paper-texture">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                      <div className="w-14 h-14 bg-[#171715] border border-[#292826] flex items-center justify-center text-[#B59454]">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <h3 className="font-display text-xl font-bold uppercase text-[#E9DFC9]">
                        BRIEFCASE IS EMPTY
                      </h3>
                      <p className="text-xs text-[#E9DFC9]/60 max-w-xs font-sans">
                        You can&apos;t attend the sit-down in off-the-rack. Explore the Syndicate Vault to add bespoke pieces.
                      </p>
                      <Link
                        href="/shop"
                        onClick={closeBriefcase}
                        className="bg-[#E9DFC9] hover:bg-[#B59454] text-[#0B0B0A] font-mono-label text-xs font-bold px-6 py-3 border border-[#E9DFC9] transition-colors flex items-center gap-2 shadow-editorial"
                      >
                        EXPLORE THE VAULT <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    items.map((item) => {
                      const fabric = item.suit.fabrics.find((f) => f.id === item.selectedFabricId) || item.suit.fabrics[0];
                      const lapel = item.suit.lapels.find((l) => l.id === item.selectedLapelId) || item.suit.lapels[0];

                      return (
                        <div
                          key={item.id}
                          className="bg-[#131312] border border-[#292826] p-4 flex gap-4 relative shadow-sm"
                        >
                          <div className="relative w-20 h-24 border border-[#292826] bg-[#0B0B0A] flex-shrink-0">
                            <Image
                              src={item.suit.image}
                              alt={item.suit.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between">
                                <h3 className="font-display text-lg font-bold text-[#E9DFC9] uppercase">
                                  {item.suit.name}
                                </h3>
                                <button
                                  type="button"
                                  aria-label={`Remove ${item.suit.name}`}
                                  onClick={() => removeItem(item.id)}
                                  className="text-[#E9DFC9]/40 hover:text-[#B92720] transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <span className="font-mono-label text-[10px] text-[#B59454] block">
                                {item.suit.alias}
                              </span>
                              <div className="text-[11px] font-mono-label text-[#E9DFC9]/60 mt-1 space-y-0.5">
                                <div>FABRIC: {fabric.name}</div>
                                <div>LAPEL: {lapel.name}</div>
                                <div>SIZE: {item.size}</div>
                                {item.monogram && (
                                  <div>MONOGRAM: &ldquo;{item.monogram}&rdquo;</div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#292826]">
                              <span className="font-mono-label text-xs font-bold text-[#E9DFC9]">
                                ₹ {(item.unitPrice * item.quantity).toLocaleString()}
                              </span>

                              <div className="flex items-center gap-2 border border-[#292826] bg-[#171715] px-1.5 py-0.5 text-xs font-mono">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="text-[#E9DFC9]/60 hover:text-white p-0.5"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-1.5 font-bold">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="text-[#E9DFC9]/60 hover:text-white p-0.5"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer Calculations */}
                {items.length > 0 && (
                  <div className="p-6 bg-[#131312] border-t border-[#292826] space-y-4">
                    {/* Discount Code Form */}
                    <div>
                      {activeDiscountCode ? (
                        <div className="bg-[#171715] border border-[#B59454] p-3 flex items-center justify-between text-xs font-mono-label">
                          <div className="flex items-center gap-2 text-[#B59454]">
                            <Tag className="w-4 h-4" />
                            <span>{activeDiscountCode} ({discountPercent}% CUT)</span>
                          </div>
                          <button
                            type="button"
                            onClick={removeDiscount}
                            className="text-[#B92720] hover:underline"
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
                            placeholder="CODE (e.g. TONI_SPECIAL)"
                            className="flex-1 bg-[#171715] border border-[#292826] px-3.5 py-2.5 text-xs font-mono text-[#E9DFC9] placeholder-[#E9DFC9]/40 focus:outline-none focus:border-[#B59454]"
                          />
                          <button
                            type="submit"
                            className="bg-[#1F1E1C] hover:bg-[#292826] text-[#E9DFC9] font-mono-label text-xs px-4 border border-[#292826] transition-colors"
                          >
                            APPLY
                          </button>
                        </form>
                      )}
                      {promoMessage && !activeDiscountCode && (
                        <p className="text-[11px] font-mono-label text-[#B92720] mt-1.5">{promoMessage}</p>
                      )}
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-1.5 text-xs font-mono-label text-[#E9DFC9]/60 border-t border-[#292826] pt-3">
                      <div className="flex justify-between">
                        <span>SUBTOTAL</span>
                        <span className="text-[#E9DFC9]">₹ {getSubtotal().toLocaleString()}</span>
                      </div>
                      {discountPercent > 0 && (
                        <div className="flex justify-between text-[#B92720]">
                          <span>FAMILY CUT ({discountPercent}%)</span>
                          <span>-₹ {getDiscountAmount().toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>ARMORED DISPATCH</span>
                        <span className="text-[#B59454]">COMPLIMENTARY</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-[#E9DFC9] pt-2 border-t border-[#292826]">
                        <span>TOTAL DUE</span>
                        <span className="text-[#B59454]">₹ {getTotal().toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCheckout}
                      className="w-full bg-[#B92720] hover:bg-[#991f1a] text-white font-mono-label text-xs font-bold py-4 border border-[#B92720] shadow-editorial transition-all flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      SEAL LEDGER &bull; DISPATCH ARMORED COURIER
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}