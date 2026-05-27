import Link from "next/link";

type ToolPageProps = {
  line:
  "Goodfolk Office Utilities"
  | "Goodfolk Camp Utilities"
  | "Goodfolk Home Utilities"
  | "Goodfolk Finance Utilities";
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function ToolPage({
  line,
  title,
  description,
  children,
}: ToolPageProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-amber-300 hover:text-amber-200 mb-8"
        >
          ← Back to all tools
        </Link>

        <p className="text-amber-300 mb-2 font-medium">{line}</p>

        <h1 className="text-4xl font-bold mb-4">{title}</h1>

        <p className="text-zinc-300 mb-8 max-w-2xl">{description}</p>

        {children}

        <footer className="mt-16 text-sm text-zinc-500">
  © {new Date().getFullYear()}{" "}
  <a
    href="https://goodfolkdigital.com"
    className="text-zinc-400 hover:text-amber-300"
  >
    Goodfolk Digital
  </a>
  . Built for good folks.
  <Link href="/privacy" className="text-zinc-400 hover:text-amber-300">
  Privacy
</Link>
<Link href="/about" className="text-zinc-400 hover:text-amber-300">
  About
</Link>
</footer>
      </div>
    </main>
  );
}