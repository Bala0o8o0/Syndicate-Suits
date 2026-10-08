"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Scissors,
  Briefcase,
  Eye,
  Check,
  Shield,
  Tag,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { SUITS, Suit, SYNDICATE_DISCOUNTS } from "@/lib/suits-data";
import { useBriefcaseStore } from "@/lib/briefcase-store";
import { SuitCardData } from "@/lib/toni-store";

interface GenerativeSuitCardProps {
  suitCard?: SuitCardData;
  suitId?: string;
  onQuickView?: (suit: Suit) => void;
}

export function GenerativeSuitCard({
  suitCard,
  suitId,
  onQuickView,
}: GenerativeSuitCardProps) {
  const targetId = suitId || suitCard?.suitId || "the-don";
  const suit = SUITS.find((s) => s.id === targetId) || SUITS[0];
  const { addItem } = useBriefcaseStore();
  const [added, setAdded] = useState(false);

  const imageSrc = suit.image || `/images/suits/${suit.id}.jpg`;

  const handleAddToBriefcase = () => {
    addItem({
      suit,
      selectedFabricId: suit.fabrics[0].id,
      selectedLapelId: suit.lapels[0].id,
      selectedLiningId: suit.linings[0].id,
      size: "40R",
      unitPrice: suit.price + (suit.fabrics[0]?.addedPrice || 0),
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  };

  return (
    <div
      className="mt-2.5 overflow-hidden rounded-xl border-2 border-black bg-[#141010] shadow-[5px_5px_0px_0px_#000] transition-all"
      style={{
        background: "linear-gradient(145deg, #181313 0%, #0d0a0a 100%)",
      }}
    >
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between border-b-2 border-black bg-[#8B0000] px-3 py-1.5 text-white">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#E9DFC9]">
            BESPOKE COMMISSION &bull; {suit.number}
          </span>
        </div>
        <span className="font-mono text-[9.5px] font-bold tracking-wider text-[#D4AF37]">
          {suit.bulletproofRating}
        </span>
      </div>

      <div className="p-3">
        <div className="flex gap-3">
          {/* Suit Artwork */}
          <div
            className="relative h-[110px] w-[88px] shrink-0 overflow-hidden rounded-md border-2 border-black shadow-[2px_2px_0px_#000]"
            style={{ background: "#0a0808" }}
          >
            <Image
              src={imageSrc}
              alt={suit.name}
              fill
              className="object-cover object-top"
              sizes="88px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-1 left-1 right-1">
              <span className="block truncate font-mono text-[8px] font-bold text-[#D4AF37]">
                {suit.colorHex.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-1">
                <h4 className="font-sans text-[14px] font-black uppercase tracking-wide text-white leading-tight">
                  {suit.name}
                </h4>
              </div>
              <p className="mt-0.5 font-mono text-[9.5px] font-semibold text-[#D4AF37] tracking-wider">
                {suit.priceFormatted}
              </p>
              <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/70 font-sans">
                {suitCard?.description || suit.description}
              </p>
            </div>

            {/* Bullets snippet */}
            <div className="mt-2 flex items-center gap-1.5 text-[9px] font-mono text-white/50">
              <Shield className="h-3 w-3 text-[#D4AF37]" />
              <span className="truncate">{suit.fabrics[0].name} &bull; Matching Trousers</span>
            </div>
          </div>
        </div>

        {/* Generative UI Action Toolbar */}
        <div className="mt-3 grid grid-cols-3 gap-1.5 pt-2.5 border-t border-white/10">
          <Link
            href={`/customizer?suit=${suit.id}`}
            className="flex items-center justify-center gap-1 rounded bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/40 py-1.5 px-1 font-mono text-[9px] font-bold tracking-wider text-[#D4AF37] transition-all text-center cursor-pointer active:scale-95"
          >
            <Scissors className="h-3 w-3 shrink-0" />
            <span>FIT CUT</span>
          </Link>

          <button
            type="button"
            onClick={handleAddToBriefcase}
            className={`flex items-center justify-center gap-1 rounded py-1.5 px-1 font-mono text-[9px] font-bold tracking-wider transition-all text-center cursor-pointer active:scale-95 ${
              added
                ? "bg-emerald-600 border border-emerald-400 text-white shadow-md"
                : "bg-[#8B0000] hover:bg-[#A11212] border border-[#DC2626]/60 text-white shadow-sm"
            }`}
          >
            {added ? (
              <>
                <Check className="h-3 w-3 shrink-0" />
                <span>PACKED</span>
              </>
            ) : (
              <>
                <Briefcase className="h-3 w-3 shrink-0" />
                <span>PACK</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onQuickView?.(suit)}
            className="flex items-center justify-center gap-1 rounded bg-white/06 hover:bg-white/12 border border-white/15 py-1.5 px-1 font-mono text-[9px] font-bold tracking-wider text-white/80 transition-all text-center cursor-pointer active:scale-95"
          >
            <Eye className="h-3 w-3 shrink-0" />
            <span>SPECS</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function GenerativeDiscountCard({ code = "DON_CORLEONE" }: { code?: string }) {
  const { applyDiscount, openBriefcase } = useBriefcaseStore();
  const [applied, setApplied] = useState(false);

  const normalizedCode = code.toUpperCase().trim();
  const percent =
    SYNDICATE_DISCOUNTS[normalizedCode]?.percent ??
    (normalizedCode.includes("CORLEONE")
      ? 35
      : normalizedCode.includes("FIVE")
      ? 30
      : normalizedCode.includes("GOODFELLA")
      ? 20
      : 25);

  const handleApply = () => {
    applyDiscount(normalizedCode);
    setApplied(true);
    setTimeout(() => {
      openBriefcase();
    }, 600);
  };

  return (
    <div className="mt-2.5 overflow-hidden rounded-xl border-2 border-black bg-[#120F0C] p-3 shadow-[5px_5px_0px_0px_#000]">
      <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2">
        <div className="flex items-center gap-1.5">
          <Tag className="h-3.5 w-3.5 text-[#D4AF37]" />
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">
            SYNDICATE TRIBUTE REDUCTION
          </span>
        </div>
        <span className="font-mono text-[10px] font-black text-[#DC2626] bg-[#DC2626]/10 px-2 py-0.5 rounded border border-[#DC2626]/30">
          {percent}% OFF
        </span>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <div>
          <span className="block font-mono text-[13px] font-black tracking-widest text-white">
            {normalizedCode}
          </span>
          <span className="font-sans text-[10.5px] text-white/60">
            Valid across all 7 bespoke cuts in the Black Ledger.
          </span>
        </div>

        <button
          type="button"
          onClick={handleApply}
          className={`shrink-0 rounded px-3 py-1.5 font-mono text-[10px] font-bold tracking-wider transition-all cursor-pointer active:scale-95 ${
            applied
              ? "bg-emerald-600 text-white border border-emerald-400"
              : "bg-[#D4AF37] hover:bg-[#E5C158] text-[#120d0d] border border-black font-black"
          }`}
        >
          {applied ? "APPLIED" : "APPLY CODE"}
        </button>
      </div>
    </div>
  );
}

export function GenerativeBriefcaseCard() {
  const { items, getTotal, openBriefcase } = useBriefcaseStore();

  return (
    <div className="mt-2.5 overflow-hidden rounded-xl border-2 border-black bg-[#100D0D] p-3 shadow-[5px_5px_0px_0px_#000]">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5 text-[#D4AF37]" />
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-white">
            BLACK LEDGER BRIEFCASE
          </span>
        </div>
        <span className="font-mono text-[10px] font-bold text-[#D4AF37]">
          {items.length} {items.length === 1 ? "COMMISSION" : "COMMISSIONS"}
        </span>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <div>
          <span className="font-sans text-[11px] text-white/70 block">
            Discreet encrypted transport ready.
          </span>
          <span className="font-mono text-[11px] font-bold text-[#D4AF37]">
            ₹ {getTotal().toLocaleString()}
          </span>
        </div>

        <button
          type="button"
          onClick={openBriefcase}
          className="shrink-0 flex items-center gap-1 rounded bg-[#8B0000] hover:bg-[#A11212] px-3 py-1.5 font-mono text-[10px] font-bold tracking-wider text-white border border-black transition-all cursor-pointer active:scale-95"
        >
          <span>VIEW BRIEFCASE</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export function GenerativeAICardRenderer({
  suitCard,
  toolCall,
  onQuickView,
}: {
  suitCard?: SuitCardData;
  toolCall?: { name: string; args: Record<string, unknown> };
  onQuickView?: (suit: Suit) => void;
}) {
  if (toolCall?.name === "apply_family_discount") {
    return <GenerativeDiscountCard code={(toolCall.args?.code as string) || "DON_CORLEONE"} />;
  }

  if (
    toolCall?.name === "open_briefcase" ||
    toolCall?.name === "openBriefcase" ||
    toolCall?.name === "add_to_briefcase"
  ) {
    return (
      <div className="flex flex-col gap-2">
        {typeof toolCall.args?.suitId === "string" && (
          <GenerativeSuitCard suitId={toolCall.args.suitId} onQuickView={onQuickView} />
        )}
        <GenerativeBriefcaseCard />
      </div>
    );
  }

  if (suitCard || toolCall?.name === "recommendSuit" || typeof toolCall?.args?.suitId === "string") {
    const suitId = (toolCall?.args?.suitId as string) || suitCard?.suitId;
    return <GenerativeSuitCard suitCard={suitCard} suitId={suitId} onQuickView={onQuickView} />;
  }

  return null;
}
