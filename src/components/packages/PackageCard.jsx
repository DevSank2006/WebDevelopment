import { ArrowUpRight, Clock3, FileText, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart.js";

export default function PackageCard({ item, compact = false }) {
  const { add } = useCart();
  return (
    <article className="glass flex flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <Link
        to={`/product/${item.id}`}
        aria-label={`View ${item.name}`}
        className="block h-44 overflow-hidden"
      >
        {item.image ? (
          <img
            className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
            alt={item.name}
            src={item.image}
            loading="lazy"
          />
        ) : (
          <div
            className={`h-full w-full bg-gradient-to-br ${item.accent}`}
            aria-label={`${item.category} package artwork`}
          />
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="text-xs uppercase text-blue-400">{item.category}</div>
        <Link
          to={`/product/${item.id}`}
          className="mt-1 flex items-center justify-between gap-2 font-display text-lg font-semibold hover:text-blue-300"
        >
          {item.name}
          <ArrowUpRight size={16} className="shrink-0 text-slate-500" />
        </Link>
        {!compact && (
          <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-400">
            {item.description}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-1">
          {item.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-white/10 bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300"
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <div className="font-display text-2xl font-bold">${item.price}</div>
            <div className="text-[11px] text-slate-500">
              <FileText className="mr-1 inline h-3 w-3" />
              {item.pages} pages · {item.days} days
            </div>
          </div>
          <button
            type="button"
            onClick={() => add(item.id)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:brightness-110"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
