import {
  Activity,
  BookOpen,
  Building2,
  Layers3,
  Shirt,
  ShoppingBag,
} from "lucide-react";
const icons = {
  store: ShoppingBag,
  layers: Layers3,
  hospital: Activity,
  shirt: Shirt,
  book: BookOpen,
  building: Building2,
};

export default function PackageArtwork({ item, compact = false }) {
  const Icon = icons[item.icon] || Layers3;
  return (
    <div
      className={`relative isolate overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${item.accent} ${compact ? "h-40" : "h-52"}`}
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {item.image && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
      )}
      <div className="absolute -right-8 -top-12 h-48 w-48 rounded-full border border-white/10" />
      <div className="absolute -right-1 -top-5 h-36 w-36 rounded-full border border-white/10" />
      <div className="absolute -bottom-20 -left-5 h-44 w-44 rounded-full bg-white/[.05] blur-2xl" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="glass flex h-20 w-20 -rotate-6 items-center justify-center rounded-[1.7rem] text-white shadow-2xl">
          <Icon size={36} strokeWidth={1.35} />
        </div>
      </div>
      <div className="absolute bottom-3 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-[#0c1226]/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-white/75 backdrop-blur">
        {item.category} <span className="h-1 w-1 rounded-full bg-cyan-300" />{" "}
        Studio blueprint
      </div>
    </div>
  );
}
