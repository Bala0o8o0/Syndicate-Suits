"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOTAL_FRAMES = 40;

const getFramePath = (index: number) => {
  const frameNum = String(index + 1).padStart(3, "0");
  return `/suits-video/ezgif-frame-${frameNum}.png`;
};

export default function Hero({ children }: { children?: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const loadedFlagsRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  
  // Reference for the hat image to cover the watermark
  const hatImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load the hat image
    const hat = new Image();
    hat.src = "/hashtag.png";
    hat.onload = () => {
      hatImgRef.current = hat;
      // Force a redraw once the hat is loaded
      if (lastDrawnFrameRef.current !== -1) {
        // Minor hack: temporarily reset lastDrawn to force redraw
        const current = lastDrawnFrameRef.current;
        lastDrawnFrameRef.current = -1;
        drawFrame(current);
      }
    };

    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Responsive Canvas Sizing (respects devicePixelRatio for crisp Retina rendering)
    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      // Re-render current frame after resize
      const activeIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );
      drawFrame(activeIdx);
    };

    // Draw frame to canvas with full-bleed cover aspect ratio
    const drawFrame = (frameIndex: number) => {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;
      const context = canvasEl.getContext("2d", { alpha: false });
      if (!context) return;

      // Find target frame or closest loaded fallback
      let img = imagesRef.current[frameIndex];
      if (!img || !loadedFlagsRef.current[frameIndex]) {
        // Find nearest loaded frame so the screen never flickers or goes blank
        let closestDist = Infinity;
        let closestIdx = -1;
        for (let i = 0; i < TOTAL_FRAMES; i++) {
          if (loadedFlagsRef.current[i] && imagesRef.current[i]) {
            const dist = Math.abs(i - frameIndex);
            if (dist < closestDist) {
              closestDist = dist;
              closestIdx = i;
            }
          }
        }
        if (closestIdx !== -1) {
          img = imagesRef.current[closestIdx];
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvasEl.width;
      const ch = canvasEl.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Object-fit: cover algorithm
      const hRatio = cw / iw;
      const vRatio = ch / ih;
      const ratio = Math.max(hRatio, vRatio);

      const renderWidth = iw * ratio;
      const renderHeight = ih * ratio;
      const offsetX = (cw - renderWidth) / 2;
      const offsetY = (ch - renderHeight) / 2;

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(img, 0, 0, iw, ih, offsetX, offsetY, renderWidth, renderHeight);

      // Draw the hat over the bottom-right watermark
      if (hatImgRef.current && hatImgRef.current.complete && hatImgRef.current.naturalWidth > 0) {
        // Size it relative to the video frame - made slightly larger
        const hatW = renderWidth * 0.14; // 14% of the video width
        const hatH = hatImgRef.current.naturalHeight * (hatW / hatImgRef.current.naturalWidth);
        
        // Position at bottom right corner - shifted further left and up
        const paddingX = renderWidth * 0.025; // increased to move left
        const paddingY = renderHeight * 0.035; // increased to move up
        
        const hatX = offsetX + renderWidth - hatW - paddingX;
        const hatY = offsetY + renderHeight - hatH - paddingY;

        context.drawImage(hatImgRef.current, hatX, hatY, hatW, hatH);
      }

      lastDrawnFrameRef.current = frameIndex;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize, { passive: true });

    // 1. Load First Frame with maximum priority for instantaneous display
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    imagesRef.current[0] = firstImg;
    firstImg.onload = () => {
      loadedFlagsRef.current[0] = true;
      drawFrame(0);
    };

    // 2. Preload remaining frames in batches to avoid network and memory choking
    let cancelPreload = false;
    const preloadBatch = (startIndex: number, batchSize: number) => {
      if (cancelPreload || startIndex >= TOTAL_FRAMES) return;
      const end = Math.min(startIndex + batchSize, TOTAL_FRAMES);
      for (let i = startIndex; i < end; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        imagesRef.current[i] = img;
        img.onload = () => {
          loadedFlagsRef.current[i] = true;
          const currentActive = Math.round(currentFrameRef.current);
          if (currentActive === i) {
            drawFrame(i);
          }
        };
      }
      if (end < TOTAL_FRAMES) {
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(() => preloadBatch(end, batchSize));
        } else {
          setTimeout(() => preloadBatch(end, batchSize), 120);
        }
      }
    };
    preloadBatch(1, 8);

    let isRunning = false;
    const startLoop = () => {
      if (isRunning) return;
      isRunning = true;
      rafIdRef.current = requestAnimationFrame(updateLoop);
    };

    const updateLoop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const delta = target - current;

      if (Math.abs(delta) > 0.005) {
        currentFrameRef.current += delta * 0.18;
      } else {
        currentFrameRef.current = target;
      }

      const frameToDraw = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      if (frameToDraw !== lastDrawnFrameRef.current) {
        drawFrame(frameToDraw);
      }

      if (Math.abs(target - currentFrameRef.current) > 0.005) {
        rafIdRef.current = requestAnimationFrame(updateLoop);
      } else {
        isRunning = false;
      }
    };

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "+=250%",
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = Math.min(1, Math.max(0, self.progress));
        
        // Use 0 -> 0.8 for video frames
        const frameProgress = Math.min(1, progress / 0.8);
        targetFrameRef.current = frameProgress * (TOTAL_FRAMES - 1);

        // Use 0.8 -> 1.0 for zoom (scale up and fade out)
        const zoomProgress = Math.max(0, (progress - 0.8) / 0.2);
        
        if (canvasRef.current) {
          const scale = 1 + zoomProgress * 3;
          canvasRef.current.style.transform = `scale(${scale})`;
        }
        
        if (overlayRef.current) {
          const opacity = 1 - zoomProgress;
          overlayRef.current.style.opacity = `${opacity}`;
          overlayRef.current.style.pointerEvents = zoomProgress > 0.95 ? 'none' : 'auto';
        }

        startLoop();
      },
    });

    // Initial draw
    startLoop();

    return () => {
      cancelPreload = true;
      window.removeEventListener("resize", updateCanvasSize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      st.kill();
    };
  }, []);

  const promptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      if (!promptRef.current) return;
      const y = window.scrollY || 0;
      const fade = Math.max(0, 1 - y / (window.innerHeight * 0.45));
      promptRef.current.style.opacity = `${fade}`;
      promptRef.current.style.transform = `translate(-50%, ${(1 - fade) * 24}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="hero" ref={wrapperRef} className="relative w-full bg-[#0B0B0A]">
      <div 
        ref={overlayRef}
        className="absolute top-0 left-0 w-full h-[100vh] z-40 bg-[#0B0B0A] flex items-center justify-center overflow-hidden will-change-transform"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover object-center select-none pointer-events-none will-change-transform origin-center"
        />

        {/* Subtle Kinetic Scroll Indicator */}
        <div
          ref={promptRef}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none select-none transition-opacity duration-150"
        >
          <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-[#FAF7EE]/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            SCROLL TO ENTER THE ATELIER
          </span>
          <div className="w-[1px] h-9 bg-white/20 overflow-hidden relative">
            <div className="w-full h-1/2 bg-gradient-to-b from-transparent via-[#D4AF37] to-[#FAF7EE] animate-[bounce_1.6s_infinite]" />
          </div>
        </div>
      </div>
      
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
