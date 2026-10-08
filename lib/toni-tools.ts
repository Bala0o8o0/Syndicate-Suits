import confetti from "canvas-confetti";
import { SUITS } from "./suits-data";
import { useBriefcaseStore } from "./briefcase-store";
import { useToniStore } from "./toni-store";

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, unknown>;
    required: string[];
  };
}

export const TONI_TOOLS: ToolDefinition[] = [
  {
    name: "navigate_to_shop",
    description: "Navigate directly to the bespoke shop catalog page / vault.",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "navigate_to_home",
    description: "Navigate to the home page of Syndicate Suits.",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "scroll_to_section",
    description: "Smoothly scroll to any section of the website: 'syndicate-code', 'brand-story', 'character-selector', 'syndicate-seven', 'testimonials', 'black-ledger', 'suits-catalog', 'final-cta'.",
    parameters: {
      type: "object",
      properties: {
        sectionId: {
          type: "string",
          description: "Target element ID: 'syndicate-code', 'brand-story', 'character-selector', 'syndicate-seven', 'testimonials', 'black-ledger', 'suits-catalog', 'final-cta'.",
        },
      },
      required: ["sectionId"],
    },
  },
  {
    name: "filter_catalog",
    description: "Filter or search the suit collection in the shop by category or search term.",
    parameters: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description: "Filter category: 'all', 'double-breasted', 'three-piece', 'velvet-gala', 'tactical', 'summer-linen'.",
        },
        query: {
          type: "string",
          description: "Search keyword like 'pinstripe', 'velvet', 'linen', 'black', 'navy'.",
        },
      },
      required: [],
    },
  },
  {
    name: "quick_view_suit",
    description: "Open the quick-view modal drawer for a specific suit on screen.",
    parameters: {
      type: "object",
      properties: {
        suitId: {
          type: "string",
          description: "ID of the suit to inspect (e.g. 'the-don', 'the-boss', 'the-capo', 'the-consigliere', 'the-wildcard', 'the-enforcer', 'the-underboss').",
        },
      },
      required: ["suitId"],
    },
  },
  {
    name: "customize_suit",
    description: "Open the full bespoke tailoring studio for a specific suit cut.",
    parameters: {
      type: "object",
      properties: {
        suitId: {
          type: "string",
          description: "ID of suit: 'the-don', 'the-boss', 'the-capo', 'the-consigliere', 'the-wildcard', 'the-enforcer', 'the-underboss'.",
        },
      },
      required: ["suitId"],
    },
  },
  {
    name: "highlight_suit",
    description: "Highlight and focus on a suit card with a pulsing spotlight.",
    parameters: {
      type: "object",
      properties: {
        suitId: {
          type: "string",
          description: "ID of the suit to highlight and focus.",
        },
      },
      required: ["suitId"],
    },
  },
  {
    name: "add_to_briefcase",
    description: "Add a tailored bespoke suit to the user's discreet briefcase cart.",
    parameters: {
      type: "object",
      properties: {
        suitId: {
          type: "string",
          description: "ID of the suit to add.",
        },
        size: {
          type: "string",
          description: "Size like '40R', '42L', etc.",
        },
      },
      required: ["suitId"],
    },
  },
  {
    name: "apply_family_discount",
    description: "Apply a secret syndicate promo code (e.g. 'DON_CORLEONE', 'TONI_SPECIAL', 'FIVE_FAMILIES', 'GOODFELLA').",
    parameters: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "The syndicate discount code.",
        },
      },
      required: ["code"],
    },
  },
  {
    name: "open_briefcase",
    description: "Open the briefcase cart drawer to review the Black Ledger.",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "remove_from_briefcase",
    description: "Remove a suit from the user's discreet Black Ledger briefcase cart.",
    parameters: {
      type: "object",
      properties: {
        suitId: {
          type: "string",
          description: "ID of the suit to remove (e.g. 'the-boss', 'the-don').",
        },
      },
      required: [],
    },
  },
  {
    name: "clear_briefcase",
    description: "Empty and remove all items from the Black Ledger briefcase cart.",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "close_briefcase",
    description: "Close the briefcase cart drawer.",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
];

