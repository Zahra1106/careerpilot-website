import { Link } from "react-router-dom";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-28">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center gap-2.5 justify-center mb-8">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-light via-violet to-blue flex items-center justify-center text-sm">
            ✦
          </span>
          <span className="font-display font-semibold text-ink-100">AI CareerPilot</span>
        </Link>

        <div className="glass-strong rounded-glass p-8 shadow-glass">
          <h1 className="font-display text-xl font-semibold text-ink-100">{title}</h1>
          {subtitle && <p className="text-sm text-ink-500 mt-1.5">{subtitle}</p>}
          <div className="mt-7">{children}</div>
        </div>

        {footer && <p className="text-center text-sm text-ink-500 mt-6">{footer}</p>}
      </div>
    </div>
  );
}
