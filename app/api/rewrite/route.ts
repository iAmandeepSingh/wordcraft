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

    const toneDescriptions: Record<string, string> = {
      professional: "formal, objective, and authoritative",
      balanced: "semi-professional, polished yet accessible and approachable",
      casual: "informal, relaxed, and conversational",
      friendly: "warm, inviting, and person-centered",
      persuasive: "compelling, convincing, and action-oriented",
    };

    const description = toneDescriptions[tone] || tone;

    const openrouter = new OpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY
    });

    const response = await openrouter.chat.send({
      chatRequest: {
        model: "openrouter/free",
        messages: [
          {
            role: "system",
            content: `You are an expert editor. Rewrite the provided text to match a "${tone}" tone (${description}). Keep the core meaning the same but adjust the vocabulary, structure, and style to fit the requested tone perfectly. Return ONLY the rewritten text without any explanations or introductory remarks.`
          },
          {
            role: "user",
            content: text
          }
        ],
      },
      // httpReferer: "https://wordcraft-ai.vercel.app",
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
