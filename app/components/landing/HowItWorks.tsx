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
    <section className="bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
          How It Works
        </h2>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-xl font-bold text-white">
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
    </section>
  );
}
