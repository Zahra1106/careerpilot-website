// A static recreation of the CareerPilot app's own "Liquid Glass" UI
// kit — the same pill buttons, search field, switches, tabs and score
// ring from the product — used as the hero's centerpiece so the site
// shows the real interface rather than an abstract stand-in for it.
export default function GlassMockup() {
  return (
    <div className="relative w-full max-w-sm mx-auto glass-strong rounded-glass p-6 shadow-glass">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-ink-500">Resume review</p>
          <p className="font-display font-semibold text-ink-100">Amina&apos;s CV</p>
        </div>
        <div className="w-9 h-9 rounded-full glass flex items-center justify-center text-xs text-ink-300">
          AM
        </div>
      </div>

      <div className="flex items-center gap-5 mb-6">
        <div className="relative w-20 h-20 shrink-0">
          <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 34}
              strokeDashoffset={2 * Math.PI * 34 * (1 - 0.87)}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6FE3FF" />
                <stop offset="100%" stopColor="#7C5CFF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-display font-semibold text-lg text-ink-100">
            87
          </div>
        </div>
        <div>
          <p className="text-sm text-ink-100 font-medium">ATS score: strong match</p>
          <p className="text-xs text-ink-500 mt-1">2 quick fixes will get you to 90+</p>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <button className="flex-1 rounded-pill bg-gradient-to-r from-blue-light to-violet py-2.5 text-sm font-medium text-canvas">
          Fix now
        </button>
        <button className="flex-1 rounded-pill glass py-2.5 text-sm font-medium text-ink-100">
          Preview
        </button>
      </div>

      <div className="glass rounded-2xl px-4 py-3 flex items-center gap-2 mb-4">
        <span className="text-ink-500 text-sm">⌕</span>
        <span className="text-sm text-ink-500">Match a job description…</span>
      </div>

      <div className="flex items-center justify-between glass rounded-2xl px-4 py-3 mb-4">
        <span className="text-sm text-ink-100">Auto-tailor for each application</span>
        <span className="relative inline-flex h-5 w-9 items-center rounded-pill bg-gradient-to-r from-teal-light to-teal">
          <span className="absolute right-0.5 h-4 w-4 rounded-full bg-white shadow" />
        </span>
      </div>

      <div className="flex gap-2">
        <span className="rounded-pill glass-strong px-3.5 py-1.5 text-xs text-ink-100">Summary</span>
        <span className="rounded-pill px-3.5 py-1.5 text-xs text-ink-500">Experience</span>
        <span className="rounded-pill px-3.5 py-1.5 text-xs text-ink-500">Skills</span>
      </div>

      {/* floating badge, echoes the app's gradient icon badges */}
      <div className="absolute -right-6 -top-6 w-16 h-16 rounded-3xl bg-gradient-to-br from-pink to-violet-light shadow-glow flex items-center justify-center text-xl animate-float">
        🚀
      </div>
    </div>
  );
}
