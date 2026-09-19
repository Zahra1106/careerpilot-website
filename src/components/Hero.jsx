import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import GlassMockup from "./GlassMockup";

function TiltStage({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: 1200 }}
      className="relative"
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>{children}</motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* contained, blurred glow instead of a full-bleed video — keeps
            it as ambient light behind the mockup rather than a big
            graphic competing with the UI */}
            <div
  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[300px] h-[420px] sm:w-[380px] sm:h-[520px] lg:w-[440px] lg:h-[600px] rounded-[3rem] overflow-hidden opacity-70"
  style={{ maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)" }}
>
  <video
    className="w-full h-full object-cover"
    style={{ objectPosition: "60% 42%" }}
    src="/media/butterfly-hero.mp4"
    poster="/media/butterfly-poster.jpg"
    autoPlay
    muted
    loop
    playsInline
  />
</div>

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-canvas to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] font-semibold text-ink-100 max-w-xl">
            Turn your CV into your next opportunity.
          </h1>
          <p className="mt-6 text-lg text-ink-300 max-w-md leading-relaxed">
            AI CareerPilot reads your resume the way a recruiter does, scores it in
            seconds, and tells you exactly what to fix before you hit apply.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/signup"
              className="rounded-pill bg-gradient-to-r from-blue-light via-violet-light to-violet px-7 py-3.5 font-medium text-canvas hover:brightness-110 transition shadow-glow"
            >
              Analyze my CV
            </Link>
            <a
              href="#how"
              className="rounded-pill glass px-7 py-3.5 font-medium text-ink-100 hover:bg-white/10 transition"
            >
              See how it works
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6 text-sm text-ink-500">
            <div>
              <p className="text-2xl font-display font-semibold text-ink-100">42,000+</p>
              <p>CVs scored</p>
            </div>
            <div className="w-px h-9 bg-white/10" />
            <div>
              <p className="text-2xl font-display font-semibold text-ink-100">3.1×</p>
              <p>more interview replies</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          <TiltStage>
            <GlassMockup />
          </TiltStage>
        </motion.div>
      </div>
    </section>
  );
}
