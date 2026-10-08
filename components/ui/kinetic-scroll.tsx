"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useMotionValue,
  useReducedMotion,
  HTMLMotionProps,
} from "framer-motion";

// ============================================================================
// 1. GLOBAL SCROLL PROGRESS BAR (Top Syndicate Gold & Crimson Thread)
// ============================================================================
export function GlobalScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none overflow-hidden bg-transparent">
      <motion.div
        style={{ scaleX, transformOrigin: "0% 50%" }}
        className="w-full h-full bg-gradient-to-r from-[#B92720] via-[#D4AF37] to-[#F5CE6D] shadow-[0_0_12px_rgba(212,175,55,0.8)]"
      />
    </div>
  );
}

// ============================================================================
// 2. SCROLL VELOCITY SKEW WRAPPER (Physical Inertia & Momentum on Scroll)
// ============================================================================
interface ScrollVelocitySkewProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // default 1
}

export function ScrollVelocitySkew({
  children,
  className = "",
  intensity = 1,
}: ScrollVelocitySkewProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 45,
    stiffness: 380,
    mass: 0.4,
  });

  const skewY = useTransform(
    smoothVelocity,
    [-2500, 0, 2500],
    [-2.2 * intensity, 0, 2.2 * intensity]
  );

  const scaleY = useTransform(
    smoothVelocity,
    [-2500, 0, 2500],
    [1 + 0.012 * intensity, 1, 1 + 0.012 * intensity]
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      style={{
        skewY,
        scaleY,
        transformOrigin: "center center",
        willChange: "transform",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// 3. KINETIC PARALLAX LAYER (Depth-Plane Scroll Parallax with Spring Physics)
// ============================================================================
interface KineticParallaxProps {
  children: React.ReactNode;
  className?: string;
  offset?: number; // px travel distance, e.g. 60 or -60
  rotateRange?: [number, number];
  scaleRange?: [number, number];
}

export function KineticParallax({
  children,
  className = "",
  offset = 50,
  rotateRange,
  scaleRange,
}: KineticParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.5,
  });

  const y = useTransform(smoothProgress, [0, 1], [offset, -offset]);
  const rotate = useTransform(
    smoothProgress,
    [0, 1],
    rotateRange ? rotateRange : [0, 0]
  );
  const scale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    scaleRange ? [scaleRange[0], 1, scaleRange[1]] : [1, 1, 1]
  );

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        rotate: rotateRange ? rotate : undefined,
        scale: scaleRange ? scale : undefined,
        willChange: "transform",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// 4. KINETIC SECTION REVEAL (3D Perspective Scroll Entrance & Velocity Motion)
// ============================================================================
interface KineticSectionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  intensity?: number;
  enableParallax?: boolean;
}

export function KineticSection({
  children,
  className = "",
  delay = 0,
  intensity = 1,
  enableParallax = true,
  ...rest
}: KineticSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 5%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 26,
    mass: 0.6,
  });

  const y = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    enableParallax ? [45 * intensity, 0, 0, -35 * intensity] : [0, 0, 0, 0]
  );
  const scale = useTransform(
    smoothProgress,
    [0, 0.18, 0.85, 1],
    [0.96, 1, 1, 0.98]
  );
  const opacity = useTransform(
    smoothProgress,
    [0, 0.14, 0.88, 1],
    [0, 1, 1, 0.85]
  );

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        scale,
        opacity,
        willChange: "transform, opacity",
      }}
      transition={{ delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// 5. KINETIC WORD-BY-WORD 3D REVEAL (Dramatic Editorial Headline Animation)
// ============================================================================
interface KineticWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  staggerDelay?: number;
  delay?: number;
  once?: boolean;
}

export function KineticWords({
  text,
  className = "",
  wordClassName = "",
  highlightWords = [],
  highlightClassName = "text-[#B59454]",
  staggerDelay = 0.055,
  delay = 0,
  once = false,
}: KineticWordsProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const highlightSet = new Set(highlightWords.map((w) => w.toUpperCase()));

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.35, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={`inline-flex flex-wrap justify-center gap-x-[0.26em] [perspective:900px] ${className}`}
    >
      {words.map((word, idx) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
        const isHighlighted =
          highlightSet.has(cleanWord) || highlightSet.has(word.toUpperCase());

        return (
          <motion.span
            key={`${word}-${idx}`}
            variants={{
              hidden: {
                opacity: 0,
                y: 36,
                rotateX: -48,
                scale: 0.92,
                filter: "blur(6px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
                filter: "blur(0px)",
                transition: {
                  type: "spring",
                  stiffness: 210,
                  damping: 20,
                  mass: 0.75,
                },
              },
            }}
            style={{
              display: "inline-block",
              transformOrigin: "50% 100%",
              willChange: "transform, opacity, filter",
            }}
            className={`${wordClassName} ${isHighlighted ? highlightClassName : ""}`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

// ============================================================================
// 6. KINETIC 3D TILT CARD (Interactive Pointer-Tracked 3D Tilt + Gold Glare)
// ============================================================================
interface KineticTiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMax?: number; // degrees, default 7
  glareColor?: string;
  scaleOnHover?: number;
}

export function KineticTiltCard({
  children,
  className = "",
  tiltMax = 7,
  glareColor = "rgba(212, 175, 55, 0.14)",
  scaleOnHover = 1.015,
}: KineticTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const isHovered = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 220, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 220, damping: 22 });
  const smoothHover = useSpring(isHovered, { stiffness: 240, damping: 24 });

  const rotateX = useTransform(smoothY, [0, 1], [tiltMax, -tiltMax]);
  const rotateY = useTransform(smoothX, [0, 1], [-tiltMax, tiltMax]);
  const scale = useTransform(smoothHover, [0, 1], [1, scaleOnHover]);

  const glareX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(smoothY, [0, 1], ["0%", "100%"]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle 280px at ${gx} ${gy}, ${glareColor}, transparent 80%)`
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerEnter = () => {
    if (prefersReducedMotion) return;
    isHovered.set(1);
  };

  const handlePointerLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    isHovered.set(0);
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className="[perspective:1200px] w-full h-full">
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className={`relative ${className}`}
      >
        {children}

        {/* Dynamic Specular Noir Glare Overlay */}
        <motion.div
          style={{
            opacity: smoothHover,
            background: glareBackground,
          }}
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-30 mix-blend-screen"
        />
      </motion.div>
    </div>
  );
}

// ============================================================================
// 7. MAGNETIC WRAPPER (Spring-Physics Magnetic Pull on Interactive Controls)
// ============================================================================
interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // default 0.28
}

export function MagneticWrapper({
  children,
  className = "inline-block",
  strength = 0.28,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY, willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
