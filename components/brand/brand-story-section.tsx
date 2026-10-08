"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import {
  ArrowRight,
  X,
  ShieldCheck,
  Scissors,
  Sparkles,
} from "lucide-react";
import {
  TornPaperPhotoFrame,
} from "@/components/brand/torn-paper-photo-frame";
import {
  KineticTiltCard,
  MagneticWrapper,
  ScrollVelocitySkew,
} from "@/components/ui/kinetic-scroll";

const SEVEN_ARCHETYPES = [
  { id: "don", suitId: "the-don", title: "The Don", name: "DON", code: "ONYX BLACK", price: "₹3,45,000" },
  { id: "boss", suitId: "the-boss", title: "The Boss", name: "BOSS", code: "NAVY 3-PC", price: "₹3,10,000" },
  { id: "capo", suitId: "the-capo", title: "The Capo", name: "CAPO", code: "COMO CHARCOAL", price: "₹2,95,000" },
  { id: "consigliere", suitId: "the-consigliere", title: "The Consigliere", name: "CONS", code: "CREAM LINEN", price: "₹2,80,000" },
  { id: "enforcer", suitId: "the-enforcer", title: "The Enforcer", name: "ENF", code: "BURGUNDY VELVET", price: "₹2,65,000" },
  { id: "underboss", suitId: "the-underboss", title: "The Underboss", name: "UND", code: "COVERT OLIVE", price: "₹2,50,000" },
  { id: "wildcard", suitId: "the-wildcard", title: "The Wildcard", name: "WLD", code: "ROYAL COBALT", price: "₹2,75,000" },
];

