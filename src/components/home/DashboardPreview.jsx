import { Star } from "lucide-react";

export default function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[610px] px-5 py-5 sm:px-8">
      <div className="glass relative rounded-3xl p-5 animate-float-slow">
        <img
          className="h-72 w-full rounded-2xl object-cover"
          alt="Dashboard preview"
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900"
        />
        <div className="glass absolute -bottom-5 -left-1 rounded-2xl border border-blue-400/30 px-4 py-3 sm:-left-5">
          <div className="text-[10px] text-slate-400">Projects shipped</div>
          <div className="font-display text-2xl font-bold">500+</div>
        </div>
        <div className="glass absolute -right-1 -top-5 rounded-2xl border border-emerald-400/30 px-4 py-3 sm:-right-5">
          <div className="text-[10px] text-slate-400">Average rating</div>
          <div className="flex items-center gap-1 font-display text-2xl font-bold">
            4.9 <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
