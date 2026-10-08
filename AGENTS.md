# 🕴️ SYNDICATE SUITS — MASTER SPECIFICATION (`AGENTS.md`)

This document is the authoritative architecture, design system, and technical specification for **Syndicate Suits**, a 90s cartoon/comic noir bespoke mafia tailoring experience featuring **Toni Lee**, the real-time 3D AI Master Tailor & Consigliere.

---

## 🎯 1. Project Overview & Concept

- **Application Name**: Syndicate Suits
- **AI Character**: **Toni Lee** (Master Tailor & Consigliere)
- **Theme & Aesthetic**: 1990s Cartoonish Noir / Gangster / Mafia Comic (inspired by _Batman: The Animated Series_, _Spider-Man 90s Kingpin Noir_, _Dick Tracy_ cartoon styling, bold ink borders, halftone textures, deep crimson/gold/charcoal palette).
- **Core Experience**: A bespoke luxury e-commerce tailoring atelier where users interact with Toni Lee—a real-time 3D animated mobster tailor who talks, listens via speech-to-text, synchronizes his mouth with Web Audio lip-sync, recommends mafia cuts, customizes fabrics/lapels in real-time, highlights items, and manages the user's "Black Ledger" briefcase.
- **100% Free Architecture**: Zero Runway credit dependencies. Powered by Three.js / React Three Fiber for 3D character rendering, Web Speech API / Edge Neural TTS for voice, and Google Gemini Flash (Free Tier) for natural intelligence and dynamic tool calling.

---

## 🎨 2. Design System & 90s Cartoon Noir Aesthetic

| Element                | Style Specification                                                                                                                                                        |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Color Palette**      | Mafia Crimson (`#8B0000` / `#DC2626`), Speakeasy Gold (`#D4AF37` / `#F59E0B`), Charcoal Black (`#121214` / `#1A1A1E`), Midnight Navy (`#0F172A`), Smoked Brass (`#78350F`) |
| **Borders & Shadows**  | 3px bold black ink outlines (`border-3 border-black`), hard cel-shaded drop shadows (`shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]`), comic-style offset badges                  |
| **Textures & Accents** | Retro halftone dot patterns, pinstripe canvas overlays, comic burst callouts (_"POW!"_, _"BESPOKE"_, _"BULLETPROOF"_), smoking cigar & fedora iconography                  |
| **Typography**         | Dramatic vintage Art-Deco & 90s comic display headers with condensed heavy grotesk subtitles                                                                               |

---

## 🏗️ 3. Technology Stack

- **Framework**: Next.js 16 (App Router, Server Actions) + React 19
- **Styling**: Tailwind CSS v4, Lucide React, Custom 90s Comic CSS utilities
- **3D Avatar Engine**: Three.js + React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
  - Supports custom `.glb` models (e.g. from Tripo3D, Ready Player Me, Meshy) stored in `public/models/`.
  - Driven by morph targets / blendshapes (`jawOpen`, `viseme_aa`, `viseme_O`, `viseme_E`) or rigged jaw bone rotation.
- **Voice & Audio Pipeline**:
  - Input: Web Speech Recognition API (`webkitSpeechRecognition`)
  - Output: Microsoft Edge Neural TTS (`msedge-tts` with `en-US-ChristopherNeural` mobster voice) & browser SpeechSynthesis
  - Lip-Sync: Web Audio API `AnalyserNode` frequency analyzer (`AudioLipSyncAnalyser`)
- **AI Brain**: Google Gemini 2.0 / 1.5 Flash (Free Tier via Google AI Studio) with Structured Function/Tool Calling & offline fallback engine
- **State Management**: Zustand (`useToniStore`, `useBriefcaseStore`) for live suit customizer, briefcase cart, and Toni Lee tool executions

---

## 🎙️ 4. Toni Lee — Persona & Capabilities

### Persona

Fast-talking, witty, charismatic 1990s animated mafia tailor. Respectful to bosses, merciless on bad fashion, fiercely proud of Syndicate craftsmanship.

