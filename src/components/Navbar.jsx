import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { label: "Product", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`flex items-center justify-between rounded-pill px-4 py-2.5 transition-all duration-300 ${
            scrolled ? "glass-strong shadow-glass" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-light via-violet to-blue flex items-center justify-center text-sm">
              ✦
            </span>
            <span className="font-display font-semibold tracking-tight text-ink-100">
              AI CareerPilot
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-ink-300 hover:text-ink-100 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <Link
            to={user ? "/dashboard" : "/signup"}
            className="rounded-pill bg-gradient-to-r from-blue-light to-violet px-4 py-2 text-sm font-medium text-canvas hover:brightness-110 transition"
          >
            {user ? "Dashboard" : "Get started"}
          </Link>
        </div>
      </div>
    </header>
  );
}
