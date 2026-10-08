# 🕴️ SYNDICATE SUITS
### Haute Couture Mafia Bespoke Tailoring & Toni Lee AI Consigliere

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2.11-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3.2-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-049EF4?style=for-the-badge&logo=threedotjs)](https://threejs.org/)
[![Free Architecture](https://img.shields.io/badge/Cost-100%25_Free_Tier-22C55E?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge)](LICENSE)

---

![Syndicate Suits — The Bespoke Atelier](./public/images/syndicate-brand-story.jpg)

> *"Fuggedaboutit! Look at you walking around in off-the-rack like a two-bit street punk. I'm Toni Lee—I dress the bosses in this town. Tell Toni what kind of heat you're stepping into, and I'll get you fitted in pure syndicate gold."*
> — **Toni Lee**, Master Tailor & Consigliere

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [The 100% Free Architecture](#-the-100-free-architecture)
- [Toni Lee — AI Consigliere & Master Tailor](#-toni-lee--ai-consigliere--master-tailor)
- [The Syndicate Seven — Iconic Cuts](#-the-syndicate-seven--iconic-cuts)
- [Autonomous Tool & Action Engine](#-autonomous-tool--action-engine)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Quick Start & Local Setup](#-quick-start--local-setup)
- [Environment Configuration](#-environment-configuration)
- [Underworld Family Tribute Codes](#-underworld-family-tribute-codes)
- [Design System & 90s Cartoon Noir Aesthetic](#-design-system--90s-cartoon-noir-aesthetic)
- [License](#-license)

---

## 🎯 Overview

**Syndicate Suits** is a luxury e-commerce bespoke tailoring experience drenched in a bold **1990s Cartoon Noir & Mafia Comic aesthetic** (inspired by *Batman: The Animated Series*, *Spider-Man 90s Kingpin Noir*, and classic graphic novels).

Anchoring the atelier is **Toni Lee**, a fast-talking mobster AI tailor who:
- **Listens** via microphone with browser Speech-to-Text.
- **Speaks** with an authentic New York mobster accent powered by Microsoft Edge Neural TTS.
- **Lip-Syncs in Real-Time** using custom Web Audio API frequency analysis driving audio-reactive mouth motion and waveforms.
- **Controls the Live Atelier** through dynamic client tool calling—recommending cuts, toggling fabrics and lapels, highlighting items, filtering the vault, and managing the user's discreet briefcase cart (*The Black Ledger*).
- **Operates 100% Free** with zero Runway credit dependencies, zero paid subscription requirements, and a built-in zero-key local heuristic fallback engine.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🎙️ **Bidirectional Voice AI** | Talk directly to Toni Lee via hands-free mic input (`webkitSpeechRecognition`) and listen to human-grade neural mobster responses (`msedge-tts` with `en-US-ChristopherNeural`). |
| 👄 **Web Audio Lip-Sync** | High-precision `AudioLipSyncAnalyser` connects an `AnalyserNode` to live TTS streams, extracting frequency amplitudes to animate Toni's mouth and waveforms in real time. |
| ⚡ **Autonomous DOM Tool Calling** | Toni Lee executes client-side tools that scroll, filter, open modals, customize suits, apply discounts, and manage cart items directly on the screen. |
| 👔 **The Syndicate Seven** | 7 handcrafted luxury silhouettes featuring hand-rolled Como worsted wool, Sicilian linen, crimson velvet, and integrated flexible Level III-A Kevlar micro-mesh lining. |
| ✂️ **Interactive 3D Bespoke Customizer** | Made-to-measure studio where bosses swap fabrics (Como Worsted, Crimson Velvet, Sicilian Linen, Onyx Houndstooth), lapels (Peak, Notch, Shawl), and custom linings. |
| 💼 **The Black Ledger Briefcase Cart** | Discreet briefcase drawer tracking commissions, calculating discounts, rendering invoice tallies, and triggering celebratory confetti drops. |
| 🛡️ **Zero-Key Heuristic Fallback** | Runs completely offline or with zero API keys using an integrated local natural language pattern matcher with instant tool dispatch. |
| 🎨 **1990s Cartoon Noir UI** | 3px bold ink outlines, hard cel-shaded drop shadows (`shadow-[5px_5px_0px_0px_black]`), retro halftone dot patterns, and vintage Art-Deco typography. |

---

## ⚡ The 100% Free Architecture

Unlike legacy character setups that require expensive Runway credits ($/minute), Syndicate Suits is engineered from the ground up for **zero operational cost**:

```
                       ┌──────────────────────────────────────────────┐
                       │     AI Brain: Google Gemini / OpenRouter     │
                       │        (Or Zero-Key Local Fallback Engine)    │
                       └──────────────────────┬───────────────────────┘
                                              │
                 ┌────────────────────────────┼────────────────────────────┐
                 ▼                            ▼                            ▼
     [ Toni Lee Avatar ]            [ Free Audio Pipeline ]      [ Atelier Tool Dispatch ]
     • Cinematic Video Layer         • Web Speech API (STT Mic)   • scroll_to_section
     • Three.js / R3F Canvas         • Edge Neural TTS (Free MP3) • filter_catalog
     • Frequency Lip-Sync Waveform   • Web Audio AnalyserNode     • customize_suit
     • Cursor tracking & idle state  • Zero-latency playback      • add_to_briefcase
```

1. **AI Brain**: Free Google Gemini 2.0 / 1.5 Flash via Google AI Studio, or free OpenRouter models (e.g. `nvidia/nemotron-3-ultra-550b-a55b:free`, `meta-llama/llama-3.3-70b-instruct:free`), backed by a client-side local parser if no key is configured.
2. **Neural Voice**: High-fidelity Microsoft Edge Neural TTS (`en-US-ChristopherNeural` / `en-US-GuyNeural`) streamed on-the-fly via `/api/tts` with zero subscription fees.
3. **Speech Input**: Native browser Web Speech Recognition API (`webkitSpeechRecognition`).
4. **Lip-Sync**: Custom Web Audio API frequency analysis engine measuring instantaneous RMS and frequency buckets to synchronize speech with visual animations.

---

## 🎙️ Toni Lee — AI Consigliere & Master Tailor

![Toni Lee — Master Tailor](./public/images/toni-lee.jpg)

### Persona Profile
- **Alias**: The Consigliere & Master Tailor
- **Location**: Mulberry Street Atelier No. 7, Little Italy
- **Demeanor**: Fast-talking, sharp-witted, fiercely loyal to bosses of honor, ruthless against off-the-rack fashion.
- **Signature Line**: *"Look the part, boss. When you step into a sit-down wearing Syndicate, nobody asks questions."*

---

## 👔 The Syndicate Seven — Iconic Cuts

![The Syndicate Seven Lineup](./public/images/syndicate-seven-lineup.jpg)

Every piece in the atelier is custom-commissioned with Italian craftsmanship and discreet underworld specifications:

| Silhouette | Alias | Fabric & Construction | Cut Style |
| :--- | :--- | :--- | :--- |
| **The Don** | *Il Capo dei Capi* | Italian charcoal chalk-stripe worsted wool with Level III-A Kevlar micro-mesh | Classic Double-Breasted Peak Lapel |
| **The Boss** | *Midnight Obsidian* | 100% Como virgin wool in pitch-black shadow weave | 6-Button Double-Breasted Wide Peak |
| **The Capo** | *Smoked Charcoal* | Brushed midnight charcoal barathea with silk faille satin | 1-Button Speakeasy Shawl Tuxedo |
| **The Consigliere** | *Sicilian Cream* | Crisp Sicilian cream linen blend with antique brass chain accent | 3-Piece Peak Lapel Vest & Trousers |
| **The Enforcer** | *Crimson Velvet* | Heavy Venetian crimson cotton velvet with reinforced shoulder drape | Broad Peak Lapel Statement Blazer |
| **The Underboss** | *Covert Olive* | Italian olive drab tactical wool with concealed interior holster pockets | 2-Button Modern Notch Lapel |
| **The Wildcard** | *Royal Cobalt* | Vibrant cobalt blue houndstooth with crimson silk damask lining | 3-Piece Peak Lapel Double-Breasted Vest |

---

## 🛠️ Autonomous Tool & Action Engine

Toni Lee dynamically executes structured function calling to manipulate the interface in real time:

| Tool Name | Parameters | Action Triggered on Screen | Voice Example |
| :--- | :--- | :--- | :--- |
| `navigate_to_shop` | — | Redirects smoothly to the bespoke suit collection page (`/shop`). | *"Take me to the shop, Toni."* |
| `navigate_to_home` | — | Returns to the main atelier landing page (`/`). | *"Take me back home."* |
| `scroll_to_section` | `sectionId` | Smoothly scrolls to target sections (`syndicate-code`, `brand-story`, `syndicate-seven`, `black-ledger`). | *"Show me the brand story."* |
| `filter_catalog` | `category`, `query` | Filters suit cards by cut (`double-breasted`, `three-piece`, `velvet-gala`, `tactical`) or keyword. | *"Show me double-breasted suits."* |
| `quick_view_suit` | `suitId` | Opens the comic book specification drawer for a specific cut. | *"Tell me about The Don."* |
| `customize_suit` | `suitId` | Opens the live 3D bespoke tailoring studio for that silhouette. | *"Let's customize The Boss."* |
| `highlight_suit` | `suitId` | Scrolls to and pulses a comic spotlight border on the suit card. | *"Where is the Enforcer?"* |
| `add_to_briefcase` | `suitId`, `size` | Places the bespoke suit into the user's discreet briefcase cart. | *"Put The Capo in my briefcase, size 42R."* |
| `remove_from_briefcase` | `suitId` | Removes a specific piece from the briefcase cart. | *"Remove The Boss from my cart."* |
| `clear_briefcase` | — | Purges all items from the Black Ledger briefcase. | *"Clear my briefcase, wipe it clean."* |
| `open_briefcase` | — | Opens the discreet Black Ledger briefcase cart drawer. | *"Open my ledger."* |
| `close_briefcase` | — | Closes the briefcase cart drawer. | *"Close the cart."* |
| `apply_family_discount` | `code` | Validates and unlocks secret syndicate discount codes with celebratory confetti. | *"Apply code TONI_SPECIAL."* |

---

## 💻 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
- **Language**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom 90s comic noir ink outlines and halftone utilities
- **3D & Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animation & Motion**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/), [Lenis](https://lenis.darkroom.engineering/) smooth scroll, [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Voice Synthesis**: Microsoft Edge Neural TTS (`msedge-tts` streaming `en-US-ChristopherNeural` 24kHz audio)
- **Speech Input**: Web Speech Recognition API (`webkitSpeechRecognition`)
- **Audio Processing**: Web Audio API `AudioContext` & `AnalyserNode` frequency spectrum analyzer for real-time lip-sync
- **AI Intelligence**: [Google Gemini 2.0 Flash SDK](https://ai.google.dev/), [OpenRouter API](https://openrouter.ai/), and Client-Side Heuristic Fallback
- **State Management**: [Zustand](https://zustand.docs.pmnd.rs/) (`useToniStore`, `useBriefcaseStore`)
- **Icons & UI**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Directory Structure

```text
syndicate-suits/
├── app/
│   ├── api/
│   │   ├── chat/route.ts                     # Gemini & OpenRouter AI chat route with tool definitions
│   │   └── tts/route.ts                      # Microsoft Edge Neural TTS audio streaming endpoint
│   ├── briefcase/page.tsx                    # Discreet Cart & Checkout Ledger page
│   ├── customizer/page.tsx                   # Interactive Bespoke Tailoring Studio
│   ├── shop/
│   │   ├── [id]/page.tsx                     # Individual Bespoke Cut Specifications & Configurator
│   │   └── page.tsx                          # Bespoke Vault / Catalog with live filters
│   ├── globals.css                           # 90s comic noir utilities, ink borders & halftone styles
│   ├── layout.tsx                            # Root layout with fonts, theme & sound providers
│   └── page.tsx                              # Atelier home (Hero, Brand Story, Seven Suits, Ledger)
├── components/
│   ├── avatar/                               # Toni Lee AI Consigliere & Lip-Sync Engine
│   │   ├── toni-assistant-widget.tsx         # Floating interactive mobster assistant dock
│   │   ├── toni-video-player.tsx             # Dual-layer idle/speaking video player with lip-sync
│   │   ├── toni-speech-controller.tsx        # Web Speech STT & Edge Neural TTS coordinator
│   │   ├── syndicate-chat-card.tsx           # 90s Comic dialog bubble & transcription view
│   │   └── generative-ui-card.tsx            # In-chat interactive suit & briefcase cards
│   ├── brand/                                # Narrative & lore components
│   │   ├── brand-story-section.tsx           # The Seven Families editorial comic story
│   │   ├── syndicate-code-section.tsx        # The Four Tenets of Syndicate Craftsmanship
│   │   └── torn-paper-photo-frame.tsx        # Vintage torn-edge archival photo frame
│   ├── briefcase/                            # Discreet Cart Drawer & Checkout Ledger
│   │   └── briefcase-modal.tsx               # Sliding leather briefcase cart drawer
│   ├── catalog/                              # Suit showcase & 3D product stage
│   │   ├── Hero.tsx                          # Canvas frame sequence hero with zoom reveal
│   │   ├── character-3d-canvas.tsx           # WebGL Three.js 3D revolving carousel canvas
│   │   ├── syndicate-seven-3d-carousel.tsx   # 3D rotating bespoke cut carousel
│   │   ├── syndicate-roster-section.tsx      # Interactive Syndicate hierarchy & character roster
│   │   ├── suit-grid.tsx                     # 3D suit stage with live filters & swatch selector
│   │   ├── suit-quick-view-modal.tsx         # Quick-view specification modal
│   │   ├── bespoke-consultation-banner.tsx   # Interactive Toni Lee consultation banner
│   │   ├── syndicate-reviews.tsx             # Word on the Street mobster testimonials
│   │   └── final-cta-section.tsx             # Mulberry St. appointment booking CTA
│   ├── layout/                               # Navigation, smooth scroll & brand footer
│   │   ├── smooth-scroll-provider.tsx        # Lenis + GSAP ScrollTrigger smooth scroll engine
│   │   ├── syndicate-nav.tsx                 # Atelier header with briefcase badge
│   │   └── syndicate-footer.tsx              # Video background footer with copyright & links
│   └── ui/                                   # Reusable 90s comic styled UI components
│       ├── animated-cigar.tsx                # Animated burning cigar with volumetric smoke
│       ├── kinetic-scroll.tsx                # Kinetic skew, word reveals & magnetic buttons
│       └── smoke-canvas.tsx                  # Interactive HTML5 canvas speakeasy smoke engine
├── lib/
│   ├── audio-analyser.ts                     # Web Audio API frequency processor for live lip-sync
│   ├── briefcase-store.ts                    # Zustand store for cart items, discounts & totals
│   ├── characters-data.ts                    # Lore & profiles for the Syndicate bosses
│   ├── gemini.ts                             # Multi-provider AI orchestrator & local fallback
│   ├── knowledge-base.ts                     # Toni Lee tailoring wisdom, fabric guides & FAQs
│   ├── suits-data.ts                         # Canonical specifications for The Syndicate Seven
│   ├── toni-store.ts                         # Zustand store for Toni's voice, state & spotlights
│   ├── toni-tools.ts                         # Master registry & executor for all 13 AI actions
│   └── utils.ts                              # Tailwind class merge & formatting helpers
├── public/
│   ├── images/
│   │   ├── characters/                       # Syndicate boss portraits
│   │   ├── suits/                            # Suit photography and torn-frame overlays
│   │   ├── syndicate-code/                   # Tailoring icons & kraft paper textures
│   │   ├── hero-skyline.jpg                  # Little Italy 1928 noir backdrop
│   │   ├── shop-banner-comic-noir.jpg        # 90s cartoon noir shop header artwork
│   │   ├── smoking-cigar.jpg                 # High-detail burning cigar artwork
│   │   ├── syndicate-brand-story.jpg         # Atelier workshop banner
│   │   ├── syndicate-seven-lineup.jpg        # The Seven Bosses lineup
│   │   └── toni-lee.jpg                      # Portrait of Toni Lee
│   ├── suits-video/                          # 40-frame sequential canvas animation frames
│   ├── videos/                               # Toni Lee idle & talking video loops
│   ├── hero.mp4                              # Full-bleed cinematic footer background video
│   └── hashtag.png                           # Atelier watermark graphic
├── AGENTS.md                                 # Sole authoritative architecture & design standard
├── package.json                              # Project manifest & npm scripts
├── tsconfig.json                             # TypeScript configuration
└── next.config.ts                            # Next.js configuration
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js**: v22.13.0 or higher
- **Package Manager**: `npm` or `pnpm` (pnpm 11+ recommended)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/syndicate-suits.git
cd syndicate-suits
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 3. Configure Environment Variables (Optional)
The project works completely out of the box with built-in neural TTS and local fallback! To connect cloud AI models (Gemini 2.0 Flash or OpenRouter):

```bash
cp .env.example .env.local
```

Edit `.env.local` with your API keys:
```env
# OpenRouter API Key (https://openrouter.ai/keys)
OPENROUTER_API_KEY=your_openrouter_key_here
OPENROUTER_MODEL=openai/gpt-4o-mini
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_key_here

# Google Gemini API Key (https://aistudio.google.com/apikey)
GEMINI_API_KEY=your_gemini_key_here
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key_here
```

### 4. Run the Development Server
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 🔑 Underworld Family Tribute Codes

Test the discreet briefcase ledger discount engine with these secret family passcodes:

| Secret Passcode | Discount | Description |
| :--- | :--- | :--- |
| `TONI_SPECIAL` | **25% OFF** | Toni Lee's personal favor for loyal patrons. |
| `DON_CORLEONE` | **35% OFF** | High-level syndicate respect code with celebratory confetti. |
| `FIVE_FAMILIES` | **30% OFF** | Council of the Five Families sit-down concession. |
| `GOODFELLA` | **20% OFF** | Street-level associate courtesy discount. |

---

## 🎨 Design System & 90s Cartoon Noir Aesthetic

Syndicate Suits follows a strict design aesthetic rooted in 1990s animated mobster comic art:

- **Borders & Line Art**: 3px solid ink outlines (`border-3 border-black`) providing punchy graphic novel silhouettes.
- **Shadows**: Hard, cel-shaded offset shadows (`shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]`) with zero fuzzy blur.
- **Color Palette**:
  - **Mafia Crimson**: `#8B0000` / `#DC2626`
  - **Speakeasy Gold**: `#D4AF37` / `#F59E0B`
  - **Charcoal Black**: `#0B0B0A` / `#121214`
  - **Parchment Ivory**: `#E9DFC9` / `#EDE6D6`
  - **Midnight Navy**: `#0F172A`
- **Halftone & Texture**: Subtly integrated retro halftone screens and kraft-paper tactile overlays.
- **Typography**: Editorial display fonts (*Oswald*, *Cinzel*, *Cormorant Garamond*) paired with crisp body typography (*Inter*, *JetBrains Mono*).

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).

---

<p align="center">
  <b>SYNDICATE SUITS ATELIER</b> • 444 MULBERRY ST, LITTLE ITALY • EST. 1928<br>
  <i>"Look the part, boss."</i>
</p>
