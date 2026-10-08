"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlobalScrollProgressBar } from "@/components/ui/kinetic-scroll";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.09,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis as unknown as Window["__lenis"];

    let smoothedVelocity = 0;

    lenis.on("scroll", (e: { velocity?: number; progress?: number }) => {
      ScrollTrigger.update();

      // Track real-time kinetic velocity & progress on root element for CSS/JS consumers
      const rawVelocity = typeof e?.velocity === "number" ? e.velocity : 0;
      smoothedVelocity += (rawVelocity - smoothedVelocity) * 0.25;
      const clampedSkew = Math.max(-3.5, Math.min(3.5, smoothedVelocity * 0.08));

      const docEl = document.documentElement;
      docEl.style.setProperty("--scroll-velocity", smoothedVelocity.toFixed(3));
      docEl.style.setProperty("--scroll-skew", `${clampedSkew.toFixed(3)}deg`);
      if (typeof e?.progress === "number") {
        docEl.style.setProperty("--scroll-progress", e.progress.toFixed(4));
      }
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    // Smooth scroll for in-page anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (
        anchor &&
        anchor.hash &&
        anchor.origin === window.location.origin &&
        anchor.pathname === window.location.pathname
      ) {
        e.preventDefault();
        const element = document.querySelector(anchor.hash);
        if (element) {
          lenis.scrollTo(element as HTMLElement, { offset: -30, duration: 1.2 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  return (
    <>
      <GlobalScrollProgressBar />
      {children}
    </>
  );
}