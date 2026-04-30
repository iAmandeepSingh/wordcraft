import { useState } from "react";
import Button from "@/components/ui/Button";

type ToneMix = Record<string, number>;

export default function Controls({
  toneMix,
  setToneMix,
  onRewrite,
  isLoading,
}: {
  toneMix: ToneMix;
  setToneMix: (value: ToneMix) => void;
  onRewrite: () => void;
  isLoading: boolean;
}) {
  const [mode, setMode] = useState<'single' | 'mix'>('single');

  const tones = [
    { label: "Professional", value: "professional", color: "bg-blue-500" },
    { label: "Balanced", value: "balanced", color: "bg-emerald-500" },
    { label: "Casual", value: "casual", color: "bg-amber-500" },
    { label: "Friendly", value: "friendly", color: "bg-pink-500" },
    { label: "Persuasive", value: "persuasive", color: "bg-indigo-500" },
  ];

  const handleSliderChange = (tone: string, value: number) => {
    setToneMix({
      ...toneMix,
      [tone]: value,
    });
  };

  const handleSingleSelect = (toneValue: string) => {
    const newMix = tones.reduce((acc, t) => {
      acc[t.value] = t.value === toneValue ? 100 : 0;
      return acc;
    }, {} as ToneMix);
    setToneMix(newMix);
  };

  const handleReset = () => {
    const resetMix = Object.keys(toneMix).reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {} as ToneMix);
    setToneMix(resetMix);
  };

  const total = Object.values(toneMix).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col gap-6 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Rewrite Mode</h3>
            <p className="text-xs text-slate-500">How would you like to adjust the tone?</p>
          </div>
          
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl w-fit">
            <button 
              onClick={() => setMode('single')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                mode === 'single' 
                  ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Single Tone
            </button>
            <button 
              onClick={() => setMode('mix')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                mode === 'mix' 
                  ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Tone Mixer
            </button>
          </div>
        </div>

        {mode === 'single' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {tones.map((t) => {
                const isActive = toneMix[t.value] === 100 && total === 100;
                return (
                  <button
                    key={t.value}
                    onClick={() => handleSingleSelect(t.value)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold border transition-all duration-300 flex flex-col items-center gap-2 group ${
                      isActive 
                        ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400 ring-2 ring-blue-500/10' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:border-blue-900/50 dark:hover:text-blue-400'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${t.color} shadow-sm transition-transform group-hover:scale-110 ${isActive ? 'ring-4 ring-blue-500/20' : 'opacity-40 group-hover:opacity-100'}`} />
                    {t.label}
                  </button>
                );
              })}
            </div>
            {total !== 100 && total > 0 && (
              <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg w-fit">
                ⚠️ Note: You have a custom mix active. Selecting a tone will reset it to 100%.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-5 transition-all duration-500 ease-in-out">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${
                total > 100 
                  ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                Total Mix: {total}%
              </span>
              <button 
                onClick={handleReset}
                className="text-xs text-blue-500 hover:text-blue-600 transition-colors font-semibold flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Mixer
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
              {tones.map((t) => (
                <div key={t.value} className="group space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {t.label}
                    </span>
                    <span className="text-slate-400 font-mono text-xs bg-slate-50 dark:bg-slate-800/50 px-1.5 py-0.5 rounded">
                      {toneMix[t.value]}%
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={toneMix[t.value]}
                      onChange={(e) => handleSliderChange(t.value, parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button 
          variant="primary" 
          onClick={onRewrite} 
          disabled={isLoading || total === 0} 
          className="flex-1 py-3 text-base font-semibold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-transform"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Crafting...</span>
            </div>
          ) : mode === 'single' ? "Rewrite Text" : "Rewrite with Mix"}
        </Button>
      </div>
    </div>
  );
}
