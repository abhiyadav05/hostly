import { useEffect } from "react";

interface PopProps {
  projectId: string;
  url: string;
  onClose: () => void;
}

export default function Pop({ projectId, url, onClose }: PopProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg rounded-xl border border-white/10 bg-[#00A63E]/5 p-6 text-white backdrop-blur-md shadow-[0_0_60px_rgba(0,0,0,0.7)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Deployment created</h2>
            <p className="mt-1 text-sm text-white/70">
              Your project is live on the server after 15 to 20 seconds please wait...
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80 transition hover:bg-white/10"
            aria-label="Close"
          >
            Close
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/20 px-4 py-3">
            <div className="min-w-0">
              <p className="text-xs text-white/60">Project ID</p>
              <p className="truncate text-sm font-medium text-white/90">
                {projectId}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1">
              <span className="size-2 rounded-full bg-green-400 shadow-[0_0_14px_rgba(74,222,128,1)]" />
              <span className="text-xs font-medium text-green-200">
                Live on server
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-white/60">Project URL</p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block break-all text-sm font-medium text-white/90 underline decoration-white/20 underline-offset-4 transition hover:decoration-white/60"
            >
              {url}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

