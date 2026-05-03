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
  const [activeMode, setActiveMode] = useState<"rewrite" | "summarize" | "expand">("rewrite");

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setOutput("");

    try {
      const response = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: input, 
          tone: activeMode === "rewrite" ? toneMix : undefined,
          mode: activeMode 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process text");
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

      <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Input */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 bg-blue-600 rounded-full" />
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Your Input</h2>
          </div>

          <InputEditor value={input} onChange={setInput} />

          <Controls
            activeMode={activeMode}
            setActiveMode={setActiveMode}
            toneMix={toneMix}
            setToneMix={setToneMix}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </div>

        {/* Output */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 bg-purple-600 rounded-full" />
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">AI Output</h2>
          </div>

          <OutputEditor
            value={output}
            isLoading={isLoading}
          />
        </div>
      </section>
    </main>
  );
}
