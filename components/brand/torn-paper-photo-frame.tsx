"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";

export interface AtelierChroniclePhoto {
  id: string;
  title: string;
  subtitle: string;
  stampText: string;
  imageSrc: string;
  plateCode: string;
  tabLabel: string;
}

export const BRAND_STORY_CHRONICLE_PHOTOS: AtelierChroniclePhoto[] = [
  {
    id: "lineup",
    title: "THE SEVEN FAMILIES",
    subtitle: "All seven syndicate bosses in bespoke cuts • Manhattan Skyline",
    stampText: "THE HIGH COUNCIL",
    imageSrc: "/images/syndicate-brand-story-lineup.jpg",
    plateCode: "HIGH COUNCIL EDITION",
    tabLabel: "THE SEVEN",
  },
  {
    id: "sitdown",
    title: "THE LITTLE ITALY SIT-DOWN",
    subtitle: "Bespoke contracts sealed behind closed mahogany doors",
    stampText: "COUNCIL SIT-DOWN",
    imageSrc: "/images/syndicate-brand-story.jpg",
    plateCode: "ATELIER COUNCIL",
    tabLabel: "SIT-DOWN",
  },
  {
    id: "atelier",
    title: "THE CORNER ATELIER",
    subtitle: "Where the syndicate was born • Little Italy, Manhattan",
    stampText: "SYNDICATE SUITS HQ",
    imageSrc: "/images/hero-skyline.jpg",
    plateCode: "CORNER ATELIER",
    tabLabel: "THE ATELIER",
  },
];

// High-fidelity jagged torn paper paths (viewBox 0 0 800 580)
const OUTER_TORN_PATH =
  "M 16,22.6 L 33.1,20.2 L 50.1,23.5 L 67.2,15.7 L 84.3,14.4 L 101.3,12.3 L 118.4,15.1 L 135.5,13.9 L 152.5,10.3 L 169.6,15.2 L 186.7,22 L 203.7,10.8 L 220.8,16.2 L 237.9,17.1 L 254.9,14.8 L 272,14 L 289.1,14.3 L 306.1,17 L 323.2,13.1 L 340.3,17.8 L 357.3,22.1 L 374.4,21.7 L 391.5,20.1 L 408.5,11.5 L 425.6,9.9 L 442.7,11.6 L 459.7,13.9 L 476.8,13.8 L 493.9,15.6 L 510.9,19.6 L 528,16.9 L 545.1,20.2 L 562.1,12.7 L 579.2,10.9 L 596.3,11.7 L 613.3,15.6 L 630.4,15.7 L 647.5,17.6 L 664.5,17.1 L 681.6,15.5 L 698.7,16.5 L 715.7,11.8 L 732.8,11.6 L 749.9,8.8 L 766.9,14.2 L 784,18.2 L 788.9,32.6 L 784.9,49.2 L 790.3,65.8 L 784.9,82.4 L 783.4,99 L 783.8,115.6 L 776.7,132.2 L 776,148.8 L 785.8,165.5 L 782.9,182.1 L 786.5,198.7 L 783.9,215.3 L 786.3,231.9 L 787.8,248.5 L 783.7,265.1 L 785.4,281.7 L 784.6,298.3 L 777,314.9 L 778.2,331.5 L 785,348.1 L 783.7,364.7 L 789.3,381.3 L 785.5,397.9 L 787.8,414.5 L 784.6,431.2 L 786.4,447.8 L 790.2,464.4 L 783.8,481 L 776.7,497.6 L 784.3,514.2 L 780.2,530.8 L 785,547.4 L 783.6,564 L 766.9,569.5 L 749.9,567.5 L 732.8,567.8 L 715.7,564 L 698.7,561.3 L 681.6,563.7 L 664.5,559.1 L 647.5,566.1 L 630.4,566.3 L 613.3,571.1 L 596.3,565.4 L 579.2,568.4 L 562.1,567.5 L 545.1,558.2 L 528,563.8 L 510.9,558.4 L 493.9,561.3 L 476.8,565.1 L 459.7,567.7 L 442.7,569.4 L 425.6,566.9 L 408.5,560.1 L 391.5,563.6 L 374.4,559.7 L 357.3,561.4 L 340.3,566.9 L 323.2,567.4 L 306.1,569.9 L 289.1,563.6 L 272,561.5 L 254.9,559.6 L 237.9,562 L 220.8,563.4 L 203.7,561.6 L 186.7,567.9 L 169.6,567 L 152.5,562.2 L 135.5,561.2 L 118.4,559.5 L 101.3,558.3 L 84.3,561.3 L 67.2,568 L 50.1,563.2 L 33.1,568.7 L 16,568.6 L 21.7,547.4 L 23.6,530.8 L 20.1,514.2 L 16.8,497.6 L 12,481 L 16.3,464.4 L 14.1,447.8 L 5.8,431.2 L 14.7,414.5 L 20.6,397.9 L 20.7,381.3 L 17.1,364.7 L 20.3,348.1 L 13.5,331.5 L 18.4,314.9 L 14.9,298.3 L 11.3,281.7 L 12.4,265.1 L 15.8,248.5 L 21,231.9 L 18.9,215.3 L 21.2,198.7 L 21.8,182.1 L 6.6,165.5 L 15.9,148.8 L 13.4,132.2 L 11.8,115.6 L 16.9,99 L 17.6,82.4 L 14.5,65.8 L 22.2,49.2 L 19.4,32.6 Z";

