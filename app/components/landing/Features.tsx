import {
  Upload,
  Brain,
  Zap,
  MessageSquare,
  Layers,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Upload Any Document",
    desc: "Import PDFs, Word documents, and text files with a simple drag-and-drop experience.",
  },
  {
    icon: Brain,
    title: "Smart Embeddings",
    desc: "Automatically convert your content into vector embeddings for accurate semantic understanding.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Search",
    desc: "Find relevant information in milliseconds using modern vector databases.",
  },
  {
    icon: MessageSquare,
    title: "AI-Powered Answers",
    desc: "Get precise responses grounded in your uploaded documents.",
  },
  {
    icon: Layers,
    title: "Context-Aware Retrieval",
    desc: "Every answer is backed by relevant document chunks, reducing hallucinations.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    desc: "Your data remains isolated, encrypted, and accessible only to you.",
  },
];

export default function Features() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
            Trusted Knowledge Retrieval
          </h2>
          <p className="mt-4 text-slate-600">
            Stop scrolling through hundreds of pages looking for information.
            DocMind understands your documents, stores them as vector
            embeddings, and retrieves the most relevant context before
            generating answers. Upload once. Ask anything.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 p-6 transition hover:shadow-lg hover:shadow-brand-100"
            >
              <div className="mb-4 inline-flex rounded-xl bg-brand-50 p-3">
                <Icon className="h-6 w-6 text-brand-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
