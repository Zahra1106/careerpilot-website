// Reusable circular score indicator — shared by the CV analyzer, job
// match, and dashboard so a "score" always looks the same across the app.
export default function ScoreRing({ value = 0, size = 96, label, sublabel }) {
  const r = (size - 14) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="url(#scoreRingGradient)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - clamped / 100)}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
          <defs>
            <linearGradient id="scoreRingGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6FE3FF" />
              <stop offset="100%" stopColor="#7C5CFF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-display font-semibold text-ink-100" style={{ fontSize: size * 0.24 }}>
          {clamped}
        </div>
      </div>
      {(label || sublabel) && (
        <div>
          {label && <p className="text-sm text-ink-100 font-medium">{label}</p>}
          {sublabel && <p className="text-xs text-ink-500 mt-1">{sublabel}</p>}
        </div>
      )}
    </div>
  );
}
