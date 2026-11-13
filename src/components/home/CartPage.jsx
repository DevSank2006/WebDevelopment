
import { useCart } from "../../hooks/useCart.jsx";
import { packages } from "../../data/packages.js";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, remove } = useCart();

  const count = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = items.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  return (
    <main className="page-glow min-h-[70vh] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">

        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-400/10 text-blue-200">
            <ShoppingBag size={21} />
          </span>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-blue-200">
              Your selection
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold">
              Shopping cart
            </h1>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="glass-strong mt-8 rounded-3xl px-6 py-16 text-center">
            <ShoppingBag className="mx-auto text-slate-500" size={32} />
            <h2 className="mt-4 font-display text-xl font-semibold">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Add a package and it will appear here.
            </p>
            <Link to="/shop" className="btn-primary mt-6">
              Browse packages
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">

            <section className="space-y-3" aria-label="Cart items">

              {items.map((item) => {
                     const selectedPackage = packages.find(
    (pkg) => pkg.serviceId === item.serviceId
  );
              
              return (
                <article
                  key={item.id}
                  className="glass-strong flex flex-col gap-4 rounded-3xl p-4 sm:flex-row sm:items-center sm:p-5"
                >
                  <div className="h-24 w-full overflow-hidden rounded-2xl bg-blue-400/10 sm:w-32">
  {selectedPackage?.image ? (
    <img
      src={selectedPackage.image}
      alt={item.title}
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full items-center justify-center text-blue-200">
      <ShoppingBag size={32} />
    </div>
  )}
</div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                      Service ID: {item.serviceId}
                    </p>

                    <h2 className="mt-1 font-display text-lg font-semibold">
                      {item.title}
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      Price: ₹{Number(item.price).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">

                    <span className="font-display text-xl font-bold">
                      ₹{Number(item.subtotal).toLocaleString("en-IN")}
                    </span>

                    <div className="flex items-center gap-2 rounded-full border border-white/10 p-1">

                      <button
                        type="button"
                        aria-label={`Remove one ${item.title}`}
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="rounded-full p-1.5 text-slate-300 hover:bg-white/10 disabled:opacity-40"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="min-w-5 text-center text-sm">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        aria-label={`Add one ${item.title}`}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="rounded-full p-1.5 text-slate-300 hover:bg-white/10"
                      >
                        <Plus size={14} />
                      </button>

                      <button
                        type="button"
                        aria-label={`Remove ${item.title} from cart`}
                        onClick={() => remove(item.id)}
                        className="ml-1 rounded-full p-1.5 text-rose-300 hover:bg-rose-300/10"
                      >
                        <Trash2 size={14} />
                      </button>

                    </div>
                  </div>
                </article>
              )})}

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-2 py-3 text-sm text-blue-200 hover:text-white"
              >
                Continue shopping <ArrowRight size={15} />
              </Link>
            </section>

            <aside className="glass-strong h-fit rounded-3xl p-6">
              <h2 className="font-display text-xl font-semibold">
                Order summary
              </h2>

              <div className="mt-5 flex justify-between text-sm text-slate-400">
                <span>Items ({count})</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>

              <div className="my-5 border-t border-white/10" />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="font-display text-xl">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <Link to="/checkout" className="btn-primary mt-6 w-full">
                Continue to checkout
              </Link>

              <p className="mt-4 text-center text-xs text-slate-500">
                Demo cart. No payment is collected.
              </p>
            </aside>

          </div>
        )}
      </div>
    </main>
  );
}
