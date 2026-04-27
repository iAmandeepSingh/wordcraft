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
    <div className="relative min-h-[220px] w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm">
      {value && !isLoading && (
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 rounded-md bg-white p-1.5 text-gray-500 shadow-sm border border-gray-200 hover:text-blue-600 transition-colors"
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
        <pre className="whitespace-pre-wrap text-gray-800 pr-8">
          {value || "AI output will appear here..."}
        </pre>
      )}
    </div>
  );
}
