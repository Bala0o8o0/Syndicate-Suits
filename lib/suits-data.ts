export type SuitProduct = Suit;

export interface Suit {
  id: string;
  number: string;
  name: string;
  character: string;
  alias: string;
  rank: string;
  tagline: string;
  theSuitFor: string;
  description: string;
  story: string;
  price: number;
  priceFormatted: string;
  colorHex: string;
  bulletproofRating: "Level II-A" | "Level III-A" | "Level IV Stealth" | "Level III Tactical";
  bulletproofDetail: string;
  fabrics: Array<{
    id: string;
    name: string;
    description: string;
    colorHex: string;
    textureType: "pinstripe" | "velvet" | "wool" | "linen" | "silk";
    addedPrice: number;
  }>;
  lapels: Array<{
    id: string;
    name: string;
    description: string;
    style: "peak" | "notch" | "shawl";
  }>;
  linings: Array<{
    id: string;
    name: string;
    colorHex: string;
    description: string;
  }>;
  occasions: string[];
  features: string[];
  toniQuote: string;
  image: string;
  accentColor: string;
}

export const SUITS: Suit[] = [
  {
    id: "the-don",
    number: "01",
    name: "The Don",
    character: "Classic Black",
    alias: "Il Capo dei Capi",
    rank: "Boss of Bosses",
    tagline: "Uncompromising authority in Italian charcoal chalk-stripe & onyx wool.",
    theSuitFor: "Making an entrance without saying a word.",
    description: "The ultimate power silhouette. Handcrafted double-breasted cut with razor-sharp peak lapels, reinforced Level III-A Kevlar inner chest shielding, and iridescent ruby red silk lining.",
    story: "Commissioned exclusively for sit-downs, city hall summits, and high-stakes family negotiations. When you step into a room wearing The Don, nobody asks questions.",
    price: 345000,
    priceFormatted: "₹ 3,45,000",
    colorHex: "#0B0B0A",
    bulletproofRating: "Level III-A",
    bulletproofDetail: "Dual-layer micro-woven Kevlar chest panels rated to stop 9mm, .44 Magnum, and sudden betrayal.",
    fabrics: [
      { id: "classic-black", name: "Onyx Midnight Super-180s Wool", description: "Deep midnight matte black with zero light sheen", colorHex: "#0B0B0A", textureType: "wool", addedPrice: 0 },
      { id: "charcoal-pinstripe", name: "Italian Charcoal Chalk-Stripe", description: "Super-160s Vitale Barberis wool with subtle silver pinstripes", colorHex: "#2b2e35", textureType: "pinstripe", addedPrice: 15000 },
      { id: "bloodline-velvet", name: "Bloodline Crimson Velvet", description: "Heavy imperial velvet woven in Como, Italy", colorHex: "#630b16", textureType: "velvet", addedPrice: 35000 },
    ],
    lapels: [
      { id: "wide-peak", name: "Razor Wide Peak (4.25 in)", description: "Dominant, authoritative peak lapels that broaden the shoulders", style: "peak" },
      { id: "classic-peak", name: "Classic Italian Peak (3.5 in)", description: "Balanced elegance with sharp hand-stitched pick edges", style: "peak" },
      { id: "shawl-satin", name: "Smoked Satin Shawl", description: "Underworld gala styling with contrast black silk facings", style: "shawl" },
    ],
    linings: [
      { id: "ruby-silk", name: "Imperial Ruby Silk", colorHex: "#8b0000", description: "Vibrant crimson silk woven with Syndicate monogram" },
      { id: "speakeasy-gold", name: "Speakeasy Gold Brocade", colorHex: "#d4af37", description: "Gold jacquard with vintage coin motifs" },
      { id: "matte-noir", name: "Shadow Obsidian", colorHex: "#0a0a0c", description: "Zero-light reflective stealth lining" },
    ],
    occasions: ["Godfather's Wedding", "Speakeasy Gala", "Family Summit", "Court Appearance"],
    features: [
      "Concealed quick-draw shoulder holster pouch",
      "Reinforced titanium-blend thread button anchors",
      "Hidden inner cigar and lighter compartment",
      "Level III-A Kevlar weave certified",
    ],
    toniQuote: "You don't just put on The Don—you assume command. One look at those peak lapels and even the Feds start sweating.",
    image: "/images/suits/the-don.jpg",
    accentColor: "#B59454",
  },
  {
    id: "the-boss",
    number: "02",
    name: "The Boss",
    character: "Navy",
    alias: "The Executive Kingpin",
    rank: "Syndicate Head",
    tagline: "Sovereign power in midnight navy 3-piece bespoke.",
    theSuitFor: "Commanding whole empires from behind closed mahogany doors.",
    description: "Tailored for the man who controls whole syndicates with a signature. A razor-fitted three-piece suit featuring a tailored double-breasted waistcoat, vintage gold watch chain loop, and silent document pockets.",
    story: "Designed for penthouse boardrooms and secret financial conclaves where laws are written and rewritten.",
    price: 310000,
    priceFormatted: "₹ 3,10,000",
    colorHex: "#172554",
    bulletproofRating: "Level II-A",
    bulletproofDetail: "Lightweight flexible aramid chest core allowing maximum mobility and discreet conference agility.",
    fabrics: [
      { id: "midnight-navy", name: "Midnight Navy Super-180s", description: "Ultra-fine Italian merino wool with subtle navy luster", colorHex: "#172554", textureType: "wool", addedPrice: 0 },
      { id: "navy-pinstripe", name: "Venetian Navy Pinstripe", description: "Subdued navy chalk-stripe", colorHex: "#1e3a8a", textureType: "pinstripe", addedPrice: 18000 },
    ],
    lapels: [
      { id: "sharp-notch", name: "Milanese Notch Lapel (3.25 in)", description: "Clean, classic, understated diplomatic silhouette", style: "notch" },
      { id: "slim-peak", name: "Slim Executive Peak", description: "Subtle upward sweep for legal dominance", style: "peak" },
    ],
    linings: [
      { id: "speakeasy-gold", name: "Speakeasy Gold Brocade", colorHex: "#d4af37", description: "Antique gold silk with discrete ledger print" },
      { id: "navy-silk", name: "Venetian Navy Silk", colorHex: "#1e3a8a", description: "Smooth pure silk damask" },
    ],
    occasions: ["Court Appearance", "Family Summit", "Speakeasy Gala"],
    features: [
      "Dedicated secret contract & pen document inner pocket",
      "Waistcoat pocket watch chain buttonhole",
      "Flexible aramid back panel",
      "Unwrinkable 4-ply travel wool",
    ],
    toniQuote: "The Boss doesn't scream to get attention. The cut of his navy wool speaks for itself.",
    image: "/images/suits/the-boss.jpg",
    accentColor: "#38bdf8",
  },
  {
    id: "the-capo",
    number: "03",
    name: "The Capo",
    character: "Charcoal",
    alias: "The District Commander",
    rank: "Caporegime",
    tagline: "Steely resolve in indestructible charcoal houndstooth & worsted wool.",
    theSuitFor: "Enforcing respect across every boardroom and back-alley.",
    description: "Built for territory leaders who oversee the street and the skyscraper. Heavy 450g Como charcoal wool with structured shoulders and reinforced seam anchors.",
    story: "Worn by district commanders who deliver results on time, every time, without exception.",
    price: 295000,
    priceFormatted: "₹ 2,95,000",
    colorHex: "#292826",
    bulletproofRating: "Level III Tactical",
    bulletproofDetail: "Reinforced shoulder and torso ballistic weave engineered to absorb point-blank kinetic impact.",
    fabrics: [
      { id: "charcoal-worsted", name: "450g Como Charcoal Worsted", description: "Heavy structured wool that holds a blade crease", colorHex: "#292826", textureType: "wool", addedPrice: 0 },
      { id: "smoked-slate", name: "Smoked Slate Melange", description: "Multi-tonal grey wool blend", colorHex: "#383734", textureType: "wool", addedPrice: 12000 },
    ],
    lapels: [
      { id: "wide-peak", name: "Garrison Wide Peak (4.0 in)", description: "Heavy-set peak lapel with sharp gorge", style: "peak" },
      { id: "classic-notch", name: "Capo Notch", description: "Classic industrial mobster profile", style: "notch" },
    ],
    linings: [
      { id: "quilted-crimson", name: "Quilted Crimson Thermal", colorHex: "#7f1d1d", description: "Padded thermal silk for city operations" },
      { id: "matte-noir", name: "Shadow Obsidian", colorHex: "#0a0a0c", description: "Heavy duty non-friction nylon silk" },
    ],
    occasions: ["Heist", "Undercover In Sicily", "Night Patrol"],
    features: [
      "Dual balanced holster anchor loops",
      "Reinforced heavy-duty elbow and forearm padding",
      "Weather-sealed concealed gear pockets",
      "Weighted hemline for rapid one-handed draw",
    ],
    toniQuote: "Tough as reinforced concrete. When The Capo enters the room, deals get signed in blood.",
    image: "/images/suits/the-capo.jpg",
    accentColor: "#E9DFC9",
  },
  {
    id: "the-consigliere",
    number: "04",
    name: "The Consigliere",
    character: "Cream",
    alias: "The Mastermind",
    rank: "Consigliere",
    tagline: "Effortless intellect in hand-rolled Sicilian cream linen.",
    theSuitFor: "Whispering the deals that move cities and silence rivals.",
    description: "Pure intellectual sophistication. Unstructured cream Italian linen with chalk stripes, breathable half-canvas construction, and hidden ledger compartments.",
    story: "Designed for the consigliere who sits beside the Don at coastal terraces and resolves multi-million dollar disputes with a smile.",
    price: 280000,
    priceFormatted: "₹ 2,80,000",
    colorHex: "#E9DFC9",
    bulletproofRating: "Level II-A",
    bulletproofDetail: "Ultra-breathable micro-mesh Kevlar layer that prevents overheating under Mediterranean sun or interrogation lights.",
    fabrics: [
      { id: "cream-linen", name: "Sicilian Cream Chalk-Stripe Linen", description: "Pure Mediterranean flax with subtle chalk stripes", colorHex: "#E9DFC9", textureType: "linen", addedPrice: 0 },
      { id: "tuscan-ivory", name: "Tuscan Ivory Wool-Silk", description: "Featherlight summer wool-silk blend", colorHex: "#f5eedb", textureType: "silk", addedPrice: 22000 },
    ],
    lapels: [
      { id: "neapolitan-notch", name: "Neapolitan Notch (3.5 in)", description: "Soft roll lapel with high gorge and relaxed drape", style: "notch" },
      { id: "soft-peak", name: "Riviera Soft Peak", description: "Casual elegance with Mediterranean curves", style: "peak" },
    ],
    linings: [
      { id: "terra-cotta-silk", name: "Palermo Terra-Cotta Silk", colorHex: "#c2410c", description: "Half-lined for maximum airflow and cooling" },
      { id: "cream-silk", name: "Pure Sand Silk", colorHex: "#fef3c7", description: "Soft featherlight lining" },
    ],
    occasions: ["Undercover In Sicily", "Godfather's Wedding", "Family Summit"],
    features: [
      "Unstructured Neapolitan spalla camicia shoulder",
      "Hidden interior passport and sunglasses holster",
      "Breathable heat-dissipating micro-kevlar chest core",
      "Real mother-of-pearl buttons",
    ],
    toniQuote: "The Consigliere is for the guy who wins the battle before anyone pulls a piece. Pure class, zero noise.",
    image: "/images/suits/the-consigliere.jpg",
    accentColor: "#B59454",
  },
  {
    id: "the-enforcer",
    number: "05",
    name: "The Enforcer",
    character: "Burgundy",
    alias: "The Iron Fist",
    rank: "Prime Enforcer",
    tagline: "Intimidating imperial burgundy velvet with razor peak lapels.",
    theSuitFor: "Standing unyielding when diplomatic negotiations end.",
    description: "Dangerous elegance. Deep imperial burgundy French velvet paired with satin black peak lapels, bespoke brass skull cuff buttons, and shock-absorbing internal chest pads.",
    story: "Commissioned for the Syndicate's most formidable operatives who make their presence felt the instant they step across the threshold.",
    price: 265000,
    priceFormatted: "₹ 2,65,000",
    colorHex: "#630B16",
    bulletproofRating: "Level III Tactical",
    bulletproofDetail: "Reinforced multi-hit silk-kevlar composite woven into the chest, spine, and flanks.",
    fabrics: [
      { id: "burgundy-velvet", name: "Royale Burgundy French Velvet", description: "Heavy luxury velvet with deep Bordeaux wine undertones", colorHex: "#630B16", textureType: "velvet", addedPrice: 0 },
      { id: "oxblood-wool", name: "Smoked Oxblood Flannel", description: "Rich winter flannel with brushed finish", colorHex: "#450a0a", textureType: "wool", addedPrice: 18000 },
    ],
    lapels: [
      { id: "wide-satin-peak", name: "Onyx Satin Wide Peak", description: "High-contrast lustrous satin facing", style: "peak" },
      { id: "curved-shawl", name: "Imperial Shawl Collar", description: "Flawless vintage tuxedo curve", style: "shawl" },
    ],
    linings: [
      { id: "gold-brocade", name: "Golden Roulette Brocade", colorHex: "#eab308", description: "Woven gold dice and syndicate crests" },
      { id: "ruby-silk", name: "Blood Ruby Silk", colorHex: "#881337", description: "High-gloss pure Italian silk" },
    ],
    occasions: ["Casino High Stakes", "Speakeasy Gala", "Heist"],
    features: [
      "Dual concealed firearm & magazine internal pockets",
      "Shock-absorbing padded chest and shoulder inserts",
      "Satin-piped ticket and cigar pockets",
      "Anti-crease lounge trousers included",
    ],
    toniQuote: "When negotiations fail, you send The Enforcer in burgundy. Conversation is officially over.",
    image: "/images/suits/the-enforcer.jpg",
    accentColor: "#B92720",
  },
  {
    id: "the-underboss",
    number: "06",
    name: "The Underboss",
    character: "Olive",
    alias: "The Shadow General",
    rank: "Underboss",
    tagline: "Tactical olive covert wool with stealth matte brass hardware.",
    theSuitFor: "Operating in the shadows with ruthless precision and swagger.",
    description: "Military precision meets underworld swagger. Heavy covert olive wool with sharp angular peak lapels, storm-sealed utility holsters, and acoustic silent lining.",
    story: "Worn by the field generals who manage operations across five boroughs with tactical military precision.",
    price: 250000,
    priceFormatted: "₹ 2,50,000",
    colorHex: "#3B482A",
    bulletproofRating: "Level IV Stealth",
    bulletproofDetail: "Advanced multi-hit ceramic-aramid composite layer with sound-dampening acoustic lining.",
    fabrics: [
      { id: "covert-olive", name: "Sicilian Covert Olive Wool", description: "Dense matte olive drab cavalry twill", colorHex: "#3B482A", textureType: "wool", addedPrice: 0 },
      { id: "forest-melange", name: "Forest Moss Melange", description: "Deep woodland tactical wool", colorHex: "#1c2b18", textureType: "wool", addedPrice: 15000 },
    ],
    lapels: [
      { id: "tactical-peak", name: "Tactical Angled Peak (3.75 in)", description: "Sharp, angled upward peak lapel with pick stitching", style: "peak" },
      { id: "military-collar", name: "Field Officer Collar", description: "High stand collar with hook-and-eye throat clasp", style: "notch" },
    ],
    linings: [
      { id: "camo-noir", name: "Obsidian Camo Silk", colorHex: "#121411", description: "Subtle tone-on-tone tactical jacquard" },
      { id: "bronze-silk", name: "Aged Bronze Silk", colorHex: "#785628", description: "Lustrous antique bronze silk" },
    ],
    occasions: ["Night Patrol", "Heist", "Undercover In Sicily"],
    features: [
      "Acoustic noise-dampening silent lining",
      "Reinforced concealed suppressor & wire pockets",
      "Magnetic silent quick-release buttons",
      "Level IV Multi-Hit ballistic chest plate pocket",
    ],
    toniQuote: "You won't hear him coming, and you won't see him in the shadows. The most lethal cut in the Syndicate.",
    image: "/images/suits/the-underboss.jpg",
    accentColor: "#84cc16",
  },
  {
    id: "the-wildcard",
    number: "07",
    name: "The Wildcard",
    character: "Royal Blue",
    alias: "The Casino Maverick",
    rank: "High Roller",
    tagline: "High-voltage cobalt pinstripe for big spenders and casino legends.",
    theSuitFor: "Breaking every rule and owning every high-stakes casino table.",
    description: "Loud, magnetic, and completely fearless. Luminous royal cobalt blue wool with woven metallic silver pinstripes, dramatic wide lapels, and solid brass dice buttons.",
    story: "Worn by high rollers who bet the entire syndicate ledger on red and walk away with the casino deed.",
    price: 275000,
    priceFormatted: "₹ 2,75,000",
    colorHex: "#1E3A8A",
    bulletproofRating: "Level II-A",
    bulletproofDetail: "Lightweight flexible aramid chest core allowing unrestricted movement for high-roller swagger.",
    fabrics: [
      { id: "royal-cobalt", name: "Royal Cobalt Silver Pinstripe", description: "Luminous electric blue wool with metallic silver stripe", colorHex: "#1E3A8A", textureType: "pinstripe", addedPrice: 0 },
      { id: "sapphire-velvet", name: "Monte Carlo Sapphire Velvet", description: "Electric deep blue Italian velvet", colorHex: "#1e3a5f", textureType: "velvet", addedPrice: 25000 },
    ],
    lapels: [
      { id: "exaggerated-peak", name: "90s Maverick Peak (4.5 in)", description: "High-flying dramatic peak lapels", style: "peak" },
      { id: "broad-shawl", name: "Sapphire Silk Shawl", description: "Casino swing curve lapel", style: "shawl" },
    ],
    linings: [
      { id: "gold-dice", name: "Golden Dice & Roulette Jacquard", colorHex: "#d4af37", description: "Woven gold dice, cards, and speakeasy crests" },
      { id: "electric-blue", name: "Electric Azure Silk", colorHex: "#0284c7", description: "High-voltage silk lining" },
    ],
    occasions: ["Casino High Stakes", "Speakeasy Gala", "Godfather's Wedding"],
    features: [
      "Solid brass 6-sided dice cuff buttons",
      "Hidden internal card deck / chip compartment",
      "Flexible dance & sprint armhole gussets",
      "Interior flask & cigar humidor sleeve",
    ],
    toniQuote: "Got more swagger than a roulette wheel on a lucky streak. You walk in wearing The Wildcard, you own the joint.",
    image: "/images/suits/the-wildcard.jpg",
    accentColor: "#3b82f6",
  },
];

export const OCCASIONS = [
  "All Occasions",
  "Godfather's Wedding",
  "Speakeasy Gala",
  "Court Appearance",
  "Heist",
  "Casino High Stakes",
  "Family Summit",
  "Undercover In Sicily",
  "Night Patrol",
];

export const SYNDICATE_DISCOUNTS: Record<string, { percent: number; label: string; description: string }> = {
  TONI_SPECIAL: { percent: 25, label: "Toni Lee's Personal Cut", description: "25% off courtesy of the Master Tailor himself." },
  DON_CORLEONE: { percent: 35, label: "The Godfather's Blessing", description: "35% off. An offer that cannot be refused." },
  FIVE_FAMILIES: { percent: 30, label: "Five Families Truce", description: "30% off for verified underworld syndicate members." },
  GOODFELLA: { percent: 20, label: "Goodfella Respect", description: "20% off for friends of the family." },
};