"use client";
// hashtag.png watermark is placed as a low-opacity background inside the card

import React, { useState, useRef, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  Mic, MicOff, X, Send, Sparkles, CheckCheck, Volume2, VolumeX, Video, VideoOff
} from "lucide-react";
import { useToniStore } from "@/lib/toni-store";
import { Suit } from "@/lib/suits-data";
import { SuitQuickViewModal } from "@/components/catalog/suit-quick-view-modal";
import { ToniVideoPlayer } from "./toni-video-player";
import { GenerativeAICardRenderer } from "./generative-ui-card";

const emptySubscribe = () => () => {};

interface SyndicateChatCardProps {
  onClose?: () => void;
  embedded?: boolean;
  className?: string;
}

// ── Toni Video Avatar (Idle vs Speaking Lip-Sync Engine) ───────────────────
function ToniAvatar({ size = 36, isSpeaking = false }: { size?: number; isSpeaking?: boolean }) {
  return (
    <div
      className="shrink-0 rounded-full overflow-hidden bg-[#120d0d] relative flex items-center justify-center transition-all duration-300"
      style={{
        width: size,
        height: size,
        border: isSpeaking ? "2px solid #DC2626" : "2px solid #D4AF37",
        boxShadow: isSpeaking
          ? "0 0 14px rgba(220, 38, 38, 0.85), 0 0 20px rgba(139, 0, 0, 0.6)"
          : "0 0 8px rgba(212, 175, 55, 0.4)",
      }}
    >
      <Image
        src="/images/toni-lee.jpg"
        alt="Toni Lee"
        fill
        sizes="48px"
        className="object-cover object-top"
      />
    </div>
  );
}

const QUICK_ACTIONS = [
  { icon: "♠", label: "Show me The Don", action: "Tell me about The Don suit" },
  { icon: "♣", label: "Best for formal events", action: "Which suit is best for formal black tie events?" },
  { icon: "♦", label: "Find my size", action: "Help me find the right size for my suit" },
  { icon: "✦", label: "More options", action: "What are all my customization options?" },
];

