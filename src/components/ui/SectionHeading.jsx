export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}) {
  return (
    <div
      className={`mb-10 max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-cyan-300">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-slate-400">{description}</p>
      )}
    </div>
  );
}
