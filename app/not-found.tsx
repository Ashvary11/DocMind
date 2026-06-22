import Link from "next/link";
import { Home, LayoutDashboard } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <span className="mb-2 text-sm font-medium text-brand-500">404 Error</span>

      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Page not found
      </h1>

      <p className="mt-4 max-w-md text-muted-foreground">
        Sorry, we couldn&#39;t find the page you&#39;re looking for. It may have
        been moved, deleted, or the URL might be incorrect.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 font-medium text-black border-r-2 transition hover:opacity-90"
        >
          <Home size={18} />
          Go Home
        </Link>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 font-medium transition hover:bg-muted"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
      </div>
    </div>
  );
}
