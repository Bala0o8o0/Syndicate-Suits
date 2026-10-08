"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Scissors,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import { useBriefcaseStore } from "@/lib/briefcase-store";
import { MagneticWrapper } from "@/components/ui/kinetic-scroll";

export function SyndicateNav() {
  const pathname = usePathname();
  const { openBriefcase, getItemCount } = useBriefcaseStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      const scrolled = scrollPos > 40;
      setIsScrolled(scrolled);
      if (scrolled) {
        setMobileMenuOpen(false);
      }

      if (pathname === "/") {
        // Hero is ~250vh. Show navbar around 2.3x window height
        setIsVisible(scrollPos > window.innerHeight * 2.3);
      } else {
        setIsVisible(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Also connect to Lenis smooth scroll provider if initialized
    let intervalId: NodeJS.Timeout | null = null;
    if (window.__lenis) {
      window.__lenis.on("scroll", handleScroll);
    } else {
      intervalId = setInterval(() => {
        if (window.__lenis) {
          window.__lenis.on("scroll", handleScroll);
          if (intervalId) clearInterval(intervalId);
        }
      }, 200);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (intervalId) clearInterval(intervalId);
      if (window.__lenis) {
        window.__lenis.off("scroll", handleScroll);
      }
    };
  }, [pathname]);

  const itemCount = getItemCount();

  const navLinks = [
    { href: "/", label: "Atelier" },
    { href: "/shop", label: "The Vault" },
    { href: "/customizer", label: "Bespoke Studio" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out ${
        !isVisible ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      } ${
        isScrolled
          ? "bg-[#0B0B0A]/80 backdrop-blur-xl backdrop-saturate-180 border-b border-[#292826] shadow-2xl py-0"
          : "bg-[#0B0B0A]/35 backdrop-blur-md backdrop-saturate-150 border-b border-[#E9DFC9]/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] py-0"
      }`}
    >
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo - Sharp Editorial Minimalist with 90s Heritage */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <motion.div
            whileHover={{ rotate: 8, scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="w-10 h-10 bg-[#E9DFC9] text-[#0B0B0A] flex items-center justify-center border border-[#E9DFC9] shadow-editorial group-hover:bg-[#B59454] transition-colors"
          >
            <Scissors className="w-5 h-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#E9DFC9] uppercase group-hover:text-[#B59454] transition-colors">
                SYNDICATE<span className="text-[#B92720]">.</span>SUITS
              </span>
            </div>
            <span className="text-[10px] font-mono-label text-[#E9DFC9]/50 block -mt-1">
              Bespoke Mafia Atelier &bull; Toni Lee
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Spring Active Underline */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono-label text-xs tracking-widest transition-all py-1.5 relative ${
                  isActive
                    ? "text-[#E9DFC9] font-bold"
                    : "text-[#E9DFC9]/60 hover:text-[#E9DFC9]"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="syndicate-nav-active-line"
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B92720] shadow-[0_0_8px_rgba(185,39,32,0.8)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Black Ledger Briefcase Cart Trigger */}
          <MagneticWrapper strength={0.22}>
            <motion.button
              type="button"
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.95 }}
              onClick={openBriefcase}
              className="relative bg-[#B92720] hover:bg-[#991f1a] text-white text-xs font-mono-label px-4 py-2.5 border border-[#B92720] shadow-editorial transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Ledger</span>
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 1.4 }}
                  animate={{ scale: 1 }}
                  className="bg-[#0B0B0A] text-[#E9DFC9] text-[10px] font-bold px-1.5 py-0.2 border border-[#292826]"
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.button>
          </MagneticWrapper>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 bg-[#171715] text-[#E9DFC9] border border-[#292826]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden bg-[#0B0B0A] border-b border-[#292826] p-5 space-y-3 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-[#171715] border border-[#292826] text-xs font-mono-label text-[#E9DFC9] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#B59454]" />
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

