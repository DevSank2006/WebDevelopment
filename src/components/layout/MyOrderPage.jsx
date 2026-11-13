import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import axios from "axios";
import { useState, useEffect } from "react";

const badge = (value) =>
  value === 'Paid' || value === 'Completed'
    ? 'bg-emerald-300/10 text-emerald-200'
    : value === 'Failed' || value === 'Cancelled'
      ? 'bg-rose-300/10 text-rose-200'
      : value === 'Refunded'
        ? 'bg-violet-300/10 text-violet-200'
        : 'bg-amber-300/10 text-amber-200';

export default function MyOrdersPage() {
  
    const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const fetchMyOrders = async () => {
  try {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    const response = await axios.get("https://webdevelopment-backend-production.up.railway.app/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setOrders(response.data);
  } catch (err) {
    console.error("Error fetching orders:", err);
    setError(err.response?.data?.message || "Unable to fetch your orders");
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  fetchMyOrders();
}, []);
  return (
    <main className="page-glow min-h-[75vh] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-blue-200">
          Account
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold">My Orders</h1>
        <p className="mt-2 text-sm text-slate-400">
          All orders placed by your account.
        </p>

        <section className="mt-7 space-y-4" aria-label="Orders">
          {loading && <p className="text-slate-400">Loading your orders...</p>}

{error && <p className="text-rose-300">{error}</p>}

{!loading && !error && orders.length === 0 && (
  <p className="text-slate-400">You haven't placed any orders yet.</p>
)}
          {orders.map((order) => (
            <article key={order.id} className="glass-strong rounded-3xl p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500">Order {order.id}</p>
                  <h2 className="mt-1 font-display text-xl font-semibold">
                    {order.items.length > 1
                      ? `${order.items.length} package line items`
                      : order.items[0]?.name || 'Order'}
                  </h2>

                  <ul className="mt-2 space-y-1 text-sm text-slate-300">
                    {order.items.map((item, index) => (
                      <li key={`${item.name}-${index}`}>
                        {item.name}
                        {item.quantity > 1 && (
                          <span className="text-slate-400"> × {item.quantity}</span>
                        )}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-2 text-sm text-slate-400">
                    Placed {new Date(`${order.date}T12:00:00`).toLocaleDateString()}
                  </p>
                </div>

                <p className="font-display text-xl font-bold">
                  {order.total.toFixed(2)}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-3 py-1.5 text-xs ${badge(order.payment)}`}>
                  Payment: {order.payment}
                </span>
                <span className={`rounded-full px-3 py-1.5 text-xs ${badge(order.status)}`}>
                  Order: {order.status}
                </span>
              </div>

              <Link
                to={`/dashboard/orders/${order.id}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-200 hover:text-white"
              >
                View Details <ArrowUpRight size={15} />
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}