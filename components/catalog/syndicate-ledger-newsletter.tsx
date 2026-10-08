"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Mail,
  Check,
  ArrowRight,
  ShieldCheck,
  Key,
  Briefcase,
} from "lucide-react";
import { useBriefcaseStore } from "@/lib/briefcase-store";
import {
  KineticSection,
  KineticTiltCard,
  MagneticWrapper,
} from "@/components/ui/kinetic-scroll";

const FAMILY_VOUCHERS = [
  {
    code: "DON_CORLEONE",
    discount: "35% OFF",
    title: "THE GODFATHER'S BLESSING",
    note: "Full 35% family tribute across all 7 bespoke cuts.",
  },
  {
    code: "TONI_SPECIAL",
    discount: "25% OFF",
    title: "TONI LEE'S PERSONAL CUT",
    note: "25% off courtesy of the Master Tailor himself.",
  },
];

export function SyndicateLedgerNewsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);

  const { applyDiscount, openBriefcase } = useBriefcaseStore();

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 75,
        origin: { y: 0.65 },
        colors: ["#8B0000", "#D4AF37", "#121214"],
      });
    } catch {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      applyDiscount("TONI_SPECIAL");
      setAppliedVoucher("TONI_SPECIAL");
      triggerConfetti();
    }
  };

  const handleClaimVoucher = (code: string) => {
    const res = applyDiscount(code);
    if (res.success) {
      setAppliedVoucher(code);
      triggerConfetti();
    }
  };

  return (
    <KineticSection intensity={0.65}>
      <KineticTiltCard tiltMax={2}>
        <div
          className="relative w-full bg-[#D7BE9A] text-[#141210] border-3 border-black shadow-[8px_8px_0px_0px_#D4AF37,12px_12px_0px_0px_#000000] overflow-hidden select-none"
          style={{
            backgroundImage: "url('/images/syndicate-code/kraft-paper-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* 90s Comic Halftone Ink Dot Pattern on Kraft Parchment */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply"
            style={{
              backgroundImage: "radial-gradient(#141210 1.25px, transparent 1.25px)",
              backgroundSize: "14px 14px",
            }}
          />

          {/* Aged Ink Rim Shadow */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_45px_rgba(40,25,15,0.3)]" />

          {/* Top Comic Noir Strip Header */}
          <div className="relative z-20 bg-[#121214] text-[#FAF7EE] border-b-3 border-black px-5 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/images/syndicate-code/brush-stroke-left.png"
                alt="Crimson Brush"
                width={40}
                height={12}
                className="object-contain"
              />
              <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-[0.22em] text-[#D4AF37]">
                THE BLACK LEDGER &bull; UNDERWORLD DISPATCH
              </span>
            </div>
            <span className="font-mono text-[11px] font-black uppercase tracking-widest bg-[#D4AF37] text-black px-2.5 py-0.5 border-2 border-black">
              ZERO PAPER TRAIL
            </span>
          </div>

          {/* Main Two-Column 90s Comic Ledger Content */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">
            {/* LEFT COLUMN: BLACK LEDGER INSCRIPTION FORM */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 border-b-3 lg:border-b-0 lg:border-r-3 border-black flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: -6, scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 280, damping: 16 }}
                    className="relative w-12 h-12 shrink-0 bg-[#F7EFE4] border-2 border-black shadow-[3px_3px_0px_0px_#000000] flex items-center justify-center p-1.5"
                  >
                    <Image
                      src="/images/syndicate-code/icon-attitude-fedora.png"
                      alt="Syndicate Fedora"
                      width={42}
                      height={42}
                      className="object-contain"
                    />
                  </motion.div>
                  <div>
                    <span className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[#8B0000] block">
                      STRICTLY CONFIDENTIAL
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#121214] leading-none">
                      ENTER THE BLACK LEDGER.
                    </h2>
                  </div>
                </div>

                <p className="font-sans text-sm sm:text-base font-semibold text-[#26221E] leading-relaxed max-w-xl">
                  Inscribe your dispatch address into the Family&apos;s private ledger
                  to unlock secret Como fabric allocations and an instant{" "}
                  <span className="bg-[#8B0000] text-[#FAF7EE] px-1.5 py-0.5 font-mono text-xs font-black border border-black">
                    25% BESPOKE TRIBUTE
                  </span>{" "}
                  on your next commission.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {isSubscribed ? (
                  <motion.div
                    key="subscribed"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="bg-[#F7EFE4] border-3 border-black p-5 sm:p-6 shadow-[6px_6px_0px_0px_#8B0000] space-y-3"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="inline-flex items-center gap-2 font-display text-xl font-black uppercase text-[#15803d]">
                        <Check className="w-6 h-6 stroke-[3]" /> SIT-DOWN APPROVED!
                      </span>
                      <span className="font-mono text-xs font-black uppercase bg-[#121214] text-[#D4AF37] px-3 py-1 border-2 border-black">
                        25% APPLIED TO BRIEFCASE
                      </span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm font-bold text-[#26221E]">
                      Your dispatch is logged in the Black Ledger. Secret code{" "}
                      <strong className="font-mono bg-[#D4AF37] px-2 py-0.5 border border-black">
                        TONI_SPECIAL
                      </strong>{" "}
                      is now active in your briefcase!
                    </p>
                    <button
                      type="button"
                      onClick={openBriefcase}
                      className="px-5 py-2.5 bg-[#121214] hover:bg-[#8B0000] text-[#FAF7EE] font-mono text-xs font-black uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_0px_#D4AF37] transition-all inline-flex items-center gap-2 cursor-pointer"
                    >
                      <Briefcase className="w-4 h-4" /> OPEN BLACK LEDGER BRIEFCASE
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <div className="relative flex-1">
                      <Mail className="w-5 h-5 text-[#121214] absolute left-4 top-1/2 -translate-y-1/2 stroke-[2.5]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="YOUR UNDERWORLD DISPATCH EMAIL..."
                        className="w-full bg-[#F7EFE4] border-3 border-black pl-12 pr-4 py-4 font-mono text-xs sm:text-sm font-bold text-[#121214] placeholder-[#121214]/50 shadow-[4px_4px_0px_0px_#000000] focus:outline-none focus:bg-white transition-all"
                      />
                    </div>
                    <MagneticWrapper strength={0.2}>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-7 py-4 bg-[#8B0000] hover:bg-[#121214] text-[#FAF7EE] hover:text-[#D4AF37] font-display text-lg font-black uppercase tracking-wider border-3 border-black shadow-[5px_5px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#D4AF37] transition-all transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                      >
                        <span>INSCRIBE NOW</span>
                        <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                      </button>
                    </MagneticWrapper>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Bottom Ink Seals */}
              <div className="flex flex-wrap items-center gap-5 pt-1 text-xs font-mono font-black text-[#121214]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8B0000] stroke-[2.5]" />
                  ARMORED COURIER DISPATCH
                </span>
                <span className="flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-[#8B0000] stroke-[2.5]" />
                  FIVE FAMILIES VERIFIED
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE COMIC VOUCHER STUBS (1-CLICK APPLY) */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#161412]/95 text-[#FAF7EE] flex flex-col justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-[#D4AF37] block">
                  ONE-CLICK SYNDICATE PASSCODES
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#FAF7EE]">
                  SECRET FAMILY <span className="text-[#D4AF37]">TRIBUTES</span>
                </h3>
              </div>

              <div className="space-y-3">
                {FAMILY_VOUCHERS.map((v, idx) => {
                  const isActive = appliedVoucher === v.code;
                  return (
                    <motion.div
                      key={v.code}
                      initial={{ opacity: 0, x: 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: idx * 0.1,
                        type: "spring",
                        stiffness: 180,
                        damping: 20,
                      }}
                      whileHover={{ y: -2 }}
                      className={`p-4 border-3 border-black transition-all ${
                        isActive
                          ? "bg-[#D4AF37] text-[#0A0A0C] shadow-[5px_5px_0px_0px_#8B0000]"
                          : "bg-[#F7EFE4] text-[#121214] shadow-[5px_5px_0px_0px_#000000]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 pb-1.5 border-b-2 border-dashed border-black/40">
                        <span className="font-mono text-xs font-black uppercase tracking-wider text-[#8B0000]">
                          {v.title}
                        </span>
                        <span className="font-display text-sm font-black uppercase bg-[#121214] text-[#D4AF37] px-2.5 py-0.5 border border-black">
                          {v.discount}
                        </span>
                      </div>

                      <p className="font-sans text-xs font-bold mt-2 mb-3 text-[#26221E]">
                        {v.note}
                      </p>

                      <div className="flex items-center justify-between gap-2">
                        <code className="font-mono text-xs font-black tracking-widest bg-white px-3 py-1.5 border-2 border-black text-[#121214]">
                          {v.code}
                        </code>

                        <button
                          type="button"
                          onClick={() => handleClaimVoucher(v.code)}
                          className={`px-3.5 py-1.5 font-mono text-[11px] font-black uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
                            isActive
                              ? "bg-[#15803d] text-white shadow-[2px_2px_0px_0px_#000]"
                              : "bg-[#8B0000] hover:bg-[#121214] text-white shadow-[3px_3px_0px_0px_#000]"
                          }`}
                        >
                          {isActive ? "APPLIED TO LEDGER ✓" : "APPLY CODE →"}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </KineticTiltCard>
    </KineticSection>
  );
}
