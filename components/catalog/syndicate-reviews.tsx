"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { SmokeCanvas } from "@/components/ui/smoke-canvas";

interface DossierReview {
  id: string;
  fileNo: string;
  quote: string;
  name: string;
  image: string;
  photoRotate: string;
}

// 12 Declassified Underworld Dossiers with Indian, African, American, and Russian Names
const DOSSIER_REVIEWS: DossierReview[] = [
  // Indian Names
  {
    id: "arjun",
    fileNo: "FILE #001",
    quote: "The fit completely changed how I carried myself.",
    name: "ARJUN R.",
    image: "/images/characters/the-consigliere.jpg",
    photoRotate: "rotate-2",
  },
  {
    id: "kartik",
    fileNo: "FILE #036",
    quote: "The quality is unreal. You can feel the difference.",
    name: "KARTIK S.",
    image: "/images/characters/the-don.jpg",
    photoRotate: "-rotate-2",
  },
  {
    id: "rahul",
    fileNo: "FILE #047",
    quote: "Finally, a brand that understands what men actually want.",
    name: "RAHUL M.",
    image: "/images/characters/the-boss.jpg",
    photoRotate: "rotate-1",
  },

  // African Names
  {
    id: "kofi",
    fileNo: "FILE #052",
    quote: "When you step into the room in this cut, nobody questions who holds the power.",
    name: "KOFI A.",
    image: "/images/characters/the-wildcard.jpg",
    photoRotate: "-rotate-1",
  },
  {
    id: "malik",
    fileNo: "FILE #064",
    quote: "The shoulder drape is pure majesty. Rivals stand at attention before I even speak.",
    name: "MALIK B.",
    image: "/images/characters/the-capo.jpg",
    photoRotate: "rotate-2",
  },
  {
    id: "jabari",
    fileNo: "FILE #078",
    quote: "The stitching is relentless. Three years of heavy wear and it still looks fresh off the mannequin.",
    name: "JABARI M.",
    image: "/images/characters/the-underboss.jpg",
    photoRotate: "-rotate-2",
  },

  // American Names
  {
    id: "frankie",
    fileNo: "FILE #019",
    quote: "A boss doesn't negotiate with noise. He establishes presence in silence.",
    name: "FRANKIE C.",
    image: "/images/characters/the-boss.jpg",
    photoRotate: "rotate-1",
  },
  {
    id: "marcus",
    fileNo: "FILE #073",
    quote: "Took two stray rounds outside the venue. The inner core held. Finished the deal.",
    name: "MARCUS V.",
    image: "/images/characters/the-capo.jpg",
    photoRotate: "-rotate-2",
  },
  {
    id: "jack",
    fileNo: "FILE #081",
    quote: "Walking into the sit-down, the atmosphere shifted instantly. That's the Toni Lee effect.",
    name: "JACK S.",
    image: "/images/characters/the-consigliere.jpg",
    photoRotate: "rotate-1",
  },

  // Russian Names
  {
    id: "nikolai",
    fileNo: "FILE #088",
    quote: "I am built broad. Standard suits tear at the armholes. Toni's flex seams never break.",
    name: "NIKOLAI V.",
    image: "/images/characters/the-enforcer.jpg",
    photoRotate: "rotate-2",
  },
  {
    id: "dmitri",
    fileNo: "FILE #095",
    quote: "Heavy milled wool that laughs at freezing winters. Impeccable drape, zero wrinkles.",
    name: "DMITRI K.",
    image: "/images/characters/the-wildcard.jpg",
    photoRotate: "-rotate-1",
  },
  {
    id: "viktor",
    fileNo: "FILE #102",
    quote: "Drapes like liquid armor. The concealed pockets kept our ledger completely hidden.",
    name: "VIKTOR S.",
    image: "/images/characters/the-don.jpg",
    photoRotate: "rotate-1",
  },
];

