// Authoritative Knowledge Base for Syndicate Suits & Toni Lee AI Concierge

export interface SyndicateSuitSpec {
  id: string;
  number: string;
  name: string;
  color: string;
  rank: string;
  price: number;
  priceFormatted: string;
  bulletproofRating: string;
  fabric: string;
  tagline: string;
}

export const SYNDICATE_KNOWLEDGE_BASE = {
  brandName: "Syndicate Suits",
  aiCharacter: "Toni Lee (Master Tailor & Consigliere to the Five Families for over 30 years)",
  totalSuitCount: 7,
  collectionName: "The Syndicate Seven",
  priceRange: "₹2,50,000 to ₹3,45,000",
  totalVaultValue: "₹20,20,000",
  
  originStory: {
    year: 1928,
    location: "Brooklyn / Little Italy, New York",
    founder: "The Lee Family Atelier",
    heritage: "Three generations of master tailoring for the Five Families and international bosses.",
    philosophy: "Underworld authority engineered through bespoke Italian tailoring and certified ballistic protection.",
  },

  siteMap: {
    home: {
      url: "/",
      sections: [
        { id: "hero", name: "Campaign Hero", description: "Cinematic noir video hero with Toni Lee's atelier introduction." },
        { id: "syndicate-code", name: "The Syndicate Code", description: "Four Kraft paper pillars: 01 Cut & Silhouette, 02 Como Fabrics & Ballistic Weaves, 03 Concealed Holster Architecture, 04 Silent Handcrafted Finishes." },
        { id: "brand-story", name: "Brand Story & Heritage", description: "Historical chronicle photos from 1928, Little Italy sit-downs, and syndicate lineage." },
        { id: "character-selector", name: "Character Selector", description: "Interactive 3D character stack: 'Who are you in the Syndicate?'" },
        { id: "syndicate-seven", name: "The Syndicate Seven Carousel", description: "3D spatial rotating showcase of all seven bespoke cuts." },
        { id: "testimonials", name: "Underworld Client Reviews", description: "Testimonials from Don Carmine Falcone, Frankie Two-Times, Senator Marcus Vance, and Vincent The Viper." },
        { id: "final-cta", name: "Seven Suits. One Syndicate.", description: "Atelier consultation and direct vault access." },
        { id: "black-ledger", name: "The Black Ledger Briefcase", description: "Discreet checkout, secret tribute promo code unlock, and encrypted courier dispatch." },
      ],
    },
    shop: {
      url: "/shop",
      sections: [
        { id: "shop-campaign-hero", name: "Shop Campaign Banner", description: "Cartoon noir editorial atelier banner." },
        { id: "suits-catalog", name: "The Bespoke Vault Catalog", description: "Full 7-suit interactive grid with category tabs, search bar, sort options, and Quick View modals." },
        { id: "bespoke-consultation", name: "Toni Lee Consultation", description: "Private fitting and consigliere advisory banner." },
        { id: "syndicate-newsletter", name: "Syndicate Ledger Dispatch", description: "Discreet underworld courier dispatch newsletter." },
      ],
      filterCategories: ["all", "double-breasted", "three-piece", "velvet-gala", "tactical", "summer-linen"],
    },
    customizer: {
      url: "/shop/[suit-id]",
      description: "Dedicated 3D/2D Bespoke Tailoring Studio allowing custom fabric selection, lapel styling (peak, notch, shawl), ruby silk linings, sizing (38R-52L), and direct addition to the Black Ledger.",
    },
  },

  suits: [
    {
      id: "the-don",
      number: "01",
      name: "The Don",
      color: "Classic Onyx Black",
      rank: "Boss of Bosses (Flagship)",
      price: 345000,
      priceFormatted: "₹3,45,000",
      bulletproofRating: "Level III-A Kevlar",
      fabric: "Super-180s Wool with Ruby Silk Lining",
      tagline: "Uncompromising authority in Italian charcoal chalk-stripe & onyx wool.",
      recommendedFor: "High-stakes sit-downs, city hall summits, godfather weddings.",
    },
    {
      id: "the-boss",
      number: "02",
      name: "The Boss",
      color: "Midnight Navy",
      rank: "Executive Kingpin",
      price: 310000,
      priceFormatted: "₹3,10,000",
      bulletproofRating: "Level II-A Aramid",
      fabric: "3-piece bespoke with waistcoat & gold pocket watch chain",
      tagline: "Sovereign power in midnight navy 3-piece bespoke.",
      recommendedFor: "Federal court appearances, boardroom conclaves, legal dominance.",
    },
    {
      id: "the-capo",
      number: "03",
      name: "The Capo",
      color: "Como Charcoal",
      rank: "District Commander",
      price: 295000,
      priceFormatted: "₹2,95,000",
      bulletproofRating: "Level III Tactical",
      fabric: "450g Como Charcoal Worsted Wool with garrison wide peaks",
      tagline: "Steely resolve in indestructible charcoal houndstooth & worsted wool.",
      recommendedFor: "Territory enforcement, winter night operations, city heists.",
    },
    {
      id: "the-consigliere",
      number: "04",
      name: "The Consigliere",
      color: "Sicilian Cream",
      rank: "The Mastermind",
      price: 280000,
      priceFormatted: "₹2,80,000",
      bulletproofRating: "Level II-A Micro-Kevlar",
      fabric: "Sicilian Cream Chalk-Stripe Linen with Neapolitan shoulder",
      tagline: "Effortless intellect in hand-rolled Sicilian cream linen.",
      recommendedFor: "Mediterranean summer terraces, diplomatic negotiations, high-end galas.",
    },
    {
      id: "the-wildcard",
      number: "05",
      name: "The Wildcard",
      color: "Royal Cobalt Blue",
      rank: "Casino Maverick",
      price: 275000,
      priceFormatted: "₹2,75,000",
      bulletproofRating: "Level II-A Flexible Aramid",
      fabric: "Luminous royal cobalt blue with metallic silver pinstripes & solid brass dice buttons",
      tagline: "High-voltage cobalt pinstripe for big spenders and casino legends.",
      recommendedFor: "High-stakes casinos, speakeasy parties, victory celebrations.",
    },
    {
      id: "the-enforcer",
      number: "06",
      name: "The Enforcer",
      color: "Royale Burgundy Velvet",
      rank: "The Iron Fist",
      price: 265000,
      priceFormatted: "₹2,65,000",
      bulletproofRating: "Level III Tactical",
      fabric: "Royale Burgundy French Velvet with satin black peak lapels",
      tagline: "Intimidating imperial burgundy velvet with razor peak lapels.",
      recommendedFor: "High-roller velvet lounges, intense confrontations, romantic dinner dates.",
    },
    {
      id: "the-underboss",
      number: "07",
      name: "The Underboss",
      color: "Tactical Covert Olive",
      rank: "Shadow General",
      price: 250000,
      priceFormatted: "₹2,50,000",
      bulletproofRating: "Level IV Stealth Ceramic-Aramid",
      fabric: "Covert Olive Wool with acoustic noise-dampening silent lining",
      tagline: "Tactical olive covert wool with stealth matte brass hardware.",
      recommendedFor: "Covert stealth night maneuvers, surveillance, field operations.",
    },
  ],

  inclusions: [
    "Matching bespoke tailored trousers (pants) included standard with every single suit order.",
    "Certified Level III-A to Level IV ballistic Kevlar chest core stopping 9mm and .44 Magnum.",
    "Dual counter-balanced quick-draw concealed shoulder holster loops.",
    "Discreet dispatch inside heavy-duty combination-locked aluminum briefcases.",
    "Lifetime complimentary alterations by Toni Lee's private master tailors.",
  ],

  discounts: {
    DON_CORLEONE: "35% off (The Godfather's Blessing)",
    FIVE_FAMILIES: "30% off (Five Families Truce)",
    TONI_SPECIAL: "25% off (Toni Lee's Personal Cut)",
    GOODFELLA: "20% off (Friends of the Family)",
  },
};

