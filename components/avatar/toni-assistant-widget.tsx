"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Scissors, Sparkles } from "lucide-react";
import { useToniStore } from "@/lib/toni-store";
import { SyndicateChatCard } from "@/components/avatar/syndicate-chat-card";

export function ToniAssistantWidget() {
  const pathname = usePathname();
  const isWidgetOpen = useToniStore((s) => s.isWidgetOpen);
  const toggleWidget = useToniStore((s) => s.toggleWidget);
  const [isVisible, setIsVisible] = useState(true);

  const isShopPage = pathname?.startsWith("/shop");

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      const nextVisible =
        pathname === "/"
          ? scrollPos > window.innerHeight * 0.8 || isWidgetOpen
          : true;
      setIsVisible((prev) => (prev === nextVisible ? prev : nextVisible));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isWidgetOpen, pathname]);

  return (
    <aside
      aria-label="Toni Lee AI Assistant"
      className={`fixed bottom-4 sm:bottom-6 ${
        isShopPage
          ? "left-4 sm:left-6 items-start"
          : "right-4 sm:right-6 items-end"
      } z-50 flex flex-col pointer-events-none transition-all duration-500 ease-in-out ${
        !isVisible ? "translate-y-[150%] opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <AnimatePresence>
        {isWidgetOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="pointer-events-auto mb-3 w-[95vw] sm:w-[92vw] md:w-[780px] lg:w-[840px] max-w-[860px]"
          >
            <SyndicateChatCard onClose={toggleWidget} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================================== */}
      {/* 90s CARTOON NOIR MOBSTER CONSIGLIERE LAUNCHER DOCK                    */}
      {/* ===================================================================== */}
      {!isWidgetOpen && (
        <div className="relative pointer-events-auto select-none group">
          {/* Subtle Comic Dialogue Teaser Bubble (Floats above the button) */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="absolute -top-10 right-2 hidden sm:flex items-center gap-1.5 bg-[#FAF7EE] text-[#0B0B0A] px-3 py-1 border-2 border-black shadow-[3px_3px_0px_0px_#000] rotate-[-1deg]"
          >
            <span className="font-editorial-italic text-[11px] font-bold tracking-tight">
              &ldquo;Need a custom cut, boss?&rdquo;
            </span>
            {/* Comic Bubble Arrow Tail */}
            <div className="absolute -bottom-1.5 right-6 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-black" />
            <div className="absolute -bottom-1 right-[25px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#FAF7EE]" />
          </motion.div>

          {/* Main 90s Comic Noir Launcher Button */}
          <motion.button
            type="button"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={toggleWidget}
            className="relative bg-[#131215] hover:bg-[#1A181E] text-[#FAF7EE] border-3 border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 px-3.5 sm:px-4 py-2.5 flex items-center gap-3.5 transition-all cursor-pointer bg-halftone-charcoal"
          >
            {/* Tilted Comic Burst Sticker at Top Right */}
            <span className="absolute -top-2.5 -right-1.5 bg-[#B92720] text-white font-display text-[9px] sm:text-[10px] font-black px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] rotate-[3deg] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              SIT-DOWN
            </span>

            {/* Toni Lee 90s Cartoon Avatar with Ink Outline & Gold Ring */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-black ring-2 ring-[#B59454] bg-[#0A0A0C] overflow-hidden shrink-0 shadow-[2px_2px_0px_0px_#000] group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/toni-lee.jpg"
                alt="Toni Lee - Master Tailor & Consigliere"
                fill
                sizes="48px"
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Typography Content */}
            <div className="flex flex-col text-left pr-1">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-sm sm:text-base tracking-wide uppercase text-[#FAF7EE] group-hover:text-[#D4AF37] transition-colors drop-shadow-[1px_1px_0px_#000]">
                  TONI LEE
                </span>
                <Scissors className="w-3.5 h-3.5 text-[#B59454] -rotate-45" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono-label tracking-widest text-[#D4AF37] uppercase font-bold mt-0.5">
                MASTER CONSIGLIERE
              </span>
            </div>
          </motion.button>
        </div>
      )}
    </aside>
  );
}