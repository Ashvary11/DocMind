"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import UseCases from "../components/landing/UseCases";
import Comparison from "../components/landing/Comparison";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <div className="relative flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <motion.div
        style={{ y }}
        className="pointer-events-none fixed -right-25 top-0 z-0 opacity-20"
      >
        <svg width="600" height="1200" viewBox="0 0 600 1200">
          <path
            d="M500 0C250 200 600 500 300 700C0 900 400 1100 150 1200"
            stroke="#71717a"
            strokeWidth="30"
            fill="none"
          />
        </svg>
      </motion.div>

      <div className="relative z-10 w-full">
        <Hero />
        <Features />
        <HowItWorks />
        <UseCases />
        <Comparison />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