export function SyndicateChatCard({
  onClose,
  embedded = false,
  className = "",
}: SyndicateChatCardProps) {
  const messages = useToniStore((s) => s.messages);
  const isMicActive = useToniStore((s) => s.isMicActive);
  const interimTranscript = useToniStore((s) => s.interimTranscript);
  const setIsMicActive = useToniStore((s) => s.setIsMicActive);
  const avatarState = useToniStore((s) => s.avatarState);
  const isAudioMuted = useToniStore((s) => s.isAudioMuted);
  const toggleMute = useToniStore((s) => s.toggleMute);

  const [inputVal, setInputVal] = useState("");
  const [selectedSuitForModal, setSelectedSuitForModal] = useState<Suit | null>(null);
  const [isVideoCollapsed, setIsVideoCollapsed] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const cardRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sc = scrollRef.current;
    if (!sc) return;
    const fn = (e: WheelEvent) => {
      const canScrollUp = sc.scrollTop > 0;
      const canScrollDown = sc.scrollTop + sc.clientHeight < sc.scrollHeight - 1;
      const hasOverflow = sc.scrollHeight > sc.clientHeight;
      if (!embedded || (hasOverflow && ((e.deltaY < 0 && canScrollUp) || (e.deltaY > 0 && canScrollDown)))) {
        e.preventDefault();
        e.stopPropagation();
        sc.scrollTop += e.deltaY;
      }
    };
    sc.addEventListener("wheel", fn, { passive: false });
    return () => sc.removeEventListener("wheel", fn);
  }, [embedded]);

  useEffect(() => {
    if (messages.length > 1 || interimTranscript) {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages.length, interimTranscript]);

  const send = (e?: React.FormEvent) => {
    e?.preventDefault();
    const t = inputVal.trim();
    if (!t) return;
    window.__sendToniMessage?.(t);
    setInputVal("");
  };

  return (
    <>
      <div ref={cardRef} className={`relative select-none ${className}`}>
        <div
          className="relative w-full flex flex-col md:flex-row overflow-hidden h-[88vh] sm:h-[620px] md:h-[640px] max-h-[92vh] max-w-[860px]"
          style={{
            background: "linear-gradient(145deg, rgba(14, 12, 12, 0.97) 0%, rgba(22, 18, 18, 0.98) 100%)",
            backdropFilter: "blur(24px) saturate(190%)",
            WebkitBackdropFilter: "blur(24px) saturate(190%)",
            borderRadius: "20px",
            border: "1px solid rgba(212, 175, 55, 0.22)",
            boxShadow: "0 30px 90px rgba(0,0,0,0.95), 0 0 40px rgba(139,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* ============================================================ */}
          {/* LEFT SIDE: TONI LEE LIVE VIDEO AVATAR STAGE                   */}
          {/* ============================================================ */}
          {!isVideoCollapsed && (
            <div className="relative shrink-0 w-full md:w-[320px] lg:w-[350px] h-[210px] sm:h-[250px] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-[rgba(212,175,55,0.2)] bg-[#07080a] flex flex-col select-none">
              <div className="relative w-full flex-1 min-h-0 overflow-hidden">
                <ToniVideoPlayer
                  idleImageSrc="/videos/toni-lee-idle.png"
                  speakingSrc="/videos/toni-lee-talking.mp4"
                  variant="full"
                  className="w-full h-full"
                  showWaveform={false}
                />

                {/* Top Title Overlay */}
                <div className="absolute top-3 left-3 z-20 flex items-center pointer-events-none">
                  <div className="bg-[#0B0B0A]/90 backdrop-blur-md px-2.5 py-1 border border-[#D4AF37]/35 text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold flex items-center gap-1.5 shadow-md">
                    <span>TONI LEE &bull; MASTER TAILOR</span>
                  </div>
                </div>

                {/* Bottom Equalizer / Status Bar */}
                <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none">
                  {avatarState === "speaking" ? (
                    <div className="bg-[#0B0B0A]/95 backdrop-blur-md p-2.5 border border-[#B92720] shadow-[0_4px_16px_rgba(185,39,32,0.4)] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-[#B92720]">
                        <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                        <span>ATELIER DISPATCH</span>
                      </div>
                      <div className="flex items-end gap-1 h-3.5">
                        <div className="w-1 bg-[#B92720] animate-pulse h-3.5" />
                        <div className="w-1 bg-[#B59454] animate-pulse h-2" style={{ animationDelay: "150ms" }} />
                        <div className="w-1 bg-[#E9DFC9] animate-pulse h-3" style={{ animationDelay: "300ms" }} />
                        <div className="w-1 bg-[#B92720] animate-pulse h-2" style={{ animationDelay: "450ms" }} />
                        <div className="w-1 bg-[#B59454] animate-pulse h-3.5" style={{ animationDelay: "100ms" }} />
                      </div>
                    </div>
                  ) : isMicActive ? (
                    <div className="bg-[#0B0B0A]/95 backdrop-blur-md p-2.5 border border-[#B59454] shadow-[0_4px_16px_rgba(181,148,84,0.3)] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-[#B59454]">
                        <Mic className="w-3.5 h-3.5 animate-bounce" />
                        <span>RECEIVING WIRE</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#0B0B0A]/85 backdrop-blur-md px-3 py-1.5 border border-[rgba(212,175,55,0.2)] text-[10px] font-editorial-italic text-[#E9DFC9]/80 text-center shadow-md">
                      &ldquo;Bespoke Italian cuts for the Five Families.&rdquo;
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* RIGHT SIDE: CHAT LEDGER & CONVERSATION                       */}
          {/* ============================================================ */}
          <div className="flex-1 flex flex-col h-full min-w-0 relative overflow-hidden bg-[#0F0D0D]/70">
            {/* BACKGROUND WATERMARK */}
            <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
              <Image
                src="/hashtag.png"
                alt=""
                fill
                className="object-contain"
                style={{ opacity: 0.04, mixBlendMode: "luminosity", transform: "scale(0.8)" }}
                priority={false}
              />
            </div>

            {/* HEADER */}
            <div
              className="relative shrink-0 px-4 py-3 z-10 select-none"
              style={{
                background: "linear-gradient(180deg, rgba(22, 18, 18, 0.95) 0%, rgba(14, 12, 12, 0.85) 100%)",
                borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              <div className="flex items-center justify-between gap-3">
                {/* Left: Title & Role */}
                <div className="flex items-center gap-2.5">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-sans text-[15px] font-black uppercase tracking-wider text-white leading-none">
                        TONI LEE
                      </h3>
                      <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] uppercase font-semibold">
                        &bull; MASTER TAILOR
                      </span>
                    </div>
                    <span className="font-mono text-[8.5px] tracking-widest text-white/50 uppercase font-bold mt-1">
                      PRIVATE ATELIER DISPATCH
                    </span>
                  </div>
                </div>

                {/* Right: Video Collapse, Voice Mute & Close buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsVideoCollapsed((prev) => !prev)}
                    aria-label={isVideoCollapsed ? "Show Video Avatar" : "Hide Video Avatar"}
                    title={isVideoCollapsed ? "Show Toni Video" : "Hide Toni Video"}
                    className={`w-8 h-8 flex items-center justify-center transition-all rounded-full border cursor-pointer ${
                      !isVideoCollapsed
                        ? "text-[#D4AF37] bg-[#D4AF37]/15 border-[#D4AF37]/40 shadow-[0_0_8px_rgba(212,175,55,0.3)]"
                        : "text-white/60 hover:text-[#D4AF37] bg-white/05 hover:bg-white/10 border-white/10"
                    }`}
                  >
                    {!isVideoCollapsed ? <Video className="w-4 h-4 text-[#D4AF37]" /> : <VideoOff className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isAudioMuted ? "Unmute Toni Lee voice" : "Mute Toni Lee voice"}
                    title={isAudioMuted ? "Unmute voice" : "Mute voice"}
                    className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-all rounded-full bg-white/05 hover:bg-white/10 border border-white/10 cursor-pointer"
                  >
                    {isAudioMuted ? <VolumeX className="w-4 h-4 text-[#B92720]" /> : <Volume2 className="w-4 h-4 text-[#D4AF37]" />}
                  </button>
                  {onClose && (
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Close Assistant"
                      className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-all rounded-full bg-white/05 hover:bg-white/10 border border-white/10 cursor-pointer"
                    >
                      <X className="w-4 h-4 stroke-[2]" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sub-header Navigation Tabs */}
              <div className="flex items-center justify-between gap-1 mt-2.5 pt-2 border-t border-white/06">
                {["STYLE", "FIT", "COLLECTION", "MORE"].map((tab, i) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      if (tab === "STYLE") window.__sendToniMessage?.("Show me suit styling options");
                      else if (tab === "FIT") window.__sendToniMessage?.("Help me with suit fitting and size");
                      else if (tab === "COLLECTION") window.__sendToniMessage?.("Show me the suit collection");
                      else window.__sendToniMessage?.("What are all my options?");
                    }}
                    className={`flex-1 text-center font-mono text-[9px] font-bold tracking-widest uppercase py-1 px-1.5 rounded transition-all cursor-pointer ${
                      i === 0
                        ? "text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/25"
                        : "text-white/40 hover:text-white/80 hover:bg-white/05 border border-transparent"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

          {/* ============================================================ */}
          {/* MESSAGES                                                        */}
          {/* ============================================================ */}
          <div
            ref={scrollRef}
            data-lenis-prevent
            className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4 z-10"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="flex items-start gap-3">
                <ToniAvatar size={34} />
                <div
                  className="flex-1 px-4 py-3 text-[13px] text-white/90 leading-relaxed"
                  style={{
                    background: "rgba(30, 26, 26, 0.85)",
                    borderRadius: "4px 18px 18px 18px",
                    border: "1px solid rgba(212, 175, 55, 0.15)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                  }}
                >
                  Welcome to the Syndicate.<br />
                  I&apos;m Toni Lee—your Master Tailor &amp; Consigliere.<br /><br />
                  Want to explore our seven bespoke cuts, find your size, or order a custom bulletproof suit?
                  {mounted && (
                    <p className="text-white/30 text-[10px] mt-2 font-mono">
                      {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  )}
                </div>
              </div>
            )}

            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              const time =
                mounted && msg.timestamp
                  ? new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                  : "";

              /* USER MESSAGE */
              if (isUser)
                return (
                  <div key={msg.id} className="flex justify-end items-end gap-2">
                    <div
                      className="max-w-[76%] px-4 py-3 text-[13px] font-medium leading-relaxed select-text"
                      style={{
                        background: "#EDE0C4",
                        color: "#16120c",
                        borderRadius: "18px 4px 18px 18px",
                        border: "2px solid #000",
                        boxShadow: "3px 3px 0px #000",
                      }}
                    >
                      {msg.text}
                      <div className="flex items-center justify-end gap-1.5 mt-1.5">
                        <span className="font-mono text-[9px] text-[#16120c]/50 font-bold">{time}</span>
                        <CheckCheck className="w-3.5 h-3.5 text-[#8B0000]" />
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#1e1c1c] border border-white/20 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                        <circle cx="10" cy="7" r="3.5" fill="rgba(255,255,255,0.4)" />
                        <path
                          d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6"
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                );

              /* TONI MESSAGE */
              return (
                <div key={msg.id} className="flex items-start gap-3">
                  <ToniAvatar size={34} isSpeaking={msg.isStreaming || avatarState === "speaking"} />
                  <div className="flex-1 flex flex-col gap-2">
                    <div
                      className="px-4 py-3 text-[13px] text-white/95 leading-relaxed select-text relative"
                      style={{
                        background: "rgba(28, 24, 24, 0.88)",
                        borderRadius: "4px 18px 18px 18px",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
                      }}
                    >
                      {!msg.text && msg.isStreaming ? (
                        <div className="flex items-center gap-1.5 py-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" style={{ animationDelay: "300ms" }} />
                        </div>
                      ) : (
                        msg.text
                      )}

                      <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-white/05">
                        <span className="text-white/30 text-[10px] font-mono">{time}</span>
                      </div>
                    </div>

                    {/* Generative UI Components */}
                    {(msg.suitCard || msg.toolCall) && (
                      <GenerativeAICardRenderer
                        suitCard={msg.suitCard}
                        toolCall={msg.toolCall}
                        onQuickView={(suit) => setSelectedSuitForModal(suit)}
                      />
                    )}
                  </div>
                </div>
              );
            })}

            <div ref={endRef} className="h-1" />
          </div>

          {/* ============================================================ */}
          {/* QUICK ACTION CHIPS                                              */}
          {/* ============================================================ */}
          <div
            className="shrink-0 px-4 py-2.5 flex gap-2 overflow-x-auto z-10"
            style={{
              background: "rgba(18, 14, 14, 0.6)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              scrollbarWidth: "none",
            }}
          >
            {QUICK_ACTIONS.map((qa) => (
              <button
                key={qa.label}
                type="button"
                onClick={() => window.__sendToniMessage?.(qa.action)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-white/80 hover:text-white transition-all whitespace-nowrap group cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  borderRadius: "999px",
                  letterSpacing: "0.04em",
                }}
              >
                <span className="text-[#D4AF37] text-[10px] group-hover:scale-125 transition-transform">
                  {qa.icon}
                </span>
                {qa.label}
              </button>
            ))}
          </div>

          {/* ============================================================ */}
          {/* INPUT BAR                                                       */}
          {/* ============================================================ */}
          <div
            className="shrink-0 px-4 py-3 z-10"
            style={{
              background: "linear-gradient(180deg, rgba(16,12,12,0.5) 0%, rgba(20,16,16,0.9) 100%)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <form onSubmit={send} className="flex items-center gap-2">
              {/* Input field */}
              <div
                className="flex-1 flex items-center gap-2 px-4 py-2.5 transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "999px",
                }}
              >
                <button
                  type="button"
                  onClick={() => inputRef.current?.focus()}
                  aria-label="Focus message input"
                  className="text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                </button>

                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask Toni Lee anything..."
                  className="flex-1 bg-transparent text-[13px] text-white placeholder-white/35 focus:outline-none font-sans"
                />

                <button
                  type="button"
                  onClick={() => setIsMicActive(!isMicActive)}
                  aria-label={isMicActive ? "Stop voice input" : "Start voice input"}
                  className={`transition-colors shrink-0 cursor-pointer ${
                    isMicActive ? "text-red-500" : "text-white/40 hover:text-white/80"
                  }`}
                >
                  {isMicActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>

              {/* Send button */}
              <button
                type="submit"
                disabled={!inputVal.trim()}
                aria-label="Send message"
                className="w-11 h-11 flex items-center justify-center shrink-0 disabled:opacity-35 transition-all active:scale-95 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #8B0000 0%, #DC2626 100%)",
                  borderRadius: "14px",
                  boxShadow: "0 4px 14px rgba(139,0,0,0.6)",
                }}
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>

          {/* Close Right Column */}
          </div>
        </div>
      </div>

      {selectedSuitForModal && (
        <SuitQuickViewModal suit={selectedSuitForModal} onClose={() => setSelectedSuitForModal(null)} />
      )}
    </>
  );
}
