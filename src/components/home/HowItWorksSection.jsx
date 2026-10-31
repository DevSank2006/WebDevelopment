import { ArrowDownRight, ArrowRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading.jsx";

const steps = [
  ["01", "Pick a Package", "Browse 20+ ready blueprints across industries"],
  ["02", "Quick Customize", "Share your brand, content, and colors — we adapt"],
  ["03", "Fast Development", "See live progress in your dashboard every day"],
  ["04", "Launch & Scale", "Go live with free deployment and support"],
];
export default function HowItWorksSection() {
  return (
    <section className="border-y border-white/[.06] bg-white/[.015] px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How it works"
          title="From idea to launch in 4 steps"
        />
        <div className="grid gap-3 md:grid-cols-4">
          {steps.map(([number, title, description], i) => (
            <div key={number} className="glass relative rounded-3xl p-6 sm:p-7">
              <span className="font-display text-4xl font-extrabold text-white/20">
                {number}
              </span>
              {i < 3 && (
                <ArrowRight
                  className="absolute right-6 top-8 hidden text-violet-300/60 md:block"
                  size={18}
                />
              )}
              <h3 className="mt-7 font-display text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {description}
              </p>
              <ArrowDownRight
                size={16}
                className="mt-5 text-cyan-300/80 md:hidden"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
