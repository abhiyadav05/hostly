import react from "react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black/90 py-6 text-xs text-white/60">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-32 right-1/3 h-40 w-40 rounded-full bg-green-500/20 blur-3xl" />
        <div className="absolute -top-24 left-1/4 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
        <div className="space-y-1 transition-transform duration-500 hover:-translate-y-0.5">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-green-300/80">
            Hostly Deployment
          </p>
          <p className="text-[11px] text-white/50">
            Deploy from GitHub in minutes with zero manual setup.
          </p>
        </div>

        <div className="flex items-center gap-5 text-[11px]">
          <button className="transition-all duration-300 hover:-translate-y-0.5 hover:text-green-300">
            Status
          </button>
          <button className="transition-all duration-300 hover:-translate-y-0.5 hover:text-green-300">
            Docs
          </button>
          <button className="transition-all duration-300 hover:-translate-y-0.5 hover:text-green-300">
            Support
          </button>
        </div>
      </div>
    </footer>
  );
}

