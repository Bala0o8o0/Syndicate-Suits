"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  useToniStore,
  SpeechRecognitionInstance,
  SpeechRecognitionResultEvent,
} from "@/lib/toni-store";
import { lipSyncAnalyser } from "@/lib/audio-analyser";
import { processToniMessageStream } from "@/lib/gemini";

// Formats raw text into fluid, natural spoken human English (eliminating dictation-like symbol pauses)
function sanitizeTextForSpeech(raw: string): string {
  let text = raw;

  // Convert Indian rupee amounts into natural spoken phrases
  text = text.replace(/₹\s?3,45,000/g, "345 thousand rupees");
  text = text.replace(/₹\s?3,10,000/g, "310 thousand rupees");
  text = text.replace(/₹\s?2,95,000/g, "295 thousand rupees");
  text = text.replace(/₹\s?2,80,000/g, "280 thousand rupees");
  text = text.replace(/₹\s?2,65,000/g, "265 thousand rupees");
  text = text.replace(/₹\s?2,50,000/g, "250 thousand rupees");
  text = text.replace(/₹\s?2,75,000/g, "275 thousand rupees");
  text = text.replace(/₹\s?(\d+),?(\d+)?/g, "$1 thousand rupees");

  // Convert Roman numerals and Kevlar levels
  text = text.replace(/Level\s+III-A/gi, "Level Three A");
  text = text.replace(/Level\s+II-A/gi, "Level Two A");
  text = text.replace(/Level\s+IV/gi, "Level Four");
  text = text.replace(/Level\s+III/gi, "Level Three");
  text = text.replace(/Level\s+II/gi, "Level Two");

  // Clean mechanical markdown and code symbols that cause staccato dictation pauses
  text = text.replace(/[\/\\]/g, " ");
  text = text.replace(/[()\[\]{}]/g, " ");
  text = text.replace(/[*_~`#]/g, "");
  text = text.replace(/—/g, ", ");
  text = text.replace(/--/g, ", ");
  text = text.replace(/:/g, ", ");
  text = text.replace(/;/g, ", ");
  text = text.replace(/!+/g, ".");
  text = text.replace(/\s+/g, " ");

  return text.trim();
}

// Selects STRICTLY a MALE voice with natural, authentic human mobster tone
function getBestMaleVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Disallow all female voices
  const femaleKeywords = [
    "female", "woman", "girl", "zira", "hazel", "susan", "jenny", "aria",
    "samantha", "karen", "victoria", "catherine", "linda", "heather",
    "alice", "fiona", "eva", "anna", "maria", "yelena", "clara", "helena",
    "zaria", "cortana", "ayumi", "haruka", "sayaka", "kyoko", "ting-ting",
    "mei-jia", "sin-ji", "monica", "paulina", "luciana", "miren", "laura"
  ];

  // Filter for English non-female voices
  const maleVoices = voices.filter((v) => {
    const nameLower = v.name.toLowerCase();
    const isFemale = femaleKeywords.some((f) => nameLower.includes(f));
    return !isFemale && v.lang.startsWith("en");
  });

  // 1. Natural / Online / Neural MALE voices (Edge, Windows 11, Chrome, macOS)
  const naturalMale = maleVoices.find(
    (v) =>
      v.name.toLowerCase().includes("natural") ||
      v.name.toLowerCase().includes("online") ||
      v.name.toLowerCase().includes("guy") ||
      v.name.toLowerCase().includes("christopher") ||
      v.name.toLowerCase().includes("ryan") ||
      v.name.toLowerCase().includes("andrew") ||
      v.name.toLowerCase().includes("brian") ||
      v.name.toLowerCase().includes("eric") ||
      v.name.toLowerCase().includes("steffan") ||
      v.name.toLowerCase().includes("uk english male") ||
      v.name.toLowerCase().includes("daniel") ||
      v.name.toLowerCase().includes("alex") ||
      v.name.toLowerCase().includes("tom") ||
      v.name.toLowerCase().includes("mark") ||
      v.name.toLowerCase().includes("david") ||
      v.name.toLowerCase().includes("george")
  );

  if (naturalMale) return naturalMale;

  // 2. Any other English male voice
  if (maleVoices.length > 0) {
    return maleVoices[0];
  }

  // 3. Fallback to any voice with explicit male indicator
  const anyMale = voices.find((v) => v.name.toLowerCase().includes("male"));
  return anyMale || voices[0] || null;
}

export function ToniSpeechController() {
  const avatarState = useToniStore((s) => s.avatarState);
  const isMicActive = useToniStore((s) => s.isMicActive);
  const isAudioMuted = useToniStore((s) => s.isAudioMuted);
  const setAvatarState = useToniStore((s) => s.setAvatarState);
  const setLipSyncMetrics = useToniStore((s) => s.setLipSyncMetrics);
  const setTranscript = useToniStore((s) => s.setTranscript);
  const setInterimTranscript = useToniStore((s) => s.setInterimTranscript);
  const setIsMicActive = useToniStore((s) => s.setIsMicActive);
  const addMessage = useToniStore((s) => s.addMessage);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const isListeningRef = useRef(false);
  const cachedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Load and cache best male voice
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const updateVoices = () => {
      const best = getBestMaleVoice();
      if (best) cachedVoiceRef.current = best;
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // 1. Audio Analyser Lip-Sync Loop (Strictly runs only when speaking)
  const lastMetricsRef = useRef({ mouthOpen: 0, viseme: "idle" });

  useEffect(() => {
    if (avatarState !== "speaking") {
      if (lastMetricsRef.current.mouthOpen !== 0 || lastMetricsRef.current.viseme !== "idle") {
        setLipSyncMetrics(0, "idle");
        lastMetricsRef.current = { mouthOpen: 0, viseme: "idle" };
      }
      return;
    }

    let animId: number;
    const loop = () => {
      if (lipSyncAnalyser) {
        const metrics = lipSyncAnalyser.getAudioMetrics();
        if (
          Math.abs(metrics.mouthOpen - lastMetricsRef.current.mouthOpen) > 0.05 ||
          metrics.viseme !== lastMetricsRef.current.viseme
        ) {
          lastMetricsRef.current = metrics;
          setLipSyncMetrics(metrics.mouthOpen, metrics.viseme);
        }
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [avatarState, setLipSyncMetrics]);

  // 2. Stop any active speech
  const stopSpeech = useCallback(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setAvatarState("idle");
    setLipSyncMetrics(0, "idle");
  }, [setAvatarState, setLipSyncMetrics]);

  // 3. Speak with Ultra-Realistic Neural Human Audio + Synchronized Waveform
  const speakText = useCallback(
    (text: string) => {
      if (typeof window === "undefined") return;

      if (isAudioMuted) {
        setAvatarState("idle");
        return;
      }

      // Stop any existing audio or speech first
      stopSpeech();

      const spokenContent = sanitizeTextForSpeech(text);

      const fallbackBrowserSpeech = () => {
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();

          const utterance = new SpeechSynthesisUtterance(spokenContent);
          utterance.rate = 1.02;
          utterance.pitch = 0.95;
          utterance.volume = 1.0;

          const bestVoice = cachedVoiceRef.current || getBestMaleVoice();
          if (bestVoice) {
            utterance.voice = bestVoice;
          }

          utterance.onstart = () => {
            setAvatarState("speaking");
            if (lipSyncAnalyser) {
              const estimatedDurationMs = Math.max(1200, (spokenContent.length / 14) * 1000);
              lipSyncAnalyser.simulateSpeech(estimatedDurationMs, (open, viseme) => {
                setLipSyncMetrics(open, viseme);
              });
            }
          };

          utterance.onend = () => {
            setAvatarState("idle");
            setLipSyncMetrics(0, "idle");
          };

          utterance.onerror = () => {
            setAvatarState("idle");
            setLipSyncMetrics(0, "idle");
          };

          window.speechSynthesis.speak(utterance);
        } else {
          setAvatarState("speaking");
          setTimeout(() => setAvatarState("idle"), 2500);
        }
      };

      // 1. Stream pristine Microsoft Neural Human Male Voice Audio (en-US-ChristopherNeural)
      try {
        const audioUrl = `/api/tts?text=${encodeURIComponent(spokenContent.slice(0, 300))}`;
        const audio = new Audio(audioUrl);
        audioPlayerRef.current = audio;

        audio.onplay = () => {
          setAvatarState("speaking");
          if (lipSyncAnalyser) {
            const durationMs = (audio.duration && !isNaN(audio.duration))
              ? audio.duration * 1000
              : Math.max(1200, (spokenContent.length / 14) * 1000);
            lipSyncAnalyser.simulateSpeech(durationMs, (open, viseme) => {
              setLipSyncMetrics(open, viseme);
            });
          }
        };

        audio.onended = () => {
          setAvatarState("idle");
          setLipSyncMetrics(0, "idle");
          audioPlayerRef.current = null;
        };

        audio.onerror = () => {
          fallbackBrowserSpeech();
        };

        audio.play().catch(() => {
          fallbackBrowserSpeech();
        });
      } catch {
        fallbackBrowserSpeech();
      }
    },
    [isAudioMuted, setAvatarState, setLipSyncMetrics, stopSpeech]
  );

  // 4. Handle User Input Submission with Real-Time Vercel AI Stream
  const handleUserMessage = useCallback(
    async (userInput: string) => {
      if (!userInput.trim()) return;

      addMessage({ sender: "user", text: userInput });
      setAvatarState("thinking");

      // Create initial streaming placeholder message for Toni
      const toniMsgId = useToniStore.getState().addMessage({
        sender: "toni",
        text: "",
        isStreaming: true,
      });

      try {
        const currentMessages = useToniStore.getState().messages;
        const history = currentMessages.map((m) => ({
          role: (m.sender === "user" ? "user" : "model") as "user" | "model",
          parts: m.text,
        }));

        const response = await processToniMessageStream(
          userInput,
          history,
          (chunk, fullText, toolCall) => {
            // Live token update
            setAvatarState("speaking");
            useToniStore.getState().updateMessageText(toniMsgId, fullText, true, undefined, toolCall);
          }
        );

        // Finalize message once stream completes with generative UI card and tool call
        useToniStore.getState().updateMessageText(
          toniMsgId,
          response.text,
          false,
          response.suitCard,
          response.toolCall
        );
        speakText(response.text);
      } catch (err) {
        console.error("Error processing Toni stream message:", err);
        const fallback = "Fuggedaboutit! Tell Toni what you need, boss. I'm ready at the atelier workbench.";
        useToniStore.getState().updateMessageText(toniMsgId, fallback, false);
        speakText(fallback);
      }
    },
    [addMessage, setAvatarState, speakText]
  );

  // Expose global triggers for message replay, user sending, and stopping speech
  useEffect(() => {
    window.__sendToniMessage = handleUserMessage;
    window.__speakToniText = (text: string) => speakText(text);
    window.__stopToniSpeech = stopSpeech;
    return () => {
      delete window.__sendToniMessage;
      delete window.__speakToniText;
      delete window.__stopToniSpeech;
    };
  }, [handleUserMessage, speakText, stopSpeech]);

  // 5. Web Speech Recognition (Microphone Input)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      isListeningRef.current = true;
      setAvatarState("listening");
    };

    recognition.onresult = (event: SpeechRecognitionResultEvent) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      if (interim) setInterimTranscript(interim);
      if (final) {
        setTranscript(final);
        setInterimTranscript("");
        handleUserMessage(final);
      }
    };

    recognition.onerror = () => {
      setIsMicActive(false);
      isListeningRef.current = false;
      setAvatarState("idle");
    };

    recognition.onend = () => {
      isListeningRef.current = false;
      if (isMicActive) {
        try {
          recognition.start();
        } catch {}
      } else {
        setAvatarState("idle");
      }
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {}
    };
  }, [handleUserMessage, isMicActive, setAvatarState, setInterimTranscript, setIsMicActive, setTranscript]);

  // Toggle Mic Listener
  useEffect(() => {
    if (!recognitionRef.current) return;
    if (isMicActive) {
      try {
        recognitionRef.current.start();
      } catch {}
    } else {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
  }, [isMicActive]);

  return null;
}