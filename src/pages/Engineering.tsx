import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { About } from "@/components/landing/About";
import { WhyChoose } from "@/components/landing/WhyChoose";
import { Process } from "@/components/landing/Process";
import { FAQ } from "@/components/landing/FAQ";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "KIIT B.Tech Admission 2026 — Direct Seat | SS Education";
    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta(
      "description",
      "Get direct B.Tech admission in KIIT University 2026. NIRF Rank 36. ₹53 LPA highest package. Free counselling for students from Bihar, Jharkhand, Odisha. Call +91 99456 67977.",
    );
    setMeta("og:title", "KIIT B.Tech Admission 2026 — Direct Seat | SS Education", "property");
    setMeta(
      "og:description",
      "Trusted by 500+ students. Management quota & KIITEE seats available. Free counselling — call SS Education today.",
      "property",
    );
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Stats />
      <About />
      <WhyChoose />
      <Process />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
