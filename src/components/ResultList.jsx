// Renders one of the small string-array fields the AI endpoints return
// (strengths, weaknesses, missingSkills, recommendations, etc.) as a
// labeled glass card with a bullet list — one shape reused everywhere
// so analysis results don't look like six different components.
export default function ResultList({ title, items, tone = "neutral" }) {
  if (!items || items.length === 0) return null;

  const dot =
    tone === "good" ? "bg-teal" : tone === "warn" ? "bg-amber" : tone === "bad" ? "bg-pink" : "bg-violet-light";

  return (
    <div className="glass rounded-glass p-6">
      <h3 className="font-display font-semibold text-ink-100 mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-ink-300 leading-relaxed">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
            <span>{typeof item === "string" ? item : JSON.stringify(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
