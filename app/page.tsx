"use client";

// import { motion, useScroll, useTransform } from "framer-motion";

import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import UseCases from "../components/landing/UseCases";
import Comparison from "../components/landing/Comparison";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

// import { Plane } from "lucide-react";

export default function Home() {
  // const { scrollYProgress } = useScroll();
  // const y = useTransform(scrollYProgress, [0, 1], ["80vh", "-20vh"]);
  // const x = useTransform(scrollYProgress, [0, 1], ["10vw", "-5vw"]);
  // const rotate = useTransform(scrollYProgress, [0, 1], [20, -10]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* <motion.div
        style={{ x, y, rotate }}
        className="fixed bottom-0 right-0 z-50"
      >
        <Plane size={80} />
      </motion.div> */}

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
