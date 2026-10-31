import { ArrowRight, BadgeCheck, Zap } from "lucide-react";
import PrimaryButton from "../ui/PrimaryButton.jsx";
import DashboardPreview from "./DashboardPreview.jsx";

export default function HeroSection() {
  return (
    <section className="page-glow relative px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:pt-24">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-2">
        <div className="relative z-10 max-w-2xl">
          <div className="glass-light inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-blue-200">
            <span className="text-cyan-200">✧</span> Premium Development Studio
          </div>
          <h1 className="mt-6 font-display text-[2.75rem] font-extrabold leading-[1.04] tracking-[-.055em] text-white sm:text-6xl lg:text-[4.25rem]">
            Launch your <span className="text-gradient">dream website</span> in
            days — not months.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Anand Plus Development crafts premium, liquid-glass websites for
            clothing brands, hospitals, SaaS startups, and more. Pick a package,
            tell us your vision, and we'll ship it fast.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <PrimaryButton to="/shop">
              Explore Packages <ArrowRight size={16} />
            </PrimaryButton>
            <PrimaryButton to="/services" variant="secondary">
              Our Services
            </PrimaryButton>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <BadgeCheck size={15} className="text-emerald-300" />
              100% refund guarantee
            </span>
            <span className="flex items-center gap-2">
              <Zap size={14} className="text-amber-300" />
              7-day delivery
            </span>
          </div>
        </div>
        <DashboardPreview />
      </div>
    </section>
  );
}
