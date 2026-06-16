"use client";

import { motion } from "framer-motion";
const steps = [
  {
    num: "1",
    title: "Upload",
    desc: "Drag and drop PDFs, DOCX, or TXT files.",
  },
  {
    num: "2",
    title: "Process",
    desc: "Documents are chunked, embedded, and stored in the vector database.",
  },
  { num: "3", title: "Ask", desc: "Ask questions in natural language." },
  {
    num: "4",
    title: "Get Answers",
    desc: "Receive responses generated from your own knowledge base.",
  },
];

export default function HowItWorks() {
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
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
          How It Works
        </h2>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.num}
              className="text-center border-r border-b border-slate-300/90 shadow-md p-2 hover:scale-110 hover:shadow-brand-10 transition-all duration-300 ease-in-out"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-xl font-bold test-slate-700 ">
                {s.num}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
