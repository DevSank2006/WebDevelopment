export default function PageIntro({ eyebrow, title, description }) {
  return (
    <section className="page-glow px-5 pb-8 pt-16 text-center sm:px-8 sm:pb-10 sm:pt-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-cyan-300">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
