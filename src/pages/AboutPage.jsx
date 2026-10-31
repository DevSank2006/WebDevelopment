export default function AboutPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-6">
        <span className="badge-glow">About us</span>
        <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
          Engineering the next wave of the web.
        </h1>
        <p className="mt-5 leading-relaxed text-slate-300">
          Anand Plus Development is a boutique web and software studio obsessed
          with speed, polish, and the user experience. Since day one we've been
          shipping premium liquid-glass websites for clothing brands, hospitals,
          SaaS startups, education platforms, and ambitious entrepreneurs across
          the globe.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["500+", "Websites launched"],
            ["4.9★", "Average rating from 320+ clients"],
            ["7 days", "Average delivery time"],
          ].map(([value, label]) => (
            <div key={label} className="glass rounded-2xl p-6">
              <div className="text-gradient font-display text-3xl font-bold">
                {value}
              </div>
              <div className="mt-1 text-sm text-slate-400">{label}</div>
            </div>
          ))}
        </div>
        <div className="glass-strong mt-10 rounded-3xl p-8">
          <h2 className="font-display text-2xl font-bold">Our ethos</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            We treat every website like a product, not a brochure. Every pixel,
            animation, and database query is tuned to help your business grow.
            We believe in direct communication, honest pricing, and premium
            craftsmanship — nothing less.
          </p>
        </div>
      </div>
    </main>
  );
}
