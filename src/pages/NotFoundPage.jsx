import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <section className="page-glow px-5 py-28 text-center">
      <p className="text-sm font-bold uppercase tracking-[.2em] text-violet-200">
        404 · Page not found
      </p>
      <h1 className="mt-4 font-display text-4xl font-extrabold">
        This page took a detour.
      </h1>
      <p className="mt-3 text-slate-400">
        Let's get you back to the good stuff.
      </p>
      <Link
        to="/"
        className="mt-7 inline-flex rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold"
      >
        Back to home
      </Link>
    </section>
  );
}