const INNER_TORN_PATH =
  "M 36,37.9 L 54.2,39.4 L 72.4,39.7 L 90.6,39.9 L 108.8,38.2 L 127,34 L 145.2,31.4 L 163.4,32 L 181.6,35.7 L 199.8,35 L 218,37.8 L 236.2,37.6 L 254.4,36.6 L 272.6,35.9 L 290.8,36.7 L 309,34.3 L 327.2,32.1 L 345.4,36.6 L 363.6,34.4 L 381.8,38.9 L 400,40 L 418.2,37.2 L 436.4,37.2 L 454.6,34.9 L 472.8,33.3 L 491,33.8 L 509.2,32.2 L 527.4,35.3 L 545.6,36.5 L 563.8,38.2 L 582,38.5 L 600.2,36.2 L 618.4,32.9 L 636.6,33.8 L 654.8,33 L 673,35.3 L 691.2,37.1 L 709.4,39.1 L 727.6,37.6 L 745.8,38.9 L 764,37.5 L 767.7,53.5 L 767.5,71 L 766.3,88.6 L 768,106.1 L 763.6,123.6 L 763.4,141.1 L 763.2,158.6 L 763.5,176.1 L 763.5,193.7 L 764.8,211.2 L 764.9,228.7 L 765.9,246.2 L 766.4,263.7 L 764.4,281.2 L 763.6,298.8 L 762.9,316.3 L 763.6,333.8 L 762.5,351.3 L 763.3,368.8 L 762.7,386.3 L 763.3,403.9 L 766.4,421.4 L 768.3,438.9 L 765.4,456.4 L 767.1,473.9 L 766.7,491.4 L 759.8,509 L 760.5,526.5 L 760,544 L 745.8,545.4 L 727.6,544.2 L 709.4,548.3 L 691.2,545.9 L 673,544.1 L 654.8,543.4 L 636.6,539.8 L 618.4,545.6 L 600.2,544 L 582,547.3 L 563.8,548.4 L 545.6,545.7 L 527.4,537 L 509.2,541 L 491,541.9 L 472.8,544.7 L 454.6,546.1 L 436.4,546.8 L 418.2,547.8 L 400,545.7 L 381.8,545.2 L 363.6,540.2 L 345.4,543 L 327.2,540.9 L 309,542.9 L 290.8,542.5 L 272.6,548.2 L 254.4,547.9 L 236.2,543.1 L 218,540.8 L 199.8,541.5 L 181.6,541.5 L 163.4,543 L 145.2,544.3 L 127,547.7 L 108.8,546 L 90.6,547.5 L 72.4,544 L 54.2,541.1 L 36,540.8 L 38.1,526.5 L 40.2,509 L 38,491.4 L 38.3,473.9 L 33.4,456.4 L 33.1,438.9 L 31.1,421.4 L 33,403.9 L 37.3,386.3 L 38.2,368.8 L 39.5,351.3 L 40.9,333.8 L 37.2,316.3 L 36.3,298.8 L 35,281.2 L 32.6,263.7 L 35.1,246.2 L 34.3,228.7 L 33.9,211.2 L 37,193.7 L 36.2,176.1 L 37.2,158.6 L 39.6,141.1 L 38.9,123.6 L 34.1,106.1 L 32.3,88.6 L 35,71 L 34.3,53.5 Z";