export function BrandStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ch1Ref = useRef<HTMLDivElement>(null);
  const ch2Ref = useRef<HTMLDivElement>(null);
  const ch4Ref = useRef<HTMLDivElement>(null);

  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [selectedArchetype, setSelectedArchetype] = useState<string>("don");

  const activeArchetypeData =
    SEVEN_ARCHETYPES.find((a) => a.id === selectedArchetype) || SEVEN_ARCHETYPES[0];

  // Track overall section scroll progress for subtle kinetic parallax and image switching
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothThreadProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  const bgGlowY = useTransform(smoothThreadProgress, [0, 1], ["-15%", "25%"]);

  // Synchronize active photo with scroll position across the 3 story milestones
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.35) {
      setActivePhotoIndex(0); // Syndicate Lineup
    } else if (latest < 0.70) {
      setActivePhotoIndex(1); // Little Italy Sit-Down
    } else {
      setActivePhotoIndex(2); // Corner Atelier
    }
  });

  const handleSelectPhoto = (index: number) => {
    setActivePhotoIndex(index);
    const targetRefs = [ch1Ref, ch2Ref, ch4Ref];
    const target = targetRefs[index]?.current;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* BRAND STORY CONTAINER                                                     */}
      {/* ========================================================================= */}
      <section
        id="brand-story"
        className="relative bg-[#000000] text-[#FAF7EE] border-t border-b border-white/[0.08] overflow-visible select-none"
      >
        {/* Ambient Scroll-Driven Gold Noir Spotlight */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            style={{ y: bgGlowY }}
            className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] blur-3xl"
          />
        </div>

        {/* ======================================================================= */}
        {/* CONTINUOUS LUXURY STICKY EDITORIAL SCROLL WITH TORN PAPER PRESENTATION  */}
        {/* ======================================================================= */}
        <div
          ref={sectionRef}
          className="relative pt-12 pb-24 sm:pb-36 lg:pb-44"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* =================================================================== */}
              {/* LEFT STICKY COLUMN: TACTILE TORN PAPER PHOTO FRAME                   */}
              {/* =================================================================== */}
              <div className="lg:col-span-6 lg:sticky lg:top-28 pt-4 sm:pt-8 pb-6 lg:pb-20 flex flex-col items-center justify-center">
                <TornPaperPhotoFrame
                  activeIndex={activePhotoIndex}
                  onSelectIndex={handleSelectPhoto}
                />
              </div>

              {/* =================================================================== */}
              {/* RIGHT COLUMN: Continuous Scroll-Revealed Narrative + Kinetic Thread */}
              {/* =================================================================== */}
              <div className="lg:col-span-6 relative pt-6 sm:pt-10 lg:pt-14 pb-16 lg:pl-8 space-y-36 sm:space-y-48 lg:space-y-56">
                {/* Vertical Kinetic Golden Thread along Left Edge of Narrative (Desktop) */}
                <div className="hidden lg:block absolute left-0 top-14 bottom-16 w-[2px] bg-white/[0.07] overflow-hidden">
                  <motion.div
                    style={{
                      scaleY: smoothThreadProgress,
                      transformOrigin: "top",
                    }}
                    className="w-full h-full bg-gradient-to-b from-[#D4AF37] via-[#F5CE6D] to-[#B92720] shadow-[0_0_12px_rgba(212,175,55,0.8)]"
                  />
                </div>

                {/* ----------------------------------------------------------------- */}
                {/* SECTION 1: The Principle & The Seven Families                      */}
                {/* ----------------------------------------------------------------- */}
                <ScrollVelocitySkew intensity={0.75}>
                  <motion.div
                    ref={ch1Ref}
                    initial={{ opacity: 0.15, y: 45, rotateX: -8, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                    viewport={{ margin: "-12% 0px -20% 0px", amount: 0.3 }}
                    transition={{ type: "spring", stiffness: 140, damping: 22 }}
                    className="space-y-7 [perspective:900px]"
                  >
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3">
                      <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{ transformOrigin: "left" }}
                        className="w-8 h-[1px] bg-[#D4AF37]"
                      />
                      <span className="font-sans text-[11px] font-bold text-[#D4AF37] tracking-[0.3em] uppercase block">
                        THE FOUNDING PRINCIPLE
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="font-display text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tight text-[#FAF7EE] leading-[0.92]">
                      <motion.span
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 160, damping: 20, delay: 0.05 }}
                        className="block"
                      >
                        BUILT ON RESPECT.
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 160, damping: 20, delay: 0.15 }}
                        className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5CE6D] to-[#B59454] mt-2"
                      >
                        TAILORED FOR POWER.
                      </motion.span>
                    </h3>

                    {/* Lead Statement */}
                    <motion.p
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.22 }}
                      className="font-editorial-italic text-2xl sm:text-3xl text-[#E9DFC9]/90 font-light leading-snug"
                    >
                      &ldquo;Syndicate Suits was built for people who don&apos;t need to
                      follow the room.&rdquo;
                    </motion.p>
                  </motion.div>
                </ScrollVelocitySkew>

                {/* ----------------------------------------------------------------- */}
                {/* SECTION 2: The Little Italy Sit-Down & Foundation                  */}
                {/* ----------------------------------------------------------------- */}
                <ScrollVelocitySkew intensity={0.75}>
                  <motion.div
                    ref={ch2Ref}
                    initial={{ opacity: 0.15, y: 45, rotateX: -8, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                    viewport={{ margin: "-12% 0px -20% 0px", amount: 0.3 }}
                    transition={{ type: "spring", stiffness: 140, damping: 22 }}
                    className="space-y-8 [perspective:900px]"
                  >
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3">
                      <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{ transformOrigin: "left" }}
                        className="w-8 h-[1px] bg-[#D4AF37]"
                      />
                      <span className="font-sans text-[11px] font-bold text-[#D4AF37] tracking-[0.3em] uppercase block">
                        THE ATELIER SIT-DOWN
                      </span>
                    </div>

                    <h3 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#FAF7EE] tracking-tight">
                      Where contracts are sealed in worsted wool.
                    </h3>

                    {/* Card: Foundation with 3D Interactive Tilt & Animated Gauge */}
                    <KineticTiltCard tiltMax={6} className="rounded-2xl">
                      <div className="group relative p-6 sm:p-7 rounded-2xl bg-[#070707] border border-white/[0.08] hover:border-[#D4AF37]/60 transition-all duration-300 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Scissors className="w-3.5 h-3.5 text-[#D4AF37] group-hover:rotate-45 transition-transform duration-300" />
                            <span className="font-mono text-xs font-bold text-[#D4AF37] tracking-[0.2em] uppercase">
                              FOUNDATION &amp; CORE
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-white/40 tracking-wider">
                            180S WORSTED COMO
                          </span>
                        </div>

                        <h4 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#FAF7EE] tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                          Every stitch.
                        </h4>

                        <p className="font-sans text-xs sm:text-sm text-[#C8C2B5]/80 leading-relaxed">
                          Hand-rolled Italian Como worsted wool interwoven with a
                          flexible Level III-A Kevlar micro-mesh lining. Soft to the
                          touch, impenetrable to volatility.
                        </p>

                        {/* Animated Industrial Gauge Meter */}
                        <div className="pt-2 flex items-center gap-3 text-[11px] font-mono text-white/50">
                          <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden relative">
                            <motion.div
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: false, amount: 0.5 }}
                              transition={{
                                duration: 1.1,
                                ease: [0.16, 1, 0.3, 1],
                                delay: 0.15,
                              }}
                              style={{ transformOrigin: "left" }}
                              className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#D4AF37] to-[#F5CE6D]"
                            />
                          </div>
                          <span className="text-[#D4AF37] font-bold">
                            100% COMO CANVAS
                          </span>
                        </div>
                      </div>
                    </KineticTiltCard>
                  </motion.div>
                </ScrollVelocitySkew>

                {/* ----------------------------------------------------------------- */}
                {/* SECTION 3: The Corner Atelier & One Rule                           */}
                {/* ----------------------------------------------------------------- */}
                <ScrollVelocitySkew intensity={0.75}>
                  <motion.div
                    ref={ch4Ref}
                    initial={{ opacity: 0.15, y: 45, rotateX: -8, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                    viewport={{ margin: "-12% 0px -20% 0px", amount: 0.25 }}
                    transition={{ type: "spring", stiffness: 140, damping: 22 }}
                    className="space-y-10 [perspective:900px]"
                  >
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3">
                      <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{ transformOrigin: "left" }}
                        className="w-8 h-[1px] bg-[#D4AF37]"
                      />
                      <span className="font-sans text-[11px] font-bold text-[#D4AF37] tracking-[0.3em] uppercase block">
                        THE CORNER ATELIER
                      </span>
                    </div>

                    <h3 className="font-display text-4xl sm:text-5xl font-black uppercase text-[#FAF7EE] tracking-tight">
                      Under the neon glow of Little Italy.
                    </h3>

                    <p className="font-editorial-italic text-xl text-[#FAF7EE]/80">
                      &ldquo;On the corner where the rain meets the cobblestones, the
                      gold neon sign reads Syndicate Suits. Here, your status is
                      cut into stone.&rdquo;
                    </p>

                    {/* Seven Suits Statement & Interactive Segmented Pill Selection */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#FAF7EE] tracking-tight">
                          Seven suits. Seven personalities.
                        </h4>
                        <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest hidden sm:inline">
                          THE SYNDICATE SEVEN
                        </span>
                      </div>

                      {/* 7 Segmented Interactive Archetype Pills with Spring Layout Pill */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 pt-1">
                        {SEVEN_ARCHETYPES.map((arch) => {
                          const isSelected = selectedArchetype === arch.id;
                          return (
                            <motion.button
                              key={arch.id}
                              type="button"
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedArchetype(arch.id)}
                              className={`relative py-2.5 px-2 rounded-xl border text-center transition-colors duration-300 cursor-pointer overflow-hidden ${
                                isSelected
                                  ? "border-[#D4AF37] text-[#000000] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                  : "bg-[#070707] border-white/[0.08] text-white/70 hover:border-[#D4AF37]/50 hover:text-white"
                              }`}
                            >
                              {isSelected && (
                                <motion.div
                                  layoutId="brand-story-archetype-active"
                                  transition={{
                                    type: "spring",
                                    stiffness: 350,
                                    damping: 26,
                                  }}
                                  className="absolute inset-0 bg-[#D4AF37] z-0"
                                />
                              )}
                              <span
                                className={`relative z-10 text-[8px] font-mono block truncate ${
                                  isSelected
                                    ? "text-black/75 font-bold"
                                    : "text-white/40"
                                }`}
                              >
                                {arch.code.split(" ")[0]}
                              </span>
                              <span className="relative z-10 text-[10px] font-sans font-bold block truncate mt-0.5">
                                {arch.name}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Selected Archetype Quick Preview Bar */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeArchetypeData.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#0A0A0A] border border-white/[0.08]"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-display text-sm sm:text-base font-bold uppercase text-[#FAF7EE]">
                              {activeArchetypeData.title}
                            </span>
                            <span className="text-white/20">&bull;</span>
                            <span className="font-mono text-[10px] sm:text-xs text-[#D4AF37] tracking-wider uppercase">
                              {activeArchetypeData.code} ({activeArchetypeData.price})
                            </span>
                          </div>
                          <Link
                            href={`/shop/${activeArchetypeData.suitId}`}
                            className="group/inspect inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#FAF7EE] hover:text-[#D4AF37] transition-colors uppercase tracking-wider"
                          >
                            <span>Inspect Cut</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-300 group-hover/inspect:translate-x-1" />
                          </Link>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* The Golden Rule: LOOK THE PART. */}
                    <div className="space-y-3 pt-6 border-t border-white/[0.08]">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B92720]/15 border border-[#B92720]/30 text-[#B92720] text-[10px] font-mono tracking-[0.25em] uppercase font-bold">
                        <span>THE SYNDICATE MANDATE</span>
                      </div>

                      <div className="font-mono text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase block">
                        ONE RULE:
                      </div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 15 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ type: "spring", stiffness: 200, damping: 18 }}
                        className="font-display text-5xl sm:text-7xl xl:text-8xl font-black uppercase tracking-tight text-[#FAF7EE] leading-[0.9]"
                      >
                        LOOK THE <span className="text-[#B92720]">PART.</span>
                      </motion.div>
                    </div>

                    {/* High-End Sculptural Liquid Gold CTA Button with Magnetic Pull */}
                    <div className="pt-2">
                      <MagneticWrapper strength={0.25}>
                        <button
                          type="button"
                          onClick={() => setIsStoryModalOpen(true)}
                          className="group relative inline-flex items-center gap-4 px-10 sm:px-12 py-5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3CE6D] to-[#B59454] text-[#000000] font-mono text-xs sm:text-sm font-black tracking-[0.25em] shadow-[0_10px_35px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                        >
                          <span>OUR STORY</span>
                          <div className="w-8 h-8 rounded-full bg-black text-[#D4AF37] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </button>
                      </MagneticWrapper>
                    </div>
                  </motion.div>
                </ScrollVelocitySkew>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* LUXURY EDITORIAL "OUR STORY" MODAL (PURE BLACK)                           */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isStoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Deep Obsidian Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsStoryModalOpen(false)}
              className="fixed inset-0 bg-[#000000]/92 backdrop-blur-xl"
            />

            {/* Modal Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-[#050505] border-t-2 border-t-[#D4AF37] border-x border-b border-white/[0.1] p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Top Specular Line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsStoryModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center border border-white/[0.1] bg-[#0A0A0A] text-[#FAF7EE] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all cursor-pointer"
                aria-label="Close story modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="space-y-2 border-b border-white/[0.08] pb-6">
                <span className="font-sans text-[11px] font-bold text-[#D4AF37] tracking-[0.25em] uppercase block">
                  THE SYNDICATE CHARTER ◆ LITTLE ITALY 1928
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#FAF7EE] tracking-tight">
                  THE STORY OF{" "}
                  <span className="text-[#D4AF37]">SYNDICATE SUITS</span>
                </h3>
                <p className="font-editorial-italic text-base sm:text-lg text-[#E9DFC9]/80 font-light">
                  &ldquo;Respect is never negotiated. It is tailored directly into the
                  fabric.&rdquo;
                </p>
              </div>

              {/* Body Content */}
              <div className="py-6 space-y-6 text-sm sm:text-base font-sans text-[#E9DFC9]/85 leading-relaxed">
                <div className="space-y-2">
                  <h4 className="font-display text-lg uppercase tracking-wide text-[#FAF7EE] flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-[#D4AF37]" />
                    THE COMO VALLEY GENESIS (1928)
                  </h4>
                  <p className="text-xs sm:text-sm text-[#C8C2B5]/80 leading-relaxed">
                    Under the flickering neon of Little Italy and behind the
                    heavy mahogany doors of Master Tailor Toni Lee&apos;s private
                    atelier, Syndicate Suits was forged. Disillusioned with
                    fragile commercial luxury, the Five Families demanded
                    garments that could survive the volatility of high-stakes
                    sit-downs.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display text-lg uppercase tracking-wide text-[#FAF7EE] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#B92720]" />
                    BALLISTIC WOOL &amp; BESPOKE PROTECTION
                  </h4>
                  <p className="text-xs sm:text-sm text-[#C8C2B5]/80 leading-relaxed">
                    By infusing hand-rolled 180s worsted Italian wool with an
                    ultra-lightweight Kevlar micro-mesh core, Toni created
                    something unprecedented: a suit with the drape of Savile Row
                    and the protection of an armored vest. Concealed holster
                    pockets, silk-lined passport sleeves, and pick-resistant
                    reinforced seams became standard issue.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display text-lg uppercase tracking-wide text-[#FAF7EE] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    SEVEN PERSONALITIES. ONE RULE.
                  </h4>
                  <p className="text-xs sm:text-sm text-[#C8C2B5]/80 leading-relaxed">
                    Each cut corresponds to a distinct archetype in the
                    underworld hierarchy: The Don, The Boss, The Capo, The
                    Consigliere, The Enforcer, The Underboss, and The Wildcard.
                    No two bosses walk alike—and no two suits are ever cut
                    identical.
                  </p>
                </div>
              </div>

              {/* Modal Footer / Navigation Options */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href="#syndicate-seven"
                  onClick={() => setIsStoryModalOpen(false)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#FAF7EE] hover:bg-[#D4AF37] text-[#000000] font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg text-center cursor-pointer"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  EXPLORE THE SEVEN CUTS
                </a>

                <Link
                  href="/shop"
                  onClick={() => setIsStoryModalOpen(false)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#000000] hover:bg-white/[0.05] text-[#FAF7EE] border border-white/[0.15] font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all text-center"
                >
                  ENTER THE BESPOKE VAULT
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
