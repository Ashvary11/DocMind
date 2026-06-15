import Link from "next/link";

export default function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-brand-500 to-brand-900 px-8 py-16 text-center text-white">
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
            className="rounded-lg bg-white px-8 py-3 text-sm font-semibold text-brand-600 transition hover:bg-brand-50"
          >
            Start Building
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-white/40 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View Demo
          </Link>
        </div>

        <p className="mt-6 text-xs text-brand-100">No credit card required.</p>
      </div>
    </section>
  );
}
