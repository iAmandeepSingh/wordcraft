"use client";

import { useState } from "react";

import InputEditor from "@/components/editor/InputEditor";
import OutputEditor from "@/components/editor/OutputEditor";
import Controls from "@/components/editor/Controls";
import Alert from "@/components/ui/Alert";

export default function WordcraftWorkspace() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (mode: string) => {
    if (!input.trim()) return;

    setIsLoading(true);
    setOutput("");

    try {
      // TODO: Replace with real API call
      await new Promise((res) => setTimeout(res, 1000));

      setOutput(
        `✨ AI Generated (${mode})\n\n` +
          input
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <Alert
        // type="info"
        message="Craft better words with AI — paste your text and choose a mode."
      />

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Input */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Your Input</h2>

          <InputEditor value={input} onChange={setInput} />

          <Controls
            onGenerate={handleGenerate}
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
