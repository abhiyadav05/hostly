
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import { useAuth } from "@clerk/react";

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  const [view, setView] = useState<"home" | "login" | "signup">("home");
  const effectiveView: "home" | "login" | "signup" =
    isLoaded && isSignedIn ? "home" : view;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar currentView={effectiveView} onChangeView={setView} />

      {effectiveView === "home" && (
        <Home onLogin={() => setView("login")} onSignup={() => setView("signup")} />
      )}
      {effectiveView === "login" && <Login />}
      {effectiveView === "signup" && <Signup />}

      <Footer />
    </div>
  );
}

export default App;