export interface ToniToolArgs {
  suitId?: string;
  occasion?: string;
  sectionId?: string;
  category?: string;
  query?: string;
  size?: string;
  code?: string;
  [key: string]: unknown;
}

export function executeToniTool(
  name: string,
  args: ToniToolArgs = {}
): { spokenResponse: string; actionDetails?: string } {
  const { setHighlightedElementId } = useToniStore.getState();

  const clientNavigate = (href: string) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("toni-navigate", { detail: { href } }));
  };

  switch (name) {
    case "navigate_to_shop":
    case "browse_collection": {
      if (typeof window !== "undefined") {
        if (window.location.pathname !== "/shop") {
          clientNavigate("/shop");
        } else {
          window.scrollTo({ top: 380, behavior: "smooth" });
        }
      }
      return {
        spokenResponse: args?.occasion
          ? `Taking you straight to the vault for ${args.occasion}, boss!`
          : "Right this way, boss! Opening the bespoke shop vault for you now.",
      };
    }

    case "navigate_to_home": {
      if (typeof window !== "undefined") {
        if (window.location.pathname !== "/") {
          clientNavigate("/");
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
      return {
        spokenResponse: "Taking you back to the atelier entrance, boss.",
      };
    }

    case "scroll_to_section": {
      const rawSection = args?.sectionId || "suits-catalog";
      const section =
        rawSection === "character-selector" ? "syndicate-seven" : rawSection;
      if (typeof window !== "undefined") {
        const elem =
          document.getElementById(section) ||
          document.getElementById(rawSection);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          const homeSections = [
            "hero",
            "syndicate-code",
            "brand-story",
            "character-selector",
            "syndicate-seven",
            "testimonials",
            "final-cta",
            "black-ledger",
          ];
          if (homeSections.includes(section) && window.location.pathname !== "/") {
            clientNavigate(`/#${section}`);
          } else if (window.location.pathname !== "/shop") {
            clientNavigate(`/shop#${section}`);
          }
        }
      }
      return {
        spokenResponse: `Navigating straight to ${section.replace("-", " ")}, boss!`,
      };
    }

    case "filter_catalog": {
      const category = args?.category || "all";
      const query = args?.query || "";
      if (typeof window !== "undefined") {
        if (window.location.pathname !== "/shop") {
          clientNavigate("/shop");
          setTimeout(() => {
            window.dispatchEvent(
              new CustomEvent("toni-filter-catalog", {
                detail: { category, query },
              })
            );
          }, 450);
        } else {
          window.dispatchEvent(
            new CustomEvent("toni-filter-catalog", {
              detail: { category, query },
            })
          );
          const elem = document.getElementById("suits-catalog");
          if (elem) elem.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      return {
        spokenResponse: query
          ? `Filtered the collection for "${query}", boss!`
          : `Filtering catalog for ${category.replace("-", " ")}, boss!`,
      };
    }

    case "quick_view_suit":
    case "inspect_suit_details": {
      const suitId = args?.suitId;
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("toni-quick-view", { detail: { suitId } })
        );
      }
      const suit = SUITS.find((s) => s.id === suitId);
      return {
        spokenResponse: suit
          ? `Opening quick view for ${suit.name}, boss!`
          : "Opening suit details on screen, boss!",
      };
    }

    case "highlight_suit": {
      const suitId = args?.suitId;
      const targetId = `suit-card-${suitId}`;
      setHighlightedElementId(targetId);

      if (typeof window !== "undefined") {
        const elem =
          document.getElementById(targetId) ||
          document.querySelector(`[data-avatar-target="${targetId}"]`);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }

      setTimeout(() => {
        setHighlightedElementId(null);
      }, 4500);

      const suit = SUITS.find((s) => s.id === suitId);
      return {
        spokenResponse: suit
          ? `Right there on screen, boss! That's ${suit.name}—${suit.tagline}`
          : "Spotlight is on the piece, boss!",
      };
    }

    case "customize_suit": {
      const suit = SUITS.find((s) => s.id === args.suitId) || SUITS[0];
      if (typeof window !== "undefined") {
        clientNavigate(`/shop/${suit.id}`);
      }
      return {
        spokenResponse: `Opening the bespoke tailoring specifications for ${suit.name}. You're gonna look untouchable in this cut!`,
      };
    }

    case "add_to_briefcase": {
      const suit = SUITS.find((s) => s.id === args.suitId) || SUITS[0];
      const fabric = suit.fabrics[0];
      const lapel = suit.lapels[0];
      const lining = suit.linings[0];
      const size = args.size || "40R";

      useBriefcaseStore.getState().addItem({
        suit,
        selectedFabricId: fabric.id,
        selectedLapelId: lapel.id,
        selectedLiningId: lining.id,
        size,
        unitPrice: suit.price + fabric.addedPrice,
        quantity: 1,
      });

      // Confetti burst
      if (typeof window !== "undefined") {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ["#d4af37", "#8b0000", "#ffffff"],
          });
        } catch {}
      }

      return {
        spokenResponse: `Discreetly packed ${suit.name} into your Black Ledger briefcase. The family takes care of its own.`,
      };
    }

    case "remove_from_briefcase": {
      const suitId = args?.suitId;
      const store = useBriefcaseStore.getState();
      const items = store.items;

      if (items.length === 0) {
        return {
          spokenResponse: "Your Black Ledger briefcase is already empty, boss. Nothing to remove.",
        };
      }

      let itemToRemove = items.find((i) => i.suit.id === suitId);
      if (!itemToRemove && suitId) {
        itemToRemove = items.find(
          (i) =>
            i.suit.id.toLowerCase().includes(suitId.toLowerCase()) ||
            i.suit.name.toLowerCase().includes(suitId.toLowerCase())
        );
      }
      // If no specific suit was found or specified, remove the most recently added item
      if (!itemToRemove && items.length > 0) {
        itemToRemove = items[items.length - 1];
      }

      if (itemToRemove) {
        const removedName = itemToRemove.suit.name;
        store.removeItem(itemToRemove.id);
        return {
          spokenResponse: `Removed ${removedName} from your Black Ledger briefcase, boss. No paper trail left behind.`,
        };
      }

      return {
        spokenResponse: "Couldn't locate that piece in your Black Ledger briefcase, boss.",
      };
    }

    case "clear_briefcase":
    case "clearBriefcase": {
      useBriefcaseStore.getState().clearBriefcase();
      return {
        spokenResponse: "All commissions purged from your Black Ledger briefcase, boss. Completely wiped clean.",
      };
    }

    case "apply_family_discount": {
      const code = args.code || "TONI_SPECIAL";
      const result = useBriefcaseStore.getState().applyDiscount(code);

      if (result.success) {
        if (typeof window !== "undefined") {
          try {
            confetti({
              particleCount: 90,
              spread: 100,
              origin: { y: 0.6 },
              colors: ["#d4af37", "#f59e0b", "#8b0000"],
            });
          } catch {}
        }
        return { spokenResponse: result.message };
      }
      return { spokenResponse: result.message };
    }

    case "open_briefcase":
    case "openBriefcase": {
      useBriefcaseStore.getState().openBriefcase();
      return {
        spokenResponse:
          "Here's the Black Ledger briefcase, boss. Everything strictly confidential.",
      };
    }

    case "close_briefcase":
    case "closeBriefcase": {
      useBriefcaseStore.getState().closeBriefcase();
      return {
        spokenResponse: "Briefcase secured and closed, boss.",
      };
    }

    case "recommendSuit": {
      const suitId = args?.suitId;
      const suit = SUITS.find((s) => s.id === suitId) || SUITS[0];
      return {
        spokenResponse: `Toni recommends ${suit.name}—${suit.tagline}`,
      };
    }

    default:
      return {
        spokenResponse: "Capisce! Toni Lee handled it.",
      };
  }
}