import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { streamText, tool } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { SUITS } from "@/lib/suits-data";
import { buildSystemPromptWithKnowledge } from "@/lib/knowledge-base";

const SYSTEM_PROMPT = buildSystemPromptWithKnowledge();

function detectToolCall(message: string): { name: string; args: Record<string, string> } | undefined {
  const lower = message.toLowerCase().trim();

  // 0. CHECK FOR BRIEFCASE CLEAR / PURGE INTENT FIRST
  const isClearIntent =
    (lower.includes("empty") || lower.includes("clear") || lower.includes("purge") || lower.includes("wipe")) &&
    (lower.includes("cart") || lower.includes("briefcase") || lower.includes("ledger") || lower.includes("all") || lower.includes("everything"));

  if (isClearIntent) {
    return { name: "clear_briefcase", args: {} };
  }

  // 1. CHECK FOR REMOVAL INTENT FIRST (BEFORE ANY ADD INTENT!)
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
    // Check if a specific suit is mentioned to remove
    for (const suit of SUITS) {
      const suitNameLower = suit.name.toLowerCase();
      const shortName = suitNameLower.replace(/^the\s+/, "");
      const suitRegex = new RegExp(`\\b${shortName}\\b`, "i");

      if (
        lower.includes(suit.id) ||
        lower.includes(suitNameLower) ||
        suitRegex.test(lower)
      ) {
        return { name: "remove_from_briefcase", args: { suitId: suit.id } };
      }
    }

    // Generic removal: "remove the suit from cart", "remove from cart", "take it out", "remove item"
    return { name: "remove_from_briefcase", args: {} };
  }

  // 2. Briefcase Modal Open / Close
  if (
    lower.includes("close briefcase") ||
    lower.includes("close cart") ||
    lower.includes("hide ledger") ||
    lower.includes("hide cart")
  ) {
    return { name: "close_briefcase", args: {} };
  }

  if (
    lower.includes("open briefcase") ||
    lower.includes("open cart") ||
    lower.includes("open the briefcase") ||
    lower.includes("open the cart") ||
    lower.includes("show briefcase") ||
    lower.includes("show my briefcase") ||
    lower.includes("show my cart") ||
    lower.includes("show cart") ||
    lower.includes("checkout") ||
    lower.includes("view ledger") ||
    lower.includes("open ledger") ||
    lower.includes("my items") ||
    lower.includes("view cart") ||
    lower.includes("view briefcase")
  ) {
    return { name: "open_briefcase", args: {} };
  }

  // 3. Section Scrolling on Current/Target Page
  if (
    lower.includes("brand story") ||
    lower.includes("story section") ||
    lower.includes("history section") ||
    lower.includes("heritage")
  ) {
    return { name: "scroll_to_section", args: { sectionId: "brand-story" } };
  }
  if (
    lower.includes("syndicate code") ||
    lower.includes("the code") ||
    lower.includes("four pillars") ||
    lower.includes("pillars")
  ) {
    return { name: "scroll_to_section", args: { sectionId: "syndicate-code" } };
  }
  if (
    lower.includes("character selector") ||
    lower.includes("who are you in the syndicate") ||
    lower.includes("archetypes")
  ) {
    return { name: "scroll_to_section", args: { sectionId: "character-selector" } };
  }
  if (
    lower.includes("syndicate seven") ||
    lower.includes("carousel") ||
    lower.includes("3d carousel") ||
    lower.includes("all seven cuts")
  ) {
    return { name: "scroll_to_section", args: { sectionId: "syndicate-seven" } };
  }
  if (
    lower.includes("testimonials") ||
    lower.includes("reviews") ||
    lower.includes("client reviews") ||
    lower.includes("falcone review")
  ) {
    return { name: "scroll_to_section", args: { sectionId: "testimonials" } };
  }
  if (
    lower.includes("black ledger section") ||
    lower.includes("tribute code section")
  ) {
    return { name: "scroll_to_section", args: { sectionId: "black-ledger" } };
  }

  // 4. Navigation to Shop / Vault / Catalog
  const isShopKeyword =
    lower.includes("shop") ||
    lower.includes("store") ||
    lower.includes("vault") ||
    lower.includes("catalog") ||
    lower.includes("collection");

  const isNavIntent =
    lower.includes("take me") ||
    lower.includes("go to") ||
    lower.includes("open") ||
    lower.includes("show") ||
    lower.includes("browse") ||
    lower.includes("visit") ||
    lower.includes("navigate") ||
    lower.includes("head over") ||
    lower.includes("view") ||
    lower.includes("can you take");

  if (
    (isShopKeyword && isNavIntent) ||
    lower.includes("take me to the shop") ||
    lower.includes("take me to shop") ||
    lower.includes("shop section") ||
    lower.includes("the shop section") ||
    lower.includes("open shop") ||
    lower.includes("go to shop") ||
    lower.includes("to the shop")
  ) {
    return { name: "navigate_to_shop", args: {} };
  }

  // 5. Navigation to Home
  if (
    (lower.includes("take me") || lower.includes("go to") || lower.includes("back to")) &&
    (lower.includes("home") || lower.includes("homepage") || lower.includes("front") || lower.includes("entrance"))
  ) {
    return { name: "navigate_to_home", args: {} };
  }

  // 6. Catalog Dynamic Filtering & Searching
  if (lower.includes("double breasted") || lower.includes("double-breasted")) {
    return { name: "filter_catalog", args: { category: "double-breasted" } };
  }
  if (lower.includes("three piece") || lower.includes("3-piece") || lower.includes("waistcoat")) {
    return { name: "filter_catalog", args: { category: "three-piece" } };
  }
  if (lower.includes("velvet") || lower.includes("gala suit")) {
    return { name: "filter_catalog", args: { category: "velvet-gala" } };
  }
  if (lower.includes("tactical") || lower.includes("covert")) {
    return { name: "filter_catalog", args: { category: "tactical" } };
  }
  if (lower.includes("linen") || lower.includes("summer suit")) {
    return { name: "filter_catalog", args: { category: "summer-linen" } };
  }
  if (lower.includes("reset filter") || lower.includes("show all suits") || lower.includes("all category")) {
    return { name: "filter_catalog", args: { category: "all" } };
  }

  // 7. Specific Suit Actions (Cart, Customize, Quick View, Highlight) - STRICTLY ADD ONLY
  for (const suit of SUITS) {
    const suitNameLower = suit.name.toLowerCase();
    const shortName = suitNameLower.replace(/^the\s+/, "");
    const suitRegex = new RegExp(`\\b${shortName}\\b`, "i");

    const matchesSuit =
      lower.includes(suit.id) ||
      lower.includes(suitNameLower) ||
      suitRegex.test(lower);

    if (matchesSuit) {
      const hasAddWord =
        lower.includes("add") ||
        lower.includes("buy") ||
        lower.includes("order") ||
        lower.includes("purchase") ||
        lower.includes("pack") ||
        lower.includes("put in cart") ||
        lower.includes("add to cart") ||
        lower.includes("in my cart") ||
        lower.includes("into cart") ||
        lower.includes("in briefcase") ||
        lower.includes("into briefcase");

      if (hasAddWord) {
        return { name: "add_to_briefcase", args: { suitId: suit.id } };
      }
      if (lower.includes("quick view") || lower.includes("preview") || lower.includes("quick look")) {
        return { name: "quick_view_suit", args: { suitId: suit.id } };
      }
      if (
        lower.includes("custom") ||
        lower.includes("fit") ||
        lower.includes("fabric") ||
        lower.includes("workbench") ||
        lower.includes("studio") ||
        lower.includes("tailor") ||
        lower.includes("specs")
      ) {
        return { name: "customize_suit", args: { suitId: suit.id } };
      }
      if (
        lower.includes("show") ||
        lower.includes("where is") ||
        lower.includes("look at") ||
        lower.includes("highlight") ||
        lower.includes("spotlight")
      ) {
        return { name: "highlight_suit", args: { suitId: suit.id } };
      }
    }
  }

  // 8. Discount Code Unlocks
  if (lower.includes("discount") || lower.includes("coupon") || lower.includes("promo") || lower.includes("code")) {
    let code = "TONI_SPECIAL";
    if (lower.includes("godfather") || lower.includes("corleone") || lower.includes("35")) code = "DON_CORLEONE";
    else if (lower.includes("five families") || lower.includes("30")) code = "FIVE_FAMILIES";
    return { name: "apply_family_discount", args: { code } };
  }

  return undefined;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      message,
      history,
      openRouterKey: clientOpenRouterKey,
      openRouterModel: clientOpenRouterModel,
      apiKey: clientGeminiApiKey,
      stream = true,
    } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const toolCall = detectToolCall(message);

    // Helper: Sanitize responses against robotic disclaimers, hallucinated suit counts, or action mismatches
    const sanitizeAiReply = (rawReply: string): string => {
      const replyText = rawReply.trim();

      if (toolCall) {
        if (toolCall.name === "remove_from_briefcase") {
          const suit = toolCall.args?.suitId ? SUITS.find((s) => s.id === toolCall.args.suitId) : null;
          return suit
            ? `Removed ${suit.name} from your Black Ledger briefcase, boss. No paper trail left behind. Capisce?`
            : `Removed the commission from your Black Ledger briefcase, boss. No paper trail left behind. Capisce?`;
        }
        if (toolCall.name === "clear_briefcase") {
          return "All commissions purged from your Black Ledger briefcase, boss. Completely wiped clean.";
        }
        if (toolCall.name === "add_to_briefcase") {
          const suit = (toolCall.args?.suitId ? SUITS.find((s) => s.id === toolCall.args.suitId) : SUITS[0]) || SUITS[0];
          return `Discreetly packed ${suit.name} into your Black Ledger briefcase, boss. Hand-rolled ${suit.fabrics[0].name} with matching trousers and ${suit.bulletproofRating} protection included.`;
        }
        if (toolCall.name === "navigate_to_shop") {
          return "Right this way, boss! Opening the bespoke shop vault for you right now. Take a look at all 7 cuts in The Syndicate Seven! Capisce?";
        }
        if (toolCall.name === "open_briefcase") {
          return "Opening the Black Ledger briefcase for you now, boss. Everything strictly confidential.";
        }
        if (toolCall.name === "close_briefcase") {
          return "Briefcase secured and closed, boss.";
        }
      }

      const lowerMsg = message.toLowerCase();
      const asksForSuitCount =
        lowerMsg.includes("how many") ||
        lowerMsg.includes("how much suit") ||
        lowerMsg.includes("total suit") ||
        lowerMsg.includes("collection size");

      if (asksForSuitCount) {
        return "Fuggedaboutit! In our atelier, there are exactly 7 bespoke cuts in the entire collection—known strictly as The Syndicate Seven! 1. The Don (₹3,45,000, Onyx Black), 2. The Boss (₹3,10,000, Midnight Navy), 3. The Capo (₹2,95,000, Como Charcoal), 4. The Consigliere (₹2,80,000, Sicilian Cream), 5. The Wildcard (₹2,75,000, Royal Cobalt), 6. The Enforcer (₹2,65,000, Royale Burgundy), and 7. The Underboss (₹2,50,000, Tactical Olive). Every single cut includes matching tailored trousers and Level III-A Kevlar armor, capisce?";
      }

      if (
        replyText.toLowerCase().includes("can't physically") ||
        replyText.toLowerCase().includes("as an ai")
      ) {
        return "Fuggedaboutit! Toni Lee handles the business right here in the atelier. Tell me what kind of cut you want fitted for your next sit-down!";
      }

      return replyText;
    };

    const encoder = new TextEncoder();

    // STREAM HELPER
    const createStreamResponse = (
      streamGenerator: (controller: ReadableStreamDefaultController) => Promise<void>
    ) => {
      const customStream = new ReadableStream({
        async start(controller) {
          try {
            // Send metadata packet first
            const metaHeader = JSON.stringify({ type: "meta", toolCall }) + "\n";
            controller.enqueue(encoder.encode(metaHeader));
            await streamGenerator(controller);
          } catch (err) {
            console.error("Stream generation error:", err);
          } finally {
            controller.close();
          }
        },
      });

      return new Response(customStream, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          "Connection": "keep-alive",
          "X-Content-Type-Options": "nosniff",
        },
      });
    };

    // 1. OPENROUTER STREAMING
    const openRouterKey =
      clientOpenRouterKey ||
      process.env.OPENROUTER_API_KEY ||
      process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ||
      "";
    const openRouterModel =
      clientOpenRouterModel ||
      process.env.OPENROUTER_MODEL ||
      "nvidia/nemotron-3-ultra-550b-a55b:free";

    if (openRouterKey && stream) {
      try {
        const openrouter = createOpenAI({
          baseURL: "https://openrouter.ai/api/v1",
          apiKey: openRouterKey.trim(),
          headers: {
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Syndicate Suits - Toni Lee AI",
          },
        });

        const formattedHistory = Array.isArray(history)
          ? history.slice(-8).map((h: { role: string; parts: string }) => ({
              role: (h.role === "user" ? "user" : "assistant") as "user" | "assistant",
              content: h.parts,
            }))
          : [];

        // Vercel AI SDK streamText with Generative UI tools
        const aiResult = streamText({
          model: openrouter(openRouterModel),
          system: SYSTEM_PROMPT,
          messages: [
            ...formattedHistory,
            { role: "user", content: message },
          ],
          temperature: 0.7,
          tools: {
            recommendSuit: tool({
              description: "Recommend a bespoke mobster cut with tailored specifications, Kevlar rating, and styling notes",
              inputSchema: z.object({
                suitId: z.string().describe("The suit ID, e.g. the-don, the-boss, the-capo, the-consigliere, the-enforcer, the-underboss, the-wildcard"),
                reason: z.string().describe("Why this cut fits the client's occasion"),
              }),
              execute: async ({ suitId, reason }: { suitId: string; reason: string }) => {
                const s = SUITS.find((x) => x.id === suitId) || SUITS[0];
                return {
                  suitId: s.id,
                  name: s.name,
                  price: s.price,
                  protection: s.bulletproofRating,
                  reason,
                };
              },
            }),
            openBriefcase: tool({
              description: "Open the user's discreet Black Ledger briefcase cart",
              inputSchema: z.object({}),
              execute: async () => ({ status: "opened" }),
            }),
            clearBriefcase: tool({
              description: "Wipe and clear all items from the briefcase",
              inputSchema: z.object({}),
              execute: async () => ({ status: "cleared" }),
            }),
          },
        });

        return createStreamResponse(async (controller) => {
          let resolvedToolCall: { name: string; args: Record<string, unknown> } | undefined = toolCall;

          // Stream text tokens in real time from Vercel AI SDK textStream
          for await (const chunk of aiResult.textStream) {
            if (chunk) {
              const payload = JSON.stringify({ type: "chunk", text: chunk }) + "\n";
              controller.enqueue(encoder.encode(payload));
            }
          }

          // Check if Vercel AI SDK Generative UI tools were executed
          try {
            const toolCalls = await aiResult.toolCalls;
            if (toolCalls && toolCalls.length > 0) {
              const firstTool = toolCalls[0] as {
                toolName: string;
                input?: Record<string, unknown>;
                args?: Record<string, unknown>;
              };
              resolvedToolCall = {
                name: firstTool.toolName,
                args: firstTool.input || firstTool.args || {},
              };
              const metaUpdate = JSON.stringify({ type: "meta", toolCall: resolvedToolCall }) + "\n";
              controller.enqueue(encoder.encode(metaUpdate));
            }
          } catch {}
        });
      } catch (orErr) {
        console.warn("Vercel AI SDK OpenRouter stream failed, falling back:", orErr);
      }
    }

    // 2. GOOGLE GEMINI STREAMING
    const geminiKey =
      clientGeminiApiKey ||
      process.env.GEMINI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
      "";

    if (geminiKey && stream) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash",
          systemInstruction: SYSTEM_PROMPT,
        });

        const chatHistory = Array.isArray(history)
          ? history.slice(-8).map((h: { role: "user" | "model"; parts: string }) => ({
              role: h.role === "user" ? "user" : "model",
              parts: [{ text: h.parts }],
            }))
          : [];

        const chat = model.startChat({ history: chatHistory });
        const resultStream = await chat.sendMessageStream(message);

        return createStreamResponse(async (controller) => {
          for await (const chunk of resultStream.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              const payload = JSON.stringify({ type: "chunk", text: chunkText }) + "\n";
              controller.enqueue(encoder.encode(payload));
            }
          }
        });
      } catch (geminiErr) {
        console.warn("Gemini stream failed, falling back:", geminiErr);
      }
    }

    // 3. ZERO-LATENCY HIGH-SPEED LOCAL STREAM GENERATOR
    const answerText = sanitizeAiReply(generateIntelligentAnswer(message));

    if (!stream) {
      return NextResponse.json({
        text: answerText,
        toolCall,
        provider: "local",
      });
    }

    return createStreamResponse(async (controller) => {
      // Split into word tokens and stream with micro-pauses for smooth typewriter streaming
      const tokens = answerText.split(/(\s+)/);
      for (const token of tokens) {
        const payload = JSON.stringify({ type: "chunk", text: token }) + "\n";
        controller.enqueue(encoder.encode(payload));
        // Micro pause between tokens for realistic streaming feel
        await new Promise((r) => setTimeout(r, 18));
      }
    });
  } catch (error: unknown) {
    console.error("AI Chat Route Error:", error);
    const fallbackText = "Fuggedaboutit! Toni Lee is on duty. Ask me anything about our bespoke cuts, Kevlar armor, or styling for your next sit-down.";
    return NextResponse.json({ text: fallbackText, provider: "local" });
  }
}

