"use client";
import { X, Check } from "lucide-react";
import { motion } from "framer-motion";

const traditional = [
  "Searches only exact words",
  "Requires manual document reading",
  "Misses important context",
  "Takes time to find answers",
  "No direct answers",
  "Endless scrolling through documents",
];

const docmind = [
  "Ask questions naturally",
  "Understands document context",
  "Finds relevant information instantly",
  "Provides direct answers",
  "Saves time and effort",
];

export default function Comparison() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className="bg-slate-50 px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
          Why Choose DocMind?
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h3 className="mb-4 text-lg font-semibold text-slate-500">
              Traditional Search
            </h3>
            <ul className="space-y-3">
              {traditional.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2 text-sm text-slate-600"
                >
                  <X className="h-4 w-4 text-red-400" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-brand-500 bg-white p-8 shadow-lg shadow-brand-100">
            <h3 className="mb-4 text-lg font-semibold text-brand-600">
              DocMind AI
            </h3>
            <ul className="space-y-3">
              {docmind.map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-2 text-sm text-slate-700"
                >
                  <Check className="h-4 w-4 text-brand-500" /> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
