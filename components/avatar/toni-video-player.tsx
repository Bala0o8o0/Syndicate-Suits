"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Volume2, Mic } from "lucide-react";
import { useToniStore } from "@/lib/toni-store";

interface ToniVideoPlayerProps {
  idleImageSrc?: string;
  speakingSrc?: string;
  className?: string;
  variant?: "full" | "compact" | "card-header" | "avatar-circle";
  showWaveform?: boolean;
}

function ToniVideoPlayerComponent({
  idleImageSrc = "/videos/toni-lee-idle.png",
  speakingSrc = "/videos/toni-lee-talking.mp4",
  className = "w-full h-full",
  variant = "full",
  showWaveform = true,
}: ToniVideoPlayerProps) {
  const avatarState = useToniStore((s) => s.avatarState);
  const speakingVideoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  const isSpeaking = avatarState === "speaking";
  const isListening = avatarState === "listening";

  // Preload and manage speaking video playback with zero frame drops
  useEffect(() => {
    const video = speakingVideoRef.current;
    if (!video) return;

    if (isSpeaking) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          if (err?.name !== "AbortError") {
            console.warn("Toni video playback info:", err);
          }
        });
      }
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isSpeaking]);

  // 1. AVATAR CIRCLE MODE (e.g. inside header or message bubbles)
  if (variant === "avatar-circle") {
    return (
      <div className={`relative overflow-hidden rounded-full bg-[#0A0A0C] ${className}`}>
        {/* Idle Image (Zero GPU video decoding when quiet) */}
        <Image
          src={idleImageSrc}
          alt="Toni Lee"
          fill
          sizes="96px"
          className="object-cover object-top"
          priority
        />

        {/* Buttery-Smooth Talking Video (Plays strictly while speaking) */}
        <video
          ref={speakingVideoRef}
          src={speakingSrc}
          loop
          muted
          playsInline
          preload="auto"
          onCanPlayThrough={() => setVideoReady(true)}
          style={{ willChange: "opacity, transform", transform: "translateZ(0)" }}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-200 ${
            isSpeaking && videoReady ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      </div>
    );
  }

  // 2. CARD HEADER MODE (Compact video preview)
  if (variant === "card-header") {
    return (
      <div className={`relative overflow-hidden bg-[#07080a] select-none ${className}`}>
        {/* Idle Image */}
        <Image
          src={idleImageSrc}
          alt="Toni Lee Master Tailor"
          fill
          sizes="(max-width: 640px) 100vw, 480px"
          className="object-cover object-top"
          priority
        />

        {/* Speaking Video */}
        <video
          ref={speakingVideoRef}
          src={speakingSrc}
          loop
          muted
          playsInline
          preload="auto"
          onCanPlayThrough={() => setVideoReady(true)}
          style={{ willChange: "opacity, transform", transform: "translateZ(0)" }}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-200 ${
            isSpeaking && videoReady ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Noir Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-transparent to-black/30 pointer-events-none" />

        {/* Live Audio Equalizer Waveform */}
        {showWaveform && isSpeaking && (
          <div className="absolute bottom-2 left-3 right-3 z-20 flex items-center justify-between px-2.5 py-1.5 bg-[#0B0B0A]/90 border border-[#B92720] shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-[#B92720]">
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              <span>ATELIER DISPATCH</span>
            </div>
            <div className="flex items-end gap-1 h-3.5">
              <div className="w-1 bg-[#B92720] animate-pulse h-3.5" />
              <div className="w-1 bg-[#B59454] animate-pulse h-2" style={{ animationDelay: "150ms" }} />
              <div className="w-1 bg-[#E9DFC9] animate-pulse h-3" style={{ animationDelay: "300ms" }} />
              <div className="w-1 bg-[#B92720] animate-pulse h-2.5" style={{ animationDelay: "450ms" }} />
            </div>
          </div>
        )}

        {isListening && (
          <div className="absolute bottom-2 left-3 right-3 z-20 flex items-center justify-between px-2.5 py-1.5 bg-[#0B0B0A]/90 border border-[#B59454] shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-[#B59454]">
              <Mic className="w-3.5 h-3.5 animate-bounce" />
              <span>LISTENING TO THE BOSS</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. FULL ATELIER MODE (Default large canvas view inside chat card)
  return (
    <div className={`relative overflow-hidden bg-[#07080a] select-none ${className}`}>
      {/* 1. Base Idle Cartoon Image (Active whenever not speaking) */}
      <Image
        src={idleImageSrc}
        alt="Toni Lee Master Tailor"
        fill
        sizes="(max-width: 768px) 100vw, 360px"
        className="object-cover object-top"
        priority
      />

      {/* 2. Speaking Video Loop (Hardware Accelerated, Smooth 60fps) */}
      <video
        ref={speakingVideoRef}
        src={speakingSrc}
        loop
        muted
        playsInline
        preload="auto"
        onCanPlayThrough={() => setVideoReady(true)}
        style={{ willChange: "opacity, transform", transform: "translateZ(0)" }}
        className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-200 ${
          isSpeaking && videoReady ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* 3. Noir Lighting Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-transparent to-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0B0B0A_95%)] pointer-events-none" />
      <div className="absolute inset-0 bg-halftone-charcoal opacity-15 pointer-events-none" />

      {/* 4. Live Audio Equalizer Waveform (When Speaking) */}
      {showWaveform && isSpeaking && (
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-[#0B0B0A]/90 backdrop-blur-md p-3 border border-[#B92720] shadow-editorial flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-sans font-bold tracking-wider text-[#B92720]">
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span>TONI LEE &bull; ATELIER DISPATCH</span>
          </div>
          <div className="flex items-end gap-1 h-4">
            <div className="w-1 bg-[#B92720] animate-pulse h-4" />
            <div className="w-1 bg-[#B59454] animate-pulse h-2" style={{ animationDelay: "150ms" }} />
            <div className="w-1 bg-[#E9DFC9] animate-pulse h-3.5" style={{ animationDelay: "300ms" }} />
            <div className="w-1 bg-[#B92720] animate-pulse h-2.5" style={{ animationDelay: "450ms" }} />
            <div className="w-1 bg-[#B59454] animate-pulse h-4" style={{ animationDelay: "100ms" }} />
          </div>
        </div>
      )}

      {/* 5. Microphone Active Overlay (When Listening) */}
      {isListening && (
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-[#0B0B0A]/90 backdrop-blur-md p-3 border border-[#B59454] shadow-editorial flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-sans font-bold tracking-wider text-[#B59454]">
            <Mic className="w-4 h-4 animate-bounce" />
            <span>TONI LEE &bull; LISTENING TO THE BOSS</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Memoized to prevent any unnecessary re-render during chat message streaming
export const ToniVideoPlayer = React.memo(ToniVideoPlayerComponent);
