import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import AIVideoSection from "../components/AIVideoSection";
import HowItWorks from "../components/HowItWorks";
import Testimonial from "../components/Testimonial";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-canvas overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 bg-grain opacity-40 z-0" />
      {/* flies across the whole page as you scroll — screen-blend turns
          the video's black background invisible so only the glowing
          butterfly + sparkles show, and it sits behind section content
          (and behind the AI video further down) rather than on top of it */}
      <video
        className="pointer-events-none fixed inset-0 w-full h-full object-cover mix-blend-screen z-[5]"
        style={{
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 60%, transparent 100%)",
        }}
        src="/media/butterfly-flying.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
        <AIVideoSection />
        <HowItWorks />
        <Testimonial />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
