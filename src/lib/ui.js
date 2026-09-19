// Shared Tailwind class strings so every form field/button across the
// app (login, signup, analyzer, job match, interview prep...) looks
// like it belongs to the same design system.
export const inputClass =
  "w-full rounded-2xl glass px-4 py-3 text-sm text-ink-100 placeholder:text-ink-500 outline-none focus:bg-white/[0.09] focus:border-white/25 transition";

export const textareaClass = inputClass + " resize-none";

export const primaryBtnClass =
  "rounded-pill bg-gradient-to-r from-blue-light via-violet-light to-violet px-6 py-3 text-sm font-medium text-canvas hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed";

export const secondaryBtnClass =
  "rounded-pill glass px-6 py-3 text-sm font-medium text-ink-100 hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed";

export const labelClass = "block text-xs font-medium text-ink-500 mb-2";
