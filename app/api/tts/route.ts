import { NextRequest, NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text") || "";

  if (!text.trim()) {
    return new NextResponse("Text parameter is required", { status: 400 });
  }

  try {
    // Sanitize text for ultra-fluid human speech
    const cleanText = text
      .replace(/₹\s?3,45,000/g, "345 thousand rupees")
      .replace(/₹\s?3,10,000/g, "310 thousand rupees")
      .replace(/₹\s?2,95,000/g, "295 thousand rupees")
      .replace(/₹\s?2,80,000/g, "280 thousand rupees")
      .replace(/₹\s?2,65,000/g, "265 thousand rupees")
      .replace(/₹\s?2,50,000/g, "250 thousand rupees")
      .replace(/₹\s?2,75,000/g, "275 thousand rupees")
      .replace(/₹\s?(\d+),?(\d+)?/g, "$1 thousand rupees")
      .replace(/Level\s+III-A/gi, "Level Three A")
      .replace(/Level\s+II-A/gi, "Level Two A")
      .replace(/Level\s+IV/gi, "Level Four")
      .replace(/Level\s+III/gi, "Level Three")
      .replace(/Level\s+II/gi, "Level Two")
      .replace(/[\/\\]/g, " ")
      .replace(/[()\[\]{}]/g, " ")
      .replace(/[*_~`#]/g, "")
      .replace(/—/g, ", ")
      .replace(/--/g, ", ")
      .replace(/:/g, ", ")
      .replace(/;/g, ", ")
      .replace(/\s+/g, " ")
      .slice(0, 320)
      .trim();

    const tts = new MsEdgeTTS();
    // Use en-US-ChristopherNeural or en-US-GuyNeural for warm, authentic human conversational male voice
    await tts.setMetadata("en-US-ChristopherNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

    const streamResult = tts.toStream(cleanText) as unknown as {
      audioStream?: NodeJS.ReadableStream;
      on?: NodeJS.ReadableStream["on"];
    };
    const audioStream = (streamResult.audioStream || streamResult) as NodeJS.ReadableStream;
    const chunks: Buffer[] = [];

    const audioBuffer = await new Promise<Buffer>((resolve, reject) => {
      audioStream.on("data", (chunk: Buffer) => chunks.push(chunk));
      audioStream.on("end", () => resolve(Buffer.concat(chunks)));
      audioStream.on("error", (err: unknown) => reject(err));
    });

    return new NextResponse(new Uint8Array(audioBuffer), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error: unknown) {
    console.error("Neural TTS API Error:", error);
    return new NextResponse("TTS Generation Failed", { status: 500 });
  }
}
