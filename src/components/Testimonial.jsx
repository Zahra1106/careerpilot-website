import { motion } from "framer-motion";

export default function Testimonial() {
  return (
    <section id="stories" className="relative py-28">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="glass-strong rounded-glass p-10 sm:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-violet/20 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-teal/20 blur-3xl" />

          <p className="font-display text-xl sm:text-2xl leading-snug text-ink-100 relative">
            "I rewrote three bullet points CareerPilot flagged and started getting
            replies within a week. It reads a CV the way the hiring manager
            actually will."
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-light to-violet" />
            <div className="text-left">
              <p className="text-sm font-medium text-ink-100">Hira Sultana</p>
              <p className="text-xs text-ink-500">Product Designer, hired at a fintech startup</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
