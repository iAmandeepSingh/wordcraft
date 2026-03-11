export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            Wordcraft
          </span>
          <span className="rounded-full bg-blue-100/80 px-2 py-0.5 text-xs font-medium text-blue-700">
            AI
          </span>
        </div>

        {/* Center: Tagline */}
        <p className="hidden text-sm text-gray-500 md:block">
          Craft better words with AI
        </p>

        {/* Right: Empty for balance / future use */}
        <div className="w-[80px]" />

      </div>
    </header>
  );
}
