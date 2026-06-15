import Hero from "./components/landing/Hero";
import Features from "./components/landing/Features";
import HowItWorks from "./components/landing/HowItWorks";
import UseCases from "./components/landing/UseCases";
import Comparison from "./components/landing/Comparison";
import CTA from "./components/landing/CTA";
import Footer from "./components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <Features />
      <HowItWorks />
      <UseCases />
      <Comparison />
      <CTA />
      <Footer />
    </div>
  );
}
