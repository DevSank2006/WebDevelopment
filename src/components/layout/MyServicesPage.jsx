
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowUpRight, PackageCheck } from "lucide-react";

export default function MyServicesPage() {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch services purchased by the logged-in user
  const fetchMyServices = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.get(
        'https://webdevelopment-backend-production.up.railway.app/services/my-services',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setServices(response.data);

    } catch (err) {
      console.error("Error fetching services:", err);

      setError(
        err.response?.data?.message || "Unable to fetch your services"
      );

    } finally {
      setLoading(false);
    }
  };

  // Call API when component loads
  useEffect(() => {
    fetchMyServices();
  }, []);

  return (
    <main className="page-glow min-h-[75vh] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">

        <p className="text-xs font-semibold uppercase tracking-[.16em] text-blue-200">
          Account
        </p>

        <h1 className="mt-2 font-display text-3xl font-bold">
          My Services
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Services and packages purchased by your account.
        </p>

        <section className="mt-7 grid gap-4 md:grid-cols-2">

          {loading && (
            <p className="text-slate-400">Loading your services...</p>
          )}

          {error && (
            <p className="text-rose-300">{error}</p>
          )}

          {!loading && !error && services.length === 0 && (
            <p className="text-slate-400">
              You haven't purchased any services yet.
            </p>
          )}

          {!loading && services.map((service) => (

            <article
              key={service.id}
              className="glass-strong rounded-3xl p-6"
            >

              <div className="flex items-start justify-between gap-3">

                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-400/10 text-blue-200">
                  <PackageCheck size={20} />
                </span>

                <span className="rounded-full bg-emerald-300/10 px-3 py-1.5 text-xs text-emerald-200">
                  {service.status}
                </span>

              </div>

              <h2 className="mt-5 font-display text-xl font-semibold">
                {service.title}
              </h2>

              <div className="mt-2 text-sm leading-6 text-slate-400">
                {service.features?.map((feature, index) => (
                  <p key={index}>• {feature}</p>
                ))}
              </div>

              <p className="mt-2 text-sm text-slate-400">
                Quantity: {service.quantity}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs">

                <div>
                  <p className="text-slate-500">Order ID</p>
                  <p className="mt-1 text-slate-200">
                    {service.id}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">Purchase date</p>
                  <p className="mt-1 text-slate-200">
                    {new Date(service.purchaseDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">Price per unit</p>
                  <p className="mt-1 text-slate-200">
                    ₹{Number(service.price).toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">Subtotal</p>
                  <p className="mt-1 text-slate-200">
                    ₹{Number(service.subtotal).toFixed(2)}
                  </p>
                </div>

              </div>

              <Link
                to={`/dashboard/orders/${service.id}`}
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
