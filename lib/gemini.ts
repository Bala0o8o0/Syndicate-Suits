import { executeToniTool } from "./toni-tools";
import { SUITS, SYNDICATE_DISCOUNTS } from "./suits-data";
import { SuitCardData } from "./toni-store";

export interface ToniToolCall {
  name: string;
  args: Record<string, unknown>;
}

export interface ToniAIResponse {
  text: string;
  suitCard?: SuitCardData;
  toolCall?: ToniToolCall;
  provider?: "openrouter" | "gemini" | "local" | "stream";
  model?: string;
}

export const SUIT_CARD_DETAILS: Record<string, SuitCardData> = {
  "the-don": {
    title: "The Don – Classic Black",
    traits: "POWER  /  AUTHORITY  /  TIMELESS",
    description:
      "The Don is the foundation of the syndicate. A classic black double-breasted suit in Italian Super-180s wool, tailored for those who lead, not follow. Clean lines, sharp structure, and unmatched presence.",
    bullets: [
      "Italian Super-180s wool blend",
      "Double-breasted razor peak lapels",
      "Level III-A Kevlar chest core",
      "Ruby red silk lining & matching trousers",
    ],
    statement: "It's not just a suit. It's a statement.",
    suitId: "the-don",
    image: "/images/suits/torn-frame/the-don.png",
    actionPills: [
      { label: "View The Don", actionText: "View The Don", icon: "suit" },
      { label: "See All Suits", actionText: "See All Suits", icon: "all" },
      { label: "Compare Fits", actionText: "Compare Fits", icon: "compare" },
    ],
  },
  "the-boss": {
    title: "The Boss – Sovereign Navy",
    traits: "EXECUTIVE  /  COMMAND  /  SOVEREIGN",
    description:
      "Tailored for the kingpin who commands whole empires with a signature. A razor-fitted three-piece suit featuring a tailored double-breasted waistcoat, vintage gold watch chain loop, and silent document pockets.",
    bullets: [
      "Midnight navy Super-160s wool",
      "3-piece double-breasted vest",
      "Vintage gold watch chain loop",
      "Silent inner document pockets",
    ],
    statement: "Power doesn't whisper. It commands.",
    suitId: "the-boss",
    image: "/images/suits/torn-frame/the-boss.png",
    actionPills: [
      { label: "View The Boss", actionText: "View The Boss", icon: "suit" },
      { label: "See All Suits", actionText: "See All Suits", icon: "all" },
      { label: "Compare Fits", actionText: "Compare Fits", icon: "compare" },
    ],
  },
  "the-capo": {
    title: "The Capo – Como Charcoal",
    traits: "FEARLESS  /  STREET-PROVEN  /  INDESTRUCTIBLE",
    description:
      "Built for the frontline lieutenant who commands the streets and enforces discipline. Indestructible 450g Como charcoal worsted wool with wide garrison peak lapels and dual holster anchors.",
    bullets: [
      "450g Como charcoal worsted wool",
      "Wide garrison peak lapels",
      "Dual counter-balanced holster loops",
      "Level III Tactical ballistic weave",
    ],
    statement: "When you walk in, the room goes silent.",
    suitId: "the-capo",
    image: "/images/suits/torn-frame/the-capo.png",
    actionPills: [
      { label: "View The Capo", actionText: "View The Capo", icon: "suit" },
      { label: "See All Suits", actionText: "See All Suits", icon: "all" },
      { label: "Compare Fits", actionText: "Compare Fits", icon: "compare" },
    ],
  },
  "the-consigliere": {
    title: "The Consigliere – Sicilian Cream Linen",
    traits: "STRATEGIC  /  DIPLOMATIC  /  REFINED",
    description:
      "For the mind behind the throne. Hand-woven Sicilian cream chalk-stripe flax linen with Neapolitan spalla camicia shoulders, reinforced ledger pockets, and breathable micro-Kevlar.",
    bullets: [
      "Sicilian cream chalk-stripe linen",
      "Neapolitan soft shoulder drape",
      "Reinforced pen & ledger pockets",
      "Heat-dissipating micro-Kevlar mesh",
    ],
    statement: "The mind behind the throne.",
    suitId: "the-consigliere",
    image: "/images/suits/torn-frame/the-consigliere.png",
    actionPills: [
      { label: "View The Consigliere", actionText: "View The Consigliere", icon: "suit" },
      { label: "See All Suits", actionText: "See All Suits", icon: "all" },
      { label: "Compare Fits", actionText: "Compare Fits", icon: "compare" },
    ],
  },
  "the-enforcer": {
    title: "The Enforcer – Royale Burgundy Velvet",
    traits: "DANGEROUS  /  SPEAKEASY  /  HEAVY-DUTY",
    description:
      "Dangerous nocturnal elegance for high-stakes speakeasy galas. Heavy 500g Royale Burgundy French cotton velvet with satin-faced black peak lapels and multi-hit Kevlar chest inserts.",
    bullets: [
      "500g Royale Burgundy French velvet",
      "Satin-faced black peak lapels",
      "Multi-hit Level III-A Kevlar core",
      "Concealed dual hip draw slits",
    ],
    statement: "Built to walk through fire.",
    suitId: "the-enforcer",
    image: "/images/suits/torn-frame/the-enforcer.png",
    actionPills: [
      { label: "View The Enforcer", actionText: "View The Enforcer", icon: "suit" },
      { label: "See All Suits", actionText: "See All Suits", icon: "all" },
      { label: "Compare Fits", actionText: "Compare Fits", icon: "compare" },
    ],
  },
  "the-underboss": {
    title: "The Underboss – Covert Olive",
    traits: "TACTICAL  /  STEALTH  /  UNYIELDING",
    description:
      "For the second-in-command who moves in silence. Tactical covert olive merino wool engineered with Level IV Stealth ceramic-aramid composite armor and acoustic noise-dampening lining.",
    bullets: [
      "Covert olive water-repellent wool",
      "Level IV Stealth ceramic-aramid core",
      "Acoustic zero-rustle silent lining",
      "360-degree high-mobility gussets",
    ],
    statement: "Next in line. Ready for the throne.",
    suitId: "the-underboss",
    image: "/images/suits/torn-frame/the-underboss.png",
    actionPills: [
      { label: "View The Underboss", actionText: "View The Underboss", icon: "suit" },
      { label: "See All Suits", actionText: "See All Suits", icon: "all" },
      { label: "Compare Fits", actionText: "Compare Fits", icon: "compare" },
    ],
  },
  "the-wildcard": {
    title: "The Wildcard – Royal Cobalt Blue",
    traits: "UNPREDICTABLE  /  BOLD  /  HIGH-ROLLER",
    description:
      "Crafted for high-rollers who own the casino floor. Luminous royal cobalt blue Super-170s wool with silver-thread chalk pinstripes, solid brass dice buttons, and hidden chip pockets.",
    bullets: [
      "Royal cobalt blue Super-170s wool",
      "Silver-thread chalk pinstripes",
      "Custom 24k brass dice cuff buttons",
      "Hidden casino chip & flask pockets",
    ],
    statement: "Play by your own rules.",
    suitId: "the-wildcard",
    image: "/images/suits/torn-frame/the-wildcard.png",
    actionPills: [
      { label: "View The Wildcard", actionText: "View The Wildcard", icon: "suit" },
      { label: "See All Suits", actionText: "See All Suits", icon: "all" },
      { label: "Compare Fits", actionText: "Compare Fits", icon: "compare" },
    ],
  },
};

