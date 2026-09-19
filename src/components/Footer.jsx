export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-light via-violet to-blue flex items-center justify-center text-xs">
            ✦
          </span>
          <span className="font-display text-sm text-ink-300">AI CareerPilot</span>
        </div>
        <p className="text-xs text-ink-500">© {new Date().getFullYear()} AI CareerPilot. Built for people between jobs.</p>
      </div>
    </footer>
  );
}
