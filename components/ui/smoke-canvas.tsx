"use client";

import React, { useEffect, useRef } from "react";

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  growthRate: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  angle: number;
  angularSpeed: number;
  curlFreq: number;
  curlAmp: number;
  phase: number;
  colorType: "warm" | "cool" | "gold";
}

interface EmberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface SmokeCanvasProps {
  className?: string;
  density?: "light" | "medium" | "heavy";
  interactive?: boolean;
}

export function SmokeCanvas({
  className = "absolute inset-0 pointer-events-none",
  density = "medium",
  interactive = true,
}: SmokeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse tracking for fluid smoke disturbance
    const mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, speed: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;
      const dx = newX - mouse.prevX;
      const dy = newY - mouse.prevY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = newX;
      mouse.y = newY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parentElem = canvas.parentElement;
    if (parentElem) {
      parentElem.addEventListener("mousemove", handleMouseMove);
      parentElem.addEventListener("mouseleave", handleMouseLeave);
    }

    // Particle pools
    const maxParticles = density === "light" ? 30 : density === "medium" ? 50 : 75;
    const particles: SmokeParticle[] = [];
    const embers: EmberParticle[] = [];

    const createParticle = (spawnY?: number): SmokeParticle => {
      // Spawn preferentially across the lower half or from atmospheric focal points
      const spawnX = Math.random() * width;
      const y = spawnY !== undefined ? spawnY : height + Math.random() * 50;
      const maxLife = 240 + Math.random() * 260; // 4 to 8 seconds at 60fps
      const colorTypes: ("warm" | "cool" | "gold")[] = ["warm", "warm", "gold", "cool"];
      const colorType = colorTypes[Math.floor(Math.random() * colorTypes.length)];

      return {
        x: spawnX,
        y: y,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -(0.4 + Math.random() * 0.65), // slow upward billow
        radius: 25 + Math.random() * 35,
        maxRadius: 130 + Math.random() * 110,
        growthRate: 0.28 + Math.random() * 0.32,
        alpha: 0,
        maxAlpha: 0.10 + Math.random() * 0.12, // subtle, refined volumetric smoke
        life: 0,
        maxLife,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.008,
        curlFreq: 0.012 + Math.random() * 0.015,
        curlAmp: 0.5 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        colorType,
      };
    };

    const createEmber = (): EmberParticle => {
      return {
        x: Math.random() * width,
        y: height - Math.random() * 150,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(0.8 + Math.random() * 1.2),
        size: 1.2 + Math.random() * 1.8,
        alpha: 0.6 + Math.random() * 0.4,
        life: 0,
        maxLife: 100 + Math.random() * 120,
      };
    };

    // Pre-populate particles across varying lifespans so scene starts full
    for (let i = 0; i < maxParticles; i++) {
      const p = createParticle(Math.random() * height);
      p.life = Math.random() * p.maxLife;
      p.radius += p.life * p.growthRate;
      particles.push(p);
    }

    for (let i = 0; i < 15; i++) {
      embers.push(createEmber());
    }

    // Visibility observer to pause loop when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Animation Loop
    let lastTime = performance.now();
    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const dt = Math.min((currentTime - lastTime) / 16.67, 2.0); // normalize frame rate delta
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // 1. Render & Update Smoke Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life += dt;

        if (p.life >= p.maxLife || p.y < -p.radius * 2) {
          particles[i] = createParticle();
          continue;
        }

        // Natural Sinusoidal Billowing & Curling
        const wave = Math.sin(p.life * p.curlFreq + p.phase) * p.curlAmp;
        p.x += (p.vx + wave) * dt;
        p.y += p.vy * dt;
        p.angle += p.angularSpeed * dt;

        // Radial expansion as smoke diffuses
        if (p.radius < p.maxRadius) {
          p.radius += p.growthRate * dt;
        }

        // Smooth Bell-Curve Alpha Transition (Fade In -> Drift -> Fade Out)
        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.alpha = (progress / 0.2) * p.maxAlpha;
        } else if (progress > 0.65) {
          p.alpha = ((1 - progress) / 0.35) * p.maxAlpha;
        } else {
          p.alpha = p.maxAlpha;
        }

        // Interactive Mouse Deflection (Fluid Disturbance)
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pushRadius = 140;
          if (dist < pushRadius && dist > 0) {
            const force = (1 - dist / pushRadius) * 1.8;
            p.x += (dx / dist) * force * dt;
            p.y += (dy / dist) * force * dt;
            p.angle += (dx > 0 ? 0.02 : -0.02) * force;
          }
        }

        // Draw Soft Radial Volumetric Smoke Puff
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius);
        if (p.colorType === "gold") {
          grad.addColorStop(0, `rgba(225, 195, 120, ${p.alpha * 1.1})`);
          grad.addColorStop(0.35, `rgba(180, 150, 80, ${p.alpha * 0.55})`);
          grad.addColorStop(0.7, `rgba(100, 80, 40, ${p.alpha * 0.2})`);
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else if (p.colorType === "cool") {
          grad.addColorStop(0, `rgba(210, 215, 225, ${p.alpha * 1.0})`);
          grad.addColorStop(0.4, `rgba(140, 150, 165, ${p.alpha * 0.45})`);
          grad.addColorStop(0.75, `rgba(60, 65, 75, ${p.alpha * 0.15})`);
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else {
          // Warm Speakeasy Cigar Smoke
          grad.addColorStop(0, `rgba(240, 235, 222, ${p.alpha * 1.15})`);
          grad.addColorStop(0.35, `rgba(185, 175, 160, ${p.alpha * 0.6})`);
          grad.addColorStop(0.7, `rgba(110, 100, 90, ${p.alpha * 0.2})`);
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        // Slightly oblong puff for organic look
        ctx.ellipse(0, 0, p.radius, p.radius * 0.85, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Render Tiny Ember Sparks Rising from Cigars
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.life += dt;
        if (e.life >= e.maxLife || e.y < 0) {
          embers[i] = createEmber();
          continue;
        }

        e.x += e.vx * dt + Math.sin(e.life * 0.05) * 0.4;
        e.y += e.vy * dt;

        const p = e.life / e.maxLife;
        const currentAlpha = p < 0.2 ? (p / 0.2) * e.alpha : (1 - p) * e.alpha;

        ctx.save();
        ctx.fillStyle = `rgba(235, 130, 45, ${currentAlpha})`;
        ctx.shadowColor = "#D4AF37";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (parentElem) {
        parentElem.removeEventListener("mousemove", handleMouseMove);
        parentElem.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [density, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
