import {
  Building2,
  CodeXml,
  GraduationCap,
  Hospital,
  ShoppingBag,
  Store,
} from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading.jsx";

const categories = [
  {
    name: "Clothing / Fashion",
    query: "clothing",
    icon: Store,
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Hospital / Clinic",
    query: "hospital",
    icon: Hospital,
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Software / SaaS",
    query: "software",
    icon: CodeXml,
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "E-Commerce",
    query: "ecommerce",
    icon: ShoppingBag,
    color: "from-amber-500 to-orange-500",
  },
  {
    name: "Corporate",
    query: "corporate",
    icon: Building2,
    color: "from-slate-400 to-slate-600",
  },
  {
    name: "Education",
    query: "education",
    icon: GraduationCap,
    color: "from-violet-500 to-purple-500",
  },
];
export default function CategoriesSection() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Website categories"
          title="Built for every industry"
          description="Pre-engineered packages tuned for how real businesses actually convert."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ name, query, icon: Icon, color }) => (
            <Link
              key={name}
              to={`/shop?category=${query}`}
              className="glass group flex flex-col items-center gap-3 rounded-2xl p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold">{name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