// Comprehensive Natural Language Answer Synthesizer with Strict Word-Boundary Matching
function generateIntelligentAnswer(query: string): string {
  const lower = query.toLowerCase().trim();

  // Strict word-boundary matching helper
  const hasWord = (...words: string[]) =>
    words.some((w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(lower));

  // Multi-word phrase matching
  const hasPhrase = (...phrases: string[]) =>
    phrases.some((p) => lower.includes(p.toLowerCase()));

  // 0. SITE INTERACTION: REMOVE FROM BRIEFCASE / CART
  if (
    hasWord("remove", "delete", "drop", "discard", "purge") ||
    hasPhrase("take out", "take off", "get rid of", "cancel item", "clear cart", "empty cart", "empty briefcase")
  ) {
    if (hasPhrase("clear", "empty", "all", "everything", "purge")) {
      return "All commissions purged from your Black Ledger briefcase, boss. Completely wiped clean.";
    }
    for (const suit of SUITS) {
      const shortName = suit.name.toLowerCase().replace(/^the\s+/, "");
      if (lower.includes(suit.id) || lower.includes(suit.name.toLowerCase()) || hasWord(shortName)) {
        return `Removed ${suit.name} from your Black Ledger briefcase, boss. No paper trail left behind.`;
      }
    }
    return "Removed the commission from your Black Ledger briefcase, boss. No paper trail left behind.";
  }

  // 0. SITE INTERACTION: ADD TO BRIEFCASE / CART
  for (const suit of SUITS) {
    const shortName = suit.name.toLowerCase().replace(/^the\s+/, "");
    if (lower.includes(suit.id) || lower.includes(suit.name.toLowerCase()) || hasWord(shortName)) {
      if (
        hasWord("add", "buy", "order", "purchase", "pack", "bag") ||
        hasPhrase("into cart", "to cart", "in cart", "into briefcase", "in briefcase")
      ) {
        return `Discreetly packed ${suit.name} into your Black Ledger briefcase, boss. Hand-rolled ${suit.fabrics[0].name} with matching trousers and ${suit.bulletproofRating} protection included.`;
      }
    }
  }

  // 1. SITE INTERACTION: SHOP NAVIGATION
  if (
    hasPhrase(
      "take me to the shop", "take me to shop", "go to shop", "open the shop",
      "open shop", "shop section", "the shop", "show the shop", "show me the shop",
      "visit shop", "the vault", "the collection", "browse the collection", "to the shop"
    ) ||
    (hasWord("shop", "store", "vault") && hasWord("take", "go", "open", "show", "visit", "lead"))
  ) {
    return "Right this way, boss! Opening the bespoke shop vault for you right now. Take a look at all 7 cuts in The Syndicate Seven!";
  }

  // 2. SITE INTERACTION: HOME NAVIGATION
  if (
    hasPhrase("take me home", "go to home", "back to home", "homepage", "front entrance") ||
    (hasWord("home", "front", "entrance") && hasWord("take", "go", "back"))
  ) {
    return "Taking you back to the front entrance of the atelier, boss!";
  }

  // 3. SITE INTERACTION: BRIEFCASE / CART OPEN
  if (
    hasPhrase("open briefcase", "open cart", "open the cart", "show my bag", "show briefcase", "view ledger", "checkout") ||
    (hasWord("briefcase", "cart", "ledger") && hasWord("open", "show", "see", "view", "check"))
  ) {
    return "Opening the Black Ledger briefcase for you now, boss. Everything strictly confidential and encrypted.";
  }

  // 3. SITE INTERACTION: BRIEFCASE / CART CLOSE
  if (
    hasPhrase("close briefcase", "close cart", "hide ledger", "hide cart") ||
    (hasWord("briefcase", "cart", "ledger") && hasWord("close", "hide", "dismiss"))
  ) {
    return "Briefcase secured and closed, boss.";
  }

  // 4. SITE INTERACTION: SECTIONS SCROLLING
  if (hasPhrase("brand story", "heritage", "who founded", "history of the atelier")) {
    return "Right away, boss! Showing you our 1928 Little Italy heritage and brand chronicle right now.";
  }
  if (hasPhrase("syndicate code", "the code", "four pillars", "4 pillars")) {
    return "Displaying The Syndicate Code—our four Kraft paper pillars of Cut, Como Fabrics, Concealed Holsters, and Silent Finishes!";
  }
  if (hasPhrase("character selector", "who are you in the syndicate", "archetypes")) {
    return "Opening the Syndicate Character Selector—which archetype are you stepping into today, boss?";
  }
  if (hasPhrase("carousel", "syndicate seven", "3d carousel", "all seven cuts")) {
    return "Rotating The Syndicate Seven spatial showcase on screen for you now, boss!";
  }
  if (hasPhrase("reviews", "testimonials", "what clients say", "falcone")) {
    return "Here are the words from our underworld clients—from Don Carmine Falcone to Frankie Two-Times!";
  }

  // 5. SITE INTERACTION: FILTERING
  if (hasWord("double-breasted", "double breasted")) {
    return "Filtered the collection for double-breasted power cuts—inspect The Don and The Capo, boss!";
  }
  if (hasPhrase("three piece", "3-piece", "waistcoat")) {
    return "Filtering for 3-piece executive cuts with bespoke waistcoats—check out The Boss and The Wildcard!";
  }
  if (hasWord("velvet", "gala")) {
    return "Filtered for Royale French velvet and speakeasy gala cuts—look at The Enforcer!";
  }
  if (hasWord("tactical", "covert")) {
    return "Filtered for tactical stealth cuts—inspect The Underboss with Level IV ceramic armor!";
  }
  if (hasWord("linen", "summer")) {
    return "Filtered for Mediterranean flax linen—The Consigliere in Sicilian cream is your cut!";
  }

  // 6. TOTAL SUIT COUNT & FULL LINEUP
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
    return "Fuggedaboutit! In our atelier, there are exactly 7 bespoke cuts in the entire collection—known strictly as The Syndicate Seven! 1. The Don (₹3,45,000, Onyx Black), 2. The Boss (₹3,10,000, Midnight Navy), 3. The Capo (₹2,95,000, Como Charcoal), 4. The Consigliere (₹2,80,000, Sicilian Cream), 5. The Wildcard (₹2,75,000, Royal Cobalt), 6. The Enforcer (₹2,65,000, Royale Burgundy), and 7. The Underboss (₹2,50,000, Tactical Olive). Every single cut includes matching tailored trousers and Level III-A Kevlar armor, capisce?";
  }

  // 7. IDENTITY & NAME
  if (
    hasPhrase("what is your name", "what's your name", "whats your name", "what is you name", "who are you", "who is toni", "your name", "tell me your name", "what do they call you") ||
    (hasWord("name") && hasWord("your", "you", "whats", "what"))
  ) {
    return "I'm Toni Lee—Master Tailor & Consigliere to the Five Families for over 30 years. I dress the bosses in this town and engineer bespoke bulletproof suits in pure syndicate gold.";
  }

  // 8. BRAND ORIGIN & LORE
  if (hasPhrase("origin", "founded", "history", "where are you from", "little italy", "brooklyn", "est 1928")) {
    return "Syndicate Suits was founded in 1928 in Brooklyn, Little Italy. For three generations, our master tailors have dressed the Five Families with razor-sharp Italian wool and certified ballistic armor. In this town, respect is earned, and we stitch it into every lapel.";
  }

  // 9. COLORS & COLOR PALETTE
  if (
    hasWord("color", "colors", "colour", "colours", "shade", "shades", "palette") ||
    hasPhrase("all color", "all colors", "what color", "what colors", "available color", "available colors", "which color", "which colors")
  ) {
    return "Our bespoke palette features Classic Onyx Black (The Don), Midnight Navy (The Boss), Como Charcoal (The Capo), Sicilian Cream (The Consigliere), Royale Burgundy Velvet (The Enforcer), Covert Olive (The Underboss), and Royal Cobalt Blue (The Wildcard). You can also customize custom silk linings in Ruby Red, Speakeasy Gold, and Obsidian.";
  }

  // 10. SHOES & FOOTWEAR
  if (hasWord("shoe", "shoes", "footwear", "oxford", "oxfords", "brogue", "brogues", "boot", "boots", "loafers", "leather") || hasPhrase("is shoes", "are shoes", "sell shoes", "shoes available")) {
    return "Yes, boss! We offer handcrafted Italian calfskin oxfords and burnished brogues with silent rubberized shock soles—engineered for supreme boardroom presence and completely silent footsteps.";
  }

  // 11. TROUSERS & PANTS
  if (hasWord("trouser", "trousers", "pant", "pants", "slack", "slacks", "bottom", "bottoms") || hasPhrase("is trousers", "are trousers", "pants available", "trousers available")) {
    return "Yes, boss! Every single Syndicate suit order includes matching bespoke tailored trousers (pants) crafted from the exact same Super-180s wool, Italian velvet, or Sicilian linen. They feature an anti-crease lounge cut, reinforced holster waistband, and silent concealed pocket linings.";
  }

  // 12. FABRICS & MATERIALS
  if (hasWord("fabric", "fabrics", "material", "materials", "wool", "velvet", "linen", "pinstripe", "chalkstripe", "silk", "houndstooth")) {
    return "We craft our suits using authentic Italian Super-180s worsted wool, Como charcoal worsted, Royale French velvet, Sicilian chalk-stripe linen, and bulletproof micro-Kevlar blends. Every weave is wrinkle-resistant and bullet-shielded.";
  }

  // 13. WHAT IS INCLUDED / SUIT SET
  if (hasPhrase("what is included", "what comes with", "what do i get", "full set", "full ensemble", "just the jacket", "only jacket", "separate pieces")) {
    return "Every order is a complete bespoke ensemble: the tailored ballistic jacket with Level III-A Kevlar core, matching bespoke trousers, and discreet dispatch inside our combination-locked aluminum briefcase. Matching waistcoats and silk shirts can also be configured.";
  }

  // 14. SHIRTS, TIES & ACCESSORIES
  if (hasWord("shirt", "shirts", "collar", "tie", "ties", "necktie", "cufflink", "cufflinks") || hasPhrase("bow tie", "pocket square")) {
    return "We pair our suits with crisp Italian cotton dress shirts (pointed or spread collars) and pure ruby red or onyx Italian silk neckties with 24k gold Syndicate tie bars, dice cufflinks, and silk pocket squares.";
  }

  // 15. WAISTCOATS & VESTS
  if (hasWord("waistcoat", "waistcoats", "vest", "vests") || hasPhrase("3 piece", "3-piece", "three piece")) {
    return "The Boss (₹3,10,000) comes standard as a full 3-piece cut with a tailored double-breasted waistcoat and gold watch chain loop. Matching bespoke waistcoats can also be custom-tailored for any silhouette in the atelier.";
  }

  // 16. FEDORAS & HATS
  if (hasWord("fedora", "fedoras", "hat", "hats", "cap", "caps", "headwear")) {
    return "We craft classic teardrop-pinched felt fedoras with crimson silk bands and 24k gold Syndicate pins, as well as heavy solid gold Cuban link chains and brass dice cuff buttons.";
  }

  // 17. BULLETPROOF / KEVLAR PROTECTION
  if (hasWord("bulletproof", "kevlar", "bullet", "bullets", "armor", "ballistic", "shoot", "gun", "guns", "9mm", "magnum", "safety", "protection")) {
    return "Every Syndicate suit is reinforced with certified Level III-A ballistic Kevlar chest cores. It stops 9mm, .44 Magnum, and back-alley blades with zero outward bulge, keeping your silhouette razor-sharp.";
  }

  // 18. CONCEALED HOLSTERS
  if (hasWord("holster", "holsters") || hasPhrase("secret pocket", "hidden pocket", "concealed carry", "cigar pocket", "flask pocket")) {
    return "Every jacket features dual counter-balanced quick-draw shoulder holster loops with silent magnetic closures, plus hidden compartments for passports, cigars, and ledger documents.";
  }

  // 19. SIZING & FIT
  if (hasWord("size", "sizing", "sizes", "measurement", "measurements", "fit", "fitting", "alteration", "alterations") || hasPhrase("38r", "40r", "42r", "44r", "46l", "48l", "50l", "52l")) {
    return "We stock sizes from 38R to 52L in Regular and Long cuts for both jacket and trousers. Every order is reviewed by Toni Lee's private master tailors, with lifetime free alterations to ensure an unyielding bespoke fit.";
  }

  // 20. VIP DISCOUNTS
  if (hasWord("discount", "discounts", "coupon", "promo", "code", "deal", "deals", "save", "offer", "voucher") || hasPhrase("corleone", "five families", "cheaper price")) {
    return "Use secret syndicate passcode DON_CORLEONE for 35% off, FIVE_FAMILIES for 30% off, or TONI_SPECIAL for 25% off your entire Black Ledger order at checkout!";
  }

  // 21. PRICES & COST
  if (hasWord("price", "prices", "cost", "pricing", "rate", "rates", "expensive", "cheapest", "affordable", "rupee", "rupees", "inr", "currency") || hasPhrase("how much")) {
    if (hasWord("cheapest", "lowest", "budget", "affordable")) {
      return "Our most accessible silhouette is The Underboss in covert olive at ₹2,50,000, complete with matching trousers and Level IV Stealth ceramic-aramid protection.";
    }
    if (hasWord("expensive", "flagship", "best", "highest", "luxurious")) {
      return "The Don is our crowning masterpiece at ₹3,45,000 in Super-180s wool with Level III-A Kevlar and ruby silk lining. Followed by The Boss 3-piece at ₹3,10,000.";
    }
    return "Our bespoke ballistic suits range from ₹2,50,000 for The Underboss to ₹3,45,000 for The Don (total vault value of all 7 suits is ₹20,20,000). Every cut includes the complete suit ensemble with matching trousers and Kevlar core.";
  }

  // 22. SPECIFIC SUIT HIGHLIGHTS
  if (hasPhrase("the don", "don cut", "classic black")) {
    return "The Don (₹3,45,000) is the ultimate boss silhouette: double-breasted Onyx wool with razor peak lapels, Level III-A Kevlar chest core, and iridescent ruby red silk lining.";
  }
  if (hasPhrase("the boss", "navy suit")) {
    return "The Boss (₹3,10,000) is sovereign authority in midnight navy 3-piece bespoke, tailored double-breasted waistcoat, and vintage gold watch chain loop.";
  }
  if (hasPhrase("the capo", "charcoal suit")) {
    return "The Capo (₹2,95,000) is built from indestructible 450g Como charcoal worsted wool with garrison wide peaks, dual holster anchors, and Level III Tactical ballistic weave.";
  }
  if (hasPhrase("the consigliere", "cream suit", "linen suit")) {
    return "The Consigliere (₹2,80,000) is crafted from Sicilian cream chalk-stripe linen with Neapolitan spalla camicia and breathable heat-dissipating micro-Kevlar.";
  }
  if (hasPhrase("the enforcer", "burgundy suit", "velvet suit")) {
    return "The Enforcer (₹2,65,000) is dangerous elegance in Royale Burgundy French velvet with satin black peak lapels and multi-hit Kevlar chest inserts.";
  }
  if (hasPhrase("the underboss", "olive suit")) {
    return "The Underboss (₹2,50,000) is tactical covert olive wool with Level IV Stealth ceramic-aramid composite and acoustic noise-dampening silent lining.";
  }
  if (hasPhrase("the wildcard", "royal blue", "casino suit")) {
    return "The Wildcard (₹2,75,000) is luminous royal cobalt blue wool with metallic silver pinstripes, solid brass dice buttons, and flexible dance/sprint armhole gussets.";
  }

  // 23. OCCASIONS & EVENT ADVICE
  if (hasWord("wedding", "marriage")) {
    return "For a wedding—especially the Godfather's daughter—nothing commands respect like The Don in Classic Onyx or The Consigliere in Sicilian Cream Linen.";
  }
  if (hasWord("court", "trial", "lawyer", "judge", "legal")) {
    return "Stepping before a federal judge? Put on The Boss in Midnight Navy. The clean 3-piece waistcoat and authoritative chalk-stripe will have prosecutors dropping charges by lunch.";
  }
  if (hasWord("gala", "casino", "party", "club", "dinner")) {
    return "For high-stakes casino floors and speakeasies, suit up in The Wildcard in Royal Cobalt or The Enforcer in Imperial Burgundy Velvet. You'll own the whole room.";
  }
  if (hasWord("heist", "night", "stealth", "operation", "patrol")) {
    return "For stealth night maneuvers, The Underboss in tactical covert olive with acoustic noise-dampening lining and Level IV armor is your best ally.";
  }
  if (hasWord("funeral", "grave", "mourning")) {
    return "For a somber family farewell, The Don in Classic Onyx Black with matte noir lining is the only cut that honors the occasion with dignity.";
  }
  if (hasWord("date", "romance", "romantic")) {
    return "For a high-class dinner date, slip into The Enforcer in Burgundy Velvet or The Consigliere in Tuscan Ivory. Refined, dangerous, and unforgettable.";
  }

  // 24. FABRIC CARE & MAINTENANCE
  if (hasWord("wash", "clean", "iron", "steam", "care", "dryclean", "maintain")) {
    return "Never machine wash bespoke Super-180s wool, boss! Steam it lightly with a garment steamer, hang it on a wide wooden wishbone hanger, and let our master tailors handle the seasonal press.";
  }

  // 25. JOKES & HUMOR
  if (hasWord("joke", "jokes", "laugh", "funny", "humor")) {
    const jokes = [
      "A guy asks me if our suits are bulletproof. I told him: 'Wear The Don, and if anyone shoots at you, the bullet apologizes before it drops to the floor!' Fuggedaboutit!",
      "Why did the Don hire an Italian tailor? Because an off-the-rack suit is a federal crime in this city!",
      "I asked a guy how he liked his new pinstripe suit. He said: 'Toni, even my defense attorney started bowing when I entered the courtroom.' That's Syndicate tailoring, capisce?",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // 26. GREETINGS
  if (hasWord("hello", "hi", "hey", "howdy", "sup", "yo") || hasPhrase("good morning", "good evening", "good afternoon")) {
    return "Salute, boss! Toni Lee at your service. Tell me what kind of sit-down you're preparing for, and I'll get your silhouette fitted in pure syndicate gold.";
  }

  // 27. GRATITUDE
  if (hasWord("thanks", "thank", "appreciate", "awesome", "great", "cool", "perfect")) {
    return "Anytime, boss! Respect is earned in this family, and you wear it well. Let Toni know whenever you need another cut fitted.";
  }

  // DEFAULT
  return "Fuggedaboutit! When it comes to that, Toni Lee's rule is simple: handcrafted Italian Super-180s wool, matching tailored trousers, and certified Level III-A Kevlar make you untouchable. We have exactly 7 cuts in The Syndicate Seven ranging from ₹2,50,000 to ₹3,45,000!";
}
