import { motion } from "framer-motion";

// Full-bleed cinematic section using the user-provided AI visual as a
// muted, looping background — framed with the same glass/gradient
// language as the rest of the site so it reads as one brand, not a
// dropped-in clip.
export default function AIVideoSection() {
  return (
    <section className="relative py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-glass overflow-hidden glass-strong min-h-[420px] sm:min-h-[520px] flex items-center"
        >
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            src="/media/ai-face-bg.mp4"
            poster="/media/ai-face-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-transparent" />

          <div className="relative z-10 px-8 sm:px-14 max-w-lg">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink-100 leading-tight">
              A real AI reviewer, not a checklist.
            </h2>
            <p className="mt-5 text-ink-300 leading-relaxed">
              CareerPilot reads your CV the way a hiring manager would —
              weighing context, not just keywords — then scores it, matches
              it to roles, and rehearses the interview with you.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
