import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { packageApi } from "../services/api.js";
import { findPackage } from "../data/packages.js";
import { useCart } from "../hooks/useCart.jsx";
import PackageArtwork from "../components/packages/PackageArtwork.jsx";
import StatusMessage from "../components/ui/StatusMessage.jsx";

export default function PackageDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(() => findPackage(id));
  const [error, setError] = useState("");
  const { add, message } = useCart();
  useEffect(() => {
    let active = true;
    packageApi
      .get(id)
      .then((data) => {
        if (active) setItem(data);
      })
      .catch((e) => {
        if (active) {
          setError(
            e.response?.data?.message || "Could not load package details.",
          );
          setItem(findPackage(id));
        }
      });
    return () => {
      active = false;
    };
  }, [id]);
  if (!item)
    return (
      <section className="px-5 py-24 text-center">
        <h1 className="text-2xl font-bold">Package not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-violet-200">
          Back to packages
        </Link>
      </section>
    );
  return (
    <section className="page-glow px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/shop"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={15} /> All packages
        </Link>
        {error && (
          <div className="mb-4">
            <StatusMessage>{error}</StatusMessage>
          </div>
        )}
        {message && (
          <div className="mb-4">
            <StatusMessage type="success">{message}</StatusMessage>
          </div>
        )}
        <div className="grid gap-7 lg:grid-cols-[1.05fr_.95fr]">
          <PackageArtwork item={item} />
          <div className="glass rounded-3xl p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-cyan-300">
              {item.category}
            </p>
            <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
              {item.name}
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              {item.description}
            </p>
            <div className="mt-6 flex gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <FileText size={15} />
                {item.pages} pages
              </span>
              <span className="flex items-center gap-2">
                <Clock3 size={15} />
                {item.days} days
              </span>
            </div>
            <div className="my-6 border-t border-white/10" />
            <h2 className="font-semibold">Included in your package</h2>
            <ul className="mt-4 space-y-3">
              {item.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-slate-300"
                >
                  <Check size={15} className="text-emerald-300" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex items-center justify-between">
              <div>
                <span className="font-display text-3xl font-extrabold">
                  {item.price}
                </span>
                <p className="mt-1 text-[11px] text-slate-500">
                  One-time demo price
                </p>
              </div>
              <button
                onClick={() => add(item.id)}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3 text-sm font-semibold shadow-glow"
              >
                Add to cart <ArrowRight size={15} />
              </button>
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={14} className="text-emerald-300" />
              100% refund guarantee · No payment collected in this demo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
