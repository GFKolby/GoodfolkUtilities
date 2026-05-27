import Link from "next/link";

export const metadata = {
  title: "Privacy",
  description:
    "Learn how Goodfolk Tools handles browser-based utilities, file processing, analytics, and privacy.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm font-semibold text-amber-300 hover:text-amber-200"
        >
          ← Back to all tools
        </Link>

        <header className="border-b border-slate-800 pb-10">
          <p className="mb-2 font-medium text-amber-300">
            Goodfolk Tools
          </p>

          <h1 className="text-5xl font-bold md:text-6xl">
            Privacy
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            Goodfolk Tools is built to be simple, practical, and respectful of your data.
          </p>
        </header>

        <section className="mt-10 space-y-8 text-zinc-300">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Browser-based tools
            </h2>
            <p className="mt-3 leading-7">
              Many Goodfolk Tools run directly in your browser. For tools like
              the PDF Splitter, Bulk Rename Tool, Password Generator, and text
              utilities, your files or generated values are processed locally in
              your browser and are not intentionally stored by Goodfolk Tools.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">
              File tools
            </h2>
            <p className="mt-3 leading-7">
              File-based tools are designed for quick, temporary processing.
              When possible, files are handled in the browser so you can use the
              tool without creating an account or uploading files to a user
              dashboard.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">
              Analytics
            </h2>
            <p className="mt-3 leading-7">
              Goodfolk Tools may use basic analytics to understand which tools
              are being used and how the site is performing. This helps improve
              the toolbox over time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">
              Accounts
            </h2>
            <p className="mt-3 leading-7">
              Goodfolk Tools does not currently require accounts for the free
              browser tools.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">
              Contact
            </h2>
            <p className="mt-3 leading-7">
              Questions about privacy or the toolbox can be sent through
              Goodfolk Digital.
            </p>
          </div>
        </section>

        <footer className="mt-16 border-t border-slate-800 pt-8 text-sm text-zinc-500">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://goodfolkdigital.com"
            className="text-zinc-400 hover:text-amber-300"
          >
            Goodfolk Digital
          </a>
          . Built for good folks.
        </footer>
      </div>
    </main>
  );
}