> _"Fuggedaboutit! Look at you walking around in off-the-rack like a two-bit street punk. I'm Toni Lee—I dress the bosses in this town. Tell Toni what kind of heat you're stepping into, and I'll get you fitted in pure syndicate gold."_

### Tool & Action Engine

Toni Lee dynamically triggers client & server actions through function calling:

1. `browse_collection`: Filter the suit catalog by occasion (_"Heist"_, _"Speakeasy Gala"_, _"Court Appearance"_, _"Godfather's Wedding"_).
2. `customize_suit`: Dynamically change fabric (Pinstripe, Crimson Velvet, Sicilian Linen, Houndstooth), lapel (Peak, Notch, Shawl), or accents in the live fitting room.
3. `highlight_suit`: Smoothly scroll to and pulse a comic focus spotlight on any suit card.
4. `add_to_briefcase`: Add customized bespoke pieces into the user's discreet briefcase cart.
5. `apply_family_discount`: Apply secret syndicate discount codes (_"TONI_SPECIAL"_, _"DON_CORLEONE"_, _"FIVE_FAMILIES"_).
6. `inspect_suit_details`: Open a 90s comic book spec panel detailing bulletproof lining, concealed holster pockets, and tailor notes.

---

## 📁 5. Project Directory Structure

```text
app/
  api/
    chat/route.ts          # Gemini AI API route with tool calling & mobster persona
    tts/route.ts           # Microsoft Edge Neural TTS audio streaming endpoint
  layout.tsx               # 90s Comic Noir theme provider & sound effects
  page.tsx                 # Syndicate Suits home (Hero, Collection, Fitting Room, Ledger)
  customizer/page.tsx      # Full-screen 3D Bespoke Tailoring Studio
  briefcase/page.tsx       # Discreet Cart & Checkout Ledger
components/
  avatar/                  # Toni Lee 3D WebGL Canvas, Lip-sync & Mobster Avatar
    toni-avatar-canvas.tsx # Canvas controller with 3D and Cinematic Video modes
    toni-3d-model.tsx      # 3D character mesh / GLB loader with lip sync & fedora
    toni-video-avatar.tsx  # Cinematic AI motion video layer with audio waveform
    toni-speech-controller.tsx # Web Speech STT/TTS & Web Audio analyser
    toni-assistant-widget.tsx  # Floating Consigliere interactive assistant dock
  catalog/                 # Suit cards, filter pills, halftone badges
    suit-card.tsx
    suit-grid.tsx
    suit-filter.tsx
  customizer/              # Interactive Fabric & Lapel customizer
    fitting-room-canvas.tsx
    fabric-selector.tsx
    lapel-selector.tsx
  briefcase/               # Black Book Cart & Syndicate checkout
    briefcase-modal.tsx
    ledger-summary.tsx
  ui/                      # 90s Comic styled buttons, cards, badges
lib/
  gemini.ts                # Free Gemini AI client with tool calling & smart fallback
  suits-data.ts            # Bespoke suit catalog & customization options
  toni-tools.ts            # Function calling tool definitions & handlers
  audio-analyser.ts        # Web Audio API frequency processor for real-time lip-sync
public/
  models/                  # Custom 3D character GLB files (e.g. Tripo3D toni-gangster.glb)
  images/                  # Comic noir graphic assets & suit photography
```

---

## 🚀 6. Verification & Quality Gates

- **Zero Paid APIs**: Runs completely free with local WebGL, Web Speech, Edge Neural TTS, and free Google Gemini API tier.
- **Responsive 90s Noir UI**: Flawless comic styling on desktop, tablet, and mobile.
- **Instant Voice & Lip Sync**: Low latency microphone input and synchronized character mouth/jaw animation.

---

## 🚫 UI Structure Rules & Anti-Cyber Noir Directives