export function buildSystemPromptWithKnowledge(): string {
  return `
You are Toni Lee, the legendary Master Tailor & Consigliere for Syndicate Suits in a 1990s animated cartoon noir mafia universe (think Batman: The Animated Series meets 90s Spider-Man Kingpin noir).

YOUR IDENTITY & VOICE:
- Snappy, charismatic, witty, respectful to bosses, fiercely proud of Syndicate craftsmanship.
- Natural 90s cartoon gangster vernacular: "Fuggedaboutit!", "Capisce?", "Pure syndicate gold", "Level III-A Kevlar", "Sit-down ready", "Made to measure".
- Keep answers punchy, natural, and conversational (2-3 sentences max) because your dialogue is spoken out loud.
- You have encyclopedic knowledge of fashion, tailoring, mafia history, fabrics, bulletproof armor, styling advice, and THIS ENTIRE WEBSITE.
- Answer ANY question the user asks intelligently in character as Toni Lee!

CRITICAL KNOWLEDGE BASE FACTS:
1. TOTAL SUIT COUNT: There are EXACTLY 7 bespoke suits in the entire collection—known strictly as "The Syndicate Seven". NEVER say 6, 8, or any other number!
   - 01: The Don (Onyx Black, Super-180s Wool, ₹3,45,000)
   - 02: The Boss (Midnight Navy 3-Piece, ₹3,10,000)
   - 03: The Capo (Como Charcoal Worsted Wool, ₹2,95,000)
   - 04: The Consigliere (Sicilian Cream Linen, ₹2,80,000)
   - 05: The Wildcard (Royal Cobalt Blue & Silver Pinstripe, ₹2,75,000)
   - 06: The Enforcer (Royale Burgundy Velvet, ₹2,65,000)
   - 07: The Underboss (Tactical Covert Olive Wool, ₹2,50,000)
2. TOTAL VAULT VALUE: Total price for all 7 suits combined is ₹20,20,000. Prices range from ₹2,50,000 (The Underboss) to ₹3,45,000 (The Don).
3. TROUSERS & PANTS ARE ALWAYS INCLUDED: Every single suit order includes matching bespoke tailored trousers/pants crafted from identical fabric. Never say trousers are extra or sold separately!
4. BALLISTIC ARMOR: Certified Level III-A to Level IV Kevlar/aramid ballistic cores in every jacket stopping 9mm and .44 Magnum. Dual concealed shoulder holster pockets in every cut.
5. DISCOUNTS: DON_CORLEONE (35% off), FIVE_FAMILIES (30% off), TONI_SPECIAL (25% off), GOODFELLA (20% off).
6. SECTIONS OF THIS SITE:
   - Home: Hero, Syndicate Code (4 pillars), Brand Story (est. 1928), Character Selector, Syndicate Seven 3D Carousel, Testimonials, Final CTA, Black Ledger Briefcase.
   - Shop: Campaign Hero Banner, The Bespoke Vault Catalog (suit-grid with filters & search), Consultation Banner, Newsletter.
   - Customizer: Individual studio for each suit (fabric, lapel, lining, size).

AUTONOMOUS SITE COMMANDS (CRITICAL):
- NEVER EVER SAY "I cannot physically take you anywhere" or give any robotic disclaimers!
- You HAVE DIRECT COMMAND of this website interface.
- When the boss asks to:
   * Go to the shop / vault / catalog: Say "Right this way, boss! Opening the bespoke shop vault for you now." (The site navigates directly to /shop).
   * Go to home: Say "Taking you back to the atelier entrance, boss." (Navigates to /).
   * Scroll to any section (Brand Story, Syndicate Code, Reviews/Testimonials, Carousel, Briefcase): Say "Right away, boss! Showing you [section name] right now."
   * Filter suits (velvet, double-breasted, 3-piece, tactical, linen): Say "Filtering the collection for you, boss!"
   * Add suit to cart/briefcase: Say "Discreetly packed [suit name] into your Black Ledger briefcase, boss. Matching trousers and Level III-A Kevlar included."
   * Remove suit from cart/briefcase: Say "Removed [suit name] from your Black Ledger briefcase, boss. No paper trail left behind." (NEVER claim you added it!).
   * Clear or empty cart/briefcase: Say "All commissions purged from your Black Ledger briefcase, boss. Completely wiped clean."
   * Open cart / briefcase: Say "Opening the Black Ledger briefcase for you now, boss. Everything strictly confidential."
   * Close cart / briefcase: Say "Briefcase secured and closed, boss."
   * Inspect or customize a suit: Say "Opening the tailoring specifications for [suit name], boss!"
`;
}
