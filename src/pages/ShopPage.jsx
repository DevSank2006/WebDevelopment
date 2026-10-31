import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { packageApi } from "../services/api.js";
import {
  categories as allCategories,
  packages as fallback,
} from "../data/packages.js";
import PageIntro from "../components/ui/PageIntro.jsx";
import PackageCard from "../components/packages/PackageCard.jsx";
import StatusMessage from "../components/ui/StatusMessage.jsx";

const categoryMap = {
  clothing: "Clothing",
  hospital: "Hospital",
  software: "SaaS",
  saas: "SaaS",
  ecommerce: "E-Commerce",
  "e-commerce": "E-Commerce",
  corporate: "Corporate",
  education: "Education",
};
export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(() => {
    const value = searchParams.get("category");
    return value
      ? categoryMap[value.toLowerCase()] ||
          allCategories.find(
            (item) => item.toLowerCase() === value.toLowerCase(),
          ) ||
          "All"
      : "All";
  });
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    setSearchParams(
      category === "All" ? {} : { category: categoryMap[category] || category },
    );
  }, [category, setSearchParams]);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    const timer = window.setTimeout(async () => {
      try {
        const data = await packageApi.list({
          category: category === "All" ? undefined : category,
          search: search || undefined,
        });
        if (active) setItems(data);
      } catch {
        if (active) {
          const query = search.toLowerCase();
          setItems(
            fallback.filter(
              (item) =>
                (category === "All" || item.category === category) &&
                (!query ||
                  `${item.name} ${item.description}`
                    .toLowerCase()
                    .includes(query)),
            ),
          );
          setError(
            "The demo API could not be reached. Showing the saved demo catalog.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }, 180);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [category, search]);
  useEffect(() => {
    const handler = (event) => setNotice(event.detail.message);
    window.addEventListener("cart-message", handler);
    return () => window.removeEventListener("cart-message", handler);
  }, []);
  return (
    <>
      <PageIntro
        eyebrow="Website package store"
        title="Pick your perfect website package"
        description="Ready-to-customize blueprints made for the way your business grows."
      />
      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="glass rounded-3xl p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <SlidersHorizontal size={16} className="text-violet-300" />
                <span className="font-semibold">Browse by industry</span>
              </div>
              <label className="relative block w-full lg:max-w-sm">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search packages..."
                  aria-label="Search packages"
                  className="w-full rounded-full border border-white/10 bg-[#080d20]/70 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-violet-400/50"
                />
              </label>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {allCategories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${category === item ? "bg-violet-500 text-white" : "border border-white/10 text-slate-400 hover:bg-white/[.06] hover:text-white"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {error && (
            <div className="mt-5">
              <StatusMessage type="info">{error}</StatusMessage>
            </div>
          )}
          {notice && (
            <div className="mt-5">
              <StatusMessage type="success">{notice}</StatusMessage>
            </div>
          )}
          <div className="mt-7 flex items-center justify-between text-sm text-slate-500">
            <span>
              {loading
                ? "Loading packages…"
                : `${items.length} package${items.length === 1 ? "" : "s"} found`}
            </span>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-violet-200 hover:text-white"
              >
                Clear search
              </button>
            )}
          </div>
          {loading ? (
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((x) => (
                <div
                  key={x}
                  className="glass h-[26rem] animate-pulse rounded-2xl"
                />
              ))}
            </div>
          ) : items.length ? (
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <PackageCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="glass mt-5 rounded-3xl py-20 text-center">
              <p className="text-lg font-semibold">No packages found</p>
              <p className="mt-2 text-sm text-slate-400">
                Try another category or search term.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
