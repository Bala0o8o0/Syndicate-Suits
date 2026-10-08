"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { SyndicateSeven3DCarousel } from "@/components/catalog/syndicate-seven-3d-carousel";
import { BrandStorySection } from "@/components/brand/brand-story-section";
import { SyndicateReviews } from "@/components/catalog/syndicate-reviews";
import { useBriefcaseStore } from "@/lib/briefcase-store";
import { FinalCtaSection } from "@/components/catalog/final-cta-section";
import { SyndicateCodeSection } from "@/components/brand/syndicate-code-section";
import Hero from "@/components/catalog/Hero";
import {
  KineticSection,
  KineticWords,
  KineticTiltCard,
  MagneticWrapper,
  ScrollVelocitySkew,
} from "@/components/ui/kinetic-scroll";

export default function HomePage() {
  const { openBriefcase, applyDiscount } = useBriefcaseStore();

  const [vipCodeInput, setVipCodeInput] = useState("");
  const [vipMessage, setVipMessage] = useState<string | null>(null);
  const [vipSuccess, setVipSuccess] = useState(true);

  const handleVipUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vipCodeInput.trim()) return;
    const res = applyDiscount(vipCodeInput);
    setVipMessage(res.message);
    setVipSuccess(res.success);
    if (res.success) {
      setVipCodeInput("");
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#B92720", "#B59454", "#E9DFC9"],
        });
      } catch {}
    }
  };

  return (
    <div className="bg-[#0B0B0A] text-[#E9DFC9]">
      {/* ========================================================================= */}
      {/* SECTION 1: ULTRA-MODERN CONTINUOUS VIDEO HERO WITH ZOOM REVEAL */}
      {/* ========================================================================= */}
      <Hero />

      {/* ========================================================================= */}
      {/* BRAND STORY */}
      {/* ========================================================================= */}
      <BrandStorySection />

      {/* ========================================================================= */}
      {/* THE SYNDICATE CODE (KRAFT PAPER ATELIER PILLARS) */}
      {/* ========================================================================= */}
      <SyndicateCodeSection />

      {/* ========================================================================= */}
      {/* SECTION 2: THE SYNDICATE SEVEN (3D SPATIAL CAROUSEL) */}
      {/* ========================================================================= */}
      <section
        id="syndicate-seven"
        className="relative w-full py-24 sm:py-32 bg-[#020202] border-t border-b border-[#1E1D1A] overflow-hidden scroll-mt-20 select-none"
      >
        {/* Subtle Atmospheric Noir Lighting & Vignette Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(181,148,84,0.08)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.85)_100%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Editorial Noir Title with Kinetic Word Reveal */}
          <ScrollVelocitySkew intensity={0.75}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 160, damping: 20 }}
              className="text-center space-y-3.5 max-w-3xl mx-auto flex flex-col items-center"
            >
              <span className="font-sans text-xs font-bold text-[#B59454] tracking-[0.3em] uppercase block">
                THE BESPOKE SILHOUETTES
              </span>
              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#FAF7EE] leading-none">
                <KineticWords
                  text="THE SYNDICATE SEVEN"
                  highlightWords={["SEVEN"]}
                  highlightClassName="text-[#B59454]"
                />
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-editorial-italic text-lg sm:text-xl text-[#FAF7EE]/70 leading-relaxed"
              >
                &ldquo;Seven archetypes. Seven personalities. Exactly seven cuts exist
                in the Syndicate underworld.&rdquo;
              </motion.p>
            </motion.div>
          </ScrollVelocitySkew>

          {/* 3D Interactive Carousel */}
          <SyndicateSeven3DCarousel />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* UNDERWORLD CLIENT TESTIMONIALS */}
      {/* ========================================================================= */}
      <section
        id="testimonials"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 my-28 sm:my-36"
      >
        <SyndicateReviews />
      </section>

      {/* ========================================================================= */}
      {/* THE FINAL CTA */}
      {/* ========================================================================= */}
      <FinalCtaSection />

      {/* ========================================================================= */}
      {/* THE BLACK LEDGER BRIEFCASE */}
      {/* ========================================================================= */}
      <section id="black-ledger" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-28 sm:my-36 scroll-mt-24">
        <KineticSection>
          <KineticTiltCard
            tiltMax={3}
            scaleOnHover={1.008}
            glareColor="rgba(181, 148, 84, 0.12)"
            className="bg-[#131312] border border-[#292826] p-8 sm:p-14 shadow-editorial relative overflow-hidden bg-paper-texture"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Briefcase Access */}
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 160, damping: 20 }}
                className="lg:col-span-7 space-y-4"
              >
                <span className="font-sans text-xs font-bold text-[#B59454] tracking-[0.25em] uppercase block">
                  DISCREET CHECKOUT
                </span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#E9DFC9]">
                  <KineticWords
                    text="THE BLACK LEDGER"
                    highlightWords={["LEDGER"]}
                    highlightClassName="text-[#B59454]"
                    className="justify-start"
                  />
                </h2>
                <p className="font-editorial-italic text-lg text-[#E9DFC9]/80 leading-relaxed">
                  &ldquo;Zero paper trail. Encrypted transactions dispatched via private
                  armored courier.&rdquo;
                </p>
                <div className="pt-2">
                  <MagneticWrapper strength={0.22}>
                    <button
                      type="button"
                      onClick={openBriefcase}
                      className="bg-[#E9DFC9] hover:bg-[#B59454] text-[#0B0B0A] font-mono-label text-xs font-bold px-8 py-4 border border-[#E9DFC9] shadow-editorial transition-all flex items-center gap-2 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                    >
                      <Briefcase className="w-4 h-4" />
                      OPEN THE BLACK LEDGER
                    </button>
                  </MagneticWrapper>
                </div>
              </motion.div>

              {/* Right Column: Secret Promo Code */}
              <motion.div
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 160, damping: 20, delay: 0.1 }}
                className="lg:col-span-5 bg-[#0B0B0A] border border-[#292826] p-6 shadow-editorial space-y-4"
              >
                <div className="space-y-1">
                  <span className="font-sans text-xs font-bold text-[#B59454] tracking-[0.25em] block uppercase">
                    FAMILY TRIBUTE CODE
                  </span>
                  <p className="text-xs text-[#E9DFC9]/60 font-sans">
                    Try codes:{" "}
                    <strong className="text-[#E9DFC9]">DON_CORLEONE</strong> (35%)
                    or <strong className="text-[#E9DFC9]">TONI_SPECIAL</strong>{" "}
                    (25%)
                  </p>
                </div>

                <form onSubmit={handleVipUnlock} className="flex gap-2">
                  <input
                    type="text"
                    value={vipCodeInput}
                    onChange={(e) =>
                      setVipCodeInput(e.target.value.toUpperCase())
                    }
                    placeholder="CODE (e.g. TONI_SPECIAL)"
                    className="flex-1 bg-[#171715] border border-[#292826] px-4 py-3 text-xs font-mono text-[#E9DFC9] placeholder-[#E9DFC9]/40 focus:outline-none focus:border-[#B59454] transition-colors"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    className="bg-[#B92720] hover:bg-[#991f1a] text-white font-mono-label text-xs font-bold px-6 py-3 border border-[#B92720] shadow-sm transition-all cursor-pointer"
                  >
                    UNLOCK
                  </motion.button>
                </form>

                <AnimatePresence>
                  {vipMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      className={`p-3 bg-[#131312] border font-mono-label text-xs flex items-center gap-2 ${
                        vipSuccess
                          ? "border-[#B59454] text-[#B59454]"
                          : "border-[#B92720] text-[#E9DFC9]/80"
                      }`}
                    >
                      {vipSuccess && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                      <span>{vipMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </KineticTiltCard>
        </KineticSection>
      </section>
    </div>
  );
}

