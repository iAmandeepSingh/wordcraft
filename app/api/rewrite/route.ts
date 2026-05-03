import { NextResponse } from "next/server";
import { OpenRouter } from "@openrouter/sdk";

export async function POST(req: Request) {
  try {
    const { text, tone, mode = "rewrite" } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 },
      );
    }

    if (mode === "rewrite" && !tone) {
      return NextResponse.json(
        { error: "Tone is required for rewrite mode" },
        { status: 400 },
      );
    }

    const tone_descriptions: Record<string, string> = {
      professional: "formal, objective, and authoritative",
      balanced: "semi-professional, polished yet accessible and approachable",
      casual: "informal, relaxed, and conversational",
      friendly: "warm, inviting, and person-centered",
      persuasive: "compelling, convincing, and action-oriented",
    };

    let tone_instruction = "";
    if (typeof tone === "string") {
      const description = tone_descriptions[tone] || tone;
      tone_instruction = `a "${tone}" tone (${description})`;
    } else if (typeof tone === "object" && tone !== null) {
      const active_tones = Object.entries(tone as Record<string, number>)
        .filter(([_, value]) => value > 0)
        .map(
          ([key, value]) =>
            `${value}% ${key} (${tone_descriptions[key] || key})`,
        );

      if (active_tones.length === 0) {
        tone_instruction = "a neutral tone";
      } else {
        tone_instruction = `a mix of tones: ${active_tones.join(", ")}`;
      }
    }

    const openrouter = new OpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    let systemPrompt = "";

    if (mode === "summarize") {
      systemPrompt = `
          You are an expert at summarizing text.
          Your task is to provide a concise summary of the given text while preserving all key information and the core message.
          
          Rules:
          - Be brief but comprehensive.
          - Use clear and direct language.
          - Maintain a professional and objective tone.
          - Do NOT include introductions or conclusions.
          - Return the output in clean Markdown format.
          - Output ONLY the summarized text.
      `;
    } else if (mode === "expand") {
      systemPrompt = `
          You are an expert at expanding text with precision.
          Your task is to provide a more detailed and descriptive version of the input text while maintaining the original meaning and intent.
          
          Rules:
          - Add meaningful depth and context without being overly wordy.
          - Aim for a natural, engaging flow that enhances readability.
          - Avoid unnecessary fluff or repetitive sentences.
          - Ensure the output is significantly more detailed but remains concise and impactful.
          - Do NOT add false information or hallucinations.
          - Return the output in clean Markdown format.
          - Output ONLY the expanded text.
      `;
    } else {
      // Default: Rewrite
      systemPrompt = `
          You are an expert text editor.
          Your ONLY task is to rewrite the given text by changing its tone to: ${tone_instruction}.

          Strict rules:
          - Do NOT change the original meaning.
          - Do NOT add any new information.
          - Do NOT remove important information.
          - Do NOT explain anything.
          - Do NOT include introductions or conclusions.
          - Do NOT mention the tone explicitly.
          - Preserve the intent and message exactly.

          Formatting rules:
          - Return the output in clean Markdown format.
          - Preserve paragraph structure where possible.
          - Improve readability using proper sentence structure.

          Output:
          - Return ONLY the rewritten text.
          - No extra commentary, notes, or labels.
      `;
    }

    const response = await openrouter.chat.send({
      chatRequest: {
        model: "openrouter/free",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: text,
          },
        ],
      },
      appTitle: "Wordcraft AI",
    });

    const resultText =
      typeof response.choices[0].message.content === "string"
        ? response.choices[0].message.content.trim()
        : "";
    return NextResponse.json({ text: resultText });
  } catch (error) {
    console.error("Rewrite API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
