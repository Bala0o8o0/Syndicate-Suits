export class AudioLipSyncAnalyser {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;
  private source: MediaStreamAudioSourceNode | AudioNode | null = null;
  private isAnalyzing: boolean = false;
  private currentMouthOpen: number = 0;
  private currentViseme: string = "idle";

  constructor() {
    // Lazy initialized on first user interaction to satisfy browser autoplay policies
  }

  public initContext(): boolean {
    if (typeof window === "undefined") return false;
    try {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
      if (!this.analyser) {
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        this.analyser.smoothingTimeConstant = 0.65;
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      }
      return true;
    } catch {
      return false;
    }
  }

  public connectStream(stream: MediaStream) {
    if (!this.initContext() || !this.audioContext || !this.analyser) return;
    try {
      this.disconnect();
      this.source = this.audioContext.createMediaStreamSource(stream);
      this.source.connect(this.analyser);
      this.isAnalyzing = true;
    } catch {
      // Fallback
    }
  }

  public connectAudioElement(audio: HTMLAudioElement) {
    if (!this.initContext() || !this.audioContext || !this.analyser) return;
    try {
      this.disconnect();
      this.source = this.audioContext.createMediaElementSource(audio);
      this.source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
      this.isAnalyzing = true;
    } catch {
      // Fallback
    }
  }

  public simulateSpeech(durationMs: number = 3000, onUpdate?: (mouthOpen: number, viseme: string) => void) {
    this.isAnalyzing = true;
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed > durationMs) {
        clearInterval(interval);
        this.currentMouthOpen = 0;
        this.currentViseme = "idle";
        this.isAnalyzing = false;
        if (onUpdate) onUpdate(0, "idle");
        return;
      }

      // Natural speech rhythm oscillation
      const wave1 = Math.sin(elapsed * 0.015);
      const wave2 = Math.cos(elapsed * 0.027);
      const raw = Math.max(0, (wave1 + wave2) * 0.5 + 0.3);
      this.currentMouthOpen = Math.min(1, raw);

      const visemes = ["viseme_aa", "viseme_O", "viseme_E", "viseme_I", "jawOpen"];
      const vIndex = Math.floor((Math.abs(wave1 * 10) + Math.abs(wave2 * 5)) % visemes.length);
      this.currentViseme = this.currentMouthOpen > 0.15 ? visemes[vIndex] : "idle";

      if (onUpdate) onUpdate(this.currentMouthOpen, this.currentViseme);
    }, 30);
  }

  public getAudioMetrics(): { mouthOpen: number; viseme: string; isSpeaking: boolean } {
    if (!this.isAnalyzing || !this.analyser || !this.dataArray) {
      return { mouthOpen: this.currentMouthOpen, viseme: this.currentViseme, isSpeaking: this.currentMouthOpen > 0.05 };
    }

    this.analyser.getByteFrequencyData(this.dataArray as unknown as Uint8Array<ArrayBuffer>);
    
    // Average speech frequencies (300Hz - 3400Hz)
    let sum = 0;
    const binCount = Math.min(this.dataArray.length, 32);
    for (let i = 2; i < binCount; i++) {
      sum += this.dataArray[i];
    }
    const average = sum / (binCount - 2);
    
    // Normalize to 0 - 1.0 with threshold
    const threshold = 15;
    const normalized = average > threshold ? Math.min(1.0, (average - threshold) / 90) : 0;
    
    // Smooth interpolation
    this.currentMouthOpen += (normalized - this.currentMouthOpen) * 0.35;

    // Pick viseme based on dominant frequency bands
    if (this.currentMouthOpen > 0.2) {
      const lowBin = this.dataArray[4] || 0;
      const midBin = this.dataArray[12] || 0;
      const highBin = this.dataArray[20] || 0;

      if (lowBin > midBin && lowBin > highBin) {
        this.currentViseme = "viseme_O";
      } else if (midBin > highBin) {
        this.currentViseme = "viseme_aa";
      } else {
        this.currentViseme = "viseme_E";
      }
    } else {
      this.currentViseme = "idle";
    }

    return {
      mouthOpen: this.currentMouthOpen,
      viseme: this.currentViseme,
      isSpeaking: this.currentMouthOpen > 0.08,
    };
  }

  public disconnect() {
    if (this.source) {
      try {
        this.source.disconnect();
      } catch {}
      this.source = null;
    }
    this.isAnalyzing = false;
    this.currentMouthOpen = 0;
    this.currentViseme = "idle";
  }
}

export const lipSyncAnalyser = typeof window !== "undefined" ? new AudioLipSyncAnalyser() : null;