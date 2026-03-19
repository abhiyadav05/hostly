import { RedirectToSignUp, useAuth } from "@clerk/react";
import { useEffect, useState } from "react";

export default function Signup() {
  const { isLoaded, isSignedIn } = useAuth();
  const [entered, setEntered] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setEntered(true), 40);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) return;

    // Give the animation a moment, then hand off to Clerk.
    const t = window.setTimeout(() => setShouldRedirect(true), 700);
    return () => window.clearTimeout(t);
  }, [isLoaded, isSignedIn]);

  if (isLoaded && isSignedIn) {
    return (
      <section className="relative flex min-h-[80vh] items-center justify-center bg-black px-4 pt-24 pb-16">
        <div className="pointer-events-none fixed left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/35 blur-[210px]" />
        <div className="relative z-10 rounded-2xl border border-white/10 bg-[#00A63E]/5 p-8 text-center shadow-[0_0_50px_rgba(0,0,0,0.9)] backdrop-blur-md">
          <p className="text-white/70">You are already signed in.</p>
          <p className="mt-2 text-sm text-white/60">
            Redirecting back to Home…
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center bg-black px-4 pt-24 pb-16">
      <div className="pointer-events-none fixed left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/35 blur-[210px]" />

      <div className="relative z-10 grid w-full max-w-4xl gap-12 md:grid-cols-[1.1fr,1fr]">
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-900/70 bg-black/60 px-3 py-1 text-[11px] text-slate-200/80 shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur">
            <span className="size-1.5 rounded-full bg-green-400 shadow-[0_0_14px_rgba(74,222,128,1)]" />
            <span>Create your Hostly account</span>
          </div>
          <h1
            className="bg-linear-to-r from-white to-green-300 bg-clip-text text-3xl font-medium text-transparent md:text-4xl/relaxed"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? "translateY(0px)" : "translateY(12px)",
              transition: "opacity 700ms ease, transform 700ms ease",
            }}
          >
            Sign up and deploy your first project.
          </h1>
          <p
            className="max-w-md text-sm text-white/60"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? "translateY(0px)" : "translateY(12px)",
              transition: "opacity 700ms ease, transform 700ms ease",
            }}
          >
            We'll redirect you to Clerk to create your account securely.
          </p>
        </div>

        <div
          className={`relative rounded-2xl border border-white/10 bg-[#00A63E]/5 p-6 text-center shadow-[0_0_50px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-700 hover:border-green-500/60 hover:shadow-[0_0_55px_rgba(22,163,74,0.6)] ${
            entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } ${shouldRedirect ? "opacity-0 translate-y-2 scale-[0.98]" : ""}`}
        >
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-600/90 shadow-[0_0_25px_rgba(34,197,94,0.7)]">
            <div className="size-3.5 animate-spin rounded-full border-2 border-white/70 border-t-white" />
          </div>
          <p className="mt-4 text-sm font-medium text-white">
            {shouldRedirect ? "Redirecting to Clerk…" : "Preparing sign up…"}
          </p>
          <p className="mt-2 text-xs text-white/60">
            If you are not redirected automatically, click the button
            below.
          </p>

          <button
            type="button"
            onClick={() => setShouldRedirect(true)}
            className="mt-5 w-full rounded-full bg-linear-to-r from-green-950 to-green-600 px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_30px_rgba(22,163,74,0.6)] transition-all duration-300 hover:from-green-600 hover:to-green-950"
          >
            Continue to Sign up
          </button>

          {shouldRedirect && <RedirectToSignUp forceRedirectUrl="/" />}
        </div>
      </div>
    </section>
  );
}

