const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Documentation", "API"],
  },
  {
    title: "Resources",
    links: ["Blog", "Guides", "Support"],
  },
  {
    title: "Company",
    links: ["About", "Privacy", "Terms"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold text-brand-600">DocMind</h3>
            <p className="mt-2 text-sm text-slate-500">
              AI-powered document Q&A.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-semibold text-slate-900">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 hover:text-brand-500"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-slate-400">
          © 2026 DocMind. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
