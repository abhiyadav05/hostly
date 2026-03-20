import { LogIn, UserPlus } from "lucide-react";
import { SignOutButton, UserButton, useAuth } from "@clerk/react";

type View = "home" | "login" | "signup";

interface NavbarProps {
  currentView: View;
  onChangeView: (view: View) => void;
}

export default function Navbar({ currentView, onChangeView }: NavbarProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const navItemClasses = (active: boolean) =>
    `flex items-center gap-1.5 px-4 py-2 rounded-full text-xs md:text-sm transition-all duration-300 cursor-pointer ${
      active
        ? "bg-green-600 text-white shadow-[0_0_25px_rgba(34,197,94,0.55)]"
        : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-20">
      <nav className="mx-auto mt-4 max-w-6xl rounded-full border border-white/10 bg-black/70 px-4 py-2.5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-all duration-500">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-amber-50 shadow-[0_0_25px_rgba(34,197,94,0.8)]">
              <img src="Hostly-Logo.png" alt="Hostly Logo" className="size-5 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green-300/90">
                Hostly
              </p>
              <p className="text-[10px] text-white/50">
                Zero-friction deployment platform
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              className={navItemClasses(currentView === "home")}
              onClick={() => onChangeView("home")}
            >
              <span className="size-1.5 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
              <span>Deploy</span>
            </button>

            {!isLoaded || !isSignedIn ? (
              <>
                <button
                  className={navItemClasses(currentView === "login")}
                  onClick={() => onChangeView("login")}
                >
                  <LogIn className="size-3.5" />
                  <span>Login</span>
                </button>

                <button
                  className={navItemClasses(currentView === "signup")}
                  onClick={() => onChangeView("signup")}
                >
                  <UserPlus className="size-3.5" />
                  <span>Sign up</span>
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <SignOutButton redirectUrl="/">
                    <button
                      type="button"
                      className={navItemClasses(false)}
                      aria-label="Logout"
                    >
                      Logout
                    </button>
                  </SignOutButton>
                  <UserButton />
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {!isLoaded || !isSignedIn ? (
              <>
                <button
                  className={navItemClasses(currentView === "login")}
                  onClick={() => onChangeView("login")}
                >
                  <LogIn className="size-3.5" />
                </button>
                <button
                  className={navItemClasses(currentView === "signup")}
                  onClick={() => onChangeView("signup")}
                >
                  <UserPlus className="size-3.5" />
                </button>
              </>
            ) : (
              <>
                <SignOutButton redirectUrl="/">
                  <button
                    type="button"
                    className={navItemClasses(false)}
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </SignOutButton>
                <UserButton />
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

