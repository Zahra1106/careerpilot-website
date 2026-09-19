import { motion } from "framer-motion";

const features = [
  {
    title: "Analyze your CV",
    description:
      "An instant ATS-style score with the strengths, gaps, and concrete line-edits a recruiter would flag.",
    gradient: "from-blue-light to-violet",
    icon: "◎",
  },
  {
    title: "Match jobs with AI",
    description:
      "Paste any job description and see exactly how well you fit — and the three things missing from your CV.",
    gradient: "from-blue to-teal-light",
    icon: "⌁",
  },
  {
    title: "Prepare for interviews",
    description:
      "Practice real questions for the role you're chasing, and get feedback that actually changes your answer.",
    gradient: "from-pink to-violet-light",
    icon: "◉",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-lg mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink-100">
            Everything between you and the offer letter.
          </h2>
          <p className="mt-4 text-ink-300 leading-relaxed">
            Three tools, one flow — built around what actually gets a CV past a
            screener and into a hiring manager&apos;s hands.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              className="glass rounded-glass p-7 hover:bg-white/[0.07] transition-colors"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-xl text-canvas mb-6`}
              >
                {f.icon}
              </div>
              <h3 className="font-display font-semibold text-lg text-ink-100 mb-2.5">
                {f.title}
              </h3>
              <p className="text-sm text-ink-300 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