export async function processToniMessageStream(
  userText: string,
  history: Array<{ role: "user" | "model"; parts: string }> = [],
  onChunk?: (chunk: string, fullText: string, toolCall?: ToniToolCall) => void
): Promise<ToniAIResponse> {
  let accumulatedText = "";
  let toolCallObj: ToniToolCall | undefined = undefined;

  if (typeof window !== "undefined") {
    try {
      const openRouterKey = window.localStorage.getItem("toni_openrouter_api_key") || "";
      const openRouterModel = window.localStorage.getItem("toni_openrouter_model") || "";

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history,
          openRouterKey: openRouterKey || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "",
          openRouterModel: openRouterModel || process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-ultra-550b-a55b:free",
          stream: true,
        }),
      });

      if (res.ok && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            try {
              const parsed = JSON.parse(trimmed);
              if (parsed.type === "meta") {
                if (parsed.toolCall) {
                  const tc = parsed.toolCall as ToniToolCall;
                  toolCallObj = tc;
                  executeToniTool(tc.name, tc.args);
                }
              } else if (parsed.type === "chunk") {
                const newText = parsed.text || "";
                accumulatedText += newText;
                onChunk?.(newText, accumulatedText, toolCallObj);
              }
            } catch {
              // Plain text fallback if non-JSON line
              accumulatedText += trimmed;
              onChunk?.(trimmed, accumulatedText, toolCallObj);
            }
          }
        }

        if (accumulatedText.trim().length > 0) {
          let matchedCard: SuitCardData | undefined;
          for (const [sId, cData] of Object.entries(SUIT_CARD_DETAILS)) {
            const suitNameWithSpace = sId.replace(/-/g, " ");
            if (
              accumulatedText.toLowerCase().includes(sId) ||
              accumulatedText.toLowerCase().includes(suitNameWithSpace) ||
              accumulatedText.toLowerCase().includes(cData.title.toLowerCase()) ||
              (toolCallObj?.args?.suitId === sId)
            ) {
              matchedCard = cData;
              break;
            }
          }
          return {
            text: accumulatedText.trim(),
            suitCard: matchedCard,
            toolCall: toolCallObj,
            provider: "stream",
          };
        }
      }
    } catch (e) {
      console.warn("Client chat stream exception, falling back to local synthesizer:", e);
    }
  }

  // Fallback to processToniMessage if streaming request fails
  return processToniMessage(userText, history);
}