interface TornPaperPhotoFrameProps {
  activeIndex: number;
  onSelectIndex?: (index: number) => void;
}

export function TornPaperPhotoFrame({
  activeIndex,
  onSelectIndex,
}: TornPaperPhotoFrameProps) {
  const currentPhoto =
    BRAND_STORY_CHRONICLE_PHOTOS[activeIndex] ||
    BRAND_STORY_CHRONICLE_PHOTOS[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.setProperty("--tilt-x", `${(-y * 10).toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--tilt-x", "0deg");
    e.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div className="relative w-full max-w-[580px] mx-auto flex flex-col items-center select-none [perspective:1200px]">
      {/* =================================================================== */}
      {/* MAIN TACTILE TORN PAPER SHEET PRESENTATION                          */}
      {/* =================================================================== */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 35, rotate: -3, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        animate={{
          rotate: activeIndex % 2 === 0 ? -1.4 : 1.4,
          y: [0, -5, 0],
        }}
        transition={{
          rotate: { type: "spring", stiffness: 160, damping: 18 },
          y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.5 },
          scale: { type: "spring", stiffness: 160, damping: 20 },
        }}
        style={{
          transform:
            "rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
        }}
        className="relative w-full aspect-[800/580] filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.98)] drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)] cursor-grab active:cursor-grabbing"
      >
        <svg
          viewBox="0 0 800 580"
          className="w-full h-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Inner Torn Photo Clip Mask */}
            <clipPath id="inner-torn-photo-clip">
              <path d={INNER_TORN_PATH} />
            </clipPath>

            {/* Aged Parchment Gradient */}
            <linearGradient id="parchment-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9F4EB" />
              <stop offset="50%" stopColor="#EFE5D3" />
              <stop offset="100%" stopColor="#E5D9C2" />
            </linearGradient>

            {/* Subtle Photo Edge Vignette */}
            <radialGradient id="torn-photo-vignette" cx="50%" cy="50%" r="60%">
              <stop offset="65%" stopColor="transparent" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0.45)" />
            </radialGradient>
          </defs>

          {/* 1. Outer Aged Torn Paper Backing Sheet with Ripped Deckle Edges */}
          <path
            d={OUTER_TORN_PATH}
            fill="url(#parchment-grad)"
            stroke="#D8CBBA"
            strokeWidth="1.5"
            className="filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]"
          />

          {/* Paper fiber deckle fringe shadow */}
          <path
            d={INNER_TORN_PATH}
            fill="none"
            stroke="rgba(0, 0, 0, 0.15)"
            strokeWidth="3"
          />

          {/* 2. Inner Torn Clipped Photograph (Dynamic based on scroll) */}
          <g clipPath="url(#inner-torn-photo-clip)">
            <AnimatePresence mode="popLayout">
              <motion.image
                key={currentPhoto.imageSrc}
                href={currentPhoto.imageSrc}
                x="0"
                y="0"
                width="800"
                height="580"
                preserveAspectRatio="xMidYMid slice"
                initial={{ opacity: 0, scale: 1.12, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="filter contrast-[1.04] brightness-[0.98]"
              />
            </AnimatePresence>
            {/* Vignette Shadow Overlay */}
            <rect width="800" height="580" fill="url(#torn-photo-vignette)" />
          </g>

          {/* 3. Authentic Vintage Red Rubber Stamp (Kinetic Slam on Photo Change) */}
          <motion.g
            key={`stamp-${currentPhoto.id}`}
            initial={{ scale: 1.55, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 16, delay: 0.1 }}
            style={{ transformOrigin: "655px 505px" }}
          >
            <g transform="translate(560, 485) rotate(-8)">
              <rect
                x="-10"
                y="-14"
                width="210"
                height="40"
                fill="none"
                stroke="#B92720"
                strokeWidth="2.5"
                strokeDasharray="180 4"
                opacity="0.88"
                rx="3"
              />
              <text
                x="95"
                y="12"
                fill="#B92720"
                fontSize="12"
                fontFamily="monospace"
                fontWeight="900"
                letterSpacing="2"
                textAnchor="middle"
                opacity="0.9"
              >
                {currentPhoto.stampText}
              </text>
            </g>
          </motion.g>

          {/* 4. Vintage Brass Binder Clip on Top-Left Corner */}
          <g transform="translate(68, 6)">
            {/* Clip Shadow */}
            <rect
              x="-2"
              y="2"
              width="44"
              height="48"
              rx="4"
              fill="rgba(0,0,0,0.5)"
              filter="blur(3px)"
            />
            {/* Dark Brass Clip Base */}
            <rect
              x="0"
              y="0"
              width="40"
              height="42"
              rx="3"
              fill="#181818"
              stroke="#B59454"
              strokeWidth="1.5"
            />
            {/* Gold Grip Wire */}
            <path
              d="M 10,0 L 10,-12 Q 20,-20 30,-12 L 30,0"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2.5"
            />
            {/* Syndicate Logo on Clip */}
            <circle cx="20" cy="21" r="9" fill="#24221D" stroke="#D4AF37" strokeWidth="1" />
            <text
              x="20"
              y="25"
              fill="#D4AF37"
              fontSize="10"
              fontWeight="bold"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              S
            </text>
          </g>

          {/* 5. Handwritten Noir Label on Bottom Left Torn Margin */}
          <g transform="translate(55, 545)">
            <text
              x="0"
              y="0"
              fill="#5A4E3E"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="700"
              letterSpacing="1.5"
            >
              LITTLE ITALY ◆ BESPOKE ATELIER ◆ EST. 1928
            </text>
          </g>

          {/* Plate Code */}
          <g transform="translate(735, 545)">
            <text
              x="0"
              y="0"
              fill="#6A5E4E"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="end"
            >
              {currentPhoto.plateCode}
            </text>
          </g>
        </svg>
      </motion.div>

      {/* =================================================================== */}
      {/* CAPTION & METADATA BAR                                              */}
      {/* =================================================================== */}
      <div className="w-full mt-5 px-3 space-y-3">
        
        {/* Caption Row */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 overflow-hidden">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase">
                ATELIER CHRONICLE
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="font-mono text-[10px] text-white/50 tracking-wider">
                CONFIDENTIAL RECORD
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.h4
                key={currentPhoto.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="font-display text-lg sm:text-xl font-bold uppercase text-[#FAF7EE] tracking-tight"
              >
                {currentPhoto.title}
              </motion.h4>
            </AnimatePresence>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono text-[#D4AF37]">
              <Eye className="w-3 h-3" />
              <span>SCROLL LINKED</span>
            </span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* INTERACTIVE PHOTO SELECTOR TABS                                     */}
        {/* =================================================================== */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {BRAND_STORY_CHRONICLE_PHOTOS.map((photo, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <motion.button
                key={photo.id}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectIndex && onSelectIndex(idx)}
                className={`relative py-2 px-2 rounded-lg border text-center transition-colors duration-300 cursor-pointer overflow-hidden ${
                  isSelected
                    ? "border-[#D4AF37] text-black shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
                    : "bg-[#0A0A0A] border-white/[0.08] text-white/60 hover:text-white hover:border-[#D4AF37]/40"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="torn-paper-active-pill"
                    transition={{ type: "spring", stiffness: 320, damping: 26 }}
                    className="absolute inset-0 bg-[#D4AF37] z-0"
                  />
                )}
                <span
                  className={`relative z-10 text-[9px] font-mono block truncate ${
                    isSelected ? "text-black/70 font-black" : "text-white/40"
                  }`}
                >
                  {photo.stampText}
                </span>
                <span className="relative z-10 text-[10px] font-sans font-bold block truncate mt-0.5">
                  {photo.tabLabel}
                </span>
              </motion.button>
            );
          })}
        </div>

      </div>

    </div>
  );
}
