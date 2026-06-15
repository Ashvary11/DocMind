const cases = [
  {
    title: "Students",
    desc: "Summarize notes, books, research papers, and study material instantly.",
  },
  {
    title: "Businesses",
    desc: "Create internal knowledge assistants for teams and documentation.",
  },
  {
    title: "Researchers",
    desc: "Extract insights from large collections of papers and reports.",
  },
  {
    title: "Developers",
    desc: "Build custom AI workflows on top of your document data.",
  },
];

export default function UseCases() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
          Use Cases
        </h2>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl bg-gradient-to-br from-brand-50 to-white p-6 ring-1 ring-slate-100"
            >
              <h3 className="text-lg font-semibold text-brand-900">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
