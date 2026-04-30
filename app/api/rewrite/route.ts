import { NextResponse } from "next/server";
import { OpenRouter } from "@openrouter/sdk";

export async function POST(req: Request) {
  try {
    const { text, tone } = await req.json();

    if (!text || !tone) {
      return NextResponse.json(
        { error: "Text and tone are required" },
        { status: 400 }
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
    } else if (typeof tone === "object") {
      const active_tones = Object.entries(tone as Record<string, number>)
        .filter(([_, value]) => value > 0)
        .map(([key, value]) => `${value}% ${key} (${tone_descriptions[key] || key})`);
      
      if (active_tones.length === 0) {
        tone_instruction = "a neutral tone";
      } else {
        tone_instruction = `a mix of tones: ${active_tones.join(", ")}`;
      }
    }

    const openrouter = new OpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY
    });

    const response = await openrouter.chat.send({
      chatRequest: {
        model: "openrouter/free",
        messages: [
          {
            role: "system",
            content: `You are an expert editor. Rewrite the provided text to match ${tone_instruction}. Keep the core meaning the same but adjust the vocabulary, structure, and style to fit the requested tone mix perfectly. Return ONLY the rewritten text without any explanations or introductory remarks.`
          },
          {
            role: "user",
            content: text
          }
        ],
      },
      appTitle: "Wordcraft AI",
    });

    const rewrittenText = typeof response.choices[0].message.content === 'string' 
      ? response.choices[0].message.content.trim() 
      : "";
    return NextResponse.json({ text: rewrittenText });

  } catch (error) {
    console.error("Rewrite API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
