import { Quote, Star } from "lucide-react";
import SectionHeading from "../ui/SectionHeading.jsx";

const quotes = [
  {
    quote:
      "Our hospital finally has a modern face. Appointment booking works like magic. Patients love the clean, calming interface.",
    author: "Dr. Rohan Mehta",
    role: "Healthcare director",
    initials: "RM",
    color: "from-emerald-400 to-cyan-500",
  },
  {
    quote:
      "Anand Plus built our clothing store in 9 days. The liquid glass design is premium and sales jumped 2x.",
    author: "Priya Sharma",
    role: "Founder, Mode Studio",
    initials: "PS",
    color: "from-rose-400 to-violet-500",
  },
];
export default function TestimonialsSection() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Client love"
          title="Trusted by growing brands worldwide"
        />
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {quotes.map((item) => (
            <figure key={item.author} className="glass rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-amber-300">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} fill="currentColor" />
                  ))}
                </div>
                <Quote size={24} className="text-violet-300/50" />
              </div>
              <blockquote className="mt-6 font-display text-xl font-semibold leading-8 text-white">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-sm font-bold text-white`}
                >
                  {item.initials}
                </span>
                <span>
                  <b className="block text-sm">{item.author}</b>
                  <small className="text-xs text-slate-500">{item.role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
