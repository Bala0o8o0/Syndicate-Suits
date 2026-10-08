import { create } from "zustand";

export type AvatarState = "idle" | "listening" | "thinking" | "speaking";

export interface SuitCardData {
  title: string;
  traits: string;
  description: string;
  bullets: string[];
  statement: string;
  suitId?: string;
  image?: string;
  actionPills?: Array<{
    label: string;
    actionText: string;
    icon?: "suit" | "all" | "compare" | "cart";
  }>;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "toni";
  text: string;
  timestamp: Date;
  suitCard?: SuitCardData;
  isStreaming?: boolean;
  toolCall?: {
    name: string;
    args: Record<string, unknown>;
  };
}

interface ToniState {
  avatarState: AvatarState;
  mouthOpenFraction: number;
  currentViseme: string;
  transcript: string;
  interimTranscript: string;
  messages: ChatMessage[];
  isMicActive: boolean;
  highlightedElementId: string | null;
  isWidgetOpen: boolean;
  isAudioMuted: boolean;
  
  setAvatarState: (state: AvatarState) => void;
  setLipSyncMetrics: (mouthOpen: number, viseme: string) => void;
  setTranscript: (text: string) => void;
  setInterimTranscript: (text: string) => void;
  setIsMicActive: (active: boolean) => void;
  addMessage: (msg: Omit<ChatMessage, "id" | "timestamp">) => string;
  updateMessageText: (id: string, text: string, isStreaming?: boolean, suitCard?: SuitCardData, toolCall?: { name: string; args: Record<string, unknown> }) => void;
  setHighlightedElementId: (id: string | null) => void;
  toggleWidget: () => void;
  setWidgetOpen: (open: boolean) => void;
  toggleMute: () => void;
}

export const useToniStore = create<ToniState>()((set) => ({
  avatarState: "idle",
  mouthOpenFraction: 0,
  currentViseme: "idle",
  transcript: "",
  interimTranscript: "",
  messages: [
    {
      id: "welcome-1",
      sender: "toni",
      text: "Fuggedaboutit! Welcome to Syndicate Suits, my friend. I'm Toni Lee—your Master Tailor & Consigliere. Tell me what kind of occasion you're stepping into, and I'll get you fitted in pure syndicate gold.",
      timestamp: new Date(),
    },
  ],
  isMicActive: false,
  highlightedElementId: null,
  isWidgetOpen: false,
  isAudioMuted: false,

  setAvatarState: (avatarState) =>
    set((state) => (state.avatarState === avatarState ? state : { avatarState })),
  setLipSyncMetrics: (mouthOpenFraction, currentViseme) =>
    set((state) =>
      state.mouthOpenFraction === mouthOpenFraction && state.currentViseme === currentViseme
        ? state
        : { mouthOpenFraction, currentViseme }
    ),
  setTranscript: (transcript) => set({ transcript }),
  setInterimTranscript: (interimTranscript) => set({ interimTranscript }),
  setIsMicActive: (isMicActive) => set({ isMicActive }),
  
  addMessage: (msg) => {
    const newId = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...msg,
          id: newId,
          timestamp: new Date(),
        },
      ],
    }));
    return newId;
  },

  updateMessageText: (id, text, isStreaming = false, suitCard, toolCall) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id
          ? {
              ...m,
              text,
              isStreaming,
              ...(suitCard ? { suitCard } : {}),
              ...(toolCall ? { toolCall } : {}),
            }
          : m
      ),
    })),

  setHighlightedElementId: (highlightedElementId) => set({ highlightedElementId }),
  toggleWidget: () => set((state) => ({ isWidgetOpen: !state.isWidgetOpen })),
  setWidgetOpen: (isWidgetOpen) => set({ isWidgetOpen }),
  toggleMute: () => set((state) => ({ isAudioMuted: !state.isAudioMuted })),
}));

export interface SpeechRecognitionResultEvent {
  resultIndex: number;
  results: ArrayLike<{
    isFinal: boolean;
    0: { transcript: string };
  }>;
}

export interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    __sendToniMessage?: (message: string) => void | Promise<void>;
    __speakToniText?: (text: string) => void;
    __stopToniSpeech?: () => void;
    __lenis?: {
      scrollTo: (
        target: number | string | HTMLElement,
        options?: { offset?: number; duration?: number; immediate?: boolean }
      ) => void;
      resize: () => void;
      on: (
        event: string,
        cb: (e: { velocity?: number; progress?: number }) => void
      ) => void;
      off: (
        event: string,
        cb: (e: { velocity?: number; progress?: number }) => void
      ) => void;
    };
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}