"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShieldCheck, Briefcase, Check, ArrowRight, Ruler, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Suit } from "@/lib/suits-data";
import { useBriefcaseStore } from "@/lib/briefcase-store";

interface SuitQuickViewModalProps {
  suit: Suit | null;
  onClose: () => void;
}

const AVAILABLE_SIZES = ["38R", "40R", "42R", "44R", "46R", "Custom MTM"];

export function SuitQuickViewModal({ suit, onClose }: SuitQuickViewModalProps) {
  if (!suit) return null;
  return <SuitQuickViewModalContent key={suit.id} suit={suit} onClose={onClose} />;
}

function SuitQuickViewModalContent({
  suit,
  onClose,
}: {
  suit: Suit;
  onClose: () => void;
}) {
  const { addItem, openBriefcase } = useBriefcaseStore();

  const [selectedFabricId, setSelectedFabricId] = useState<string>(suit.fabrics[0]?.id || "");
  const selectedLapelId = suit.lapels[0]?.id || "";
  const selectedLiningId = suit.linings[0]?.id || "";
  const [selectedSize, setSelectedSize] = useState<string>("40R");
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const currentFabric = suit.fabrics.find((f) => f.id === selectedFabricId) || suit.fabrics[0];
  const totalPrice = (suit.price + (currentFabric?.addedPrice || 0)) * quantity;
  const priceFormatted = `₹ ${totalPrice.toLocaleString("en-IN")}`;

  const handleAddToCart = () => {
    addItem({
      suit,
      selectedFabricId,
      selectedLapelId,
      selectedLiningId,
      size: selectedSize,
      unitPrice: suit.price + (currentFabric?.addedPrice || 0),
      quantity,
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      openBriefcase();
      onClose();
    }, 700);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-2xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0F0F12] border border-white/[0.12] shadow-[0_25px_80px_rgba(0,0,0,0.95)] z-10 text-white grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-white hover:text-black text-white/80 border border-white/10 flex items-center justify-center transition-all shadow-lg backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Visual Portrayal */}
          <div className="lg:col-span-6 relative min-h-[420px] lg:min-h-full bg-[#08080A] border-b lg:border-b-0 lg:border-r border-white/[0.08] overflow-hidden flex flex-col justify-between">
            <div className="relative w-full h-[450px] lg:h-full">
              <Image
                src={suit.image}
                alt={`${suit.name} bespoke suit`}
                fill
                priority
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-transparent to-black/30 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Tailoring Configuration */}
          <div className="lg:col-span-6 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Badge & Title */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
                    {suit.alias} &bull; {suit.rank}
                  </span>
                </div>
                <h2 className="font-luxury text-3xl sm:text-4xl font-light text-white tracking-wide">
                  {suit.name}
                </h2>
                <div className="flex items-baseline gap-3 mt-1.5">
                  <span className="text-2xl font-semibold text-white tracking-wide">
                    {priceFormatted}
                  </span>
                  <span className="text-xs text-white/40 font-sans">
                    Includes Bespoke Fitting & Ballistic Core
                  </span>
                </div>
              </div>

              {/* Tagline / Story */}
              <p className="text-xs sm:text-sm text-white/70 font-sans font-light leading-relaxed border-l-2 border-[#D4AF37] pl-3 py-0.5">
                {suit.tagline}
              </p>

              {/* Fabric Selector */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white tracking-wider uppercase text-[11px]">SELECT FABRIC:</span>
                  <span className="text-[#D4AF37] font-medium">{currentFabric.name}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {suit.fabrics.map((fabric) => {
                    const isSelected = fabric.id === selectedFabricId;
                    return (
                      <button
                        key={fabric.id}
                        type="button"
                        onClick={() => setSelectedFabricId(fabric.id)}
                        className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                          isSelected
                            ? "border-[#D4AF37] bg-white/[0.08] shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                            : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-black/40 shrink-0"
                          style={{ backgroundColor: fabric.colorHex }}
                        />
                        <div className="truncate">
                          <div className="text-[11px] font-medium text-white truncate">
                            {fabric.name}
                          </div>
                          <div className="text-[10px] font-mono text-[#D4AF37]">
                            {fabric.addedPrice > 0 ? `+₹${fabric.addedPrice.toLocaleString("en-IN")}` : "Included"}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white tracking-wider uppercase text-[11px]">CHEST SIZE:</span>
                  <span className="text-[11px] text-white/50 flex items-center gap-1">
                    <Ruler className="w-3.5 h-3.5 text-[#D4AF37]" /> European Bespoke Fit
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SIZES.map((size) => {
                    const isSelected = size === selectedSize;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                          isSelected
                            ? "bg-white text-black font-semibold shadow-sm"
                            : "bg-white/[0.03] text-white/60 hover:text-white border border-white/[0.08]"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-[11px] font-semibold text-white tracking-wider uppercase">QUANTITY:</span>
                <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.03]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-sm hover:bg-white/10 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-semibold text-xs">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-sm hover:bg-white/10 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-98 ${
                  isAdded
                    ? "bg-[#15803d] text-white"
                    : "bg-[#B92720] hover:bg-[#991f1a] text-white shadow-[0_0_25px_rgba(185,39,32,0.3)]"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" /> ADDED TO BRIEFCASE
                  </>
                ) : (
                  <>
                    <Briefcase className="w-4 h-4" /> ADD TO DISCREET BRIEFCASE &bull; {priceFormatted}
                  </>
                )}
              </button>

              <Link
                href={`/shop/${suit.id}`}
                onClick={onClose}
                className="w-full py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/90 hover:text-white text-xs font-medium tracking-wider uppercase border border-white/[0.1] transition-colors flex items-center justify-center gap-1.5"
              >
                Full Atelier Details & Bespoke Options <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </Link>

              {/* Guarantees note */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-white/40 border-t border-white/[0.04]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#D4AF37]" /> Ballistic Core Certified
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#D4AF37]" /> Discreet Armored Delivery
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
