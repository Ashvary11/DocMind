import { Check } from "lucide-react";
import Link from "next/link";

const points = [
  "PDF, DOCX & TXT Support",
  "Vector Search Powered",
  "Fast AI Responses",
  "Secure Document Processing",
  "Auto Data Delete after 1 hour",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-brand-900 sm:text-6xl">
          Your Documents.{" "}
          <span className="text-brand-500">Instantly Searchable.</span>{" "}
          Intelligently Answered.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Transform PDFs, DOCX files, and text documents into a searchable AI
          knowledge base in seconds. Upload your files, create embeddings
          automatically, and get accurate answers powered by semantic search and
          Retrieval-Augmented Generation (RAG).
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg bg-brand-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
          >
            Get Started Free
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-slate-300 px-8 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View Demo
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {points.map((p) => (
            <div
              key={p}
              className="flex items-center justify-center gap-2 text-sm font-medium text-slate-700"
            >
              <Check className="h-4 w-4 text-brand-500" />
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
