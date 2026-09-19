import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Upload your CV",
    description: "Drop in a PDF or Word file — or start from a blank template if you're building one from scratch.",
  },
  {
    n: "02",
    title: "Get your score & fixes",
    description: "CareerPilot scores it against real ATS patterns and shows exactly what's holding it back.",
  },
  {
    n: "03",
    title: "Apply with confidence",
    description: "Tailor it to each job in one tap, then rehearse the interview questions likely to come up.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative py-28">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink-100 max-w-lg mb-16">
          From draft to interview-ready, in one sitting.
        </h2>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="relative"
            >
              <span className="font-display text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-white/25 to-white/5">
                {s.n}
              </span>
              <h3 className="font-display font-semibold text-lg text-ink-100 mt-3 mb-2.5">
                {s.title}
              </h3>
              <p className="text-sm text-ink-300 leading-relaxed max-w-xs">{s.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 -right-4 w-8 h-px bg-gradient-to-r from-white/20 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
