"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SmoothScrollProvider } from "./smooth-scroll-provider";
import { SyndicateNav } from "./syndicate-nav";
import { SyndicateFooter } from "./syndicate-footer";
import { BriefcaseModal } from "@/components/briefcase/briefcase-modal";
import { ToniAssistantWidget } from "@/components/avatar/toni-assistant-widget";
import { ToniSpeechController } from "@/components/avatar/toni-speech-controller";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{ href?: string }>;
      const href = customEvent.detail?.href;
      if (href) {
        router.push(href);
      }
    };
    window.addEventListener("toni-navigate", handleNavigate);
    return () => window.removeEventListener("toni-navigate", handleNavigate);
  }, [router]);

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col bg-[#0a0a0c] text-white selection:bg-amber-400 selection:text-black">
        {/* Navigation Bar */}
        <SyndicateNav />

        {/* Page Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <SyndicateFooter />

        {/* Global Floating Components */}
        <BriefcaseModal />
        {/* Toni Lee AI Chatbot with Speech Engine (100% 2D Cartoon Noir, OpenRouter-Ready) */}
        <ToniAssistantWidget />
        <ToniSpeechController />
      </div>
    </SmoothScrollProvider>
  );
}