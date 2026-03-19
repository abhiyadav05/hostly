import react, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: react.FormEvent) => {
    e.preventDefault();
    // Replace with your auth logic
    console.log("Login", { email, password });
  };

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center bg-black px-4 pt-24 pb-16">
      <div className="pointer-events-none fixed left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/30 blur-[200px]" />

      <div className="relative z-10 grid w-full max-w-4xl gap-12 md:grid-cols-[1.1fr,1fr]">
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-900/70 bg-black/60 px-3 py-1 text-[11px] text-slate-200/80 shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur">
            <span className="size-1.5 rounded-full bg-green-400 shadow-[0_0_14px_rgba(74,222,128,1)]" />
            <span>Welcome back to Hostly</span>
          </div>
          <h1 className="bg-linear-to-r from-white to-green-300 bg-clip-text text-3xl font-medium text-transparent md:text-4xl/relaxed">
            Login to manage your deployments.
          </h1>
          <p className="max-w-md text-sm text-white/60">
            Access your projects, review build logs, and trigger new
            deployments from a single, clean dashboard experience.
          </p>
        </div>

        <div className="relative rounded-2xl border border-white/10 bg-[#00A63E]/5 p-6 shadow-[0_0_50px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-500 hover:border-green-500/60 hover:shadow-[0_0_50px_rgba(22,163,74,0.55)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs text-white/80">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/20 bg-[#00A63E]/5 px-4 py-2.5 text-sm text-white/80 placeholder:text-white/40 focus:border-green-600 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-white/80">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-white/20 bg-[#00A63E]/5 px-4 py-2.5 text-sm text-white/80 placeholder:text-white/40 focus:border-green-600 focus:outline-none transition"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-white/60">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="size-3.5 rounded border border-white/30 bg-black/60 text-green-500"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="text-white/70 transition-colors hover:text-green-300"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="mt-1 w-full rounded-full bg-linear-to-r from-green-950 to-green-600 px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_30px_rgba(22,163,74,0.6)] transition-all duration-300 hover:from-green-600 hover:to-green-950 hover:-translate-y-0.5"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

