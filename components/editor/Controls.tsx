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
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Tone Mix</h3>
            <p className="text-xs text-slate-500">Blend different styles for your output</p>
          </div>
          <div className="flex flex-col items-end">
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${total > 100 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
              Total: {total}%
            </span>
            <button 
              onClick={handleReset}
              className="mt-1 text-xs text-blue-500 hover:text-blue-600 transition-colors font-medium"
            >
              Reset All
            </button>
          </div>
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
                  value={toneMix[t.value]}
                  onChange={(e) => handleSliderChange(t.value, parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          ))}
        </div>
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
          ) : "Rewrite with this Mix"}
        </Button>
      </div>
    </div>
  );
}
