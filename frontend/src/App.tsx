
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {

  const [view, setView] = useState<"home" | "login" | "signup">("signup");
  let [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar currentView={view} onChangeView={setView} />

      {loggedIn && view === "home" && <Home />}
      {view === "login" && <Login />}
      {view === "signup" && <Signup />}

      <Footer />
    </div>
  );
}

export default App;
