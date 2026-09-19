import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const tabs = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Analyze CV", to: "/analyze-cv" },
  { label: "Job Match", to: "/job-match" },
  { label: "Interview Prep", to: "/interview-prep" },
  { label: "Applications", to: "/applications" },
];

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 py-4">
      <div className="max-w-6xl mx-auto px-6">
        <div className="glass-strong rounded-pill px-4 py-2.5 flex items-center justify-between gap-4 shadow-glass">
          <Link to="/dashboard" className="flex items-center gap-2.5 shrink-0">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-light via-violet to-blue flex items-center justify-center text-sm">
              ✦
            </span>
            <span className="font-display font-semibold text-ink-100 hidden sm:inline">
              AI CareerPilot
            </span>
          </Link>

          <nav className="flex items-center gap-1 overflow-x-auto">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-pill px-3.5 py-2 text-sm transition-colors ${
                    isActive ? "bg-white/10 text-ink-100" : "text-ink-300 hover:text-ink-100"
                  }`
                }
              >
                {t.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/profile" className="w-9 h-9 rounded-full glass flex items-center justify-center text-xs text-ink-100" title={user?.name}>
              {user?.name?.slice(0, 2)?.toUpperCase() || "?"}
            </Link>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="text-sm text-ink-500 hover:text-ink-100 transition-colors hidden sm:block"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