export function SyndicateReviews() {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const total = DOSSIER_REVIEWS.length;

  const handlePrev = () => {
    setDirection(-1);
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setDirection(1);
    setStartIndex((prev) => (prev + 1) % total);
  };

  // 3 Case File Cards visible on desktop (wrapping continuously)
  const visibleCards = [
    DOSSIER_REVIEWS[startIndex % total],
    DOSSIER_REVIEWS[(startIndex + 1) % total],
    DOSSIER_REVIEWS[(startIndex + 2) % total],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{ type: "spring", stiffness: 130, damping: 22 }}
      className="relative bg-[#000000] border-t border-b border-white/[0.08] py-20 sm:py-28 overflow-hidden select-none"
    >
      {/* ========================================================================= */}
      {/* 1. INTERACTIVE FULL-BLEED SMOKE ANIMATION (BLACK & NOIR ATMOSPHERE)      */}
      {/* ========================================================================= */}
      <SmokeCanvas density="medium" interactive={true} />

      {/* Atmospheric Vignette & Soft Speakeasy Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#D4AF37]/[0.035] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-14">
        
        {/* ======================================================================= */}
        {/* 2. HEADER: "WORD ON THE STREET" WITH ANIMATED SIGNATURE RED UNDERLINE  */}
        {/* ======================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotateX: -20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          className="text-center [perspective:800px]"
        >
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#FAF7EE] inline-block">
            WORD ON THE{" "}
            <span className="relative inline-block text-white">
              STREET
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                style={{ transformOrigin: "left" }}
                className="absolute -bottom-2 left-0 w-full h-[4px] bg-[#B92720] rounded-full shadow-[0_0_10px_rgba(185,39,32,0.6)]"
              />
            </span>
          </h2>
        </motion.div>

        {/* ======================================================================= */}
        {/* 3. CASE FILE CAROUSEL WITH CIRCULAR ARROW CONTROLS & SWIPE             */}
        {/* ======================================================================= */}
        <div className="relative flex items-center gap-3 sm:gap-6">
          
          {/* Circular Left Arrow Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.92 }}
            onClick={handlePrev}
            aria-label="Previous case files"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/60 hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 text-white/80 hover:text-white flex items-center justify-center transition-colors duration-300 flex-shrink-0 cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>

          {/* Cards Container (3 Cards on Desktop, 2 on Tablet, 1 on Mobile) */}
          <div className="flex-1 overflow-visible py-4">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={startIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 45, rotateY: direction * 6 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: direction * -45, rotateY: direction * -6 }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 24,
                  staggerChildren: 0.08,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 50 || info.velocity.x > 300) {
                    handlePrev();
                  } else if (info.offset.x < -50 || info.velocity.x < -300) {
                    handleNext();
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch cursor-grab active:cursor-grabbing [perspective:1200px]"
              >
                {visibleCards.map((review, idx) => (
                  <DossierCard
                    key={`${review.id}-${idx}`}
                    review={review}
                    index={idx}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Circular Right Arrow Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleNext}
            aria-label="Next case files"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/60 hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 text-white/80 hover:text-white flex items-center justify-center transition-colors duration-300 flex-shrink-0 cursor-pointer shadow-lg"
          >
            <ArrowRight className="w-5 h-5" />
          </motion.button>

        </div>

      </div>
    </motion.div>
  );
}

// =============================================================================
// INDIVIDUAL MANILA CASE FILE CARD WITH 3D TILT & LAYERED DEPTH
// =============================================================================
function DossierCard({
  review,
  index,
}: {
  review: DossierReview;
  index: number;
}) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.setProperty("--card-rx", `${(-y * 9).toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--card-ry", `${(x * 9).toFixed(2)}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--card-rx", "0deg");
    e.currentTarget.style.setProperty("--card-ry", "0deg");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotateX: -12, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: index * 0.09,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          "rotateX(var(--card-rx, 0deg)) rotateY(var(--card-ry, 0deg))",
        transformStyle: "preserve-3d",
        transition: "transform 0.14s ease-out",
      }}
      className="group relative w-full h-full"
    >
      {/* Background Stacked Page / Folder Tab Underneath */}
      <div className="absolute -top-1.5 -right-1.5 inset-0 bg-[#C8B28F] rounded-lg -rotate-[0.9deg] pointer-events-none border border-[#8C7456]/40 shadow-sm transition-transform duration-300 group-hover:rotate-[-2deg] group-hover:translate-x-1" />
      <div className="absolute -top-0.5 -right-0.5 inset-0 bg-[#D4BF9D] rounded-lg rotate-[0.4deg] pointer-events-none border border-[#9A8264]/30 transition-transform duration-300 group-hover:rotate-[1.5deg]" />

      {/* Main Manila / Kraft Folder */}
      <div className="relative rounded-lg bg-gradient-to-br from-[#E7D9C3] via-[#DCBFA2] to-[#CCAFA2] p-5 sm:p-6 shadow-[5px_8px_25px_rgba(0,0,0,0.85),2px_3px_8px_rgba(0,0,0,0.5)] border border-[#8F775B]/40 flex flex-col justify-between min-h-[250px] overflow-visible transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[8px_16px_35px_rgba(0,0,0,0.95),0_0_20px_rgba(212,175,55,0.18)]">
        
        {/* Authentic Wire Paperclip (SVG on Top-Left Corner) */}
        <div className="absolute -top-4 left-5 z-20 pointer-events-none drop-shadow-[2px_3px_3px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:-translate-y-0.5">
          <svg width="22" height="48" viewBox="0 0 22 48" fill="none">
            <path
              d="M7 12V36C7 38.7614 9.23858 41 12 41C14.7614 41 17 38.7614 17 36V9C17 5.13401 13.866 2 10 2C6.13401 2 3 5.13401 3 9V38C3 42.4183 6.58172 46 11 46C15.4183 46 19 42.4183 19 38V16"
              stroke="#64748B"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 12V36C7 38.7614 9.23858 41 12 41C14.7614 41 17 38.7614 17 36V9C17 5.13401 13.866 2 10 2C6.13401 2 3 5.13401 3 9V38C3 42.4183 6.58172 46 11 46C15.4183 46 19 42.4183 19 38V16"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Content Layout: Left Text Details + Right Polaroid Illustration */}
        <div className="flex items-start justify-between gap-4">
          
          {/* Left Text Column */}
          <div className="space-y-4 flex-1">
            
            {/* Red Rubber Ink Stamp: FILE #XXX */}
            <motion.div
              initial={{ scale: 1.3, rotate: -6, opacity: 0 }}
              whileInView={{ scale: 1, rotate: -0.6, opacity: 1 }}
              viewport={{ once: false }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 16,
                delay: 0.1 + index * 0.08,
              }}
              className="inline-flex items-center px-2 py-0.5 border-[1.5px] border-[#B92720]/85 rounded-[2px] bg-[#B92720]/[0.05]"
            >
              <span className="font-mono text-[11px] font-black tracking-widest text-[#B92720] uppercase select-none">
                {review.fileNo}
              </span>
            </motion.div>

            {/* Main Quotation */}
            <p className="font-serif font-bold text-sm sm:text-base lg:text-[16px] leading-snug text-[#1C1714] tracking-tight">
              &ldquo;{review.quote}&rdquo;
            </p>

            {/* Five Red Stars (Staggered Pop-In) */}
            <div className="flex items-center gap-1 text-[#B92720] pt-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -30 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: false }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 15,
                    delay: 0.15 + index * 0.06 + i * 0.04,
                  }}
                >
                  <Star className="w-4 h-4 fill-[#B92720] stroke-none" />
                </motion.div>
              ))}
            </div>

            {/* Author Signature */}
            <div className="pt-2 text-xs sm:text-sm font-mono font-bold tracking-wider text-[#2A211C] uppercase">
              &ndash; {review.name}
            </div>

          </div>

          {/* Right Column: Pinned Polaroid Mugshot Photograph */}
          <div
            className={`relative w-24 sm:w-28 lg:w-32 aspect-square p-1.5 sm:p-2 bg-[#F6F2E8] shadow-[2px_4px_12px_rgba(0,0,0,0.35)] rounded-[2px] flex-shrink-0 transition-transform duration-300 group-hover:scale-108 group-hover:rotate-0 border border-[#DDD5C5] ${review.photoRotate}`}
          >
            {/* Vintage Photo Tape in Top Center of Photo */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-amber-100/60 border border-amber-300/40 backdrop-blur-sm shadow-xs -rotate-2 pointer-events-none z-10" />

            {/* Character Illustration */}
            <div className="relative w-full h-full overflow-hidden bg-black/10">
              <Image
                src={review.image}
                alt={review.name}
                fill
                sizes="(max-width: 640px) 100px, 130px"
                className="object-cover object-top filter contrast-[1.08] brightness-[0.98] transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