- **Single Specification File**: `AGENTS.md` is the sole authoritative standard file for all AI coding agents working on this codebase. Do not create separate duplicate `.md` instruction files.
- **No Absolute Positioning Blocks or Badge Layouts for Category Titles**: All section titles, category markers, and headers must follow natural editorial page flow and typography. Do not float badge cards or absolute-positioned pill tags over content or media.
- **Never Generate Small Rectangular Headers with Solid Indicator Dots**: Do NOT render small floating rectangular pointer cards/tags containing solid indicator dots (such as `w-2 h-2 rounded-full animate-pulse` or `animate-ping`).
- **Zero Reproduction of the "Syndicate Suits" Tag Structure**: Prohibit any recreation of the rectangular tag with indicator dot (like the top hero tag) anywhere in the application.
- **No Numbered Section Prefixes**: Do NOT use numbered section prefixes (such as "01 •", "02 •", "03 •", "04 •", "05 •") for section headers or category titles. Use clean editorial titles without numbered chapter/section counts.
- **No "CUT XX" or "Level II / III-A" Badges on Product Cards**: Never display "CUT 01", "CUT 02", "Level II-", "Level III-A", or ballistic armor rating text on product cards across the shop or catalog. Keep cards clean, elegant, and focused on the suit photography, title, character alias, price, and actions.
- **Shop Top Section Must Be a Cartoon-Style Banner**: The first section of the shop page must feature a clean, eye-catching 1990s cartoon / comic noir banner with the artwork as the card background, without clutter, complex sub-grids, buttons, Toni Lee descriptions, or running ticker texts.
- **NO Running Ticker / Marquee Text**: Prohibit running marquee ticker text strips (`animate-marquee`) at the top of the shop page or section headers. Keep the layout neat, clean, and stable.

---

## ⛔ STRICT UI & TEXT BLACKLIST FILTER ("NO TO USE")

Any AI agent generating UI components, page layouts, copy, or tool outputs MUST strictly reject the banned terms and patterns below:

### 1. Banned Vocabulary & Required Noir Replacements

| ❌ BANNED WORD / PHRASE (DO NOT USE) | ✅ MANDATORY 1990s NOIR MOBSTER ALTERNATIVE |
| :----------------------------------- | :------------------------------------------- |
| `archive` / `archives` / `//archive` | `The Collection`, `The Atelier`, `The Bespoke Vault` |
| `dossier` / `dossiers` / `atelier dossier` | `Atelier Specifications`, `Bespoke Cut Details`, `Case File` |
| `protocol` / `protocols` / `shadow protocol` | `Syndicate Code`, `Family Creed`, `Discipline`, `Covert Silhouette` |
| `telemetry` / `telemetrics`          | `Ledger`, `Atelier Records`, `Craftsmanship Metrics` |
| `matrix` / `matrix grid`             | `Atelier Grid`, `Bespoke Cut Selection`, `The Lineup` |
| `terminal` / `console` / `HUD`       | `Dispatch`, `Black Book`, `Ledger`, `Underworld Wire` |
| `sys` / `system` / `status ok`       | `The Family`, `The Atelier`, `Sit-Down Approved` |
| `doc-01` / `doc-02` / tech serials   | `Cut`, `Piece`, `Commission`, `Silhouette` |
| `cyber` / `cyberpunk` / `hacker`     | `Noir`, `Mobster`, `Syndicate`, `Underworld` |
| `//` Comment Syntax in UI Labels     | Clean editorial typography (e.g. `OCCASION SELECTION`) |

### 2. Banned UI & Visual Design Patterns

- ❌ **NO `//` Comment Prefixes**: Never output labels like `// FILTER`, `// TONI LEE ADVISORY`, `// ARCHIVE`.
- ❌ **NO Glowing Green Terminal Code**: No matrix-style code rain, green phosphor text, or hacker consoles.
- ❌ **NO Blinking Server Indicator Dots**: No `animate-ping` or `animate-pulse` status dots representing online servers.
- ❌ **NO Fake CSS Pill Cigars**: Never draw crude CSS rounded rectangles for cigars. Use high-detail artwork (`smoking-cigar.jpg`).
- ❌ **NO Armor Mannequins**: Never place robotic or modern tactical armor mannequins in brand stories. Keep visuals rooted in 1990s Little Italy cartoon noir characters.
- ❌ **NO Marquee / Running Tickers**: Keep all banners, headers, and section dividers completely stable and editorial.

