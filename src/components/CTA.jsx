import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section id="cta" className="relative py-28">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-glass p-12 sm:p-16 text-center overflow-hidden glass-strong"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet/20 via-transparent to-teal/10" />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink-100 max-w-xl mx-auto">
              Your next opportunity is one better CV away.
            </h2>
            <p className="mt-4 text-ink-300 max-w-md mx-auto">
              Free to try. No account needed for your first CV scan.
            </p>
            <Link
              to="/signup"
              className="mt-9 inline-block rounded-pill bg-gradient-to-r from-blue-light via-violet-light to-violet px-8 py-3.5 font-medium text-canvas hover:brightness-110 transition shadow-glow"
            >
              Analyze my CV — it's free
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
