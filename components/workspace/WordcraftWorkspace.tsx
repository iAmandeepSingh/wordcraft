"use client";

import { useState } from "react";

import InputEditor from "@/components/editor/InputEditor";
import OutputEditor from "@/components/editor/OutputEditor";
import Controls from "@/components/editor/Controls";
import Alert from "@/components/ui/Alert";

export default function WordcraftWorkspace() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [toneMix, setToneMix] = useState<Record<string, number>>({
    professional: 100,
    balanced: 0,
    casual: 0,
    friendly: 0,
    persuasive: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setOutput("");

    try {
      const response = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, tone: toneMix }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to rewrite text");
      }

      setOutput(data.text);
    } catch (error: any) {
      console.error(error);
      setOutput("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <Alert
        type="info"
        message="Craft better words with AI — paste your text and choose a mode."
      />

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Input */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Your Input</h2>

          <InputEditor value={input} onChange={setInput} />

          <Controls
            toneMix={toneMix}
            setToneMix={setToneMix}
            onRewrite={handleGenerate}
            isLoading={isLoading}
          />
        </div>

        {/* Output */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">AI Output</h2>

          <OutputEditor
            value={output}
            isLoading={isLoading}
          />
        </div>
      </section>
    </main>
  );
}
