import { Link } from "react-router-dom";

const explore = [
  ["Shop Packages", "/shop"],
  ["Our Services", "/services"],
  ["About Us", "/about"],
  ["Contact", "/contact"],
];
const legal = [
  ["Privacy Policy", "/policy/privacy"],
  ["Refund Policy", "/policy/refund"],
  ["Terms & Conditions", "/policy/terms"],
];
const payment = ["Stripe", "Razorpay", "UPI", "Visa", "Mastercard", "PayPal"];

export default function Footer() {
  return (
    <footer className="border-t border-white/[.07]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <Link to="/" className="mb-3 flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 font-display font-bold">
              A+
            </span>
            <span>
              <span className="block font-display font-bold">
                Anand Plus Development
              </span>
              <span className="text-xs text-slate-500">
                Next-Gen Web &amp; Software Craftsmanship
              </span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400">
            We design, build and launch premium websites and software — fast,
            beautiful, and built to scale.
          </p>
        </div>
        <div>
          <h2 className="mb-3 font-display font-semibold">Explore</h2>
          <ul className="space-y-2 text-sm text-slate-400">
            {explore.map(([label, path]) => (
              <li key={path}>
                <Link className="hover:text-white" to={path}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-display font-semibold">Legal</h2>
          <ul className="space-y-2 text-sm text-slate-400">
            {legal.map(([label, path]) => (
              <li key={path}>
                <Link className="hover:text-white" to={path}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-display font-semibold">Payment partners</h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {payment.map((name) => (
              <span
                key={name}
                className="rounded-full border border-white/10 bg-slate-800/60 px-3 py-1 text-slate-300"
              >
                {name}
              </span>
            ))}
          </div>
          <div className="mt-4 text-xs text-slate-500">
            © {new Date().getFullYear()} Anand Plus Development. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
