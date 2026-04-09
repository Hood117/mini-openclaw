import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Preview } from "@/components/landing/Preview";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Page() {
  return (
    <div
      id="top"
      className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white"
    >
      <LandingNavbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Preview />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