export async function processToniMessage(
  userText: string,
  history: Array<{ role: "user" | "model"; parts: string }> = []
): Promise<ToniAIResponse> {
  // 1. Try server-side API route
  if (typeof window !== "undefined") {
    try {
      const openRouterKey = window.localStorage.getItem("toni_openrouter_api_key") || "";
      const openRouterModel = window.localStorage.getItem("toni_openrouter_model") || "";

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history,
          openRouterKey: openRouterKey || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "",
          openRouterModel: openRouterModel || process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-ultra-550b-a55b:free",
          stream: false,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.text && !data.error) {
          if (data.toolCall) {
            executeToniTool(data.toolCall.name, data.toolCall.args);
          }
          let matchedCard: SuitCardData | undefined;
          for (const [sId, cData] of Object.entries(SUIT_CARD_DETAILS)) {
            if (
              data.text.toLowerCase().includes(sId) ||
              data.text.toLowerCase().includes(cData.title.toLowerCase()) ||
              (data.toolCall?.args?.suitId === sId)
            ) {
              matchedCard = cData;
              break;
            }
          }
          return {
            text: data.text,
            suitCard: data.suitCard || matchedCard,
            toolCall: data.toolCall,
            provider: data.provider || "local",
            model: data.model,
          };
        }
      }
    } catch (e) {
      console.warn("Client chat fetch exception, falling back to local synthesizer:", e);
    }
  }

  // 2. Client-side local fallback synthesizer with instant response
  const lower = userText.toLowerCase().trim();
  const hasWord = (...words: string[]) =>
    words.some((w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(lower));
  const hasPhrase = (...phrases: string[]) =>
    phrases.some((p) => lower.includes(p.toLowerCase()));

  // 0. CLEAR / PURGE BRIEFCASE ACTION
  const isClearIntent =
    (lower.includes("empty") || lower.includes("clear") || lower.includes("purge") || lower.includes("wipe")) &&
    (lower.includes("cart") || lower.includes("briefcase") || lower.includes("ledger") || lower.includes("all") || lower.includes("everything"));

  if (isClearIntent) {
    executeToniTool("clear_briefcase", {});
    return {
      text: "All commissions purged from your Black Ledger briefcase, boss. Completely wiped clean.",
      toolCall: { name: "clear_briefcase", args: {} },
      provider: "local",
    };
  }

  // 1. REMOVE FROM BRIEFCASE ACTION (CHECKED BEFORE ANY ADD INTENT!)
  const isRemovalWord =
    lower.includes("remove") ||
    lower.includes("delete") ||
    lower.includes("drop") ||
    (lower.includes("take") && lower.includes("out")) ||
    (lower.includes("take") && lower.includes("off")) ||
    lower.includes("discard") ||
    lower.includes("get rid of") ||
    lower.includes("cancel item") ||
    lower.includes("cancel suit");

  if (isRemovalWord) {
    for (const suit of SUITS) {
      const shortName = suit.name.toLowerCase().replace(/^the\s+/, "");
      if (lower.includes(suit.id) || lower.includes(suit.name.toLowerCase()) || hasWord(shortName)) {
        executeToniTool("remove_from_briefcase", { suitId: suit.id });
        return {
          text: `Removed ${suit.name} from your Black Ledger briefcase, boss. No paper trail left behind.`,
          toolCall: { name: "remove_from_briefcase", args: { suitId: suit.id } },
          provider: "local",
        };
      }
    }

    executeToniTool("remove_from_briefcase", {});
    return {
      text: "Removed the commission from your Black Ledger briefcase, boss. No paper trail left behind.",
      toolCall: { name: "remove_from_briefcase", args: {} },
      provider: "local",
    };
  }

  // 2. SHOP NAVIGATION ACTION
  if (
    hasPhrase(
      "take me to the shop", "take me to shop", "go to shop", "open the shop",
      "open shop", "shop section", "the shop", "show the shop", "show me the shop",
      "visit shop", "the vault", "the collection", "browse the collection", "to the shop"
    ) ||
    (hasWord("shop", "store", "vault") && hasWord("take", "go", "open", "show", "visit", "lead"))
  ) {
    executeToniTool("navigate_to_shop", {});
    return {
      text: "Right this way, boss! Opening the bespoke shop vault for you right now. Take a look at all 7 cuts in The Syndicate Seven!",
      toolCall: { name: "navigate_to_shop", args: {} },
      provider: "local",
    };
  }

  // 3. HOME NAVIGATION ACTION
  if (
    hasPhrase("take me home", "go to home", "back to home", "homepage", "front entrance") ||
    (hasWord("home", "front", "entrance") && hasWord("take", "go", "back"))
  ) {
    executeToniTool("navigate_to_home", {});
    return {
      text: "Taking you back to the front entrance of the atelier, boss!",
      toolCall: { name: "navigate_to_home", args: {} },
      provider: "local",
    };
  }

  // 4. SECTION SCROLLING ACTIONS
  if (hasPhrase("brand story", "heritage", "who founded", "history section")) {
    executeToniTool("scroll_to_section", { sectionId: "brand-story" });
    return {
      text: "Right away, boss! Showing you our 1928 Little Italy heritage and brand chronicle right now.",
      toolCall: { name: "scroll_to_section", args: { sectionId: "brand-story" } },
      provider: "local",
    };
  }
  if (hasPhrase("syndicate code", "the code", "four pillars", "4 pillars")) {
    executeToniTool("scroll_to_section", { sectionId: "syndicate-code" });
    return {
      text: "Displaying The Syndicate Code—our four Kraft paper pillars of Cut, Como Fabrics, Concealed Holsters, and Silent Finishes!",
      toolCall: { name: "scroll_to_section", args: { sectionId: "syndicate-code" } },
      provider: "local",
    };
  }
  if (hasPhrase("character selector", "who are you in the syndicate", "archetypes")) {
    executeToniTool("scroll_to_section", { sectionId: "character-selector" });
    return {
      text: "Opening the Syndicate Character Selector—which archetype are you stepping into today, boss?",
      toolCall: { name: "scroll_to_section", args: { sectionId: "character-selector" } },
      provider: "local",
    };
  }
  if (hasPhrase("carousel", "syndicate seven", "3d carousel", "all seven cuts")) {
    executeToniTool("scroll_to_section", { sectionId: "syndicate-seven" });
    return {
      text: "Rotating The Syndicate Seven spatial showcase on screen for you now, boss!",
      toolCall: { name: "scroll_to_section", args: { sectionId: "syndicate-seven" } },
      provider: "local",
    };
  }
  if (hasPhrase("reviews", "testimonials", "what clients say", "falcone")) {
    executeToniTool("scroll_to_section", { sectionId: "testimonials" });
    return {
      text: "Here are the words from our underworld clients—from Don Carmine Falcone to Frankie Two-Times!",
      toolCall: { name: "scroll_to_section", args: { sectionId: "testimonials" } },
      provider: "local",
    };
  }
  if (hasPhrase("open briefcase", "open cart", "open the cart", "show my bag", "show briefcase", "view ledger", "checkout")) {
    executeToniTool("open_briefcase", {});
    return {
      text: "Opening the Black Ledger briefcase for you now, boss. Everything strictly confidential.",
      toolCall: { name: "open_briefcase", args: {} },
      provider: "local",
    };
  }
  if (hasPhrase("close briefcase", "close cart", "hide ledger", "hide cart")) {
    executeToniTool("close_briefcase", {});
    return {
      text: "Briefcase secured and closed, boss.",
      toolCall: { name: "close_briefcase", args: {} },
      provider: "local",
    };
  }

  // 5. TOTAL SUIT COUNT & FULL LINEUP (EXACTLY 7 SUITS)
  if (
    hasPhrase(
      "how many suit", "how many suits", "how much suit", "how much suits",
      "total suit", "total suits", "how many cut", "how many cuts",
      "number of suit", "number of suits", "all the suit", "all the suits",
      "all suit", "all suits", "how many in the collection", "collection size",
      "how many pieces", "tell me all suits", "list all suits"
    ) ||
    ((hasWord("suit", "suits") || hasWord("cut", "cuts")) && (hasWord("how", "many", "total", "count") || hasPhrase("how much")))
  ) {
    return {
      text: "Fuggedaboutit! In our atelier, there are exactly 7 bespoke cuts in the entire collection—known strictly as The Syndicate Seven! 1. The Don (₹3,45,000, Onyx Black), 2. The Boss (₹3,10,000, Midnight Navy), 3. The Capo (₹2,95,000, Como Charcoal), 4. The Consigliere (₹2,80,000, Sicilian Cream), 5. The Wildcard (₹2,75,000, Royal Cobalt), 6. The Enforcer (₹2,65,000, Royale Burgundy), and 7. The Underboss (₹2,50,000, Tactical Olive). Every single cut includes matching tailored trousers and Level III-A Kevlar armor, capisce?",
      provider: "local",
    };
  }

  // 5.5 COMPARE FITS ACTION
  if (hasPhrase("compare fit", "compare fits", "compare suit", "compare suits", "comparison", "fits comparison")) {
    return {
      text: "Here is how the top syndicate cuts stack up: The Don commands pure authority in Onyx Black, The Boss runs executive boardrooms in Sovereign Navy, and The Capo enforces frontline discipline in Como Charcoal wool. Tell Toni which room you're stepping into, and I'll get you fitted.",
      suitCard: {
        title: "The Syndicate Fits – Head to Head",
        traits: "AUTHORITY  /  COMMAND  /  PRESENCE",
        description:
          "Every cut in the syndicate is built for a distinct underworld purpose. Choose your armor according to your discipline.",
        bullets: [
          "The Don: Peak lapels, double-breasted, onyx power",
          "The Boss: 3-piece sovereign navy, mahogany boardroom",
          "The Capo: 450g Como charcoal wool, garrison peaks",
          "The Consigliere: Sicilian cream linen, breathable Kevlar",
        ],
        statement: "Dress for the verdict you want.",
        actionPills: [
          { label: "View The Don", actionText: "View The Don", icon: "suit" },
          { label: "View The Boss", actionText: "View The Boss", icon: "suit" },
          { label: "See All Suits", actionText: "See All Suits", icon: "all" },
        ],
      },
      provider: "local",
    };
  }

  // 6. SUIT ADD TO CART & DETAILS (ONLY IF NOT REMOVAL)
  for (const suit of SUITS) {
    const suitNameMatch = suit.name.toLowerCase();
    const shortName = suitNameMatch.replace(/^the\s+/, "");
    if (lower.includes(suit.id) || lower.includes(suitNameMatch) || hasWord(shortName)) {
      if (hasWord("cart", "buy", "add", "briefcase", "order", "purchase")) {
        executeToniTool("add_to_briefcase", { suitId: suit.id });
        return {
          text: `Added ${suit.name} (${suit.priceFormatted}) to your Black Ledger briefcase! Hand-rolled ${suit.fabrics[0].name} with matching trousers and ${suit.bulletproofRating} protection.`,
          toolCall: { name: "add_to_briefcase", args: { suitId: suit.id } },
          provider: "local",
        };
      }
      if (hasWord("custom", "fit", "fabric", "lapel", "workbench", "studio")) {
        executeToniTool("customize_suit", { suitId: suit.id });
        return {
          text: `Opening the bespoke tailoring specifications for ${suit.name}! You can review fabrics, lapel silhouettes, and tailor specs.`,
          toolCall: { name: "customize_suit", args: { suitId: suit.id } },
          provider: "local",
        };
      }
      executeToniTool("highlight_suit", { suitId: suit.id });
      const card = SUIT_CARD_DETAILS[suit.id];
      return {
        text: card
          ? `${card.description} ${card.statement}`
          : `${suit.name} (${suit.priceFormatted}) — ${suit.tagline} ${suit.toniQuote}`,
        suitCard: card,
        toolCall: { name: "highlight_suit", args: { suitId: suit.id } },
        provider: "local",
      };
    }
  }

  // 7. IDENTITY & NAME
  if (
    hasPhrase("what is your name", "what's your name", "whats your name", "what is you name", "who are you", "who is toni", "your name", "tell me your name", "what do they call you") ||
    (hasWord("name") && hasWord("your", "you", "whats", "what"))
  ) {
    return {
      text: "I'm Toni Lee—Master Tailor & Consigliere to the Five Families for over 30 years. I dress the bosses in this town and engineer bespoke bulletproof suits in pure syndicate gold.",
      provider: "local",
    };
  }

  // 8. COLORS & COLOR PALETTE
  if (
    hasWord("color", "colors", "colour", "colours", "shade", "shades", "palette") ||
    hasPhrase("all color", "all colors", "what color", "what colors", "available color", "available colors", "which color", "which colors")
  ) {
    return {
      text: "Our bespoke palette features Classic Onyx Black (The Don), Midnight Navy (The Boss), Como Charcoal (The Capo), Sicilian Cream (The Consigliere), Royale Burgundy Velvet (The Enforcer), Covert Olive (The Underboss), and Royal Cobalt Blue (The Wildcard). You can also customize custom silk linings in Ruby Red, Speakeasy Gold, and Obsidian.",
      toolCall: { name: "browse_collection", args: { occasion: "" } },
      provider: "local",
    };
  }

  // 9. SHOES & FOOTWEAR
  if (hasWord("shoe", "shoes", "footwear", "oxford", "oxfords", "brogue", "brogues", "boot", "boots", "loafers", "leather") || hasPhrase("is shoes", "are shoes", "sell shoes", "shoes available")) {
    return {
      text: "Yes, boss! We offer handcrafted Italian calfskin oxfords and burnished brogues with silent rubberized shock soles—engineered for supreme boardroom presence and completely silent footsteps.",
      provider: "local",
    };
  }

  // 10. TROUSERS & PANTS
  if (hasWord("trouser", "trousers", "pant", "pants", "slack", "slacks", "bottom", "bottoms") || hasPhrase("is trousers", "are trousers", "pants available", "trousers available")) {
    return {
      text: "Yes, boss! Every single Syndicate suit order includes matching bespoke tailored trousers (pants) crafted from the exact same Super-180s wool, Italian velvet, or Sicilian linen. They feature an anti-crease lounge cut, reinforced holster waistband, and silent concealed pocket linings.",
      toolCall: { name: "customize_suit", args: { suitId: "the-don" } },
      provider: "local",
    };
  }

  // 11. FABRICS & MATERIALS
  if (hasWord("fabric", "fabrics", "material", "materials", "wool", "velvet", "linen", "pinstripe", "chalkstripe", "silk", "houndstooth")) {
    return {
      text: "We craft our suits using authentic Italian Super-180s worsted wool, Como charcoal worsted, Royale French velvet, Sicilian chalk-stripe linen, and bulletproof micro-Kevlar blends. Every weave is wrinkle-resistant and bullet-shielded.",
      toolCall: { name: "customize_suit", args: { suitId: "the-don" } },
      provider: "local",
    };
  }

  // 12. WHAT IS INCLUDED
  if (hasPhrase("what is included", "what comes with", "what do i get", "full set", "full ensemble", "just the jacket", "only jacket", "separate pieces")) {
    return {
      text: "Every order is a complete bespoke ensemble: the tailored ballistic jacket with Level III-A Kevlar core, matching bespoke trousers, and discreet dispatch inside our combination-locked aluminum briefcase. Matching waistcoats and silk shirts can also be configured.",
      toolCall: { name: "customize_suit", args: { suitId: "the-don" } },
      provider: "local",
    };
  }

  // 13. DISCOUNTS
  if (hasWord("discount", "discounts", "coupon", "promo", "code", "deal", "deals", "save", "offer", "voucher") || hasPhrase("corleone", "five families")) {
    let code = "TONI_SPECIAL";
    if (hasPhrase("godfather", "corleone", "35")) code = "DON_CORLEONE";
    else if (hasPhrase("five families", "30")) code = "FIVE_FAMILIES";
    executeToniTool("apply_family_discount", { code });
    return {
      text: `Applied passcode ${code} for ${SYNDICATE_DISCOUNTS[code]?.percent || 25}% off your Black Ledger total!`,
      toolCall: { name: "apply_family_discount", args: { code } },
      provider: "local",
    };
  }

  // 14. BULLETPROOF / KEVLAR
  if (hasWord("bulletproof", "kevlar", "bullet", "bullets", "armor", "ballistic", "shoot", "gun", "guns", "9mm", "magnum", "safety", "protection")) {
    return {
      text: "Every Syndicate suit is reinforced with certified Level III-A ballistic Kevlar chest cores. It stops 9mm, .44 Magnum, and back-alley blades with zero outward bulge, keeping your silhouette razor-sharp.",
      provider: "local",
    };
  }

  // DEFAULT
  return {
    text: "Fuggedaboutit! When it comes to that, Toni Lee's rule is simple: handcrafted Italian Super-180s wool, matching tailored trousers, and certified Level III-A Kevlar make you untouchable anywhere in this city.",
    toolCall: { name: "browse_collection", args: { occasion: "" } },
    provider: "local",
  };
}