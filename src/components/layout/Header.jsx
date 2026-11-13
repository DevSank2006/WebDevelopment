import { useState,useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useCart } from "../../hooks/useCart.jsx";
import ProfileMenu from '../layout/ProfileMenu.jsx';


const links = [
  ["Home", "/"],
  ["Shop Packages", "/shop"],
  ["Services", "/services"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
   const [isToken, setToken] = useState(null);

useEffect(() => {

  const checkToken = () => {
    setToken(localStorage.getItem("token"));
  };

  // Check token when Header first loads
  checkToken();

  // Listen for changes from other browser tabs
  window.addEventListener("storage", checkToken);

  // Listen for login/logout changes in this tab
  window.addEventListener("authChange", checkToken);

  // Remove listeners when Header is removed
  return () => {
    window.removeEventListener("storage", checkToken);
    window.removeEventListener("authChange", checkToken);
  };

}, []);

  const navClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm transition ${isActive ? "bg-white/10 text-white" : "text-slate-300 hover:text-white"}`;
  return (
    <header className="relative z-40 px-4 pt-4 sm:px-6">
      <div className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 sm:px-6">
        <Link
          to="/"
          aria-label="Anand Plus home"
          className="flex items-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 font-display text-sm font-bold text-white shadow-lg">
            A+
          </span>
          <span className="hidden leading-tight sm:block">
            <b className="block text-sm text-white">Anand Plus</b>
            <small className="text-[10px] text-slate-400">Development</small>
          </span>
        </Link>
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {links.map(([name, to]) => (
            <NavLink key={to} to={to} end={to === "/"} className={navClass}>
              {name}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
         <Link
  to="/cart"
  className="relative rounded-full border border-white/10 p-2.5 text-slate-200 hover:bg-white/10"
  aria-label={`Shopping cart, ${count} items`}
>
  <ShoppingCart size={17} />

  {count > 0 && (
    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-500 px-1 text-[10px]">
      {count}
    </span>
  )}
</Link>
          {isToken ? (
  <ProfileMenu />
) : (
  <Link to="/signin" className="...">
    Sign In
  </Link>
)}
        <div className="flex items-center gap-2">
  <Link
    to="/contact"
    className="rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-2.5 text-sm font-semibold shadow-glow hover:brightness-110"
  >
    Get Started
  </Link>

  

  <button
    type="button"
    onClick={() => setOpen(!open)}
    className="rounded-full p-2 text-slate-200 hover:bg-white/10 lg:hidden"
  >
    {open ? <X size={20} /> : <Menu size={20} />}
  </button>
</div>
         
</div>
       
      </div>
      {open && (
        <nav
          className="glass mx-auto mt-2 max-w-7xl rounded-3xl p-3 lg:hidden"
          aria-label="Mobile navigation"
        >
          {links.map(([name, to]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm ${isActive ? "bg-white/10 text-white" : "text-slate-300"}`
              }
            >
              {name}
            </NavLink>
          ))}
          <Link
            to="/signin"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-sm text-slate-300"
          >
            Sign in
          </Link>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-2xl bg-violet-500 px-4 py-3 text-sm font-semibold"
          >
            Get Started
          </Link>
        </nav>
      )}
    </header>
  );
}
