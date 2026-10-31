import {
  ChartLine,
  CodeXml,
  Globe,
  Shield,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  [
    Globe,
    "Website Development",
    "Pixel-perfect marketing sites, landing pages, and corporate portals that convert.",
  ],
  [
    ShoppingBag,
    "E-Commerce",
    "Full-stack storefronts with cart, checkout, inventory, coupons, and analytics.",
  ],
  [
    CodeXml,
    "SaaS & Web Apps",
    "React + FastAPI product builds with auth, billing, dashboards, and API.",
  ],
  [
    Smartphone,
    "Mobile-first UI",
    "Responsive, touch-tuned interfaces that feel native on every screen.",
  ],
  [
    ChartLine,
    "SEO & Growth",
    "Technical SEO, schema, performance, and conversion optimization built in.",
  ],
  [
    Shield,
    "Maintenance",
    "Monthly care plans: updates, backups, security patches, and feature requests.",
  ],
];

export default function ServicesPage() {
  return (
    <main className="pt-24 pb-20" data-testid="services-page">
      <div className="mx-auto max-w-7xl px-6">
        <span className="badge-glow">Our services</span>
        <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
          End-to-end development, by one studio.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          From the first wireframe to a deployed, scaling production app —
          everything you need under one roof.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([Icon, title, description]) => (
            <article key={title} className="glass glass-hover rounded-2xl p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10">
                <Icon className="h-5 w-5 text-blue-300" />
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold">
                {title}
              </h2>
              <p className="mt-2 text-sm text-slate-400">{description}</p>
            </article>
          ))}
        </div>
        <div className="glass-strong mt-10 rounded-3xl p-8 text-center">
          <h2 className="font-display text-2xl font-bold">
            Pick a package or get a custom quote.
          </h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link data-testid="cta-shop" to="/shop" className="btn-primary">
              Browse packages
            </Link>
            <Link to="/contact" className="btn-ghost">
              Request custom quote
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
