import { useState } from "react";
import Loader from "@/components/ui/Loader";

interface Props {
  value: string;
  isLoading?: boolean;
}

export default function OutputEditor({ value, isLoading }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-[220px] w-full rounded-2xl border border-slate-200 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 text-base dark:border-slate-800 shadow-sm transition-all overflow-hidden group">
      {value && !isLoading && (
        <button
          onClick={handleCopy}
          className="absolute right-4 top-4 rounded-xl bg-white dark:bg-slate-800 p-2 text-slate-500 shadow-sm border border-slate-200 dark:border-slate-700 hover:text-blue-600 hover:scale-105 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          title="Copy to clipboard"
        >
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          )}
        </button>
      )}

      {isLoading && <Loader />}

      {!isLoading && (
        <pre className="whitespace-pre-wrap text-slate-900 dark:text-slate-100 font-sans pr-10">
          {value || <span className="text-slate-400 font-sans italic text-sm">AI output will appear here...</span>}
        </pre>
      )}
    </div>
  );
}
