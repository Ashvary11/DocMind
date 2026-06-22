"use client";
import { motion } from "framer-motion";

import Link from "next/link";

export default function CTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-brand-500 to-brand-900 px-8 py-16 text-center ">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Turn Documents Into Answers
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-brand-50">
          Upload your first document and experience intelligent retrieval
          powered by modern AI.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg bg-white px-8 py-3 text-sm font-semibold text-brand-600 transition hover:bg-brand-50 hover:bg-gray-300"
          >
            Start Building
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-white/40 px-8 py-3 text-sm font-semibold  transition   hover:bg-gray-300"
          >
           Explore App
          </Link>
        </div>

        <p className="mt-6 text-2xl text-brand-100 sm:text-3xl md:text-4xl">
          <em>
            <q>No credit card required.</q>
          </em>
        </p>
      </div>
    </motion.section>
  );
}
